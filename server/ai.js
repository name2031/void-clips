const GROQ_DEFAULT_MODEL = 'openai/gpt-oss-20b';
const GROQ_FALLBACK_MODELS = ['openai/gpt-oss-20b', 'qwen/qwen3.6-27b'];
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

async function requestCompletion(cfg, messages, signal, model) {
  return fetch(`${cfg.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
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

export async function streamChatCompletion({ messages, signal }) {
  const cfg = getAiConfig();
  if (!cfg) {
    const err = new Error('No AI API key configured. Set OPENAI_API_KEY or GROQ_API_KEY on the server.');
    err.code = 'NO_API_KEY';
    throw err;
  }

  const tried = new Set();
  const candidates = [cfg.model];
  if (cfg.provider === 'groq') {
    for (const m of GROQ_FALLBACK_MODELS) {
      if (!candidates.includes(m)) candidates.push(m);
    }
  }

  let lastStatus = 0;
  let lastText = '';

  for (const model of candidates) {
    if (tried.has(model)) continue;
    tried.add(model);

    const res = await requestCompletion(cfg, messages, signal, model);
    if (res.ok) return res.body;

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
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        // ignore partial JSON
      }
    }
  }
}
