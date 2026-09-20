export const codeAssist = {
  name: 'code_assist',
  description: 'Frames coding tasks with structured guidance for the model.',
  available: true,
  async execute({ task, language } = {}) {
    return {
      framing: [
        'Treat this as a coding assistance request.',
        language ? `Preferred language: ${language}` : null,
        task ? `Task: ${task}` : null,
        'Provide working code, brief explanation, and note assumptions.',
        'Prefer clarity over cleverness.',
      ]
        .filter(Boolean)
        .join('\n'),
    };
  },
};
