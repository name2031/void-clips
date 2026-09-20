/**
 * VOID Clips — verify API + static site (public-ready)
 *
 * Env (server/.env, root .env, or platform env):
 *   VOID_API_SECRET=void_…   (required for /api/*)
 *   RESEND_API_KEY=re_…      (required to send email; else 503)
 *   RESEND_FROM / FROM_EMAIL  (optional)
 *   PORT=8787                (optional; platforms set PORT)
 *   PUBLIC_BASE=https://…    (canonical public origin, no trailing slash)
 *   PUBLIC_MODE=1            (or auto when PUBLIC_BASE is https)
 *   HOST=0.0.0.0             (default; bind all interfaces for deploy)
 *   STRIPE_SECRET_KEY=sk_…   (optional Stripe Checkout)
 *   STRIPE_WEBHOOK_SECRET=whsec_…
 *   LAUNCH_PROMO_UNTIL=ISO
 *   SWISH_NUMBER=+46765875459
 *   OWNER_EMAIL=yuel.zeru2000@gmail.com
 *
 * Usage:
 *   npm start                 # from repo root
 *   node server/index.js
 *
 * Auth: X-Void-Api-Secret required for /api/* except health/pricing/webhook.
 * Localhost may omit the header (same-origin convenience). Public hosts must
 * send the secret; HTML pages served by this process inject
 * window.__VOID_API_SECRET__ (never baked into static zip/files on disk).
 */

"use strict";

var crypto = require("crypto");
var fs = require("fs");
var path = require("path");
var express = require("express");
var cors = require("cors");

loadDotEnv(path.join(__dirname, ".env"));
loadDotEnv(path.join(__dirname, "..", ".env"));

var PORT = Number(process.env.PORT) || 8787;
var HOST = String(process.env.HOST || "0.0.0.0").trim() || "0.0.0.0";
var VOID_API_SECRET = String(process.env.VOID_API_SECRET || "").trim();
var RESEND_API_KEY = String(process.env.RESEND_API_KEY || "").trim();
var FROM_EMAIL = process.env.FROM_EMAIL || process.env.RESEND_FROM || "onboarding@resend.dev";
var CODE_TTL_MS = 15 * 60 * 1000;
var MAX_CODE_TRIES = 5;
var DATA_DIR = path.join(__dirname, ".data");
var STORE_FILE = path.join(DATA_DIR, "verify-codes.json");
var GRANTS_FILE = path.join(DATA_DIR, "pro-grants.json");
var ROOT = path.join(__dirname, "..");

var STRIPE_SECRET_KEY = String(process.env.STRIPE_SECRET_KEY || "").trim();
var STRIPE_WEBHOOK_SECRET = String(process.env.STRIPE_WEBHOOK_SECRET || "").trim();
var PUBLIC_BASE = String(process.env.PUBLIC_BASE || ("http://127.0.0.1:" + PORT)).replace(/\/$/, "");
var PUBLIC_MODE =
  process.env.PUBLIC_MODE === "1" || /^https:\/\//i.test(PUBLIC_BASE);
var OWNER_EMAIL = String(process.env.OWNER_EMAIL || "yuel.zeru2000@gmail.com").trim().toLowerCase();
var SWISH_NUMBER_RAW = String(process.env.SWISH_NUMBER || "+46765875459").trim();
var SWISH_PENDING_FILE = path.join(DATA_DIR, "swish-pending.json");
var SITE_CONFIG_FILE = path.join(DATA_DIR, "site-config.json");

/* Normal EUR prices (cents). Launch promo cheaper for first 30 days. */
var PRICE_NORMAL = { monthly: 999, yearly: 7900, currency: "eur" };
var PRICE_LAUNCH = { monthly: 499, yearly: 3900, currency: "eur" };
var PLAN_DAYS = { monthly: 30, yearly: 365 };

function resolvePromoEndsAt() {
  var raw = String(process.env.LAUNCH_PROMO_UNTIL || "").trim();
  if (raw) {
    var t = Date.parse(raw);
    if (!isNaN(t)) return t;
  }
  var stampFile = path.join(DATA_DIR, "promo-ends-at.txt");
  try {
    if (fs.existsSync(stampFile)) {
      var n = Number(String(fs.readFileSync(stampFile, "utf8")).trim());
      if (n > 0) return n;
    }
  } catch (e) {}
  var def = Date.now() + 30 * 24 * 60 * 60 * 1000;
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(stampFile, String(def));
  } catch (e2) {}
  return def;
}
var PROMO_ENDS_AT = resolvePromoEndsAt();

function isLaunchPromoActive() {
  return Date.now() < PROMO_ENDS_AT;
}

function activePrices() {
  return isLaunchPromoActive() ? PRICE_LAUNCH : PRICE_NORMAL;
}

/** @type {Map<string, { hash: string, salt: string, expiresAt: number, tries: number }>} */
var store = new Map();

/** @type {Record<string, { email: string, plan: string, proUntil: number, sessionId: string, amount: number, currency: string, source: string, updatedAt: number }>} */
var grants = {};

