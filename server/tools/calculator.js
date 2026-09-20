export const calculator = {
  name: 'calculator',
  description: 'Evaluate basic arithmetic expressions safely.',
  available: true,
  async execute({ expression } = {}) {
    if (!expression || typeof expression !== 'string') {
      return { error: 'Provide an expression string, e.g. "12 * (3 + 4)"' };
    }
    const cleaned = expression.replace(/[^0-9+\-*/().%\s]/g, '');
    if (!cleaned.trim()) return { error: 'Invalid expression' };
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict"; return (${cleaned})`)();
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return { error: 'Could not compute a finite number' };
    }
    return { expression: cleaned.trim(), result: value };
  },
};
