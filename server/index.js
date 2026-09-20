import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import './db.js';
import authRoutes from './routes/auth.js';
import conversationRoutes from './routes/conversations.js';
import chatRoutes from './routes/chat.js';
import projectRoutes from './routes/projects.js';
import fileRoutes from './routes/files.js';
import memoryRoutes from './routes/memories.js';
import settingsRoutes from './routes/settings.js';
import { getAiConfig } from './ai.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const uploadsDir = path.join(root, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(path.join(root, 'data'), { recursive: true });

const app = express();
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';

app.set('trust proxy', 1);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  const ai = getAiConfig();
  res.json({
    ok: true,
    name: 'VOID AI',
    version: '1.0.0',
    ai: ai ? { provider: ai.provider, model: ai.model } : null,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/settings', settingsRoutes);

if (fs.existsSync(dist)) {
  app.use(
    express.static(dist, {
      index: false,
      maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    })
  );
  // SPA fallback for client routes (not /api/*)
  app.get('*', (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path.startsWith('/api')) return next();
    if (req.path.startsWith('/uploads')) return next();
    const indexHtml = path.join(dist, 'index.html');
    if (!fs.existsSync(indexHtml)) return next();
    res.sendFile(indexHtml);
  });
} else {
  app.get('/', (_req, res) => {
    res.type('html').send(`<!doctype html><html><body style="background:#050508;color:#e8e8ed;font-family:system-ui;padding:2rem">
      <h1>VOID AI</h1>
      <p>Frontend not built yet. Run <code>npm run build</code> or <code>npm run dev</code>.</p>
      <p><a href="/api/health" style="color:#8b9cff">/api/health</a></p>
    </body></html>`);
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, HOST, () => {
  console.log(`VOID AI listening on http://${HOST}:${PORT}`);
  console.log(`AI: ${getAiConfig() ? 'configured' : 'NO API KEY (set OPENAI_API_KEY or GROQ_API_KEY)'}`);
});