function loadDotEnv(filePath) {
  try {
    if (!fs.existsSync(filePath)) return;
    var lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
    lines.forEach(function (line) {
      line = line.trim();
      if (!line || line.charAt(0) === "#") return;
      var eq = line.indexOf("=");
      if (eq <= 0) return;
      var key = line.slice(0, eq).trim();
      var val = line.slice(eq + 1).trim();
      if (
        (val.charAt(0) === '"' && val.charAt(val.length - 1) === '"') ||
        (val.charAt(0) === "'" && val.charAt(val.length - 1) === "'")
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    });
  } catch (e) {
    /* ignore */
  }
}

function normalizeEmail(v) {
  return String(v || "").trim().toLowerCase();
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function sha256Hex(str) {
  return crypto.createHash("sha256").update(String(str), "utf8").digest("hex");
}

function randomSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function generateSixDigitCode() {
  var n = crypto.randomInt(0, 1000000);
  return ("000000" + n).slice(-6);
}

function loadStore() {
  try {
    if (!fs.existsSync(STORE_FILE)) return;
    var raw = fs.readFileSync(STORE_FILE, "utf8");
    var obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object") return;
    Object.keys(obj).forEach(function (k) {
      store.set(k, obj[k]);
    });
  } catch (e) {
    console.warn("[void-clips] could not load verify store:", e.message);
  }
}

function persistStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    var obj = {};
    store.forEach(function (v, k) {
      obj[k] = v;
    });
    fs.writeFileSync(STORE_FILE, JSON.stringify(obj, null, 2));
  } catch (e) {
    console.warn("[void-clips] could not persist verify store:", e.message);
  }
}


function loadGrants() {
  try {
    if (!fs.existsSync(GRANTS_FILE)) return;
    var raw = fs.readFileSync(GRANTS_FILE, "utf8");
    var obj = JSON.parse(raw);
    if (obj && typeof obj === "object") grants = obj;
  } catch (e) {
    console.warn("[void-clips] could not load pro grants:", e.message);
  }
}

function persistGrants() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(GRANTS_FILE, JSON.stringify(grants, null, 2));
  } catch (e) {
    console.warn("[void-clips] could not persist pro grants:", e.message);
  }
}

function grantPro(email, plan, sessionId, amount, currency, source) {
  email = normalizeEmail(email);
  plan = plan === "yearly" ? "yearly" : "monthly";
  var days = PLAN_DAYS[plan] || 30;
  var prev = grants[email];
  var base = prev && prev.proUntil && prev.proUntil > Date.now() ? prev.proUntil : Date.now();
  var until = base + days * 24 * 60 * 60 * 1000;
  grants[email] = {
    email: email,
    plan: plan,
    proUntil: until,
    sessionId: sessionId || "",
    amount: amount || 0,
    currency: currency || "eur",
    source: source || "stripe",
    updatedAt: Date.now(),
  };
  persistGrants();
  return grants[email];
}

function grantProDays(email, days, source) {
  email = normalizeEmail(email);
  days = Math.max(1, Math.min(3650, Math.floor(Number(days) || 30)));
  var prev = grants[email];
  var base = prev && prev.proUntil && prev.proUntil > Date.now() ? prev.proUntil : Date.now();
  var until = base + days * 24 * 60 * 60 * 1000;
  grants[email] = {
    email: email,
    plan: days >= 365 ? "yearly" : "monthly",
    proUntil: until,
    sessionId: "",
    amount: 0,
    currency: "eur",
    source: source || "owner-grant",
    updatedAt: Date.now(),
  };
  persistGrants();
  return grants[email];
}

function revokePro(email) {
  email = normalizeEmail(email);
  if (!grants[email]) return null;
  delete grants[email];
  persistGrants();
  return true;
}

/* —— Site config (announce / flags / maintenance) —— */
var siteConfig = {
  maintenance: false,
  announce: "",
  flags: { batch: true, labs: true, signups: true },
};

function loadSiteConfig() {
  try {
    if (!fs.existsSync(SITE_CONFIG_FILE)) return;
    var raw = fs.readFileSync(SITE_CONFIG_FILE, "utf8");
    var obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object") return;
    if (typeof obj.maintenance === "boolean") siteConfig.maintenance = obj.maintenance;
    if (typeof obj.announce === "string") siteConfig.announce = obj.announce.slice(0, 280);
    if (obj.flags && typeof obj.flags === "object") {
      siteConfig.flags = {
        batch: obj.flags.batch !== false,
        labs: obj.flags.labs !== false,
        signups: obj.flags.signups !== false,
      };
    }
  } catch (e) {
    console.warn("[void-clips] could not load site config:", e.message);
  }
}

function persistSiteConfig() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(SITE_CONFIG_FILE, JSON.stringify(siteConfig, null, 2));
  } catch (e) {
    console.warn("[void-clips] could not persist site config:", e.message);
  }
}

function publicSiteConfig() {
  return {
    ok: true,
    maintenance: !!siteConfig.maintenance,
    announce: String(siteConfig.announce || ""),
    flags: {
      batch: siteConfig.flags.batch !== false,
      labs: siteConfig.flags.labs !== false,
      signups: siteConfig.flags.signups !== false,
    },
  };
}

/* —— Manual Swish (no Företag API) —— */
function normalizeSwishDigits(raw) {
  var d = String(raw || "").replace(/\D/g, "");
  if (d.indexOf("46") === 0 && d.length >= 11) d = "0" + d.slice(2);
  return d;
}

function formatSwishDisplay(raw) {
  var d = normalizeSwishDigits(raw);
  if (d.length === 10 && d.charAt(0) === "0") {
    return d.slice(0, 3) + "-" + d.slice(3, 6) + " " + d.slice(6, 8) + " " + d.slice(8, 10);
  }
  return d || String(raw || "");
}

