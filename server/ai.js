const GROQ_DEFAULT_MODEL = 'qwen/qwen3.6-27b';
const GROQ_FALLBACK_MODELS = ['openai/gpt-oss-20b', 'qwen/qwen3.6-27b', 'openai/gpt-oss-120b'];
const OPENAI_DEFAULT_MODEL = 'gpt-4o-mini';

export function getAiConfig() {
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL;
  const envModel = process.env.OPENAI_MODEL?.trim();

  if (openaiKey) {
    return {
      apiKey: openaiKey,
      baseUrl: (baseUrl || 'https://api.openai.com/v1').replace(/\/$/, ''),
      model: envModel || OPENAI_DEFAULT_MODEL,
      provider: 'openai',
    };
  }
  if (groqKey) {
    return {
      apiKey: groqKey,
      baseUrl: (baseUrl || 'https://api.groq.com/openai/v1').replace(/\/$/, ''),
      model: envModel || GROQ_DEFAULT_MODEL,
      provider: 'groq',
    };
  }
  return null;
}

export function buildSystemPrompt({ settings, memories, project, toolsDescription }) {
  const personalityMap = {
    balanced: 'Be clear, capable, and direct.',
    concise: 'Be extremely concise. Prefer short answers.',
    creative: 'Be imaginative and expressive while staying useful.',
    technical: 'Be precise and technical. Prefer structured detail.',
  };
  const lengthMap = {
    short: 'Keep responses brief.',
    medium: 'Use a moderate level of detail.',
    long: 'Provide thorough, well-structured answers when useful.',
  };

  const parts = [
    'You are VOID AI — a premium intelligent assistant.',
    'Tagline: Tell it what you need. Let it handle the rest.',
    'Execute clearly requested work without asking permission for tiny steps.',
    'Ask only when critical information is missing.',
    'Never pretend tools succeeded. If a tool is unavailable or stubbed, say so clearly.',
    'Never narrate your reasoning; answer directly.',
    'If no AI API key is configured on the server, tell the user clearly.',
    personalityMap[settings?.personality] || personalityMap.balanced,
    lengthMap[settings?.response_length] || lengthMap.medium,
  ];

  if (toolsDescription) {
    parts.push('Available tools (mention when relevant; do not invent successful tool output):');
    parts.push(toolsDescription);
  }

  if (project) {
    parts.push(`Active project: ${project.name}`);
    if (project.instructions) {
      parts.push(`Project instructions:\n${project.instructions}`);
    }
  }

  if (settings?.memory_enabled && memories?.length) {
    parts.push('Known preference facts about the user:');
    for (const m of memories) {
      if (m.enabled) parts.push(`- ${m.content}`);
    }
  }

  return parts.join('\n\n');
}

function modelCandidates(cfg) {
  const candidates = [cfg.model];
  if (cfg.provider === 'groq') {
    for (const m of GROQ_FALLBACK_MODELS) {
      if (!candidates.includes(m)) candidates.push(m);
    }
  }
  return candidates;
}

