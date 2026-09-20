import { Router } from 'express';
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  createSession,
  destroySession,
  extractToken,
  requireAuth,
  findUserById,
} from '../auth.js';

const router = Router();

function setSessionCookie(res, token, expiresAt) {
  res.cookie('void_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(expiresAt),
    path: '/',
  });
}

router.post('/signup', (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (findUserByEmail(email)) return res.status(409).json({ error: 'Email already registered' });
    const user = createUser(email, password);
    const session = createSession(user.id);
    setSessionCookie(res, session.token, session.expiresAt);
    res.json({ user, token: session.token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const row = findUserByEmail(email);
    if (!row || !verifyPassword(password, row.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const session = createSession(row.id);
    setSessionCookie(res, session.token, session.expiresAt);
    res.json({
      user: { id: row.id, email: row.email, is_owner: !!row.is_owner },
      token: session.token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  destroySession(extractToken(req));
  res.clearCookie('void_session', { path: '/' });
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  const user = findUserById(req.user.id);
  res.json({ user });
});

export default router;