function formatSwishIntl(raw) {
  var d = normalizeSwishDigits(raw);
  if (d.charAt(0) === "0") d = "46" + d.slice(1);
  if (d.indexOf("46") === 0 && d.length === 11) {
    return "+46 " + d.slice(2, 4) + "-" + d.slice(4, 7) + " " + d.slice(7, 9) + " " + d.slice(9, 11);
  }
  return d ? "+" + d : String(raw || "");
}

function swishNumberE164() {
  var d = String(SWISH_NUMBER_RAW || "").replace(/\D/g, "");
  if (d.charAt(0) === "0") d = "46" + d.slice(1);
  return "+" + d;
}

/** @type {Record<string, { ref: string, email: string, plan: string, amountEur: number, amountCents: number, status: string, createdAt: number, claimedAt?: number, confirmedAt?: number, rejectedAt?: number }>} */
var swishPending = {};

function loadSwishPending() {
  try {
    if (!fs.existsSync(SWISH_PENDING_FILE)) return;
    var raw = fs.readFileSync(SWISH_PENDING_FILE, "utf8");
    var obj = JSON.parse(raw);
    if (obj && typeof obj === "object") swishPending = obj;
  } catch (e) {
    console.warn("[void-clips] could not load swish pending:", e.message);
  }
}

function persistSwishPending() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(SWISH_PENDING_FILE, JSON.stringify(swishPending, null, 2));
  } catch (e) {
    console.warn("[void-clips] could not persist swish pending:", e.message);
  }
}

function generateSwishRef() {
  var alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  for (var attempt = 0; attempt < 40; attempt++) {
    var suf = "";
    for (var i = 0; i < 4; i++) {
      suf += alphabet.charAt(crypto.randomInt(0, alphabet.length));
    }
    var ref = "VOID-" + suf;
    if (!swishPending[ref]) return ref;
  }
  return "VOID-" + crypto.randomBytes(3).toString("hex").toUpperCase().slice(0, 4);
}

function swishInstructions() {
  return {
    sv: [
      "1. Öppna Swish",
      "2. Skicka beloppet till numret",
      "3. Klistra in referensen i meddelandet",
      "4. Tryck Jag har betalat",
    ],
    en: [
      "1. Open Swish",
      "2. Send the amount to the number",
      "3. Paste the reference in the message",
      "4. Tap I've paid",
    ],
  };
}

function requireOwner(req, res, next) {
  if (!VOID_API_SECRET) {
    return res.status(503).json({
      ok: false,
      error: "Set VOID_API_SECRET in server/.env",
    });
  }
  var hdr =
    req.get("x-void-api-secret") ||
    req.get("X-Void-Api-Secret") ||
    "";
  var auth = req.get("authorization") || "";
  if (auth.toLowerCase().indexOf("bearer ") === 0) {
    hdr = auth.slice(7).trim();
  }
  var secretOk = hdr && timingSafeEqualStr(hdr, VOID_API_SECRET);
  if (!secretOk && !isLocalBrowser(req)) {
    return res.status(401).json({ ok: false, error: "Invalid or missing API secret" });
  }
  var ownerHdr = normalizeEmail(
    req.get("x-owner-email") || req.get("X-Owner-Email") || ""
  );
  if (!ownerHdr || ownerHdr !== OWNER_EMAIL) {
    return res.status(403).json({
      ok: false,
      error: "Owner only — send X-Owner-Email matching OWNER_EMAIL",
    });
  }
  return next();
}

function formEncode(obj) {
  var parts = [];
  Object.keys(obj).forEach(function (k) {
    var v = obj[k];
    if (v === undefined || v === null) return;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(v)));
  });
  return parts.join("&");
}

async function stripeForm(pathName, params) {
  if (!STRIPE_SECRET_KEY) {
    var err = new Error("STRIPE_SECRET_KEY not set");
    err.status = 503;
    throw err;
  }
  var res = await fetch("https://api.stripe.com/v1" + pathName, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + STRIPE_SECRET_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formEncode(params),
  });
  var body = await res.json().catch(function () {
    return {};
  });
  if (!res.ok) {
    var msg = (body && body.error && body.error.message) || ("Stripe " + res.status);
    var e = new Error(msg);
    e.status = 502;
    e.body = body;
    throw e;
  }
  return body;
}

async function stripeGet(pathName) {
  if (!STRIPE_SECRET_KEY) {
    var err = new Error("STRIPE_SECRET_KEY not set");
    err.status = 503;
    throw err;
  }
  var res = await fetch("https://api.stripe.com/v1" + pathName, {
    headers: { Authorization: "Bearer " + STRIPE_SECRET_KEY },
  });
  var body = await res.json().catch(function () {
    return {};
  });
  if (!res.ok) {
    var msg = (body && body.error && body.error.message) || ("Stripe " + res.status);
    var e = new Error(msg);
    e.status = 502;
    throw e;
  }
  return body;
}

