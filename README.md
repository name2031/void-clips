# VOID Clips

**Long videos in. Viral clips out.**

> ✅ **Public on Railway** — https://void-clips-production.up.railway.app  
> Repo: https://github.com/name2031/void-clips (deploys `main` → Railway)

Premium product shell for creator **Yuel** (TikTok [@V_O_I_.D](https://www.tiktok.com/@V_O_I_.D)).

Black + violet neon · Space Grotesk · Resend Gmail verify · Swish + Stripe Pro · accounts in browser.

---

## How to run (local)

### A) Static only (demo verify fallback)

```bash
cd void-clips
python3 -m http.server 8080
```

Open `http://localhost:8080`. Email verify falls back to a **demo code modal** with warning: *Not secure — start server for real Gmail*.

### B) Local server + real Gmail codes (Resend)

```bash
cd void-clips
npm install
# Configure server/.env (never commit real keys):
#   VOID_API_SECRET=…
#   RESEND_API_KEY=…
#   FROM_EMAIL=onboarding@resend.dev
#   SWISH_NUMBER=+46765875459
#   STRIPE_SECRET_KEY=sk_…          # cards
#   STRIPE_WEBHOOK_SECRET=whsec_…
npm start
```

Visit `http://127.0.0.1:8787`.

> 🔐 **Never commit `.env`, `LOCAL_API_KEY.txt`, or `sk_` / `whsec_` / `re_` keys.**  
> Rotate any key that was pasted in chat.

| File | Purpose |
|------|---------|
| `index.html` | Landing |
| `app.html` / `app.js` | Auth, verify, Swish + Stripe Pro, Owner Panel, Resonance |
| `server/` | Express API + Stripe + Swish pending + static host |
| `terms.html` / `privacy.html` | Terms & privacy |
| `DESCRIPTIONS.md` | Marketing copy |

---

## Auth

- Sign up / sign in: **email + strong password** (min **10**, upper + lower + number)
- Passwords: **salted SHA-256** (Web Crypto) — never plaintext
- After password: **must verify** with 6-digit code before any app use
- Rate limits: max **5** failed passwords → **60s** lockout; max **5** code tries
- Session: **sessionStorage** by default; **Remember this device** → **localStorage**
- Prefer `/api/send-verify` → real email; demo modal only as fallback

**OWNER_EMAIL:** `yuel.zeru2000@gmail.com` (after verify)

---

## Checkout / Pro (EUR)

| | Monthly | Yearly |
|--|---------|--------|
| Normal | **€9.99** | **€79** |
| Launch promo (first ~30 days / `LAUNCH_PROMO_UNTIL`) | **€4.99** | **€39** |

**Both payment paths are live in production when configured:**

1. **Card (Stripe)** — in-app **Pay with card** → Stripe Checkout → Pro after confirm / webhook  
2. **Swish** — send to **+46 76-587 54 59** (`076-587 54 59`) with unique `VOID-XXXX` ref → **I've paid** → owner confirms in Owner Panel  

Gift / owner codes still unlock Pro. Without `STRIPE_SECRET_KEY`, the card button stays hidden; Swish still works.

---

## Owner Panel (owner only)

1. Maintenance / update mode  
2. **Swish pending** — Confirm → grant Pro / Reject  
3. Gift / redeem codes  
4. **Grant / Revoke Pro** (server entitlement store; local fallback if API down)  
5. Force credits / waitlist / local stats  

---

## Owner API

Auth (same as other `/api/owner/*` routes):

- Header `X-Void-Api-Secret: <VOID_API_SECRET>` (or `Authorization: Bearer …`)
- Header `X-Owner-Email: yuel.zeru2000@gmail.com` (must match `OWNER_EMAIL`)

| Method | Path | Body / query | Notes |
|--------|------|--------------|-------|
| `POST` | `/api/owner/grant-pro` | `{ "email", "days" }` | `days` integer **1–3650**. Persists Pro in the same grants store as Stripe/Swish. Returns `{ ok, email, pro, proUntil, plan, source: "owner-grant" }`. |
| `POST` | `/api/owner/revoke-pro` | `{ "email" }` | Clears Pro for that email. Returns `{ ok, email, pro: false }`. |
| `GET` | `/api/owner/entitlement?email=` | query | Current Pro status (`pro`, `proUntil`, `plan`, `source`). Alias: `/api/owner/lookup`. |

Example:

```bash
curl -X POST https://YOUR_HOST/api/owner/grant-pro \
  -H "Content-Type: application/json" \
  -H "X-Void-Api-Secret: YOUR_VOID_API_SECRET" \
  -H "X-Owner-Email: yuel.zeru2000@gmail.com" \
  -d '{"email":"user@example.com","days":30}'
```

---

## Deploy (GitHub → Railway)

Push to `main` on https://github.com/name2031/void-clips. Railway rebuilds from GitHub.

Required platform env (never in git): `VOID_API_SECRET`, `RESEND_API_KEY`, `FROM_EMAIL`, `SWISH_NUMBER`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, optional `LAUNCH_PROMO_UNTIL`, `PUBLIC_BASE`.

Support: **yuel.zeru2000@gmail.com** · subject `VOID Clips Support` / `VOID Clips Bug`.

© 2026 VOID Clips · Yuel (@V_O_I_.D)
