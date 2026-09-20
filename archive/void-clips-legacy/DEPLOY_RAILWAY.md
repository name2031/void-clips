# Deploy VOID Clips on Railway

## Auth (required once on this box)

Railway CLI is installed but **not logged in**. Complete either:

1. Open: https://railway.com/activate?user_code=JMNH-JDNJ  
   (code may expire — if so, run `railway login --browserless` again)
2. Or in a terminal with PATH including the CLI:
   `export PATH="/home/box/.local/lib/node_modules/@railway/cli/bin:$PATH"`
   `railway login`  (browser) or `railway login --browserless`

## After login

```bash
cd /workspace/void-clips
export PATH="/home/box/.local/lib/node_modules/@railway/cli/bin:$PATH"
railway init          # or: railway link
railway up            # deploy
railway domain        # generate HTTPS domain
```

Set env vars (from `server/.env`, do **not** commit):

```bash
railway variables set \
  PUBLIC_MODE=1 \
  HOST=0.0.0.0 \
  VOID_API_SECRET='…' \
  RESEND_API_KEY='…' \
  FROM_EMAIL='…' \
  SWISH_NUMBER='…' \
  OWNER_EMAIL='…'

# After you have the Railway HTTPS URL:
railway variables set PUBLIC_BASE=https://YOUR_SERVICE.up.railway.app
```

Start command: `node server/index.js` (see `railway.json` / root `package.json` `npm start`).

Verify: `https://YOUR_DOMAIN/api/health` → `"launch":"public"`, `resendConfigured:true`, `swishEnabled:true`.
