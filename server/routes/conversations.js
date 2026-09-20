import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const q = (req.query.q || '').toString().trim();
  let rows;
  if (q) {
    rows = db
      .prepare(
        `SELECT * FROM conversations
         WHERE user_id = ? AND title LIKE ?
         ORDER BY updated_at DESC LIMIT 100`
      )
      .all(req.user.id, `%${q}%`);
  } else {
    rows = db
      .prepare(`SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 100`)
      .all(req.user.id);
  }
  res.json({ conversations: rows });
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const now = new Date().toISOString();
  const title = (req.body?.title || 'New chat').toString().slice(0, 120);
  const project_id = req.body?.project_id || null;
  db.prepare(
    `INSERT INTO conversations (id, user_id, project_id, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, req.user.id, project_id, title, now, now);
  const conv = db.prepare(`SELECT * FROM conversations WHERE id = ?`).get(id);
  res.status(201).json({ conversation: conv });
});

router.get('/:id', (req, res) => {
  const conv = db
    .prepare(`SELECT * FROM conversations WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!conv) return res.status(404).json({ error: 'Not found' });
  const messages = db
    .prepare(`SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC`)
    .all(conv.id);
  res.json({ conversation: conv, messages });
});

router.patch('/:id', (req, res) => {
  const conv = db
    .prepare(`SELECT * FROM conversations WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!conv) return res.status(404).json({ error: 'Not found' });
  const title = req.body?.title != null ? String(req.body.title).slice(0, 120) : conv.title;
  const project_id = req.body?.project_id !== undefined ? req.body.project_id : conv.project_id;
  const now = new Date().toISOString();
  db.prepare(`UPDATE conversations SET title = ?, project_id = ?, updated_at = ? WHERE id = ?`).run(
    title,
    project_id,
    now,
    conv.id
  );
  res.json({ conversation: db.prepare(`SELECT * FROM conversations WHERE id = ?`).get(conv.id) });
});

router.delete('/:id', (req, res) => {
  const conv = db
    .prepare(`SELECT * FROM conversations WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!conv) return res.status(404).json({ error: 'Not found' });
  db.prepare(`DELETE FROM conversations WHERE id = ?`).run(conv.id);
  res.json({ ok: true });
});

export default router;
