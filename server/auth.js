import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from './db.js';

const OWNER_EMAIL = (process.env.OWNER_EMAIL || 'yuel.zeru2000@gmail.com').toLowerCase();
const SESSION_DAYS = 30;

export function hashPassword(password) {
  return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export function createUser(email, password) {
  const normalized = email.trim().toLowerCase();
  const id = uuidv4();
  const now = new Date().toISOString();
  const isOwner = normalized === OWNER_EMAIL ? 1 : 0;
  const password_hash = hashPassword(password);
  db.prepare(
    `INSERT INTO users (id, email, password_hash, is_owner, created_at) VALUES (?, ?, ?, ?, ?)`
  ).run(id, normalized, password_hash, isOwner, now);
  db.prepare(
    `INSERT INTO settings (user_id, personality, response_length, theme, memory_enabled) VALUES (?, 'balanced', 'medium', 'dark', 1)`
  ).run(id);
  return { id, email: normalized, is_owner: !!isOwner };
}

export function findUserByEmail(email) {
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email.trim().toLowerCase());
}

export function findUserById(id) {
  const row = db.prepare(`SELECT id, email, is_owner, created_at FROM users WHERE id = ?`).get(id);
  if (!row) return null;
  return { ...row, is_owner: !!row.is_owner };
}

export function createSession(userId) {
  const token = uuidv4() + uuidv4().replace(/-/g, '');
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  db.prepare(
    `INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)`
  ).run(token, userId, now.toISOString(), expires.toISOString());
  return { token, expiresAt: expires.toISOString() };
}

export function destroySession(token) {
  if (token) db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
}

export function getSessionUser(token) {
  if (!token) return null;
  const row = db
    .prepare(
      `SELECT s.token, s.expires_at, u.id, u.email, u.is_owner
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ?`
    )
    .get(token);
  if (!row) return null;
  if (new Date(row.expires_at) < new Date()) {
    destroySession(token);
    return null;
  }
  return { id: row.id, email: row.email, is_owner: !!row.is_owner };
}

export function extractToken(req) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
  if (req.cookies?.void_session) return req.cookies.void_session;
  return null;
}

export function requireAuth(req, res, next) {
  const user = getSessionUser(extractToken(req));
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
}
