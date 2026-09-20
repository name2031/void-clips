# VOID Clips

**Long videos in. Viral clips out.**

> ✅ **Public launch enabled** — deploy with Railway (`npm start` / `node server/index.js`).  
> No public deploy, no domain registration, no hosting, no “soft public” share.  
> Local only until explicit go-ahead.

Premium product shell for creator **Yuel** (TikTok [@V_O_I_.D](https://www.tiktok.com/@V_O_I_.D)).

Black + violet neon · Space Grotesk · **optional local verify server (Resend)** · accounts in browser.

---

## How to run (local only)

### A) Static only (demo verify fallback)

```bash
cd void-clips
python3 -m http.server 8080
```

Open `http://localhost:8080`. Email verify falls back to a **demo code modal** with warning: *Not secure — start server for real Gmail*. Prefer `?demo=1` explicitly or keep the local flag.

### B) Local server + real Gmail codes (Resend)

```bash
cd void-clips/server
npm install
# Configure server/.env (never commit real keys):
#   VOID_API_SECRET=…     # from LOCAL_API_KEY.txt if present
#   RESEND_API_KEY=…      # from Resend dashboard
#   FROM_EMAIL=onboarding@resend.dev   # Resend test sender
node index.js
```

Visit `http://127.0.0.1:8787` (default port). On the school PC, use **Start VOID Clips.bat** (OneDrive Skrivbordet) which launches portable Node against this folder.  
`POST /api/send-verify` emails a 6-digit code via Resend when `RESEND_API_KEY` is set. Without it, the API returns **503** and the app can fall back to demo mode.

> 🔐 **Rotate any API key that was pasted in chat before any future deploy.**  
> Do not print secrets in logs or commit `.env`.

| File | Purpose |
|------|---------|
| `index.html` | Landing |
| `app.html` / `app.js` | Auth, verify, Swish + Stripe Pro checkout, Owner Panel, Resonance |
| `server/` | Express verify API + Swish pending + Stripe + static host |
| `terms.html` / `privacy.html` | Stubs |
| `DESCRIPTIONS.md` | Marketing copy |

---

## Auth (harder)

- Sign up / sign in: **email + strong password** (min **10**, upper + lower + number)
- Passwords: **salted SHA-256** (Web Crypto) — never plaintext
- After password: **must verify** with 6-digit code before any app use
- Rate limits: max **5** failed passwords → **60s** lockout; max **5** code tries (verify + reset)
- Session: **sessionStorage** by default; check **Remember this device** → **localStorage** (longer session)
- **Sign out** (nav + Settings) clears session
- Prefer `/api/send-verify` → real email; demo modal only as fallback (warning shown)
- Settings: **Change password**, **Reset my local session** (stuck states)

### Forgot password

1. On **Sign in**, tap **Forgot password?**
2. Enter email → **Send reset code** (same `/api/send-verify` as verify; if API unavailable, demo modal shows the code with the “Not secure” warning)
3. Enter the **6-digit code** + **new password** + confirm → **Save & sign in**
4. App stores a new salted hash, marks the account **verified**, and opens a session

If you see “No account… Create account first”, switch to **Create account** (owner email can also bootstrap via Forgot password when the local account is missing/corrupt).

**OWNER_EMAIL:** `yuel.zeru2000@gmail.com` (after verify)  
Local demo only: no plaintext owner password is hardcoded — use Create account or Forgot password to set one.

---

## Owner Panel (owner only)

1. Maintenance / update mode toggle  
2. **Swish pending** — list buyers who tapped “I've paid”; **Confirm → grant Pro** or **Reject** (check Swish app first)  
3. **Gift / redeem codes** — create (random or custom), duration 7d / 30d / 90d / 1y / custom days, max redemptions, list + revoke  
4. Grant **unlimited** or **add credits** to an email  
5. View waitlist / clear users (local)  
6. Stats placeholders (signups, gens, …) from localStorage  

---

## Checkout / Pro (real money)

**Prices (EUR):**
- Normal: **€9.99/mo** · **€79/yr** (~2 months free)
- Launch promo (first 30 days after public / `LAUNCH_PROMO_UNTIL`): **€4.99/mo** · **€39/yr**
- UI shows strikethrough of €9.99 + “Cheaper than before / launch price” + “Back to normal price after 1 month”

**Swish (primary for Sweden — manual, no Företag API):**
1. Set `SWISH_NUMBER=+46765875459` in `server/.env` (display: `076-587 54 59` / `+46 76-587 54 59`)
2. Buyer taps **Pay with Swish** → gets amount + number + unique ref e.g. `VOID-AB12`
3. Buyer sends Swish with that ref in the message → taps **I've paid** (stores pending; does **not** auto-grant Pro)
4. Yuel checks Swish app → Owner Panel → **Confirm → grant Pro** (or Reject)
5. Pending stored in `server/.data/swish-pending.json`

**Stripe (optional second path — cards):**
1. Create account at [stripe.com](https://stripe.com) and add bank/card for **payouts**
2. Put in `server/.env`:
   - `STRIPE_SECRET_KEY=sk_test_…` (or `sk_live_…` only when public)
   - `STRIPE_WEBHOOK_SECRET=whsec_…` (for public webhook; local uses claim-on-return)
   - Optional: `LAUNCH_PROMO_UNTIL=2026-11-01T00:00:00+01:00`
3. Restart server. Health shows `stripeConfigured: true`
4. In-app **Pay with card** opens Checkout Session → money to Stripe → bank
5. Pro granted only after Stripe confirms (`/api/claim-checkout` or webhook)

Without Stripe key, Swish still works; card button stays hidden. **Gift / owner codes** still unlock Pro.

- Free users: **10** gens · Resonance kept · void aesthetic
- Entitlements: localStorage + server `.data/pro-grants.json` after confirmed Swish or paid Stripe

> Keep secrets in platform env (never commit `.env`). Rotate anything pasted in chat.

---

## Launch checklist (ONLY when Yuel says go)

1. Rotate all leaked/pasted API keys  
2. `noindex` removed — indexing allowed  
3. Real domain / hosting only if asked  
4. Real AI pipeline before claiming AI  
5. Real payments when ready  

Until then: **local only. No public deploy.**

Zip: `/workspace/void-clips.zip`

© 2026 VOID Clips · Yuel (@V_O_I_.D)
