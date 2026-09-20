import fs from 'fs';
import path from 'path';

export const fileSummary = {
  name: 'file_summary',
  description: 'Load text content from an uploaded file for summarization context.',
  available: true,
  async execute({ filePath, maxChars = 12000 } = {}, ctx = {}) {
    const target = filePath || ctx.filePath;
    if (!target) return { error: 'No file path provided' };
    const abs = path.resolve(target);
    const uploadsRoot = path.resolve(ctx.uploadsDir || path.join(process.cwd(), 'uploads'));
    if (!abs.startsWith(uploadsRoot)) {
      return { error: 'File path outside uploads directory' };
    }
    if (!fs.existsSync(abs)) return { error: 'File not found' };
    const mime = ctx.mimeType || '';
    if (mime.startsWith('image/')) {
      return {
        type: 'image',
        note: 'Image file attached. Describe/summarize based on filename and any user notes; binary vision is not enabled in v1.',
        name: path.basename(abs),
      };
    }
    const buf = fs.readFileSync(abs);
    let text = buf.toString('utf8');
    if (text.includes('\u0000')) {
      return { type: 'binary', note: 'Binary file; cannot extract text summary directly.', name: path.basename(abs) };
    }
    const truncated = text.length > maxChars;
    text = text.slice(0, maxChars);
    return {
      type: 'text',
      name: path.basename(abs),
      truncated,
      content: text,
    };
  },
};
