export const codeAssist = {
  name: 'code_assist',
  description:
    'Coding-task framing: push for working code first, brief explanation, explicit assumptions, and clarity over cleverness. Trigger on code, refactor, debug, implement, or language-specific asks.',
  available: true,
  async execute({ task, language } = {}) {
    return {
      framing: [
        'Treat this as a coding assistance request.',
        language ? `Preferred language: ${language}` : null,
        task ? `Task: ${task}` : null,
        'Deliver: (1) working code, (2) a short explanation of key choices, (3) assumptions / edge cases.',
        'Prefer clarity over cleverness. Do not invent APIs or files that were not provided.',
        'If the request is ambiguous, make a reasonable default and state it in one line.',
      ]
        .filter(Boolean)
        .join('\n'),
    };
  },
};