function verifyStripeWebhook(rawBody, sigHeader) {
  if (!STRIPE_WEBHOOK_SECRET) return { ok: false, error: "STRIPE_WEBHOOK_SECRET not set" };
  var parts = String(sigHeader || "").split(",").map(function (p) {
    return p.trim();
  });
  var t = "";
  var v1s = [];
  parts.forEach(function (p) {
    var kv = p.split("=");
    if (kv[0] === "t") t = kv[1];
    if (kv[0] === "v1") v1s.push(kv[1]);
  });
  if (!t || !v1s.length) return { ok: false, error: "Invalid Stripe-Signature" };
  var age = Math.abs(Date.now() / 1000 - Number(t));
  if (age > 300) return { ok: false, error: "Stripe signature timestamp too old" };
  var signed = t + "." + rawBody;
  var expect = crypto.createHmac("sha256", STRIPE_WEBHOOK_SECRET).update(signed, "utf8").digest("hex");
  var match = v1s.some(function (v) {
    try {
      return timingSafeEqualStr(v, expect);
    } catch (e) {
      return false;
    }
  });
  if (!match) return { ok: false, error: "Stripe signature mismatch" };
  return { ok: true };
}

function pricingPayload() {
  var launch = isLaunchPromoActive();
  var live = activePrices();
  return {
    ok: true,
    currency: "eur",
    currencyLabel: "EUR",
    launchPromo: launch,
    promoEndsAt: PROMO_ENDS_AT,
    normal: { monthly: PRICE_NORMAL.monthly, yearly: PRICE_NORMAL.yearly },
    launch: { monthly: PRICE_LAUNCH.monthly, yearly: PRICE_LAUNCH.yearly },
    live: { monthly: live.monthly, yearly: live.yearly },
    display: {
      monthlyLive: (live.monthly / 100).toFixed(2),
      yearlyLive: (live.yearly / 100).toFixed(0),
      monthlyNormal: (PRICE_NORMAL.monthly / 100).toFixed(2),
      yearlyNormal: (PRICE_NORMAL.yearly / 100).toFixed(0),
      monthlyLaunch: (PRICE_LAUNCH.monthly / 100).toFixed(2),
      yearlyLaunch: (PRICE_LAUNCH.yearly / 100).toFixed(0),
    },
    stripeConfigured: !!STRIPE_SECRET_KEY,
    swishEnabled: true,
    swishNumber: swishNumberE164(),
    swishNumberDisplay: formatSwishDisplay(SWISH_NUMBER_RAW),
    swishNumberIntl: formatSwishIntl(SWISH_NUMBER_RAW),
    moneyNote: STRIPE_SECRET_KEY
      ? "Pay with card (Stripe Checkout) or Swish to the owner’s number with a unique VOID-XXXX ref. Owner confirms Swish before Pro unlocks."
      : "Pay with Swish (manual) to the owner’s number with a unique VOID-XXXX ref. Owner confirms before Pro unlocks. Card checkout when Stripe is configured.",
  };
}

function pruneExpired() {
  var now = Date.now();
  store.forEach(function (v, k) {
    if (!v || !v.expiresAt || now > v.expiresAt) store.delete(k);
  });
}

function timingSafeEqualStr(a, b) {
  var ba = Buffer.from(String(a || ""), "utf8");
  var bb = Buffer.from(String(b || ""), "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function isLocalBrowser(req) {
  var host = String(req.hostname || "").toLowerCase();
  if (host !== "127.0.0.1" && host !== "localhost") return false;
  var origin = String(req.get("origin") || "");
  var referer = String(req.get("referer") || "");
  var ok = function (u) {
    return (
      u.indexOf("http://127.0.0.1:" + PORT) === 0 ||
      u.indexOf("http://localhost:" + PORT) === 0
    );
  };
  if (origin && ok(origin)) return true;
  if (referer && ok(referer)) return true;
  /* same-origin fetch from pages we serve often sends neither — trust loopback host */
  if (!origin && !referer) return true;
  return false;
}

function requireApiSecret(req, res, next) {
  if (!VOID_API_SECRET) {
    return res.status(503).json({
      ok: false,
      error: "Set VOID_API_SECRET in server/.env (see LOCAL_API_KEY.txt)",
    });
  }
  var hdr =
    req.get("x-void-api-secret") ||
    req.get("X-Void-Api-Secret") ||
    "";
  var auth = req.get("authorization") || "";
  if (auth.toLowerCase().indexOf("bearer ") === 0) {
    hdr = auth.slice(7).trim();
  }
  if (hdr && timingSafeEqualStr(hdr, VOID_API_SECRET)) return next();
  if (isLocalBrowser(req)) return next();
  return res.status(401).json({ ok: false, error: "Invalid or missing API secret" });
}

function fromAddress() {
  var raw = String(FROM_EMAIL || "onboarding@resend.dev").trim();
  if (raw.indexOf("<") !== -1) return raw;
  return "VOID Clips <" + raw + ">";
}

function pfpAttachment() {
  try {
    var pfpPath = path.join(ROOT, "assets", "pfp.png");
    if (!fs.existsSync(pfpPath)) return null;
    return {
      filename: "void-clips-pfp.png",
      content: fs.readFileSync(pfpPath).toString("base64"),
      content_id: "void-clips-pfp",
    };
  } catch (e) {
    return null;
  }
}

async function sendViaResend(email, code) {
  var attach = pfpAttachment();
  var logoHtml = attach
    ? '<img src="cid:void-clips-pfp" width="72" height="72" alt="VOID Clips" style="display:block;border-radius:18px;margin:0 auto 16px;border:1px solid #2a2a32" />'
    : "";
  var payload = {
    from: fromAddress(),
    to: [email],
    subject: "Your VOID Clips verification code",
    text:
      "VOID Clips\n\nYour verification code is: " +
      code +
      "\n\nIt expires in 15 minutes.\n\nIf you did not request this, ignore this email.",
    html:
      '<div style="font-family:system-ui,sans-serif;background:#050506;color:#eaeaea;padding:28px;text-align:center">' +
      logoHtml +
      '<p style="color:#a78bfa;letter-spacing:.16em;text-transform:uppercase;font-size:12px;margin:0 0 8px">VOID Clips</p>' +
      '<h1 style="color:#fff;font-size:22px;margin:0 0 18px;font-weight:600">Verification code</h1>' +
      '<p style="font-size:34px;letter-spacing:.4em;font-weight:700;color:#c4b5fd;margin:0 0 18px">' +
      code +
      "</p>" +
      '<p style="color:#888;font-size:13px;margin:0">Expires in 15 minutes. If you did not request this, ignore this email.</p>' +
      "</div>",
  };
  if (attach) payload.attachments = [attach];
  var res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + RESEND_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    var body = await res.text().catch(function () {
      return "";
    });
    var err = new Error("Resend failed: " + res.status + " " + body.slice(0, 200));
    err.status = 502;
    throw err;
  }
  return res.json().catch(function () {
    return {};
  });
}

