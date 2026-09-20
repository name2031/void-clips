import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const projects = db
    .prepare(`SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC`)
    .all(req.user.id);
  res.json({ projects });
});

router.post('/', (req, res) => {
  const name = (req.body?.name || 'Untitled project').toString().slice(0, 120);
  const instructions = (req.body?.instructions || '').toString().slice(0, 8000);
  const id = uuidv4();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO projects (id, user_id, name, instructions, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, req.user.id, name, instructions, now, now);
  res.status(201).json({ project: db.prepare(`SELECT * FROM projects WHERE id = ?`).get(id) });
});

router.get('/:id', (req, res) => {
  const project = db
    .prepare(`SELECT * FROM projects WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  const conversations = db
    .prepare(
      `SELECT * FROM conversations WHERE user_id = ? AND project_id = ? ORDER BY updated_at DESC`
    )
    .all(req.user.id, project.id);
  res.json({ project, conversations });
});

router.patch('/:id', (req, res) => {
  const project = db
    .prepare(`SELECT * FROM projects WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  const name = req.body?.name != null ? String(req.body.name).slice(0, 120) : project.name;
  const instructions =
    req.body?.instructions != null ? String(req.body.instructions).slice(0, 8000) : project.instructions;
  const now = new Date().toISOString();
  db.prepare(`UPDATE projects SET name = ?, instructions = ?, updated_at = ? WHERE id = ?`).run(
    name,
    instructions,
    now,
    project.id
  );
  res.json({ project: db.prepare(`SELECT * FROM projects WHERE id = ?`).get(project.id) });
});

router.delete('/:id', (req, res) => {
  const project = db
    .prepare(`SELECT * FROM projects WHERE id = ? AND user_id = ?`)
    .get(req.params.id, req.user.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  db.prepare(`UPDATE conversations SET project_id = NULL WHERE project_id = ?`).run(project.id);
  db.prepare(`DELETE FROM projects WHERE id = ?`).run(project.id);
  res.json({ ok: true });
});

export default router;
