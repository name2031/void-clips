import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  let settings = db.prepare(`SELECT * FROM settings WHERE user_id = ?`).get(req.user.id);
  if (!settings) {
    db.prepare(
      `INSERT INTO settings (user_id, personality, response_length, theme, memory_enabled) VALUES (?, 'balanced', 'medium', 'dark', 1)`
    ).run(req.user.id);
    settings = db.prepare(`SELECT * FROM settings WHERE user_id = ?`).get(req.user.id);
  }
  res.json({
    settings: {
      ...settings,
      memory_enabled: !!settings.memory_enabled,
    },
    account: { email: req.user.email, is_owner: req.user.is_owner },
  });
});

router.patch('/', (req, res) => {
  const current = db.prepare(`SELECT * FROM settings WHERE user_id = ?`).get(req.user.id);
  if (!current) return res.status(404).json({ error: 'Settings not found' });

  const personality = ['balanced', 'concise', 'creative', 'technical'].includes(req.body?.personality)
    ? req.body.personality
    : current.personality;
  const response_length = ['short', 'medium', 'long'].includes(req.body?.response_length)
    ? req.body.response_length
    : current.response_length;
  const theme = ['dark', 'light'].includes(req.body?.theme) ? req.body.theme : current.theme;
  const memory_enabled =
    req.body?.memory_enabled != null ? (req.body.memory_enabled ? 1 : 0) : current.memory_enabled;

  db.prepare(
    `UPDATE settings SET personality = ?, response_length = ?, theme = ?, memory_enabled = ? WHERE user_id = ?`
  ).run(personality, response_length, theme, memory_enabled, req.user.id);

  const settings = db.prepare(`SELECT * FROM settings WHERE user_id = ?`).get(req.user.id);
  res.json({
    settings: { ...settings, memory_enabled: !!settings.memory_enabled },
  });
});

export default router;