loadStore();
loadGrants();
loadSwishPending();
loadSiteConfig();

var app = express();
app.use(cors({ origin: true }));

/* Stripe webhook needs raw body — mount before JSON parser */
app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), function (req, res) {
  try {
    var raw = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body || "");
    if (STRIPE_WEBHOOK_SECRET) {
      var ver = verifyStripeWebhook(raw, req.get("stripe-signature"));
      if (!ver.ok) {
        console.warn("[stripe-webhook]", ver.error);
        return res.status(400).send(ver.error || "bad signature");
      }
    } else {
      console.warn("[stripe-webhook] STRIPE_WEBHOOK_SECRET unset — accepting unsigned (local only)");
    }
    var event = JSON.parse(raw || "{}");
    if (event.type === "checkout.session.completed") {
      var session = event.data && event.data.object;
      if (session && (session.payment_status === "paid" || session.status === "complete")) {
        var email = normalizeEmail(
          (session.metadata && session.metadata.email) ||
            session.client_reference_id ||
            session.customer_email ||
            ""
        );
        var plan = (session.metadata && session.metadata.plan) || "monthly";
        if (isEmail(email)) {
          grantPro(email, plan, session.id, session.amount_total || 0, session.currency || "eur");
          console.log("[stripe-webhook] granted Pro to", email, plan);
        }
      }
    }
    return res.json({ received: true });
  } catch (e) {
    console.error("[stripe-webhook]", e.message || e);
    return res.status(400).send("webhook error");
  }
});

app.use(express.json({ limit: "32kb" }));

app.get("/api/health", function (_req, res) {
  res.json({
    ok: true,
    service: "void-clips-verify",
    secretConfigured: !!VOID_API_SECRET,
    resendConfigured: !!RESEND_API_KEY,
    stripeConfigured: !!STRIPE_SECRET_KEY,
    swishEnabled: true,
    swishNumberDisplay: formatSwishDisplay(SWISH_NUMBER_RAW),
    launchPromo: isLaunchPromoActive(),
    promoEndsAt: PROMO_ENDS_AT,
    launch: PUBLIC_MODE ? "public" : "local",
    publicBase: PUBLIC_BASE,
    publicMode: PUBLIC_MODE,
  });
});

app.get("/api/pricing", function (_req, res) {
  res.json(pricingPayload());
});

app.get("/api/entitlement", requireApiSecret, function (req, res) {
  var email = normalizeEmail(req.query && req.query.email);
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: "Valid email required" });
  }
  var g = grants[email];
  if (!g || !g.proUntil || g.proUntil <= Date.now()) {
    return res.json({ ok: true, pro: false, email: email });
  }
  return res.json({
    ok: true,
    pro: true,
    email: email,
    proUntil: g.proUntil,
    plan: g.plan,
    source: g.source,
  });
});

app.post("/api/create-checkout", requireApiSecret, async function (req, res) {
  try {
    if (!STRIPE_SECRET_KEY) {
      return res.status(503).json({
        ok: false,
        error: "Payments not connected yet",
        hint: "Add STRIPE_SECRET_KEY to server/.env (Stripe Dashboard → Developers → API keys). Money goes to your Stripe → bank payouts.",
        stripeConfigured: false,
      });
    }
    var email = normalizeEmail(req.body && req.body.email);
    var plan = (req.body && req.body.plan) === "yearly" ? "yearly" : "monthly";
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    var prices = activePrices();
    var amount = plan === "yearly" ? prices.yearly : prices.monthly;
    var label =
      plan === "yearly"
        ? "VOID Clips Pro — 1 year" + (isLaunchPromoActive() ? " (launch)" : "")
        : "VOID Clips Pro — 1 month" + (isLaunchPromoActive() ? " (launch)" : "");
    var session = await stripeForm("/checkout/sessions", {
      mode: "payment",
      "line_items[0][price_data][currency]": prices.currency,
      "line_items[0][price_data][product_data][name]": label,
      "line_items[0][price_data][product_data][description]":
        "Unlimited gens + download unlock. Paid to VOID Clips owner Stripe.",
      "line_items[0][price_data][unit_amount]": String(amount),
      "line_items[0][quantity]": "1",
      success_url: PUBLIC_BASE + "/app.html?checkout=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: PUBLIC_BASE + "/app.html?checkout=cancel",
      client_reference_id: email,
      customer_email: email,
      "metadata[email]": email,
      "metadata[plan]": plan,
      "metadata[launchPromo]": isLaunchPromoActive() ? "1" : "0",
    });
    return res.json({
      ok: true,
      url: session.url,
      sessionId: session.id,
      amount: amount,
      currency: prices.currency,
      plan: plan,
      launchPromo: isLaunchPromoActive(),
    });
  } catch (e) {
    console.error("[create-checkout]", e.message || e);
    return res.status(e.status || 500).json({
      ok: false,
      error: e.message || "Checkout failed",
    });
  }
});

