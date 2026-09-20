const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

export function getAiConfig() {
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL;

  if (openaiKey) {
    return {
      apiKey: openaiKey,
      baseUrl: (baseUrl || 'https://api.openai.com/v1').replace(/\/$/, ''),
      model: DEFAULT_MODEL,
      provider: 'openai',
    };
  }
  if (groqKey) {
    return {
      apiKey: groqKey,
      baseUrl: (baseUrl || 'https://api.groq.com/openai/v1').replace(/\/$/, ''),
      model: process.env.OPENAI_MODEL || 'llama-3.3-70b-versatile',
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

export async function streamChatCompletion({ messages, signal }) {
  const cfg = getAiConfig();
  if (!cfg) {
    const err = new Error('No AI API key configured. Set OPENAI_API_KEY or GROQ_API_KEY on the server.');
    err.code = 'NO_API_KEY';
    throw err;
  }

  const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      stream: true,
      temperature: 0.7,
    }),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`AI provider error (${res.status}): ${text.slice(0, 400)}`);
    err.code = 'PROVIDER_ERROR';
    throw err;
  }

  return res.body;
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
