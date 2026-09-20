# VOID AI

**Tell it what you need. Let it handle the rest.**

A complete AI workspace: streaming chat, auth, projects, files, memory, settings, and an extensible tools registry. Replaces Void Clips.

## Stack

- Frontend: Vite + React 18 + TypeScript
- Backend: Express (Node 20)
- DB: better-sqlite3 (Users, Conversations, Messages, Projects, Files, Memories, Settings)
- AI: OpenAI-compatible chat completions with SSE streaming
- Single process: Express serves `/api/*` and the Vite `dist/` build

## Quick start

```bash
cp .env.example .env
# Set OPENAI_API_KEY or GROQ_API_KEY

npm install
npm run build
npm start
```

Dev (API on :8787, Vite on :5173 with proxy):

```bash
npm install
npm run dev
```

Open http://localhost:5173 (dev) or http://localhost:8787 (production build).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | one of keys | OpenAI (or compatible) API key |
| `GROQ_API_KEY` | one of keys | Groq API key (used if OpenAI key unset) |
| `OPENAI_BASE_URL` | no | Override API base (default OpenAI or Groq) |
| `OPENAI_MODEL` | no | Model id. OpenAI default `gpt-4o-mini`. Groq default `qwen/qwen3.6-27b` (on 404 retries `openai/gpt-oss-20b`, `qwen/qwen3.6-27b`, `openai/gpt-oss-120b`) |
| `PUBLIC_BASE` | no | Public https URL — enables `Secure` cookies when set to `https://…` |
| `PORT` | no | Default `8787` |
| `HOST` | no | Default `0.0.0.0` |
| `DATA_DIR` | no | SQLite directory (default `./data`) |
| `OWNER_EMAIL` | no | Email that gets `is_owner` on signup (default `yuel.zeru2000@gmail.com`) |
| `NODE_ENV` | no | Set `production` on deploy |

## Railway / Docker

```bash
npm run build && node server/index.js
```

Dockerfile builds the Vite app then starts Express. Set `OPENAI_API_KEY` or `GROQ_API_KEY` in the Railway dashboard. Groq default is `qwen/qwen3.6-27b` (no `OPENAI_MODEL` required); gpt-oss streams are parsed from `delta.reasoning`/`content` with a non-stream fallback if empty. Persist `/app/data` and `/app/uploads` with a volume if you need durable storage.

## API (auth via httpOnly cookie or `Authorization: Bearer`)

- `GET /api/health`
- `POST /api/auth/signup` · `POST /api/auth/login` · `POST /api/auth/logout` · `GET /api/auth/me`
- Conversations, chat stream, projects, files, memories, settings under `/api/*`

Bearer tokens from login/signup responses are accepted as a fallback when cookies are blocked.

## Legacy

Previous Void Clips UI is archived under `archive/void-clips-legacy/`.
