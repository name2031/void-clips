import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).slice(0, 20);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
});

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const files = db
    .prepare(`SELECT id, original_name, mime_type, size, created_at FROM files WHERE user_id = ? ORDER BY created_at DESC`)
    .all(req.user.id);
  res.json({ files });
});

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const id = uuidv4();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO files (id, user_id, original_name, stored_name, mime_type, size, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    req.user.id,
    req.file.originalname,
    req.file.filename,
    req.file.mimetype,
    req.file.size,
    now
  );
  const file = db
    .prepare(`SELECT id, original_name, mime_type, size, created_at FROM files WHERE id = ?`)
    .get(id);
  res.status(201).json({ file });
});

router.get('/:id', (req, res) => {
  const file = db
    .prepare(`SELECT * FROM files WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!file) return res.status(404).json({ error: 'Not found' });
  const abs = path.join(uploadsDir, file.stored_name);
  if (!fs.existsSync(abs)) return res.status(404).json({ error: 'File missing on disk' });

  const preview = req.query.preview === '1';
  if (preview) {
    const mime = file.mime_type || '';
    if (mime.startsWith('image/')) {
      return res.json({
        file: {
          id: file.id,
          original_name: file.original_name,
          mime_type: file.mime_type,
          size: file.size,
          created_at: file.created_at,
        },
        preview: { type: 'image', url: `/api/files/${file.id}/download` },
      });
    }
    if (mime.startsWith('text/') || /\.(txt|md|json|csv|js|ts|tsx|jsx|py|html|css|xml|yml|yaml)$/i.test(file.original_name)) {
      const text = fs.readFileSync(abs, 'utf8').slice(0, 100000);
      return res.json({
        file: {
          id: file.id,
          original_name: file.original_name,
          mime_type: file.mime_type,
          size: file.size,
          created_at: file.created_at,
        },
        preview: { type: 'text', content: text },
      });
    }
    return res.json({
      file: {
        id: file.id,
        original_name: file.original_name,
        mime_type: file.mime_type,
        size: file.size,
        created_at: file.created_at,
      },
      preview: { type: 'none' },
    });
  }

  res.json({
    file: {
      id: file.id,
      original_name: file.original_name,
      mime_type: file.mime_type,
      size: file.size,
      created_at: file.created_at,
    },
  });
});

router.get('/:id/download', (req, res) => {
  const file = db
    .prepare(`SELECT * FROM files WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!file) return res.status(404).json({ error: 'Not found' });
  const abs = path.join(uploadsDir, file.stored_name);
  if (!fs.existsSync(abs)) return res.status(404).json({ error: 'File missing on disk' });
  res.download(abs, file.original_name);
});

router.delete('/:id', (req, res) => {
  const file = db
    .prepare(`SELECT * FROM files WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!file) return res.status(404).json({ error: 'Not found' });
  const abs = path.join(uploadsDir, file.stored_name);
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch {}
  db.prepare(`DELETE FROM files WHERE id = ?`).run(file.id);
  res.json({ ok: true });
});

export default router;