app.post("/api/claim-checkout", requireApiSecret, async function (req, res) {
  try {
    if (!STRIPE_SECRET_KEY) {
      return res.status(503).json({ ok: false, error: "Payments not connected yet" });
    }
    var sessionId = String((req.body && req.body.sessionId) || "").trim();
    if (!sessionId || sessionId.indexOf("cs_") !== 0) {
      return res.status(400).json({ ok: false, error: "Valid sessionId required" });
    }
    var session = await stripeGet("/checkout/sessions/" + encodeURIComponent(sessionId));
    if (session.payment_status !== "paid" && session.status !== "complete") {
      return res.status(402).json({
        ok: false,
        error: "Payment not completed",
        payment_status: session.payment_status,
      });
    }
    var email = normalizeEmail(
      (session.metadata && session.metadata.email) ||
        session.client_reference_id ||
        session.customer_email ||
        ""
    );
    var plan = (session.metadata && session.metadata.plan) || "monthly";
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Session missing email" });
    }
    /* Only grant after Stripe confirms paid — never on button click alone */
    var g = grantPro(email, plan, session.id, session.amount_total || 0, session.currency || "eur");
    return res.json({
      ok: true,
      granted: true,
      email: email,
      plan: plan,
      proUntil: g.proUntil,
      amount: g.amount,
      currency: g.currency,
    });
  } catch (e) {
    console.error("[claim-checkout]", e.message || e);
    return res.status(e.status || 500).json({
      ok: false,
      error: e.message || "Claim failed",
    });
  }
});

app.post("/api/send-verify", requireApiSecret, async function (req, res) {
  try {
    if (!RESEND_API_KEY) {
      return res.status(503).json({
        ok: false,
        error: "Set RESEND_API_KEY to send real email verification",
        hint: "Add RESEND_API_KEY=re_xxx to server/.env alongside VOID_API_SECRET",
      });
    }
    var email = normalizeEmail(req.body && req.body.email);
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    pruneExpired();
    var code = generateSixDigitCode();
    var salt = randomSalt();
    var hash = sha256Hex(salt + ":" + code);
    store.set(email, {
      hash: hash,
      salt: salt,
      expiresAt: Date.now() + CODE_TTL_MS,
      tries: 0,
    });
    persistStore();
    await sendViaResend(email, code);
    return res.json({ ok: true, message: "Verification code sent" });
  } catch (e) {
    console.error("[send-verify]", e.message || e);
    return res.status(e.status || 500).json({
      ok: false,
      error: e.message || "Failed to send code",
    });
  }
});

app.post("/api/verify-code", requireApiSecret, function (req, res) {
  try {
    var email = normalizeEmail(req.body && req.body.email);
    var code = String((req.body && req.body.code) || "").trim();
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({ ok: false, error: "Enter the 6-digit code" });
    }
    pruneExpired();
    var entry = store.get(email);
    if (!entry) {
      return res.status(400).json({ ok: false, error: "No pending code — request a new one" });
    }
    if (Date.now() > entry.expiresAt) {
      store.delete(email);
      persistStore();
      return res.status(400).json({ ok: false, error: "Code expired — request a new one" });
    }
    if (entry.tries >= MAX_CODE_TRIES) {
      store.delete(email);
      persistStore();
      return res.status(429).json({ ok: false, error: "Too many attempts — request a new code" });
    }
    var hash = sha256Hex(entry.salt + ":" + code);
    if (hash !== entry.hash) {
      entry.tries += 1;
      store.set(email, entry);
      persistStore();
      var left = MAX_CODE_TRIES - entry.tries;
      return res.status(401).json({
        ok: false,
        error: left > 0 ? "Invalid code (" + left + " tries left)" : "Too many attempts",
        triesLeft: left,
      });
    }
    store.delete(email);
    persistStore();
    return res.json({ ok: true, verified: true, email: email });
  } catch (e) {
    console.error("[verify-code]", e.message || e);
    return res.status(500).json({ ok: false, error: "Verification failed" });
  }
});


/* —— Manual Swish payment flow —— */
app.post("/api/swish/start", requireApiSecret, function (req, res) {
  try {
    var email = normalizeEmail(req.body && req.body.email);
    var plan = (req.body && req.body.plan) === "yearly" ? "yearly" : "monthly";
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    var prices = activePrices();
    var amountCents = plan === "yearly" ? prices.yearly : prices.monthly;
    var amountEur = Math.round(amountCents) / 100;
    var ref = generateSwishRef();
    var entry = {
      ref: ref,
      email: email,
      plan: plan,
      amountEur: amountEur,
      amountCents: amountCents,
      status: "pending",
      createdAt: Date.now(),
    };
    swishPending[ref] = entry;
    persistSwishPending();
    var numberDisplay = formatSwishDisplay(SWISH_NUMBER_RAW);
    var numberIntl = formatSwishIntl(SWISH_NUMBER_RAW);
    return res.json({
      ok: true,
      ref: ref,
      amountEur: amountEur,
      amountCents: amountCents,
      plan: plan,
      number: swishNumberE164(),
      numberDisplay: numberDisplay,
      numberIntl: numberIntl,
      instructions: swishInstructions(),
      note: "Pro unlocks only after the owner confirms your Swish payment.",
    });
  } catch (e) {
    console.error("[swish/start]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not start Swish payment" });
  }
});