async function requestCompletion(cfg, messages, signal, model, { stream }) {
  return fetch(`${cfg.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream,
      temperature: 0.7,
    }),
    signal,
  });
}

function isModelNotFound(status, text) {
  if (status !== 404) return false;
  const lower = (text || '').toLowerCase();
  return (
    lower.includes('does not exist') ||
    lower.includes('model_not_found') ||
    lower.includes('not found') ||
    lower.includes('invalid_model')
  );
}

/**
 * Strip common model "thinking" wrappers that sometimes appear inside content.
 * Safe to run on stream tokens (no-op if tags are incomplete in a single chunk).
 */
export function stripThinkTags(text) {
  if (!text || typeof text !== 'string') return '';
  let out = text;
  out = out.replace(/<think>[\s\S]*?<\/think>/gi, '');
  out = out.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
  out = out.replace(/```(?:thinking|reasoning|thought)[\s\S]*?```/gi, '');
  out = out.replace(/<\|begin_of_thought\|>[\s\S]*?<\|end_of_thought\|>/gi, '');
  out = out.replace(/<\|redacted_reasoning\|>[\s\S]*?<\|\/redacted_reasoning\|>/gi, '');
  if (out !== text) out = out.replace(/^\n+/, '');
  return out;
}

function maybeLogReasoning(reasoning) {
  if (!reasoning || typeof reasoning !== 'string') return;
  if (!process.env.VOID_LOG_REASONING) return;
  const snippet = reasoning.length > 240 ? `${reasoning.slice(0, 240)}…` : reasoning;
  console.log('[VOID AI] model reasoning (hidden from UI):', snippet);
}

/**
 * Extract user-visible text from an OpenAI-compatible chat chunk or message.
 * Prefer delta.content / message.content ONLY — never yield reasoning into the chat UI.
 */
export function extractChatText(piece) {
  if (!piece || typeof piece !== 'object') return '';

  // Non-stream message-like object
  if ('content' in piece || 'reasoning' in piece) {
    maybeLogReasoning(piece.reasoning);
    const content = typeof piece.content === 'string' ? piece.content : '';
    return stripThinkTags(content);
  }

  const choice = piece.choices?.[0];
  if (!choice) return '';

  const delta = choice.delta;
  if (delta) {
    maybeLogReasoning(delta.reasoning);
    const content = typeof delta.content === 'string' ? delta.content : '';
    return stripThinkTags(content);
  }

  const msg = choice.message;
  if (msg) {
    maybeLogReasoning(msg.reasoning);
    const content = typeof msg.content === 'string' ? msg.content : '';
    return stripThinkTags(content);
  }

  if (typeof choice.text === 'string' && choice.text) {
    return stripThinkTags(choice.text);
  }
  return '';
}

export async function streamChatCompletion({ messages, signal }) {
  const cfg = getAiConfig();
  if (!cfg) {
    const err = new Error('No AI API key configured. Set OPENAI_API_KEY or GROQ_API_KEY on the server.');
    err.code = 'NO_API_KEY';
    throw err;
  }

  const tried = new Set();
  let lastStatus = 0;
  let lastText = '';

  for (const model of modelCandidates(cfg)) {
    if (tried.has(model)) continue;
    tried.add(model);

    const res = await requestCompletion(cfg, messages, signal, model, { stream: true });
    if (res.ok) return { body: res.body, model, cfg };

    lastText = await res.text().catch(() => '');
    lastStatus = res.status;

    if (cfg.provider === 'groq' && isModelNotFound(res.status, lastText)) {
      console.warn(`[VOID AI] Model ${model} unavailable (${res.status}); trying fallback…`);
      continue;
    }

    const err = new Error(`AI provider error (${res.status}): ${lastText.slice(0, 400)}`);
    err.code = 'PROVIDER_ERROR';
    throw err;
  }

  const err = new Error(`AI provider error (${lastStatus}): ${lastText.slice(0, 400)}`);
  err.code = 'PROVIDER_ERROR';
  throw err;
}

/** One-shot non-stream completion (used when SSE yields zero tokens). */
export async function nonStreamChatCompletion({ messages, signal, preferredModel }) {
  const cfg = getAiConfig();
  if (!cfg) {
    const err = new Error('No AI API key configured. Set OPENAI_API_KEY or GROQ_API_KEY on the server.');
    err.code = 'NO_API_KEY';
    throw err;
  }

  const candidates = preferredModel
    ? [preferredModel, ...modelCandidates(cfg).filter((m) => m !== preferredModel)]
    : modelCandidates(cfg);

  const tried = new Set();
  let lastStatus = 0;
  let lastText = '';

  for (const model of candidates) {
    if (tried.has(model)) continue;
    tried.add(model);

    const res = await requestCompletion(cfg, messages, signal, model, { stream: false });
    if (res.ok) {
      const json = await res.json();
      const text = extractChatText(json);
      return { text: text || '', model };
    }

    lastText = await res.text().catch(() => '');
    lastStatus = res.status;

    if (cfg.provider === 'groq' && isModelNotFound(res.status, lastText)) {
      console.warn(`[VOID AI] Model ${model} unavailable (${res.status}); trying fallback…`);
      continue;
    }

    const err = new Error(`AI provider error (${res.status}): ${lastText.slice(0, 400)}`);
    err.code = 'PROVIDER_ERROR';
    throw err;
  }

  const err = new Error(`AI provider error (${lastStatus}): ${lastText.slice(0, 400)}`);
  err.code = 'PROVIDER_ERROR';
  throw err;
}

export async function* parseSSEStream(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim();
      if (data === '[DONE]') return;
      try {
        const json = JSON.parse(data);
        const piece = extractChatText(json);
        if (piece) yield piece;
      } catch {
        // ignore partial JSON
      }
    }
  }
}
