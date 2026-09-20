import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const memories = db
    .prepare(`SELECT * FROM memories WHERE user_id = ? ORDER BY created_at DESC`)
    .all(req.user.id);
  res.json({ memories });
});

router.post('/', (req, res) => {
  const content = (req.body?.content || '').toString().trim().slice(0, 1000);
  if (!content) return res.status(400).json({ error: 'Content required' });
  const id = uuidv4();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO memories (id, user_id, content, enabled, created_at) VALUES (?, ?, ?, 1, ?)`
  ).run(id, req.user.id, content, now);
  res.status(201).json({ memory: db.prepare(`SELECT * FROM memories WHERE id = ?`).get(id) });
});

router.patch('/:id', (req, res) => {
  const memory = db
    .prepare(`SELECT * FROM memories WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!memory) return res.status(404).json({ error: 'Not found' });
  const content = req.body?.content != null ? String(req.body.content).slice(0, 1000) : memory.content;
  const enabled = req.body?.enabled != null ? (req.body.enabled ? 1 : 0) : memory.enabled;
  db.prepare(`UPDATE memories SET content = ?, enabled = ? WHERE id = ?`).run(content, enabled, memory.id);
  res.json({ memory: db.prepare(`SELECT * FROM memories WHERE id = ?`).get(memory.id) });
});

router.delete('/:id', (req, res) => {
  const memory = db
    .prepare(`SELECT * FROM memories WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!memory) return res.status(404).json({ error: 'Not found' });
  db.prepare(`DELETE FROM memories WHERE id = ?`).run(memory.id);
  res.json({ ok: true });
});

export default router;