app.post("/api/swish/mark-paid", requireApiSecret, function (req, res) {
  try {
    var email = normalizeEmail(req.body && req.body.email);
    var ref = String((req.body && req.body.ref) || "").trim().toUpperCase();
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    if (!/^VOID-[A-Z0-9]{4,8}$/.test(ref)) {
      return res.status(400).json({ ok: false, error: "Valid ref required" });
    }
    var entry = swishPending[ref];
    if (!entry) {
      return res.status(404).json({ ok: false, error: "Unknown Swish reference" });
    }
    if (normalizeEmail(entry.email) !== email) {
      return res.status(403).json({ ok: false, error: "Email does not match this payment" });
    }
    if (entry.status === "confirmed") {
      return res.json({
        ok: true,
        status: "confirmed",
        message: "Already confirmed — Pro should be active",
      });
    }
    if (entry.status === "rejected") {
      return res.status(410).json({ ok: false, error: "This payment was rejected" });
    }
    entry.status = "claimedByUser";
    entry.claimedAt = Date.now();
    swishPending[ref] = entry;
    persistSwishPending();
    return res.json({
      ok: true,
      status: "claimedByUser",
      ref: ref,
      message: "Waiting for owner to confirm — usually fast",
      waiting: true,
    });
  } catch (e) {
    console.error("[swish/mark-paid]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not mark paid" });
  }
});

app.get("/api/swish/pending", requireOwner, function (_req, res) {
  try {
    var list = Object.keys(swishPending)
      .map(function (k) {
        return swishPending[k];
      })
      .filter(function (e) {
        return e && (e.status === "pending" || e.status === "claimedByUser");
      })
      .sort(function (a, b) {
        return (b.claimedAt || b.createdAt || 0) - (a.claimedAt || a.createdAt || 0);
      });
    return res.json({ ok: true, pending: list, count: list.length });
  } catch (e) {
    console.error("[swish/pending]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not list pending" });
  }
});

app.post("/api/swish/confirm", requireOwner, function (req, res) {
  try {
    var ref = String((req.body && req.body.ref) || "").trim().toUpperCase();
    if (!ref || !swishPending[ref]) {
      return res.status(404).json({ ok: false, error: "Unknown Swish reference" });
    }
    var entry = swishPending[ref];
    if (entry.status === "confirmed") {
      var existing = grants[normalizeEmail(entry.email)];
      return res.json({
        ok: true,
        already: true,
        ref: ref,
        email: entry.email,
        proUntil: existing && existing.proUntil,
      });
    }
    if (entry.status === "rejected") {
      return res.status(410).json({ ok: false, error: "Already rejected" });
    }
    var g = grantPro(
      entry.email,
      entry.plan,
      ref,
      entry.amountCents,
      "eur",
      "swish"
    );
    entry.status = "confirmed";
    entry.confirmedAt = Date.now();
    swishPending[ref] = entry;
    persistSwishPending();
    console.log("[swish/confirm] granted Pro to", entry.email, entry.plan, ref);
    return res.json({
      ok: true,
      granted: true,
      ref: ref,
      email: entry.email,
      plan: entry.plan,
      proUntil: g.proUntil,
      amount: g.amount,
      currency: g.currency,
      source: "swish",
    });
  } catch (e) {
    console.error("[swish/confirm]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not confirm" });
  }
});

app.post("/api/swish/reject", requireOwner, function (req, res) {
  try {
    var ref = String((req.body && req.body.ref) || "").trim().toUpperCase();
    if (!ref || !swishPending[ref]) {
      return res.status(404).json({ ok: false, error: "Unknown Swish reference" });
    }
    var entry = swishPending[ref];
    if (entry.status === "confirmed") {
      return res.status(409).json({ ok: false, error: "Already confirmed — cannot reject" });
    }
    entry.status = "rejected";
    entry.rejectedAt = Date.now();
    swishPending[ref] = entry;
    persistSwishPending();
    return res.json({ ok: true, rejected: true, ref: ref });
  } catch (e) {
    console.error("[swish/reject]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not reject" });
  }
});

/* —— Public site config (announce / flags / maintenance) —— */
app.get("/api/site-config", function (_req, res) {
  res.json(publicSiteConfig());
});

app.post("/api/owner/site-config", requireOwner, function (req, res) {
  try {
    var body = req.body || {};
    if (typeof body.maintenance === "boolean") siteConfig.maintenance = body.maintenance;
    if (typeof body.announce === "string") siteConfig.announce = body.announce.slice(0, 280);
    if (body.flags && typeof body.flags === "object") {
      if (typeof body.flags.batch === "boolean") siteConfig.flags.batch = body.flags.batch;
      if (typeof body.flags.labs === "boolean") siteConfig.flags.labs = body.flags.labs;
      if (typeof body.flags.signups === "boolean") siteConfig.flags.signups = body.flags.signups;
    }
    persistSiteConfig();
    return res.json(publicSiteConfig());
  } catch (e) {
    console.error("[owner/site-config]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not save site config" });
  }
});

