import { webStub } from './web_stub.js';
import { calculator } from './calculator.js';
import { codeAssist } from './code_assist.js';
import { fileSummary } from './file_summary.js';

const registry = {
  web_stub: webStub,
  calculator,
  code_assist: codeAssist,
  file_summary: fileSummary,
};

export function listTools() {
  return Object.values(registry).map((t) => ({
    name: t.name,
    description: t.description,
    available: t.available !== false,
  }));
}

export function toolsDescription() {
  return listTools()
    .map((t) => `- ${t.name}: ${t.description}${t.available ? '' : ' (limited/stub)'}`)
    .join('\n');
}

export async function runTool(name, args = {}, ctx = {}) {
  const tool = registry[name];
  if (!tool) return { ok: false, error: `Unknown tool: ${name}` };
  try {
    const result = await tool.execute(args, ctx);
    return { ok: true, tool: name, result };
  } catch (e) {
    return { ok: false, tool: name, error: e.message || String(e) };
  }
}

export function detectToolHints(userText) {
  const text = (userText || '').toLowerCase();
  const hints = [];
  if (/\b(search|look up|browse|web|google|online)\b/.test(text)) hints.push('web_stub');
  if (
    /\b(calc|calculate|compute|evaluate|what(?:'s| is)\s+\d|how much is)\b/.test(text) ||
    /\d+\s*[\+\-\*\/×÷%]\s*\d+/.test(text) ||
    /\(\s*\d+[\d\s+\-*/().%]*\)/.test(text)
  ) {
    hints.push('calculator');
  }
  if (
    /\b(code|coding|refactor|debug|implement|function|typescript|javascript|python|rust|go\b|java\b|sql|css|html|api|bug|compile|unit test|write a script)\b/.test(
      text
    )
  ) {
    hints.push('code_assist');
  }
  if (/\b(summariz|summary|summarise|key points|tl;?dr)\b/.test(text)) hints.push('file_summary');
  return hints;
}

export default registry;
