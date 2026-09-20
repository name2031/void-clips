import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
import { requireAuth } from '../auth.js';
import { buildSystemPrompt, streamChatCompletion, parseSSEStream, getAiConfig, nonStreamChatCompletion } from '../ai.js';
import { toolsDescription, detectToolHints, runTool, listTools } from '../tools/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const router = Router();
router.use(requireAuth);

function getSettings(userId) {
  return (
    db.prepare(`SELECT * FROM settings WHERE user_id = ?`).get(userId) || {
      personality: 'balanced',
      response_length: 'medium',
      theme: 'dark',
      memory_enabled: 1,
    }
  );
}

function getMemories(userId) {
  return db
    .prepare(`SELECT * FROM memories WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC LIMIT 50`)
    .all(userId);
}

router.post('/stream', async (req, res) => {
  const { conversation_id, content, regenerate, edit_message_id, file_id } = req.body || {};
  if (!conversation_id || (!content && !regenerate && !edit_message_id)) {
    return res.status(400).json({ error: 'conversation_id and content required' });
  }

  const conv = db
    .prepare(`SELECT * FROM conversations WHERE id = ? AND user_id = ?`)
    .get(conversation_id, req.user.id);
  if (!conv) return res.status(404).json({ error: 'Conversation not found' });

  let userContent = (content || '').toString();

  // Edit last user message: delete that message and everything after
  if (edit_message_id) {
    const msg = db
      .prepare(`SELECT * FROM messages WHERE id = ? AND conversation_id = ?`)
      .get(edit_message_id, conv.id);
    if (!msg || msg.role !== 'user') return res.status(400).json({ error: 'Invalid message to edit' });
    userContent = content != null ? String(content) : msg.content;
    db.prepare(`DELETE FROM messages WHERE conversation_id = ? AND created_at >= ?`).run(
      conv.id,
      msg.created_at
    );
  } else if (regenerate) {
    const lastAssistant = db
      .prepare(
        `SELECT * FROM messages WHERE conversation_id = ? AND role = 'assistant' ORDER BY created_at DESC LIMIT 1`
      )
      .get(conv.id);
    if (lastAssistant) {
      db.prepare(`DELETE FROM messages WHERE id = ?`).run(lastAssistant.id);
    }
    const lastUser = db
      .prepare(
        `SELECT * FROM messages WHERE conversation_id = ? AND role = 'user' ORDER BY created_at DESC LIMIT 1`
      )
      .get(conv.id);
    if (!lastUser) return res.status(400).json({ error: 'Nothing to regenerate' });
    userContent = lastUser.content;
  } else {
    // new user message
    const mid = uuidv4();
    const now = new Date().toISOString();
    db.prepare(
      `INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, 'user', ?, ?)`
    ).run(mid, conv.id, userContent, now);
  }

  // Auto-title from first message
  if (conv.title === 'New chat' && userContent) {
    const title = userContent.slice(0, 60).replace(/\s+/g, ' ').trim() || 'New chat';
    db.prepare(`UPDATE conversations SET title = ?, updated_at = ? WHERE id = ?`).run(
      title,
      new Date().toISOString(),
      conv.id
    );
  }

  const settings = getSettings(req.user.id);
  const memories = settings.memory_enabled ? getMemories(req.user.id) : [];
  let project = null;
  if (conv.project_id) {
    project = db
      .prepare(`SELECT * FROM projects WHERE id = ? AND user_id = ?`)
      .get(conv.project_id, req.user.id);
  }

  // Optional file context
  let fileContext = '';
  if (file_id) {
    const file = db.prepare(`SELECT * FROM files WHERE id = ? AND user_id = ?`).get(file_id, req.user.id);
    if (file) {
      const filePath = path.join(uploadsDir, file.stored_name);
      const toolRes = await runTool('file_summary', { filePath }, { uploadsDir, mimeType: file.mime_type });
      if (toolRes.ok && toolRes.result?.content) {
        fileContext = `\n\n[Attached file: ${file.original_name}]\n${toolRes.result.content}`;
      } else if (toolRes.ok) {
        fileContext = `\n\n[Attached file: ${file.original_name}] ${JSON.stringify(toolRes.result)}`;
      }
    }
  }

  // Tool hints injected as system notes (honest, no fake success)
  const hints = detectToolHints(userContent);
  let toolNotes = '';
  for (const name of hints) {
    if (name === 'calculator') {
      const m = userContent.match(/([0-9+\-*/().%\s]{3,80})/);
      if (m) {
        const r = await runTool('calculator', { expression: m[1] });
        if (r.ok && r.result?.result != null) {
          toolNotes += `\n[Tool calculator] ${r.result.expression} = ${r.result.result}`;
        }
      }
    } else if (name === 'web_stub') {
      const r = await runTool('web_stub', {});
      toolNotes += `\n[Tool web_stub] ${r.result?.message || r.error}`;
    } else if (name === 'code_assist') {
      const r = await runTool('code_assist', { task: userContent.slice(0, 500) });
      toolNotes += `\n[Tool code_assist]\n${r.result?.framing || ''}`;
    }
  }

  const system = buildSystemPrompt({
    settings,
    memories,
    project,
    toolsDescription: toolsDescription(),
  });

  const history = db
    .prepare(`SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC`)
    .all(conv.id);

  // If regenerating, history already excludes deleted assistant; last user is there.
  // If new message, history includes the new user message.
  const messages = [{ role: 'system', content: system + toolNotes }];
  for (const m of history) {
    messages.push({ role: m.role, content: m.content });
  }
  // Ensure last user message includes file context if any
  if (fileContext && messages.length) {
    const last = messages[messages.length - 1];
    if (last.role === 'user' && !last.content.includes('[Attached file:')) {
      last.content = last.content + fileContext;
    }
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const send = (obj) => {
    res.write(`data: ${JSON.stringify(obj)}\n\n`);
  };

  if (!getAiConfig()) {
    const msg =
      'VOID AI has no API key configured. Set OPENAI_API_KEY or GROQ_API_KEY on the server, then try again.';
    const aid = uuidv4();
    const now = new Date().toISOString();
    db.prepare(
      `INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, 'assistant', ?, ?)`
    ).run(aid, conv.id, msg, now);
    db.prepare(`UPDATE conversations SET updated_at = ? WHERE id = ?`).run(now, conv.id);
    send({ type: 'token', content: msg });
    send({ type: 'done', message_id: aid });
    return res.end();
  }

  const ac = new AbortController();
  req.on('close', () => ac.abort());

  let full = '';
  let usedModel = null;
  try {
    const { body, model } = await streamChatCompletion({ messages, signal: ac.signal });
    usedModel = model;
    for await (const token of parseSSEStream(body)) {
      full += token;
      send({ type: 'token', content: token });
    }

    // gpt-oss and similar models may stream only into reasoning fields we already
    // parse — but if the stream still produced nothing, fall back once non-stream.
    if (!full && !ac.signal.aborted) {
      console.warn(`[VOID AI] Empty stream from ${usedModel}; trying non-stream fallback…`);
      const fallback = await nonStreamChatCompletion({
        messages,
        signal: ac.signal,
        preferredModel: usedModel,
      });
      if (fallback.text) {
        full = fallback.text;
        send({ type: 'token', content: full });
      }
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      // client stopped
    } else {
      const errMsg = e.message || 'Stream failed';
      if (!full) full = `Sorry — ${errMsg}`;
      send({ type: 'error', error: errMsg });
    }
  }

  if (full) {
    const aid = uuidv4();
    const now = new Date().toISOString();
    db.prepare(
      `INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, 'assistant', ?, ?)`
    ).run(aid, conv.id, full, now);
    db.prepare(`UPDATE conversations SET updated_at = ? WHERE id = ?`).run(now, conv.id);
    send({ type: 'done', message_id: aid });
  } else {
    send({ type: 'done', message_id: null });
  }
  res.end();
});

router.get('/tools', (req, res) => {
  res.json({ tools: listTools() });
});

export default router;