app.post("/api/owner/grant-pro", requireOwner, function (req, res) {
  try {
    var email = normalizeEmail(req.body && req.body.email);
    var days = Number(req.body && req.body.days);
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    if (!Number.isInteger(days) || days < 1 || days > 3650) {
      return res.status(400).json({
        ok: false,
        error: "days must be an integer from 1 to 3650",
      });
    }
    var g = grantProDays(email, days, "owner-grant");
    return res.json({
      ok: true,
      email: email,
      pro: true,
      proUntil: g.proUntil,
      plan: g.plan,
      source: "owner-grant",
    });
  } catch (e) {
    console.error("[owner/grant-pro]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not grant Pro" });
  }
});

app.post("/api/owner/revoke-pro", requireOwner, function (req, res) {
  try {
    var email = normalizeEmail(req.body && req.body.email);
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    revokePro(email);
    return res.json({ ok: true, email: email, pro: false });
  } catch (e) {
    console.error("[owner/revoke-pro]", e.message || e);
    return res.status(500).json({ ok: false, error: "Could not revoke Pro" });
  }
});

function ownerEntitlementPayload(email) {
  var g = grants[email];
  var pro = !!(g && g.proUntil && g.proUntil > Date.now());
  return {
    ok: true,
    email: email,
    pro: pro,
    proUntil: pro ? g.proUntil : 0,
    plan: pro ? g.plan : null,
    source: pro ? g.source : null,
    hasGrantRecord: !!g,
  };
}

app.get("/api/owner/entitlement", requireOwner, function (req, res) {
  try {
    var email = normalizeEmail(req.query && req.query.email);
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    return res.json(ownerEntitlementPayload(email));
  } catch (e) {
    console.error("[owner/entitlement]", e.message || e);
    return res.status(500).json({ ok: false, error: "Lookup failed" });
  }
});

app.get("/api/owner/lookup", requireOwner, function (req, res) {
  try {
    var email = normalizeEmail(req.query && req.query.email);
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }
    return res.json(ownerEntitlementPayload(email));
  } catch (e) {
    console.error("[owner/lookup]", e.message || e);
    return res.status(500).json({ ok: false, error: "Lookup failed" });
  }
});

app.get("/api/owner/stats", requireOwner, function (_req, res) {
  try {
    var pending = Object.keys(swishPending).filter(function (k) {
      var e = swishPending[k];
      return e && (e.status === "pending" || e.status === "claimedByUser");
    }).length;
    var activeGrants = Object.keys(grants).filter(function (k) {
      var g = grants[k];
      return g && g.proUntil && g.proUntil > Date.now();
    }).length;
    return res.json({
      ok: true,
      pendingSwish: pending,
      activeProGrants: activeGrants,
      maintenance: !!siteConfig.maintenance,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Stats failed" });
  }
});

function injectHtmlSecret(html) {
  if (!VOID_API_SECRET) return html;
  var snip =
    "<script>window.__VOID_API_SECRET__=" +
    JSON.stringify(VOID_API_SECRET) +
    ";</script>\n";
  if (html.indexOf("</head>") !== -1) {
    return html.replace("</head>", snip + "</head>");
  }
  return snip + html;
}

function safeHtmlPath(reqPath) {
  var rel = reqPath === "/" ? "index.html" : String(reqPath || "").replace(/^\/+/, "");
  if (!rel || rel.indexOf("..") !== -1 || rel.indexOf("\0") !== -1) return null;
  if (!/\.(html?)$/i.test(rel) && rel !== "index.html") return null;
  var full = path.normalize(path.join(ROOT, rel));
  if (full !== ROOT && full.indexOf(ROOT + path.sep) !== 0) return null;
  return full;
}

app.get(["/", "/index.html", "/app.html", "/privacy.html", "/terms.html"], function (req, res, next) {
  var full = safeHtmlPath(req.path === "/" ? "/" : req.path);
  if (!full || !fs.existsSync(full)) return next();
  try {
    var html = fs.readFileSync(full, "utf8");
    res.setHeader("Cache-Control", "no-store");
    res.type("html").send(injectHtmlSecret(html));
  } catch (e) {
    return next();
  }
});

app.use(express.static(ROOT, { extensions: ["html"] }));

app.listen(PORT, HOST, function () {
  console.log("");
  console.log("  VOID Clips server  (" + (PUBLIC_MODE ? "PUBLIC" : "local") + ")");
  console.log("  listening: " + HOST + ":" + PORT);
  console.log("  PUBLIC_BASE:     " + PUBLIC_BASE);
  console.log("  VOID_API_SECRET: " + (VOID_API_SECRET ? "set" : "MISSING — API returns 503/401"));
  console.log("  RESEND_API_KEY:  " + (RESEND_API_KEY ? "set" : "NOT SET → send-verify returns 503"));
  console.log("  STRIPE_SECRET:   " + (STRIPE_SECRET_KEY ? "set (real Checkout)" : "NOT SET → card path optional"));
  console.log("  SWISH_NUMBER:    " + formatSwishDisplay(SWISH_NUMBER_RAW) + " (" + formatSwishIntl(SWISH_NUMBER_RAW) + ")");
  console.log("  Launch promo:    " + (isLaunchPromoActive() ? "ON until " + new Date(PROMO_ENDS_AT).toISOString() : "ended"));
  console.log("");
});
