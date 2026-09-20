/* VOID Clips — demo app (no real AI / video processing) */
(function () {
  "use strict";

  var CLIPS = {
    viral: {
      en: [
        { hook: "Stop scrolling — the ending isn't what you think", caption: "WAIT FOR IT", duration: ":28", beat: "0:00–0:03 · payoff :22", label: "Cold open", grad: "grad-viral-1", vibe: "shock" },
        { hook: "I almost deleted this part…", caption: "DON'T SKIP", duration: ":22", beat: "0:00–0:04 · twist :16", label: "Curiosity cut", grad: "grad-viral-2", vibe: "gap" },
        { hook: "Do this once. Your feed changes.", caption: "SAVE THIS", duration: ":35", beat: "0:02–0:08 · tip drop", label: "Value drop", grad: "grad-viral-3", vibe: "value" },
        { hook: "POV: you finally get how the game works", caption: "POV", duration: ":18", beat: "0:00–0:02 · mirror", label: "Relatable spike", grad: "grad-viral-4", vibe: "pov" },
      ],
      sv: [
        { hook: "Sluta scrolla — slutet är inte vad du tror", caption: "VÄNTA", duration: ":28", beat: "0:00–0:03 · payoff :22", label: "Cold open", grad: "grad-viral-1", vibe: "shock" },
        { hook: "Jag höll på att radera den här delen…", caption: "SKIPPA INTE", duration: ":22", beat: "0:00–0:04 · twist :16", label: "Curiosity-cut", grad: "grad-viral-2", vibe: "gap" },
        { hook: "Gör det här en gång. Feeden ändras.", caption: "SPARA", duration: ":35", beat: "0:02–0:08 · tip", label: "Value-drop", grad: "grad-viral-3", vibe: "value" },
        { hook: "POV: du fattar äntligen hur spelet funkar", caption: "POV", duration: ":18", beat: "0:00–0:02 · spegel", label: "Relaterbart", grad: "grad-viral-4", vibe: "pov" },
      ],
    },
    story: {
      en: [
        { hook: "It started with one message I shouldn't have opened", caption: "PART 1", duration: ":32", beat: "0:00–0:05 · cold open", label: "Cold open", grad: "grad-story-1", vibe: "open" },
        { hook: "Then the silence got loud", caption: "THEN…", duration: ":41", beat: "0:08–0:18 · escalate", label: "Rising beat", grad: "grad-story-2", vibe: "rise" },
        { hook: "Nobody warned me about this part", caption: "THE CUT", duration: ":27", beat: "0:12–0:20 · reveal", label: "Reveal", grad: "grad-story-3", vibe: "reveal" },
        { hook: "That's the night I walked out", caption: "END.", duration: ":19", beat: "0:14–0:19 · payoff", label: "Payoff", grad: "grad-story-4", vibe: "payoff" },
      ],
      sv: [
        { hook: "Det började med ett meddelande jag inte borde öppnat", caption: "DEL 1", duration: ":32", beat: "0:00–0:05 · cold open", label: "Cold open", grad: "grad-story-1", vibe: "open" },
        { hook: "Sen blev tystnaden högljudd", caption: "SEN…", duration: ":41", beat: "0:08–0:18 · uppbyggnad", label: "Uppbyggnad", grad: "grad-story-2", vibe: "rise" },
        { hook: "Ingen varnade mig för den här delen", caption: "KLIPPET", duration: ":27", beat: "0:12–0:20 · reveal", label: "Avslöjande", grad: "grad-story-3", vibe: "reveal" },
        { hook: "Det var natten jag gick", caption: "SLUT.", duration: ":19", beat: "0:14–0:19 · payoff", label: "Payoff", grad: "grad-story-4", vibe: "payoff" },
      ],
    },
    funny: {
      en: [
        { hook: "Bro said it with his whole chest", caption: "NO FILTER", duration: ":15", beat: "0:00–0:02 · punch", label: "Reaction", grad: "grad-funny-1", vibe: "react" },
        { hook: "My brain at 3am has no HR department", caption: "3AM BRAIN", duration: ":24", beat: "0:03–0:10 · chaos", label: "Chaos cut", grad: "grad-funny-2", vibe: "chaos" },
        { hook: "The plan lasted 0.4 seconds", caption: "FAIL EDIT", duration: ":31", beat: "0:05–0:12 · crash", label: "Fail edit", grad: "grad-funny-3", vibe: "fail" },
        { hook: "This energy needs a warning label", caption: "MUTE?", duration: ":20", beat: "0:00–0:04 · closer", label: "Punchline", grad: "grad-funny-4", vibe: "punch" },
      ],
      sv: [
        { hook: "Bro sa det med hela bröstet", caption: "INGEN FILTER", duration: ":15", beat: "0:00–0:02 · punch", label: "Reaktion", grad: "grad-funny-1", vibe: "react" },
        { hook: "Min hjärna kl 03:00 har ingen HR-avdelning", caption: "03:00 HJÄRNA", duration: ":24", beat: "0:03–0:10 · kaos", label: "Kaos-klipp", grad: "grad-funny-2", vibe: "chaos" },
        { hook: "Planen höll i 0,4 sekunder", caption: "FAIL-EDIT", duration: ":31", beat: "0:05–0:12 · krasch", label: "Fail-edit", grad: "grad-funny-3", vibe: "fail" },
        { hook: "Den här energin behöver en varningsetikett", caption: "MUTE?", duration: ":20", beat: "0:00–0:04 · closer", label: "Punchline", grad: "grad-funny-4", vibe: "punch" },
      ],
    },
  };

  var HASHTAGS = {
    viral: "#fyp #viral #foryoupage #hook #shorts #reels #clip #creator #voidclips #algorithm",
    story: "#storytime #fyp #relatable #part1 #shorts #reels #truestory #creator #voidclips",
    funny: "#funny #memes #fyp #comedy #fail #relatable #shorts #reels #voidclips",
  };

  var HASHTAGS_SV = {
    viral: "#fyp #viral #fördig #hook #shorts #reels #klipp #creator #voidclips #algoritm",
    story: "#storytime #fyp #relaterbart #del1 #shorts #reels #sannhistoria #creator #voidclips",
    funny: "#roligt #memes #fyp #komedi #fail #relaterbart #shorts #reels #voidclips",
  };

  /* VOID Resonance — viral score + persona rewrite + pin bait (demo, no real AI) */
  var RESONANCE = {
    viral: [
      {
        score: 96,
        why: "Pattern interrupt in frame 1 + delayed payoff. Thumb stops; brain stays. Best as cold open.",
        persona: "You weren't supposed to see this ending. Watch anyway.",
        pin: "Pin: timestamp the second it flipped. Steal the raw cut in the comments.",
        timing: "Hook hard 0–3s · hold face · drop twist after :18"
      },
      {
        score: 91,
        why: "Deletion tease = curiosity gap without cheap bait. High completion, mid share.",
        persona: "I almost deleted this. Then I remembered who this is for.",
        pin: "First comment: which second broke you? Drop it. No soft launches.",
        timing: "Tease line on-screen 0–4s · cut before they expect"
      },
      {
        score: 84,
        why: "Value framed as a secret. Saves > likes. Soft ceiling unless duet bait lands.",
        persona: "Do this once. Keep it or lose the edge — your call.",
        pin: "Save before the algo buries it. Tag the one who still scrolls past gold.",
        timing: "Promise early · tip clean mid · CTA last 3s"
      },
      {
        score: 78,
        why: "POV mirror — low friction, high share velocity. Soft viral ceiling alone; strong as series glue.",
        persona: "POV: the feed finally got you. Don't flinch.",
        pin: "Tag who needs this slap. Duet if you're still pretending.",
        timing: "Face cam + text lock 0–2s · no intro fluff"
      }
    ],
    story: [
      {
        score: 93,
        why: "Unfinished sentence as cold open. Scroll debt kicks in before the plot does.",
        persona: "It started with one message. I should've left it unread.",
        pin: "Part 2 if this hits. Comment 'void' if you're still in the room.",
        timing: "Text-first 0–5s · hold silence · no music swell yet"
      },
      {
        score: 87,
        why: "Escalation beat — stakes rise before payoff. Retention glue for sequels.",
        persona: "Then the silence got loud. Clock it.",
        pin: "Tell me where you checked out. I'll know if you're lying.",
        timing: "Escalate 8–18s · cut on breath, not on answer"
      },
      {
        score: 81,
        why: "Forbidden-knowledge frame. Whispers travel farther than shouts on Shorts.",
        persona: "Nobody warned me about this part — cut clean, no mercy.",
        pin: "Pinned: the line they cut. Full version lives in my bio.",
        timing: "Reveal window 12–20s · caption punch, not narration dump"
      },
      {
        score: 72,
        why: "Payoff clip — strong for sequels, weaker cold. Still posts if Part 1 warmed them.",
        persona: "That's the night I walked out. No encore. No apology.",
        pin: "If this found you, it wasn't an accident. Say so.",
        timing: "Land payoff by :16 · hold stare 2s · hard out"
      }
    ],
    funny: [
      {
        score: 98,
        why: "Quotable shame + reaction bait. Share velocity maxed for duets/stitches.",
        persona: "Bro said it with his whole chest. Archive it.",
        pin: "Quote energy only. Tag the guilty. Softblock the rest.",
        timing: "Punch in 0–2s · reaction hold · no setup tax"
      },
      {
        score: 89,
        why: "3am brain = universal. Chaos cut keeps the rewatch loop alive.",
        persona: "My brain at 3am has no HR. No notes. No peace.",
        pin: "Comment your 3am thought. Worst one gets a follow.",
        timing: "Chaos beats 3–10s · jump cuts · text spam ok"
      },
      {
        score: 80,
        why: "Fail edit — clean schadenfreude punch. Mid-feed killer on second watch.",
        persona: "The plan lasted 0.4 seconds. Peak VOID.",
        pin: "Duet with your own failure. Don't clean it up.",
        timing: "Setup 5s · crash hard · freeze on face"
      },
      {
        score: 68,
        why: "Energy closer — solid end-card, softer as cold open alone. Pair with stronger hook.",
        persona: "This energy needs a warning label. Mute or match.",
        pin: "First comment: mute or match? Pick a side.",
        timing: "Closer energy 0–4s · end on question, not joke dump"
      }
    ]
  };

  var RESONANCE_SV = {
    viral: [
      {
        score: 96,
        why: "Mönsterbrott i bild 1 + fördröjd payoff. Tummen stannar; hjärnan stannar kvar.",
        persona: "Du skulle inte sett det här slutet. Titta ändå.",
        pin: "Pin: tidsstämpla sekunden det vände. Råklippet ligger i kommentarerna.",
        timing: "Hook hårt 0–3s · håll ansikte · twist efter :18"
      },
      {
        score: 91,
        why: "Radera-tease = nyfikenhetsgap utan billigt bete. Hög completion.",
        persona: "Jag höll på att radera det här. Sen mindes jag vem det är för.",
        pin: "Första kommentaren: vilken sekund bröt dig? Inga mjuka starter.",
        timing: "Tease på skärm 0–4s · klipp innan de förväntar sig"
      },
      {
        score: 84,
        why: "Värde som hemlighet. Sparningar > likes. Tak om du inte lägger duet-bete.",
        persona: "Gör det en gång. Behåll kanten — eller tappa den.",
        pin: "Spara innan algon gräver ner det. Tagga den som scrollar förbi guld.",
        timing: "Löfte tidigt · tip mitt · CTA sista 3s"
      },
      {
        score: 78,
        why: "POV-spegel — låg friktion, hög share. Mjukt viraltak ensam; stark i serie.",
        persona: "POV: feeden fick dig äntligen. Darra inte.",
        pin: "Tagga den som behöver smällen. Duetta om du fortfarande låtsas.",
        timing: "Ansikte + text 0–2s · noll intro-fluff"
      }
    ],
    story: [
      {
        score: 93,
        why: "Oavslutad mening som cold open. Scroll-skuld innan plotten startar.",
        persona: "Det började med ett meddelande. Jag borde lämnat det oläst.",
        pin: "Del 2 om det här tar. Kommentera 'void' om du fortfarande är kvar.",
        timing: "Text först 0–5s · håll tystnad · ingen musik-sväll ännu"
      },
      {
        score: 87,
        why: "Eskalering — insatserna stiger före payoff. Retention-lim för uppföljare.",
        persona: "Sen blev tystnaden högljudd. Klocka den.",
        pin: "Säg var du checkade ut. Jag märker om du ljuger.",
        timing: "Eskalera 8–18s · klipp på andetag, inte på svar"
      },
      {
        score: 81,
        why: "Förbjuden kunskap-ram. Viskningar går längre än skrik på Shorts.",
        persona: "Ingen varnade mig för den här delen — rent klipp, ingen nåd.",
        pin: "Pin: raden de klippte. Full version i bio.",
        timing: "Reveal 12–20s · caption-punch, inte narrationsdump"
      },
      {
        score: 72,
        why: "Payoff — stark i serie, svagare kall. Funkar om del 1 värmt upp.",
        persona: "Det var natten jag gick. Ingen encore. Ingen ursäkt.",
        pin: "Om det här hittade dig var det ingen slump. Säg det.",
        timing: "Landá payoff till :16 · håll blick 2s · hårt ut"
      }
    ],
    funny: [
      {
        score: 98,
        why: "Citerbar skam + reaktionsbete. Max share-hastighet för duett/stitch.",
        persona: "Bro sa det med hela bröstet. Arkivera.",
        pin: "Bara quote-energi. Tagga den skyldiga. Softblock resten.",
        timing: "Punch 0–2s · håll reaktion · ingen setup-skatt"
      },
      {
        score: 89,
        why: "03:00-hjärna = universellt. Kaos-klipp håller omslingan vid liv.",
        persona: "Min hjärna kl 03:00 har ingen HR. Inga anteckningar. Ingen frid.",
        pin: "Kommentera din 03:00-tanke. Sämst vinner en follow.",
        timing: "Kaos 3–10s · hoppklipp · textspam ok"
      },
      {
        score: 80,
        why: "Fail-edit — ren skadeglädje. Mid-feed-mördare på andra tittningen.",
        persona: "Planen höll i 0,4 sekunder. Peak VOID.",
        pin: "Duetta med ditt eget fail. Putsa inte.",
        timing: "Setup 5s · krascha hårt · frys i ansiktet"
      },
      {
        score: 68,
        why: "Energi-closer — solid slutkort, mjukare som kall öppning. Para med starkare hook.",
        persona: "Den här energin behöver en varning. Mute eller matcha.",
        pin: "Första kommentaren: mute eller matcha? Välj sida.",
        timing: "Closer 0–4s · avsluta på fråga, inte skämt-dump"
      }
    ]
  };

  var PROGRESS = [
    { label: "Fetch", status: "Pulling source frames…" },
    { label: "Find hooks", status: "Scoring hooks & Resonance…" },
    { label: "Cut clips", status: "Framing 15–45s premium cuts…" },
  ];

  var HISTORY_KEY = "void_clips_history";
  var WAITLIST_KEY = "void_clips_waitlist";
  var PREFS_KEY = "void_clips_prefs";
  var USER_KEY = "void_clips_user"; /* session token blob — sessionStorage or localStorage */
  var REMEMBER_KEY = "void_clips_remember"; /* "1" = prefer localStorage session */
  var USERS_KEY = "void_clips_users"; /* email -> account map (salted hashes) */
  var VERIFY_KEY = "void_clips_pending_verify"; /* pending local/demo code hash */
  var MAINTENANCE_KEY = "void_clips_maintenance";
  var ONBOARD_KEY = "void_clips_onboarding_dismissed";
  var BETA_BANNER_KEY = "void_clips_beta_banner_dismissed";
  var BUGS_KEY = "void_clips_bugs";
  var GIFT_CODES_KEY = "void_clips_gift_codes";
  var ENTITLEMENTS_KEY = "void_clips_entitlements"; /* email -> { proUntil, unlimited } */
  var LOCKOUT_KEY = "void_clips_lockouts"; /* email -> { fails, lockedUntil } */
  var STATS_KEY = "void_clips_stats"; /* { gens } local counter */
  var DEMO_FLAG_KEY = "void_clips_allow_demo_verify";
  var API_SECRET_KEY = "void_clips_api_secret"; /* optional: paste VOID_API_SECRET for /api calls */
  var ANNOUNCE_KEY = "void_clips_announce";
  var ANNOUNCE_DISMISS_KEY = "void_clips_announce_dismissed";
  var FEATURE_FLAGS_KEY = "void_clips_feature_flags";
  var SITE_CONFIG_CACHE_KEY = "void_clips_site_config_cache";
  var MAX_HISTORY = 5;
  var FREE_CREDITS = 10;
  var GUEST_FREE_CREDITS = 3;
  var GUEST_CREDITS_KEY = "void_clips_guest_credits";
  var OWNER_EMAIL = "yuel.zeru2000@gmail.com";
  var MIN_PASSWORD = 10;
  var MAX_PASSWORD_FAILS = 5;
  var LOCKOUT_MS = 60 * 1000;
  var MAX_CODE_TRIES = 5;

  var state = { style: "viral", lang: "en", aspect: "9:16", voidMode: true, seriesMode: false, batchMode: false };
  var currentUser = null;
  var pendingVerifyEmail = null;
  var pendingVerifyViaApi = false;
  var pendingResetEmail = null;
  var pendingAuthPurpose = "verify"; /* verify | reset */
  var lastClips = [];
  var lastSourceUrl = "";
  var lastLinkMeta = null;
  var linkMetaCache = Object.create(null);
  var linkPreviewReq = 0;
  var batchPreviewTimer = null;
  var lastGenId = null;
  var batchBusy = false;
  var justSignedIn = false;
  var selectedPlan = "monthly";

  var urlInput = document.getElementById("url-input");
  var generateBtn = document.getElementById("generate-btn");
  var loadingEl = document.getElementById("loading");
  var loadingStatus = document.getElementById("loading-status");
  var progressSteps = document.getElementById("progress-steps");
  var resultsEl = document.getElementById("results");
  var clipsGrid = document.getElementById("clips-grid");
  var resultsMeta = document.getElementById("results-meta");
  var waitlistForm = document.getElementById("waitlist-form");
  var waitlistEmail = document.getElementById("waitlist-email");
  var waitlistMsg = document.getElementById("waitlist-msg");
  var recentWrap = document.getElementById("recent-links");
  var recentList = document.getElementById("recent-list");
  var hashtagText = document.getElementById("hashtag-text");
  var copyHashtagsBtn = document.getElementById("copy-hashtags");
  var pasteHint = document.getElementById("paste-hint");
  var errorState = document.getElementById("error-state");
  var emptyState = document.getElementById("empty-state");
  var toastEl = document.getElementById("toast");
  var authGate = document.getElementById("auth-gate");
  var appMain = document.getElementById("app-main");
  var authForm = document.getElementById("auth-form");
  var authIdentity = document.getElementById("auth-identity");
  var navCredits = document.getElementById("nav-credits");
  var creditsPill = document.getElementById("credits-pill");
  var navUser = document.getElementById("nav-user");
  var navGuestAuth = document.getElementById("nav-guest-auth");
  var navSigninBtn = document.getElementById("nav-signin-btn");
  var guestBanner = document.getElementById("guest-banner");
  var guestBannerSignin = document.getElementById("guest-banner-signin");
  var authContinueGuest = document.getElementById("auth-continue-guest");
  var userNameEl = document.getElementById("user-name");
  var signOutBtn = document.getElementById("sign-out-btn");
  var upgradeCta = document.getElementById("upgrade-cta");
  var copyAllCaptionsBtn = document.getElementById("copy-all-captions");
  var copyExportPackBtn = document.getElementById("copy-export-pack");
  var betaBanner = document.getElementById("beta-banner");
  var betaBannerDismiss = document.getElementById("beta-banner-dismiss");
  var onboardingModal = document.getElementById("onboarding-modal");
  var onboardingDone = document.getElementById("onboarding-done");
  var onboardingSkip = document.getElementById("onboarding-skip");
  var settingsBtn = document.getElementById("settings-btn");
  var settingsModal = document.getElementById("settings-modal");
  var settingsClose = document.getElementById("settings-close");
  var clearHistoryBtn = document.getElementById("clear-history-btn");
  var resetCreditsBtn = document.getElementById("reset-credits-btn");
  var reportBugBtn = document.getElementById("report-bug-btn");
  var reportBugSecondaryBtn = document.getElementById("report-bug-secondary-btn");
  var bugModal = document.getElementById("bug-modal");
  var bugForm = document.getElementById("bug-form");
  var bugText = document.getElementById("bug-text");
  var bugClose = document.getElementById("bug-close");
  var bugMailto = document.getElementById("bug-mailto");
  var bugMailtoSubject = "VOID Clips Support";
  var ownerBugsList = document.getElementById("owner-bugs-list");
  var ownerBugsCount = document.getElementById("owner-bugs-count");
  var ownerBugsRefresh = document.getElementById("owner-bugs-refresh");
  var ownerBugsClear = document.getElementById("owner-bugs-clear");
  var upgradeWaitlistForm = document.getElementById("upgrade-waitlist-form");
  var upgradeWaitlistEmail = document.getElementById("upgrade-waitlist-email");
  var upgradeWaitlistMsg = document.getElementById("upgrade-waitlist-msg");
  var authPassword = document.getElementById("auth-password");
  var authError = document.getElementById("auth-error");
  var authSigninPanel = document.getElementById("auth-signin-panel");
  var authVerifyPanel = document.getElementById("auth-verify-panel");
  var authTitle = document.getElementById("auth-title");
  var authSub = document.getElementById("auth-sub");
  var verifyForm = document.getElementById("verify-form");
  var verifyCode = document.getElementById("verify-code");
  var verifyError = document.getElementById("verify-error");
  var verifyEmailLabel = document.getElementById("verify-email-label");
  var sendCodeBtn = document.getElementById("send-code-btn");
  var verifyBackBtn = document.getElementById("verify-back-btn");
  var demoCodeModal = document.getElementById("demo-code-modal");
  var demoCodeValue = document.getElementById("demo-code-value");
  var demoCodeClose = document.getElementById("demo-code-close");
  var maintenanceOverlay = document.getElementById("maintenance-overlay");
  var navOwnerBadge = document.getElementById("nav-owner-badge");
  var ownerAdminPanel = document.getElementById("owner-admin-panel");
  var maintenanceToggle = document.getElementById("maintenance-toggle");
  var maintenanceToggleStatus = document.getElementById("maintenance-toggle-status");
  var resetWaitlistBtn = document.getElementById("reset-waitlist-btn");
  var clearUsersBtn = document.getElementById("clear-users-btn");
  var navProBadge = document.getElementById("nav-pro-badge");
  var ownerPanelBtn = document.getElementById("owner-panel-btn");
  var ownerPanel = document.getElementById("owner-panel");
  var ownerPanelClose = document.getElementById("owner-panel-close");
  var openOwnerFromSettings = document.getElementById("open-owner-panel-from-settings");
  var ownerMaintToggle = document.getElementById("owner-maint-toggle");
  var ownerMaintStatus = document.getElementById("owner-maint-status");
  var giftCodeForm = document.getElementById("gift-code-form");
  var giftCodeCustom = document.getElementById("gift-code-custom");
  var giftDuration = document.getElementById("gift-duration");
  var giftCustomDays = document.getElementById("gift-custom-days");
  var giftCustomDaysLabel = document.getElementById("gift-custom-days-label");
  var giftMaxRedemptions = document.getElementById("gift-max-redemptions");
  var giftCodesList = document.getElementById("gift-codes-list");
  var grantForm = document.getElementById("grant-form");
  var grantEmail = document.getElementById("grant-email");
  var grantCredits = document.getElementById("grant-credits");
  var grantUnlimitedBtn = document.getElementById("grant-unlimited-btn");
  var waitlistView = document.getElementById("waitlist-view");
  var pricingBtn = document.getElementById("pricing-btn");
  var pricingModal = document.getElementById("pricing-modal");
  var pricingClose = document.getElementById("pricing-close");
  var pricingPlans = document.getElementById("pricing-plans");
  var stripePayBtn = document.getElementById("stripe-pay-btn");
  var swishPayBtn = document.getElementById("swish-pay-btn");
  var swishPanel = document.getElementById("swish-panel");
  var checkoutActionsMain = document.getElementById("checkout-actions-main");
  var swishAmountDisplay = document.getElementById("swish-amount-display");
  var swishNumberDisplay = document.getElementById("swish-number-display");
  var swishRefDisplay = document.getElementById("swish-ref-display");
  var swishCopyNumber = document.getElementById("swish-copy-number");
  var swishCopyRef = document.getElementById("swish-copy-ref");
  var swishMarkPaidBtn = document.getElementById("swish-mark-paid-btn");
  var swishWaitingMsg = document.getElementById("swish-waiting-msg");
  var swishBackBtn = document.getElementById("swish-back-btn");
  var swishPendingList = document.getElementById("swish-pending-list");
  var swishPendingRefresh = document.getElementById("swish-pending-refresh");
  var swishPendingCount = document.getElementById("swish-pending-count");
  var announceBanner = document.getElementById("announce-banner");
  var announceBannerText = document.getElementById("announce-banner-text");
  var announceBannerDismiss = document.getElementById("announce-banner-dismiss");
  var announceForm = document.getElementById("announce-form");
  var announceInput = document.getElementById("announce-input");
  var announceClearBtn = document.getElementById("announce-clear-btn");
  var flagBatchToggle = document.getElementById("flag-batch-toggle");
  var flagBatchStatus = document.getElementById("flag-batch-status");
  var flagLabsToggle = document.getElementById("flag-labs-toggle");
  var flagLabsStatus = document.getElementById("flag-labs-status");
  var flagSignupsToggle = document.getElementById("flag-signups-toggle");
  var flagSignupsStatus = document.getElementById("flag-signups-status");
  var proGrantForm = document.getElementById("pro-grant-form");
  var proGrantEmail = document.getElementById("pro-grant-email");
  var proGrantDays = document.getElementById("pro-grant-days");
  var proRevokeBtn = document.getElementById("pro-revoke-btn");
  var forceCreditsForm = document.getElementById("force-credits-form");
  var forceCreditsEmail = document.getElementById("force-credits-email");
  var forceCreditsValue = document.getElementById("force-credits-value");
  var lookupForm = document.getElementById("lookup-form");
  var lookupEmail = document.getElementById("lookup-email");
  var lookupResult = document.getElementById("lookup-result");
  var launchPromoBanner = document.getElementById("launch-promo-banner");
  var paymentsStatusEl = document.getElementById("payments-status");
  var pricingPromoEnds = document.getElementById("pricing-promo-ends");
  var pricingEyebrow = document.getElementById("pricing-eyebrow");
  var pricingSub = document.getElementById("pricing-sub");
  var cachedPricing = null;
  var stripeConfigured = false;
  var swishEnabled = true;
  var activeSwish = null; /* { ref, amountEur, numberDisplay, numberIntl } */
  var ownerCodeInput = document.getElementById("owner-code-input");
  var redeemCodeBtn = document.getElementById("redeem-code-btn");
  var redeemMsg = document.getElementById("redeem-msg");
  var upgradeProBtn = document.getElementById("upgrade-pro-btn");
  var verifyDemoWarn = document.getElementById("verify-demo-warn");
  var authForgotPanel = document.getElementById("auth-forgot-panel");
  var forgotPasswordBtn = document.getElementById("forgot-password-btn");
  var forgotEmailForm = document.getElementById("forgot-email-form");
  var forgotResetForm = document.getElementById("forgot-reset-form");
  var forgotEmail = document.getElementById("forgot-email");
  var forgotError = document.getElementById("forgot-error");
  var forgotResetError = document.getElementById("forgot-reset-error");
  var forgotCode = document.getElementById("forgot-code");
  var forgotNewPassword = document.getElementById("forgot-new-password");
  var forgotNewPasswordConfirm = document.getElementById("forgot-new-password-confirm");
  var forgotSendBtn = document.getElementById("forgot-send-btn");
  var forgotResendBtn = document.getElementById("forgot-resend-btn");
  var forgotBackBtn = document.getElementById("forgot-back-btn");
  var forgotDemoWarn = document.getElementById("forgot-demo-warn");
  var forgotLead = document.getElementById("forgot-lead");
  var authRemember = document.getElementById("auth-remember");
  var authForgotRow = document.getElementById("auth-forgot-row");
  var changePasswordForm = document.getElementById("change-password-form");
  var changePwCurrent = document.getElementById("change-pw-current");
  var changePwNew = document.getElementById("change-pw-new");
  var changePwConfirm = document.getElementById("change-pw-confirm");
  var changePwError = document.getElementById("change-pw-error");
  var changePwOk = document.getElementById("change-pw-ok");
  var settingsSignOutBtn = document.getElementById("settings-sign-out-btn");
  var resetSessionBtn = document.getElementById("reset-session-btn");

  var loadingTimer = null;
  var toastTimer = null;

  /* —— assets / logo —— */
  function wireLogoImages() {
    document.querySelectorAll(".logo-img").forEach(function (img) {
      img.addEventListener("load", function () {
        img.hidden = false;
        var mark = img.closest(".logo-mark");
        if (mark) mark.classList.add("has-img");
      });
      img.addEventListener("error", function () {
        img.hidden = true;
        var mark = img.closest(".logo-mark");
        if (mark) mark.classList.remove("has-img");
      });
      if (img.complete && img.naturalWidth > 0) {
        img.hidden = false;
        var m = img.closest(".logo-mark");
        if (m) m.classList.add("has-img");
      }
    });
  }

  /* —— auth / credits / owner (localStorage only · Web Crypto hashes) —— */
  function normalizeEmail(v) {
    return String(v || "").trim().toLowerCase();
  }

  function isOwnerEmail(email) {
    return normalizeEmail(email) === OWNER_EMAIL.toLowerCase();
  }

  function isOwner() {
    return !!(currentUser && currentUser.verified && isOwnerEmail(currentUser.email || currentUser.identity));
  }

  function isSignedIn() {
    return !!(currentUser && currentUser.verified);
  }

  function getGuestCredits() {
    try {
      var n = Number(localStorage.getItem(GUEST_CREDITS_KEY));
      if (Number.isFinite(n) && n >= 0) return Math.floor(n);
    } catch (e) {}
    return GUEST_FREE_CREDITS;
  }

  function setGuestCredits(n) {
    n = Math.max(0, Math.floor(Number(n) || 0));
    try {
      localStorage.setItem(GUEST_CREDITS_KEY, String(n));
    } catch (e) {}
    return n;
  }

  function ensureGuestCredits() {
    try {
      if (localStorage.getItem(GUEST_CREDITS_KEY) === null) {
        setGuestCredits(GUEST_FREE_CREDITS);
      }
    } catch (e) {
      /* ignore */
    }
    return getGuestCredits();
  }

  function syncOwnerVisibility() {
    var owner = isOwner();
    try {
      document.body.classList.toggle("is-owner", owner);
    } catch (e) {}
    if (navOwnerBadge) navOwnerBadge.hidden = !owner;
    if (ownerAdminPanel) ownerAdminPanel.hidden = !owner;
    if (ownerPanelBtn) ownerPanelBtn.hidden = !owner;
    if (!owner) {
      if (ownerPanel) ownerPanel.hidden = true;
    }
  }

  function defaultFeatureFlags() {
    return { batch: true, labs: true, signups: true };
  }

  function loadFeatureFlags() {
    try {
      var raw = localStorage.getItem(FEATURE_FLAGS_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && typeof o === "object") {
          return {
            batch: o.batch !== false,
            labs: o.labs !== false,
            signups: o.signups !== false,
          };
        }
      }
    } catch (e) {}
    return defaultFeatureFlags();
  }

  function saveFeatureFlags(flags) {
    flags = flags || defaultFeatureFlags();
    try {
      localStorage.setItem(FEATURE_FLAGS_KEY, JSON.stringify(flags));
    } catch (e) {}
    return flags;
  }

  function applyFeatureFlagsUI() {
    var flags = loadFeatureFlags();
    try {
      document.body.classList.toggle("flag-batch-off", !flags.batch && !isOwner());
      document.body.classList.toggle("flag-labs-off", !flags.labs && !isOwner());
    } catch (e) {}
    function syncToggle(btn, statusEl, on) {
      if (btn) {
        btn.setAttribute("aria-checked", on ? "true" : "false");
        btn.classList.toggle("is-on", on);
      }
      if (statusEl) statusEl.textContent = on ? "On" : "Off";
    }
    syncToggle(flagBatchToggle, flagBatchStatus, flags.batch);
    syncToggle(flagLabsToggle, flagLabsStatus, flags.labs);
    syncToggle(flagSignupsToggle, flagSignupsStatus, flags.signups);
  }

  function setFeatureFlag(key, on) {
    if (!isOwner()) return;
    var flags = loadFeatureFlags();
    flags[key] = !!on;
    saveFeatureFlags(flags);
    applyFeatureFlagsUI();
    pushSiteConfig({ flags: flags });
  }

  function getAnnounceMessage() {
    try {
      return String(localStorage.getItem(ANNOUNCE_KEY) || "");
    } catch (e) {
      return "";
    }
  }

  function setAnnounceMessage(msg) {
    msg = String(msg || "").trim().slice(0, 280);
    try {
      if (msg) localStorage.setItem(ANNOUNCE_KEY, msg);
      else localStorage.removeItem(ANNOUNCE_KEY);
      localStorage.removeItem(ANNOUNCE_DISMISS_KEY);
    } catch (e) {}
    applyAnnounceBanner();
    return msg;
  }

  function applyAnnounceBanner() {
    if (!announceBanner) return;
    var msg = getAnnounceMessage();
    if (!msg) {
      announceBanner.hidden = true;
      return;
    }
    try {
      if (localStorage.getItem(ANNOUNCE_DISMISS_KEY) === msg) {
        announceBanner.hidden = true;
        return;
      }
    } catch (e) {}
    if (announceBannerText) announceBannerText.textContent = msg;
    if (announceInput && isOwner()) announceInput.value = msg;
    announceBanner.hidden = false;
  }

  function pushSiteConfig(patch) {
    if (!isOwner()) return Promise.resolve(null);
    var body = patch || {};
    if (body.maintenance === undefined) body.maintenance = isMaintenanceOn();
    if (body.announce === undefined) body.announce = getAnnounceMessage();
    if (!body.flags) body.flags = loadFeatureFlags();
    return fetch("/api/owner/site-config", {
      method: "POST",
      headers: ownerApiHeaders(),
      body: JSON.stringify(body),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        });
      })
      .then(function (data) {
        if (data && data.ok) {
          applyRemoteSiteConfig(data, true);
          return data;
        }
        showToast((data && data.error) || "Site config save failed — local only");
        return data;
      })
      .catch(function () {
        showToast("Site config unreachable — saved locally only");
        return null;
      });
  }

  function applyRemoteSiteConfig(data, fromOwnerPush) {
    if (!data || !data.ok) return;
    try {
      localStorage.setItem(SITE_CONFIG_CACHE_KEY, JSON.stringify(data));
    } catch (e) {}
    if (typeof data.announce === "string") {
      try {
        if (data.announce) localStorage.setItem(ANNOUNCE_KEY, data.announce);
        else localStorage.removeItem(ANNOUNCE_KEY);
      } catch (e2) {}
    }
    if (data.flags) saveFeatureFlags(data.flags);
    if (typeof data.maintenance === "boolean") {
      try {
        localStorage.setItem(MAINTENANCE_KEY, data.maintenance ? "1" : "0");
      } catch (e3) {}
    }
    applyAnnounceBanner();
    applyFeatureFlagsUI();
    if (!fromOwnerPush) applyMaintenanceUI();
    else syncOwnerAdminPanel();
  }

  function fetchSiteConfig() {
    return fetch("/api/site-config")
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        });
      })
      .then(function (data) {
        if (data && data.ok) applyRemoteSiteConfig(data, false);
        return data;
      })
      .catch(function () {
        applyAnnounceBanner();
        applyFeatureFlagsUI();
        return null;
      });
  }

  function bytesToHex(buf) {
    var arr = new Uint8Array(buf);
    var hex = "";
    for (var i = 0; i < arr.length; i++) {
      var h = arr[i].toString(16);
      hex += h.length === 1 ? "0" + h : h;
    }
    return hex;
  }

  function randomHex(bytes) {
    var arr = new Uint8Array(bytes);
    if (window.crypto && crypto.getRandomValues) {
      crypto.getRandomValues(arr);
    } else {
      for (var i = 0; i < arr.length; i++) arr[i] = (Math.random() * 256) | 0;
    }
    return bytesToHex(arr);
  }

  function sha256Hex(str) {
    if (!window.crypto || !crypto.subtle) {
      return Promise.reject(new Error("Web Crypto unavailable — use http://localhost (not file://)"));
    }
    var enc = new TextEncoder();
    return crypto.subtle.digest("SHA-256", enc.encode(str)).then(function (buf) {
      return bytesToHex(buf);
    });
  }

  function hashWithSalt(salt, secret) {
    return sha256Hex(salt + ":" + String(secret));
  }

  function loadUsersMap() {
    try {
      var raw = localStorage.getItem(USERS_KEY);
      if (!raw) return {};
      var map = JSON.parse(raw);
      return map && typeof map === "object" ? map : {};
    } catch (e) {
      return {};
    }
  }

  function saveUsersMap(map) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(map));
    } catch (e) {}
  }

  function getAccount(email) {
    var map = loadUsersMap();
    return map[normalizeEmail(email)] || null;
  }

  function upsertAccount(account) {
    var map = loadUsersMap();
    var key = normalizeEmail(account.email);
    account.email = key;
    map[key] = account;
    saveUsersMap(map);
    return account;
  }

  /** Usable = has salted password hash (not placeholder / empty). */
  function isAccountUsable(acct) {
    return !!(acct && acct.passwordHash && acct.salt && !acct.placeholder);
  }

  /** Corrupt / incomplete local account (owner bootstrap may repair). */
  function isAccountCorrupt(acct) {
    if (!acct) return false;
    if (acct.placeholder) return true;
    if (!acct.passwordHash || !acct.salt) return true;
    return false;
  }

  function preferRememberDevice() {
    try {
      return localStorage.getItem(REMEMBER_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function isRememberChecked() {
    return !!(authRemember && authRemember.checked);
  }

  function sessionGet() {
    try {
      var remembered = localStorage.getItem(USER_KEY);
      if (remembered) return remembered;
    } catch (e) {}
    try {
      return sessionStorage.getItem(USER_KEY);
    } catch (e2) {
      return null;
    }
  }

  function sessionSet(val, remember) {
    var rem = typeof remember === "boolean" ? remember : preferRememberDevice();
    try {
      if (rem) {
        localStorage.setItem(USER_KEY, val);
        localStorage.setItem(REMEMBER_KEY, "1");
        try {
          sessionStorage.removeItem(USER_KEY);
        } catch (e0) {}
      } else {
        sessionStorage.setItem(USER_KEY, val);
        try {
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem(REMEMBER_KEY);
        } catch (e1) {}
      }
    } catch (e) {}
  }

  function sessionClear() {
    try {
      sessionStorage.removeItem(USER_KEY);
    } catch (e) {}
    try {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(REMEMBER_KEY);
    } catch (e2) {}
  }

  function loadUser() {
    try {
      var raw = sessionGet();
      if (!raw) return null;
      var u = JSON.parse(raw);
      if (!u || !u.token) return null;
      var email = normalizeEmail(u.email || u.identity);
      if (!email) return null;
      var acct = getAccount(email);
      if (!acct || !acct.verified) return null;
      if (acct.sessionToken && u.token !== acct.sessionToken) return null;
      u.email = email;
      u.identity = email;
      u.verified = true;
      u.isOwner = isOwnerEmail(email);
      applyEntitlementToUser(u, acct);
      return u;
    } catch (e) {
      return null;
    }
  }

  function saveUser(user) {
    try {
      var email = normalizeEmail(user.email || user.identity);
      var token = user.token || randomHex(24);
      var toSave = {
        token: token,
        email: email,
        identity: email,
        displayName: user.displayName || displayName(email),
        credits: isOwnerEmail(email) ? FREE_CREDITS : user.credits,
        verified: !!user.verified,
        createdAt: user.createdAt || Date.now(),
      };
      sessionSet(JSON.stringify(toSave), preferRememberDevice() || isRememberChecked());
      var acct = getAccount(email);
      if (acct) {
        acct.sessionToken = token;
        if (!isOwnerEmail(email)) {
          acct.credits = typeof user.credits === "number" ? user.credits : FREE_CREDITS;
        }
        upsertAccount(acct);
      }
      user.token = token;
    } catch (e) {}
  }

  function displayName(identity) {
    var s = String(identity || "").trim();
    if (s.indexOf("@") !== -1) {
      var local = s.split("@")[0];
      return local || s;
    }
    return s;
  }

  function isStrongPassword(pw) {
    pw = String(pw || "");
    if (pw.length < MIN_PASSWORD) return false;
    if (!/[a-z]/.test(pw)) return false;
    if (!/[A-Z]/.test(pw)) return false;
    if (!/[0-9]/.test(pw)) return false;
    return true;
  }

  function loadLockouts() {
    try {
      var raw = localStorage.getItem(LOCKOUT_KEY);
      var m = raw ? JSON.parse(raw) : {};
      return m && typeof m === "object" ? m : {};
    } catch (e) {
      return {};
    }
  }

  function saveLockouts(m) {
    try {
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify(m));
    } catch (e) {}
  }

  function getLockout(email) {
    email = normalizeEmail(email);
    var m = loadLockouts();
    var e = m[email] || { fails: 0, lockedUntil: 0 };
    if (e.lockedUntil && Date.now() >= e.lockedUntil) {
      e = { fails: 0, lockedUntil: 0 };
      m[email] = e;
      saveLockouts(m);
    }
    return e;
  }

  function recordPasswordFail(email) {
    email = normalizeEmail(email);
    var m = loadLockouts();
    var e = m[email] || { fails: 0, lockedUntil: 0 };
    e.fails = (e.fails || 0) + 1;
    if (e.fails >= MAX_PASSWORD_FAILS) {
      e.lockedUntil = Date.now() + LOCKOUT_MS;
      e.fails = 0;
    }
    m[email] = e;
    saveLockouts(m);
    return e;
  }

  function clearPasswordFails(email) {
    email = normalizeEmail(email);
    var m = loadLockouts();
    delete m[email];
    saveLockouts(m);
  }

  function lockoutSecondsLeft(email) {
    var e = getLockout(email);
    if (!e.lockedUntil || Date.now() >= e.lockedUntil) return 0;
    return Math.ceil((e.lockedUntil - Date.now()) / 1000);
  }

  /* —— entitlements / Pro / gift codes —— */
  function loadEntitlements() {
    try {
      var raw = localStorage.getItem(ENTITLEMENTS_KEY);
      var m = raw ? JSON.parse(raw) : {};
      return m && typeof m === "object" ? m : {};
    } catch (e) {
      return {};
    }
  }

  function saveEntitlements(m) {
    try {
      localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(m));
    } catch (e) {}
  }

  function getEntitlement(email) {
    email = normalizeEmail(email);
    var m = loadEntitlements();
    var e = m[email] || null;
    if (!e) return { unlimited: false, proUntil: 0 };
    if (e.proUntil && Date.now() > e.proUntil && !e.unlimited) {
      e.proUntil = 0;
      m[email] = e;
      saveEntitlements(m);
    }
    return e;
  }

  function setEntitlement(email, patch) {
    email = normalizeEmail(email);
    var m = loadEntitlements();
    var e = m[email] || { unlimited: false, proUntil: 0 };
    Object.keys(patch).forEach(function (k) {
      e[k] = patch[k];
    });
    m[email] = e;
    saveEntitlements(m);
    return e;
  }

  function applyEntitlementToUser(u, acct) {
    var email = normalizeEmail(u.email || u.identity);
    if (isOwnerEmail(email)) {
      u.credits = Infinity;
      u.pro = true;
      u.unlimited = true;
      return;
    }
    var ent = getEntitlement(email);
    u.unlimited = !!ent.unlimited;
    u.proUntil = ent.proUntil || 0;
    u.pro = !!ent.unlimited || (ent.proUntil && Date.now() < ent.proUntil);
    if (u.unlimited || u.pro) {
      u.credits = Infinity;
    } else if (typeof u.credits !== "number" || u.credits < 0) {
      u.credits = acct && typeof acct.credits === "number" ? acct.credits : FREE_CREDITS;
    }
  }

  function isPro() {
    if (isOwner()) return true;
    if (!currentUser) return false;
    if (currentUser.unlimited) return true;
    if (currentUser.proUntil && Date.now() < currentUser.proUntil) return true;
    var ent = getEntitlement(currentUser.email);
    return !!ent.unlimited || (ent.proUntil && Date.now() < ent.proUntil);
  }

  function activatePro(email, days, source) {
    email = normalizeEmail(email);
    var ms = Math.max(1, Number(days) || 30) * 24 * 60 * 60 * 1000;
    var ent = getEntitlement(email);
    var base = ent.proUntil && ent.proUntil > Date.now() ? ent.proUntil : Date.now();
    var until = base + ms;
    setEntitlement(email, { proUntil: until, unlimited: !!ent.unlimited, source: source || "checkout" });
    if (currentUser && normalizeEmail(currentUser.email) === email) {
      currentUser.pro = true;
      currentUser.proUntil = until;
      currentUser.credits = Infinity;
      saveUser(currentUser);
      updateCreditsUI();
    }
    return until;
  }

  function grantUnlimited(email) {
    email = normalizeEmail(email);
    setEntitlement(email, { unlimited: true, proUntil: getEntitlement(email).proUntil || 0, source: "owner-grant" });
    var acct = getAccount(email);
    if (acct) {
      acct.credits = 9999;
      upsertAccount(acct);
    }
    if (currentUser && normalizeEmail(currentUser.email) === email) {
      currentUser.unlimited = true;
      currentUser.pro = true;
      currentUser.credits = Infinity;
      saveUser(currentUser);
      updateCreditsUI();
    }
  }

  function revokeProLocal(email) {
    email = normalizeEmail(email);
    setEntitlement(email, { unlimited: false, proUntil: 0, source: "owner-revoke" });
    if (currentUser && normalizeEmail(currentUser.email) === email) {
      currentUser.unlimited = false;
      currentUser.pro = false;
      currentUser.proUntil = 0;
      var acct = getAccount(email);
      currentUser.credits = acct && typeof acct.credits === "number" ? acct.credits : FREE_CREDITS;
      saveUser(currentUser);
      updateCreditsUI();
    }
  }

  function setCreditsExact(email, n) {
    email = normalizeEmail(email);
    n = Math.max(0, Math.min(9999, Number(n) || 0));
    var acct = getAccount(email);
    if (!acct) {
      acct = {
        email: email,
        salt: randomHex(16),
        passwordHash: "",
        verified: false,
        credits: n,
        createdAt: Date.now(),
        placeholder: true,
      };
    } else {
      acct.credits = n;
    }
    upsertAccount(acct);
    /* Force free-tier credits: clear unlimited if setting a finite pool */
    var ent = getEntitlement(email);
    if (ent.unlimited) {
      setEntitlement(email, { unlimited: false, proUntil: ent.proUntil || 0, source: ent.source || "owner-force-credits" });
    }
    if (currentUser && normalizeEmail(currentUser.email) === email) {
      currentUser.unlimited = false;
      if (!(currentUser.proUntil && Date.now() < currentUser.proUntil)) {
        currentUser.pro = false;
        currentUser.credits = n;
      }
      saveUser(currentUser);
      updateCreditsUI();
    }
    return n;
  }

  function applyServerProLocal(email, proUntil, source) {
    email = normalizeEmail(email);
    setEntitlement(email, {
      proUntil: proUntil || 0,
      unlimited: false,
      source: source || "owner-grant",
    });
    if (currentUser && normalizeEmail(currentUser.email) === email) {
      currentUser.pro = !!(proUntil && proUntil > Date.now());
      currentUser.proUntil = proUntil || 0;
      currentUser.unlimited = false;
      if (currentUser.pro) {
        currentUser.credits = Infinity;
      } else {
        var acct = getAccount(email);
        currentUser.credits = acct && typeof acct.credits === "number" ? acct.credits : FREE_CREDITS;
      }
      saveUser(currentUser);
      updateCreditsUI();
    }
  }

  function ownerGrantPro(email, days) {
    email = normalizeEmail(email);
    days = Math.max(1, Math.min(3650, Math.floor(Number(days) || 30)));
    return fetch("/api/owner/grant-pro", {
      method: "POST",
      headers: ownerApiHeaders(),
      body: JSON.stringify({ email: email, days: Number(days) }),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return { httpOk: r.ok, body: body };
          });
      })
      .then(function (result) {
        if (result.httpOk && result.body && result.body.ok && result.body.proUntil) {
          applyServerProLocal(email, result.body.proUntil, "owner-grant");
          return {
            server: true,
            until: result.body.proUntil,
            plan: result.body.plan,
            email: email,
          };
        }
        var until = activatePro(email, days, "owner-grant");
        return {
          server: false,
          until: until,
          email: email,
          error: (result.body && result.body.error) || "Server grant failed",
        };
      })
      .catch(function () {
        var until = activatePro(email, days, "owner-grant");
        return {
          server: false,
          until: until,
          email: email,
          error: "Server unreachable",
        };
      });
  }

  function ownerRevokePro(email) {
    email = normalizeEmail(email);
    return fetch("/api/owner/revoke-pro", {
      method: "POST",
      headers: ownerApiHeaders(),
      body: JSON.stringify({ email: email }),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return { httpOk: r.ok, body: body };
          });
      })
      .then(function (result) {
        if (result.httpOk && result.body && result.body.ok) {
          revokeProLocal(email);
          return { server: true, email: email };
        }
        revokeProLocal(email);
        return {
          server: false,
          email: email,
          error: (result.body && result.body.error) || "Server revoke failed",
        };
      })
      .catch(function () {
        revokeProLocal(email);
        return {
          server: false,
          email: email,
          error: "Server unreachable",
        };
      });
  }

  function addCreditsToEmail(email, n) {
    email = normalizeEmail(email);
    n = Math.max(0, Number(n) || 0);
    var acct = getAccount(email);
    if (!acct) {
      acct = {
        email: email,
        salt: randomHex(16),
        passwordHash: "",
        verified: false,
        credits: FREE_CREDITS + n,
        createdAt: Date.now(),
        placeholder: true,
      };
    } else {
      acct.credits = (typeof acct.credits === "number" ? acct.credits : FREE_CREDITS) + n;
    }
    upsertAccount(acct);
    if (currentUser && normalizeEmail(currentUser.email) === email && !isPro()) {
      currentUser.credits = acct.credits;
      saveUser(currentUser);
      updateCreditsUI();
    }
    return acct.credits;
  }

  function loadGiftCodes() {
    try {
      var raw = localStorage.getItem(GIFT_CODES_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveGiftCodes(list) {
    try {
      localStorage.setItem(GIFT_CODES_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function randomGiftCode() {
    var alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var out = "VOID-";
    for (var i = 0; i < 8; i++) {
      var arr = new Uint32Array(1);
      if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(arr);
      else arr[0] = (Math.random() * 0xffffffff) | 0;
      out += alphabet[arr[0] % alphabet.length];
    }
    return out;
  }

  function createGiftCode(opts) {
    opts = opts || {};
    var code = String(opts.code || "").trim().toUpperCase() || randomGiftCode();
    var days = Number(opts.days) || 30;
    var max = Math.max(1, Number(opts.maxRedemptions) || 1);
    var list = loadGiftCodes();
    if (
      list.some(function (c) {
        return c.code === code && !c.revoked;
      })
    ) {
      throw new Error("Code already exists");
    }
    var entry = {
      code: code,
      days: days,
      maxRedemptions: max,
      redemptions: 0,
      revoked: false,
      createdAt: Date.now(),
      redeemedBy: [],
    };
    list.unshift(entry);
    saveGiftCodes(list);
    return entry;
  }

  function revokeGiftCode(code) {
    code = String(code || "").trim().toUpperCase();
    var list = loadGiftCodes();
    list.forEach(function (c) {
      if (c.code === code) c.revoked = true;
    });
    saveGiftCodes(list);
  }

  function redeemGiftCode(code, email) {
    code = String(code || "").trim().toUpperCase();
    email = normalizeEmail(email);
    if (!code) return { ok: false, error: "Enter a code" };
    if (!email) return { ok: false, error: "Sign in first" };
    var list = loadGiftCodes();
    var found = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].code === code) {
        found = list[i];
        break;
      }
    }
    if (!found) return { ok: false, error: "Invalid code" };
    if (found.revoked) return { ok: false, error: "Code revoked" };
    if (found.redemptions >= found.maxRedemptions) return { ok: false, error: "Code fully redeemed" };
    if (found.redeemedBy && found.redeemedBy.indexOf(email) !== -1) {
      return { ok: false, error: "You already redeemed this code" };
    }
    found.redemptions += 1;
    found.redeemedBy = found.redeemedBy || [];
    found.redeemedBy.push(email);
    saveGiftCodes(list);
    var until = activatePro(email, found.days, "gift:" + code);
    return { ok: true, days: found.days, until: until };
  }

  function bumpStatGens() {
    try {
      var s = JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
      s.gens = (s.gens || 0) + 1;
      localStorage.setItem(STATS_KEY, JSON.stringify(s));
    } catch (e) {}
  }

  function getStatGens() {
    try {
      var s = JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
      return s.gens || 0;
    } catch (e) {
      return 0;
    }
  }

  function isMaintenanceOn() {
    try {
      return localStorage.getItem(MAINTENANCE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function setMaintenance(on) {
    try {
      localStorage.setItem(MAINTENANCE_KEY, on ? "1" : "0");
    } catch (e) {}
    applyMaintenanceUI();
    syncOwnerAdminPanel();
    if (isOwner()) pushSiteConfig({ maintenance: !!on });
  }

  function applyMaintenanceUI() {
    var on = isMaintenanceOn();
    var owner = isOwner();
    var signedIn = !!(currentUser && currentUser.verified);

    if (maintenanceToggle) {
      maintenanceToggle.setAttribute("aria-checked", on ? "true" : "false");
      maintenanceToggle.classList.toggle("is-on", on);
    }
    if (maintenanceToggleStatus) {
      maintenanceToggleStatus.textContent = on ? "On" : "Off";
    }
    if (ownerMaintToggle) {
      ownerMaintToggle.setAttribute("aria-checked", on ? "true" : "false");
      ownerMaintToggle.classList.toggle("is-on", on);
    }
    if (ownerMaintStatus) ownerMaintStatus.textContent = on ? "On" : "Off";

    if (on && !owner) {
      if (maintenanceOverlay) maintenanceOverlay.hidden = false;
      if (appMain) appMain.hidden = true;
      if (authGate) authGate.hidden = true;
      if (ownerPanel) ownerPanel.hidden = true;
      if (navCredits) navCredits.hidden = true;
      if (navUser) navUser.hidden = true;
      if (navProBadge) navProBadge.hidden = true;
      if (navGuestAuth) navGuestAuth.hidden = true;
      if (guestBanner) guestBanner.hidden = true;
      syncOwnerVisibility();
      return;
    }

    if (maintenanceOverlay) maintenanceOverlay.hidden = true;

    if (signedIn) {
      if (authGate) {
        authGate.hidden = true;
        authGate.classList.remove("is-modal");
      }
      if (appMain && (!ownerPanel || ownerPanel.hidden)) appMain.hidden = false;
      updateCreditsUI();
    } else if (!ownerPanel || ownerPanel.hidden) {
      /* Guests keep studio when maintenance is off */
      updateCreditsUI();
    }
  }

  function creditsLabel(n) {
    if (isOwner()) return "∞ / Owner";
    if (isPro()) {
      if (currentUser && currentUser.unlimited) return "∞ / Pro";
      return "∞ / Pro";
    }
    if (n <= 0) return "0 free left";
    return n + " free left";
  }

  function updateCreditsUI() {
    if (!isSignedIn()) {
      ensureGuestCredits();
      var g = getGuestCredits();
      if (navGuestAuth) navGuestAuth.hidden = false;
      if (navCredits) navCredits.hidden = false;
      if (creditsPill) {
        creditsPill.textContent = g <= 0 ? "0 guest left" : g + " guest left";
        creditsPill.classList.toggle("credits-empty", g <= 0);
        creditsPill.classList.remove("credits-owner", "credits-pro");
        creditsPill.title = "Guest demo generations left — sign in for 10 free gens";
      }
      if (navUser) navUser.hidden = true;
      if (navProBadge) navProBadge.hidden = true;
      if (guestBanner) guestBanner.hidden = false;
      if (guestBannerSignin) { /* keep */ }
      var blockedMaint = isMaintenanceOn();
      if (generateBtn) {
        generateBtn.disabled = g <= 0 || blockedMaint;
        generateBtn.title = blockedMaint
          ? "App is in maintenance mode"
          : g <= 0
            ? "Guest demos used up — sign in for 10 free gens"
            : "Generate demo clips as guest";
        generateBtn.classList.toggle("is-blocked", g <= 0 || blockedMaint);
      }
      if (upgradeCta) upgradeCta.hidden = true;
      syncOwnerVisibility();
      applyFeatureFlagsUI();
      return;
    }
    if (navGuestAuth) navGuestAuth.hidden = true;
    if (guestBanner) guestBanner.hidden = true;
    /* refresh entitlement flags */
    applyEntitlementToUser(currentUser, getAccount(currentUser.email));

    var owner = isOwner();
    var pro = isPro();
    if (navCredits) navCredits.hidden = false;
    if (creditsPill) {
      creditsPill.textContent = creditsLabel(currentUser.credits);
      creditsPill.classList.toggle("credits-empty", !owner && !pro && currentUser.credits <= 0);
      creditsPill.classList.toggle("credits-owner", owner);
      creditsPill.classList.toggle("credits-pro", !owner && pro);
      creditsPill.title = owner
        ? "Unlimited owner credits"
        : pro
          ? "Pro — unlimited gens this period"
          : "Free demo generations left";
    }
    if (navUser) navUser.hidden = false;
    if (userNameEl) userNameEl.textContent = displayName(currentUser.email || currentUser.identity);
    if (navProBadge) navProBadge.hidden = owner || !pro;
    syncOwnerVisibility();
    applyFeatureFlagsUI();

    var out = !owner && !pro && currentUser.credits <= 0;
    if (upgradeCta) upgradeCta.hidden = !out;
    if (generateBtn) {
      var blockedMaint = isMaintenanceOn() && !owner;
      generateBtn.disabled = out || blockedMaint;
      generateBtn.title = blockedMaint
        ? "App is in maintenance mode"
        : out
          ? "No free generations left — upgrade or redeem a code"
          : "";
      generateBtn.classList.toggle("is-blocked", out || blockedMaint);
    }
  }

  function showSignedIn() {
    if (authVerifyPanel) authVerifyPanel.hidden = true;
    if (authSigninPanel) authSigninPanel.hidden = false;
    if (isMaintenanceOn() && !isOwner()) {
      if (authGate) authGate.hidden = true;
      applyMaintenanceUI();
      showToast("VOID Clips is updating — back soon");
      return;
    }
    if (authGate) authGate.hidden = true;
    if (ownerPanel) ownerPanel.hidden = true;
    if (appMain) appMain.hidden = false;
    updateCreditsUI();
    applyMaintenanceUI();
    maybeShowOnboarding();
  }

  function showGuestStudio() {
    if (isMaintenanceOn() && !isOwner()) {
      applyMaintenanceUI();
      return;
    }
    if (authGate) {
      authGate.hidden = true;
      authGate.classList.remove("is-modal");
    }
    if (ownerPanel) ownerPanel.hidden = true;
    if (appMain) appMain.hidden = false;
    if (onboardingModal) onboardingModal.hidden = true;
    ensureGuestCredits();
    updateCreditsUI();
    applyMaintenanceUI();
    syncOwnerVisibility();
  }

  function showAuthGate(opts) {
    opts = opts || {};
    var soft = !!opts.soft;
    if (maintenanceOverlay) maintenanceOverlay.hidden = true;
    if (ownerPanel) ownerPanel.hidden = true;
    if (authGate) {
      authGate.hidden = false;
      authGate.classList.toggle("is-modal", soft);
    }
    /* Soft: keep studio under the modal. Hard: full-page wall (rare). */
    if (appMain) appMain.hidden = soft ? false : true;
    if (!soft) {
      if (navCredits) navCredits.hidden = true;
      if (navUser) navUser.hidden = true;
      if (navProBadge) navProBadge.hidden = true;
      if (navGuestAuth) navGuestAuth.hidden = true;
    } else {
      updateCreditsUI();
    }
    syncOwnerVisibility();
    if (onboardingModal) onboardingModal.hidden = true;
    showSignInPanel();
    if (authContinueGuest) authContinueGuest.hidden = false;
    if (authIdentity) {
      setTimeout(function () {
        authIdentity.focus();
      }, 50);
    }
  }

  function showSignInPanel() {
    pendingVerifyEmail = null;
    pendingVerifyViaApi = false;
    pendingResetEmail = null;
    pendingAuthPurpose = "verify";
    if (authSigninPanel) authSigninPanel.hidden = false;
    if (authVerifyPanel) authVerifyPanel.hidden = true;
    if (authForgotPanel) authForgotPanel.hidden = true;
    if (authTitle) authTitle.textContent = "Welcome to VOID";
    if (authSub) {
      authSub.innerHTML =
        'Sign in for <strong>10 free gens</strong> + save history — or continue as guest to try the demo.';
    }
    if (authError) {
      authError.hidden = true;
      authError.textContent = "";
    }
    if (verifyDemoWarn) verifyDemoWarn.hidden = true;
    if (forgotDemoWarn) forgotDemoWarn.hidden = true;
    setAuthMode(authMode || "signin");
  }

  function showVerifyPanel(email) {
    pendingVerifyEmail = normalizeEmail(email);
    pendingAuthPurpose = "verify";
    if (authGate) authGate.hidden = false;
    if (appMain) appMain.hidden = true;
    if (authSigninPanel) authSigninPanel.hidden = true;
    if (authForgotPanel) authForgotPanel.hidden = true;
    if (authVerifyPanel) authVerifyPanel.hidden = false;
    if (authTitle) authTitle.textContent = "Verify your email";
    if (authSub) {
      authSub.textContent = "Enter the 6-digit code to unlock the app. Max " + MAX_CODE_TRIES + " tries.";
    }
    if (verifyEmailLabel) verifyEmailLabel.textContent = pendingVerifyEmail;
    if (verifyError) {
      verifyError.hidden = true;
      verifyError.textContent = "";
    }
    if (verifyCode) {
      verifyCode.value = "";
      setTimeout(function () {
        verifyCode.focus();
      }, 40);
    }
  }

  function setForgotError(msg) {
    if (!forgotError) return;
    forgotError.textContent = msg || "";
    forgotError.hidden = !msg;
  }

  function setForgotResetError(msg) {
    if (!forgotResetError) return;
    forgotResetError.textContent = msg || "";
    forgotResetError.hidden = !msg;
  }

  function showForgotPanel(prefillEmail) {
    pendingAuthPurpose = "reset";
    pendingResetEmail = normalizeEmail(prefillEmail || (authIdentity && authIdentity.value) || "");
    if (authGate) authGate.hidden = false;
    if (appMain) appMain.hidden = true;
    if (authSigninPanel) authSigninPanel.hidden = true;
    if (authVerifyPanel) authVerifyPanel.hidden = true;
    if (authForgotPanel) authForgotPanel.hidden = false;
    if (authTitle) authTitle.textContent = "Reset password";
    if (authSub) {
      authSub.textContent = "Send a 6-digit code, then choose a new strong password. Max " + MAX_CODE_TRIES + " code tries.";
    }
    if (forgotEmailForm) forgotEmailForm.hidden = false;
    if (forgotResetForm) forgotResetForm.hidden = true;
    if (forgotResendBtn) forgotResendBtn.hidden = true;
    if (forgotLead) {
      forgotLead.innerHTML =
        'Enter your email. We’ll send a <strong>6-digit reset code</strong> (same as verify — demo fallback shows the code).';
    }
    setForgotError("");
    setForgotResetError("");
    if (forgotDemoWarn) forgotDemoWarn.hidden = true;
    if (forgotEmail) {
      forgotEmail.value = pendingResetEmail || "";
      setTimeout(function () {
        forgotEmail.focus();
      }, 40);
    }
    if (forgotCode) forgotCode.value = "";
    if (forgotNewPassword) forgotNewPassword.value = "";
    if (forgotNewPasswordConfirm) forgotNewPasswordConfirm.value = "";
  }

  function showForgotResetStep(email) {
    pendingResetEmail = normalizeEmail(email);
    pendingAuthPurpose = "reset";
    if (forgotEmailForm) forgotEmailForm.hidden = true;
    if (forgotResetForm) forgotResetForm.hidden = false;
    if (forgotResendBtn) forgotResendBtn.hidden = false;
    if (forgotLead) {
      forgotLead.innerHTML =
        'Enter the code for <span class="verify-email-label">' +
        pendingResetEmail +
        "</span>, then set a new password.";
    }
    if (forgotCode) {
      forgotCode.value = "";
      setTimeout(function () {
        forgotCode.focus();
      }, 40);
    }
    setForgotResetError("");
  }

  function setAuthError(msg) {
    if (!authError) return;
    authError.textContent = msg || "";
    authError.hidden = !msg;
  }

  function setVerifyError(msg) {
    if (!verifyError) return;
    verifyError.textContent = msg || "";
    verifyError.hidden = !msg;
  }

  function setRedeemMsg(msg, ok) {
    if (!redeemMsg) return;
    redeemMsg.textContent = msg || "";
    redeemMsg.hidden = !msg;
    redeemMsg.classList.toggle("redeem-ok", !!ok);
  }

  function sessionFromAccount(acct) {
    var owner = isOwnerEmail(acct.email);
    var u = {
      email: acct.email,
      identity: acct.email,
      displayName: displayName(acct.email),
      credits: owner ? Infinity : typeof acct.credits === "number" ? acct.credits : FREE_CREDITS,
      verified: !!acct.verified,
      isOwner: owner,
      createdAt: acct.createdAt || Date.now(),
      token: acct.sessionToken || randomHex(24),
    };
    applyEntitlementToUser(u, acct);
    return u;
  }

  function unlockSession(acct) {
    if (isRememberChecked()) {
      try {
        localStorage.setItem(REMEMBER_KEY, "1");
      } catch (e) {}
    }
    currentUser = sessionFromAccount(acct);
    saveUser(currentUser);
    justSignedIn = true;
    showSignedIn();
    if (isOwner()) {
      showToast("Welcome, Owner — unlimited credits");
    } else if (isPro()) {
      showToast("Welcome — Pro active");
    } else {
      showToast("Welcome — " + FREE_CREDITS + " free generations");
    }
  }

  function persistPendingVerify(email, codeHash, salt, tries, purpose) {
    try {
      localStorage.setItem(
        VERIFY_KEY,
        JSON.stringify({
          email: normalizeEmail(email),
          codeHash: codeHash,
          salt: salt,
          tries: typeof tries === "number" ? tries : 0,
          viaApi: false,
          purpose: purpose || pendingAuthPurpose || "verify",
          expiresAt: Date.now() + 15 * 60 * 1000,
        })
      );
    } catch (e) {}
  }

  function loadPendingVerify() {
    try {
      var raw = localStorage.getItem(VERIFY_KEY);
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (!p || !p.email) return null;
      if (p.expiresAt && Date.now() > p.expiresAt) {
        localStorage.removeItem(VERIFY_KEY);
        return null;
      }
      return p;
    } catch (e) {
      return null;
    }
  }

  function clearPendingVerify() {
    try {
      localStorage.removeItem(VERIFY_KEY);
    } catch (e) {}
  }

  function generateSixDigitCode() {
    var n;
    if (window.crypto && crypto.getRandomValues) {
      var arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      n = arr[0] % 1000000;
    } else {
      n = (Math.random() * 1000000) | 0;
    }
    return ("000000" + n).slice(-6);
  }

  function showDemoCode(code) {
    if (demoCodeValue) demoCodeValue.textContent = code;
    if (demoCodeModal) openModal(demoCodeModal);
    if (verifyDemoWarn) verifyDemoWarn.hidden = false;
    showToast("Demo code shown — not secure");
  }

  function allowDemoFallback() {
    try {
      var params = new URLSearchParams(location.search || "");
      if (params.get("demo") === "1") return true;
    } catch (e) {}
    try {
      if (localStorage.getItem(DEMO_FLAG_KEY) === "1") return true;
    } catch (e2) {}
    /* static open / no server: keep demo fallback with warning */
    return true;
  }

  function getApiSecret() {
    /* Injected by server when serving HTML (same-origin public deploy). Never in static zip. */
    try {
      if (typeof window !== "undefined" && window.__VOID_API_SECRET__) {
        return String(window.__VOID_API_SECRET__);
      }
    } catch (e0) {}
    try {
      var s = localStorage.getItem(API_SECRET_KEY);
      if (s) return s;
    } catch (e) {}
    /* localhost auto-seed only — matches local server/.env; not used on public hosts */
    try {
      var h = location.hostname;
      if (h === "127.0.0.1" || h === "localhost") {
        var localSecret = "void_thplkwAhUeBsoowDx2AJCsYJ51xCykS3vR8z0Z_75iw";
        try { localStorage.setItem(API_SECRET_KEY, localSecret); } catch (e2) {}
        return localSecret;
      }
    } catch (e3) {}
    return "";
  }

  function apiHeaders() {
    var h = { "Content-Type": "application/json" };
    var secret = getApiSecret();
    if (secret) h["X-Void-Api-Secret"] = secret;
    return h;
  }

  function ownerApiHeaders() {
    var h = apiHeaders();
    h["X-Owner-Email"] = OWNER_EMAIL;
    return h;
  }

  function sendCode(email) {
    return sendVerificationCode(email);
  }

  function setDemoWarnVisible(show) {
    var msg = "Not secure — start server for real Gmail";
    if (verifyDemoWarn) {
      verifyDemoWarn.hidden = !show;
      if (show) verifyDemoWarn.textContent = msg;
    }
    if (forgotDemoWarn) {
      forgotDemoWarn.hidden = !show;
      if (show) forgotDemoWarn.textContent = msg;
    }
  }

  function setCodeFlowError(msg) {
    if (pendingAuthPurpose === "reset") {
      if (forgotResetForm && !forgotResetForm.hidden) setForgotResetError(msg);
      else setForgotError(msg);
    } else {
      setVerifyError(msg);
    }
  }

  function sendVerificationCode(email, purpose) {
    email = normalizeEmail(email);
    if (purpose) pendingAuthPurpose = purpose;
    if (!email || email.indexOf("@") === -1) {
      setCodeFlowError("Valid email required");
      return Promise.resolve(false);
    }
    pendingVerifyViaApi = false;
    setDemoWarnVisible(false);

    return fetch("/api/send-verify", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ email: email }),
    })
      .then(function (res) {
        return res.json().catch(function () {
          return {};
        }).then(function (body) {
          return { res: res, body: body };
        });
      })
      .then(function (pack) {
        var res = pack.res;
        var body = pack.body || {};
        if (res.ok && body.ok !== false) {
          pendingVerifyViaApi = true;
          try {
            localStorage.setItem(
              VERIFY_KEY,
              JSON.stringify({
                email: email,
                viaApi: true,
                tries: 0,
                purpose: pendingAuthPurpose || "verify",
                expiresAt: Date.now() + 15 * 60 * 1000,
              })
            );
          } catch (e) {}
          showToast("Code sent — check your email");
          return true;
        }
        /* API reachable but failed (503 no Resend, 401 bad secret, etc.) */
        return fallbackDemoOrError(email, body.error || ("API " + res.status));
      })
      .catch(function () {
        /* network / static without server */
        return fallbackDemoOrError(email, "API unavailable");
      });
  }

  function fallbackDemoOrError(email, reason) {
    if (!allowDemoFallback()) {
      setCodeFlowError((reason || "API failed") + " — start local server for real Gmail");
      setDemoWarnVisible(true);
      return false;
    }
    var code = generateSixDigitCode();
    var salt = randomHex(16);
    return hashWithSalt(salt, code).then(function (codeHash) {
      persistPendingVerify(email, codeHash, salt, 0, pendingAuthPurpose || "verify");
      pendingVerifyViaApi = false;
      showDemoCode(code);
      setDemoWarnVisible(true);
      return true;
    });
  }


  var authMode = "signin";

  function setAuthMode(mode) {
    authMode = mode === "signup" ? "signup" : "signin";
    var modeInput = document.getElementById("auth-mode");
    if (modeInput) modeInput.value = authMode;
    var tabIn = document.getElementById("tab-signin");
    var tabUp = document.getElementById("tab-signup");
    var confirmWrap = document.getElementById("auth-password-confirm-wrap");
    var confirmInput = document.getElementById("auth-password-confirm");
    var submitBtn = document.getElementById("auth-submit-btn");
    var hint = document.getElementById("auth-switch-hint");
    var title = document.getElementById("auth-title");
    var sub = document.getElementById("auth-sub");
    var pw = document.getElementById("auth-password");
    if (tabIn) {
      tabIn.classList.toggle("is-active", authMode === "signin");
      tabIn.setAttribute("aria-selected", authMode === "signin" ? "true" : "false");
    }
    if (tabUp) {
      tabUp.classList.toggle("is-active", authMode === "signup");
      tabUp.setAttribute("aria-selected", authMode === "signup" ? "true" : "false");
    }
    if (confirmWrap) confirmWrap.hidden = authMode !== "signup";
    if (confirmInput) {
      confirmInput.required = authMode === "signup";
      if (authMode !== "signup") confirmInput.value = "";
    }
    if (pw) pw.setAttribute("autocomplete", authMode === "signup" ? "new-password" : "current-password");
    if (submitBtn) submitBtn.textContent = authMode === "signup" ? "Create account" : "Sign in";
    if (hint) {
      hint.innerHTML =
        authMode === "signup"
          ? "Already have an account? Tap <strong>Sign in</strong>."
          : "No account yet? Tap <strong>Create account</strong>.";
    }
    if (authForgotRow) authForgotRow.hidden = authMode !== "signin";
    var rememberWrap = document.getElementById("auth-remember-wrap");
    if (rememberWrap) rememberWrap.hidden = authMode !== "signin";
    if (title) title.textContent = authMode === "signup" ? "Create your account" : "Welcome to VOID";
    if (sub) {
      sub.innerHTML =
        authMode === "signup"
          ? "Create an account with email + strong password, then verify with a 6-digit code."
          : "Sign in with your email and password. New here? Use <strong>Create account</strong>.";
    }
    setAuthError("");
    if (typeof updatePasswordHint === "function") updatePasswordHint();
  }

  function registerOrSignIn(email, password) {
    email = normalizeEmail(email);
    password = String(password || "");
    setAuthError("");

    if (!email || email.indexOf("@") === -1) {
      setAuthError("Enter a valid email address");
      return Promise.resolve();
    }

    var left = lockoutSecondsLeft(email);
    if (left > 0) {
      setAuthError("Too many failed attempts — try again in " + left + "s");
      return Promise.resolve();
    }

    if (!isStrongPassword(password)) {
      setAuthError("Password: min " + MIN_PASSWORD + " chars, upper + lower + number");
      return Promise.resolve();
    }

    var existing = getAccount(email);
    var usable = isAccountUsable(existing);
    var corrupt = isAccountCorrupt(existing);
    var confirmEl = document.getElementById("auth-password-confirm");
    var confirmPw = confirmEl ? String(confirmEl.value || "") : "";

    if (authMode === "signup") {
      var flagsNow = loadFeatureFlags();
      if (!flagsNow.signups && !isOwnerEmail(email)) {
        setAuthError("New signups are temporarily closed — try Sign in or check back later");
        return Promise.resolve();
      }
      if (usable) {
        setAuthError("Account already exists — switch to Sign in" + (isOwnerEmail(email) ? " (or Forgot password)" : ""));
        return Promise.resolve();
      }
      if (password !== confirmPw) {
        setAuthError("Passwords do not match");
        return Promise.resolve();
      }
      /* missing or corrupt (incl. owner bootstrap) → create / repair below */
    }

    if (authMode === "signin") {
      if (!existing || !usable) {
        if (isOwnerEmail(email)) {
          setAuthError("Owner account missing — Create account first (or use Forgot password)");
        } else if (corrupt) {
          setAuthError("Account incomplete — Create account again or Forgot password");
        } else {
          setAuthError("No account with that email — Create account first");
        }
        return Promise.resolve();
      }
    }

    if (authMode === "signin" && usable) {
      return hashWithSalt(existing.salt, password).then(function (hash) {
        if (hash !== existing.passwordHash) {
          var e = recordPasswordFail(email);
          if (e.lockedUntil && Date.now() < e.lockedUntil) {
            setAuthError("Wrong password — too many fails, locked 60s. Try Forgot password?");
          } else {
            var fails = e.fails || 0;
            setAuthError("Wrong password (" + (MAX_PASSWORD_FAILS - fails) + " tries left). Forgot password?");
          }
          return;
        }
        clearPasswordFails(email);
        if (preferRememberDevice() || isRememberChecked()) {
          try {
            localStorage.setItem(REMEMBER_KEY, "1");
          } catch (eR) {}
        }
        if (!existing.verified) {
          pendingVerifyEmail = email;
          showVerifyPanel(email);
          showToast("Verify your email to continue");
          return sendVerificationCode(email, "verify");
        }
        if (!isOwnerEmail(email) && typeof existing.credits !== "number") {
          existing.credits = FREE_CREDITS;
          upsertAccount(existing);
        }
        existing.sessionToken = randomHex(24);
        upsertAccount(existing);
        unlockSession(existing);
      });
    }

    /* new account, corrupt repair, or placeholder grant without password */
    var salt = randomHex(16);
    return hashWithSalt(salt, password).then(function (passwordHash) {
      var acct =
        existing && (existing.placeholder || corrupt)
          ? existing
          : existing && !usable
            ? existing
            : {
                email: email,
                credits: FREE_CREDITS,
                createdAt: Date.now(),
              };
      if (!acct || typeof acct !== "object") {
        acct = { email: email, credits: FREE_CREDITS, createdAt: Date.now() };
      }
      acct.email = email;
      acct.salt = salt;
      acct.passwordHash = passwordHash;
      acct.verified = false;
      if (typeof acct.credits !== "number") acct.credits = FREE_CREDITS;
      if (isOwnerEmail(email) && typeof acct.credits !== "number") acct.credits = FREE_CREDITS;
      delete acct.placeholder;
      upsertAccount(acct);
      pendingVerifyEmail = email;
      showVerifyPanel(email);
      return sendVerificationCode(email, "verify");
    });
  }

  function completeVerification(code) {
    code = String(code || "").trim();
    setVerifyError("");
    if (!/^\d{6}$/.test(code)) {
      setVerifyError("Enter the 6-digit code");
      return Promise.resolve();
    }
    var email = pendingVerifyEmail || (loadPendingVerify() && loadPendingVerify().email);
    if (!email) {
      setVerifyError("No pending verification — sign in again");
      return Promise.resolve();
    }
    var pending = loadPendingVerify();
    if (!pending || normalizeEmail(pending.email) !== normalizeEmail(email)) {
      setVerifyError("Code expired — tap Send code");
      return Promise.resolve();
    }

    if (pending.tries >= MAX_CODE_TRIES) {
      clearPendingVerify();
      setVerifyError("Too many code tries — request a new code");
      return Promise.resolve();
    }

    if (pending.viaApi || pendingVerifyViaApi) {
      return fetch("/api/verify-code", {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({ email: email, code: code }),
      })
        .then(function (res) {
          return res.json().catch(function () {
            return {};
          }).then(function (body) {
            return { res: res, body: body };
          });
        })
        .then(function (pack) {
          if (pack.res.ok && pack.body && pack.body.ok) {
            return finalizeVerifiedAccount(email);
          }
          pending.tries = (pending.tries || 0) + 1;
          try {
            localStorage.setItem(VERIFY_KEY, JSON.stringify(pending));
          } catch (e) {}
          var left = MAX_CODE_TRIES - pending.tries;
          setVerifyError((pack.body && pack.body.error) || ("Invalid code (" + left + " left)"));
          if (left <= 0) clearPendingVerify();
        })
        .catch(function () {
          setVerifyError("Verify API unavailable — tap Send code for demo fallback");
        });
    }

    if (!pending.codeHash || !pending.salt) {
      setVerifyError("Code expired — tap Send code");
      return Promise.resolve();
    }

    return hashWithSalt(pending.salt, code).then(function (hash) {
      if (hash !== pending.codeHash) {
        pending.tries = (pending.tries || 0) + 1;
        try {
          localStorage.setItem(VERIFY_KEY, JSON.stringify(pending));
        } catch (e) {}
        var left = MAX_CODE_TRIES - pending.tries;
        if (left <= 0) {
          clearPendingVerify();
          setVerifyError("Too many code tries — request a new code");
        } else {
          setVerifyError("Invalid code (" + left + " tries left)");
        }
        return;
      }
      return finalizeVerifiedAccount(email);
    });
  }

  function finalizeVerifiedAccount(email) {
    email = normalizeEmail(email);
    var acct = getAccount(email);
    if (!acct) {
      setVerifyError("Account missing — sign up again");
      return;
    }
    acct.verified = true;
    if (typeof acct.credits !== "number") acct.credits = FREE_CREDITS;
    acct.sessionToken = randomHex(24);
    upsertAccount(acct);
    clearPendingVerify();
    pendingVerifyViaApi = false;
    unlockSession(acct);
  }

  /** Shared: check 6-digit code against pending verify/reset (API or demo). */
  function checkPendingCode(email, code) {
    email = normalizeEmail(email);
    code = String(code || "").trim();
    var pending = loadPendingVerify();
    if (!pending || normalizeEmail(pending.email) !== email) {
      return Promise.resolve({ ok: false, error: "Code expired — request a new one" });
    }
    if (pending.tries >= MAX_CODE_TRIES) {
      clearPendingVerify();
      return Promise.resolve({ ok: false, error: "Too many code tries — request a new code" });
    }
    if (pending.viaApi || pendingVerifyViaApi) {
      return fetch("/api/verify-code", {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({ email: email, code: code }),
      })
        .then(function (res) {
          return res
            .json()
            .catch(function () {
              return {};
            })
            .then(function (body) {
              return { res: res, body: body };
            });
        })
        .then(function (pack) {
          if (pack.res.ok && pack.body && pack.body.ok) {
            clearPendingVerify();
            pendingVerifyViaApi = false;
            return { ok: true };
          }
          pending.tries = (pending.tries || 0) + 1;
          try {
            localStorage.setItem(VERIFY_KEY, JSON.stringify(pending));
          } catch (e) {}
          var left = MAX_CODE_TRIES - pending.tries;
          if (left <= 0) clearPendingVerify();
          return {
            ok: false,
            error: (pack.body && pack.body.error) || ("Invalid code (" + left + " left)"),
          };
        })
        .catch(function () {
          return { ok: false, error: "Verify API unavailable — resend for demo fallback" };
        });
    }
    if (!pending.codeHash || !pending.salt) {
      return Promise.resolve({ ok: false, error: "Code expired — request a new one" });
    }
    return hashWithSalt(pending.salt, code).then(function (hash) {
      if (hash !== pending.codeHash) {
        pending.tries = (pending.tries || 0) + 1;
        try {
          localStorage.setItem(VERIFY_KEY, JSON.stringify(pending));
        } catch (e) {}
        var left = MAX_CODE_TRIES - pending.tries;
        if (left <= 0) {
          clearPendingVerify();
          return { ok: false, error: "Too many code tries — request a new code" };
        }
        return { ok: false, error: "Invalid code (" + left + " tries left)" };
      }
      clearPendingVerify();
      pendingVerifyViaApi = false;
      return { ok: true };
    });
  }

  function startPasswordReset(email) {
    email = normalizeEmail(email);
    setForgotError("");
    if (!email || email.indexOf("@") === -1) {
      setForgotError("Enter a valid email address");
      return Promise.resolve(false);
    }
    var existing = getAccount(email);
    var usable = isAccountUsable(existing);
    var corrupt = isAccountCorrupt(existing);
    if (!existing || !usable) {
      if (isOwnerEmail(email)) {
        /* local demo owner bootstrap — allow reset to create/repair */
      } else if (!existing) {
        setForgotError("No account with that email — Create account first");
        return Promise.resolve(false);
      } else if (corrupt) {
        /* allow repair via reset */
      }
    }
    var left = lockoutSecondsLeft(email);
    if (left > 0) {
      setForgotError("Too many failed attempts — try again in " + left + "s");
      return Promise.resolve(false);
    }
    pendingResetEmail = email;
    pendingAuthPurpose = "reset";
    return sendVerificationCode(email, "reset").then(function (ok) {
      if (ok) showForgotResetStep(email);
      return ok;
    });
  }

  function completePasswordReset(code, newPassword, confirmPassword) {
    code = String(code || "").trim();
    newPassword = String(newPassword || "");
    confirmPassword = String(confirmPassword || "");
    setForgotResetError("");
    var email = pendingResetEmail || (loadPendingVerify() && loadPendingVerify().email);
    if (!email) {
      setForgotResetError("No pending reset — start again");
      return Promise.resolve();
    }
    email = normalizeEmail(email);
    if (!/^\d{6}$/.test(code)) {
      setForgotResetError("Enter the 6-digit code");
      return Promise.resolve();
    }
    if (!isStrongPassword(newPassword)) {
      setForgotResetError("Password: min " + MIN_PASSWORD + " chars, upper + lower + number");
      return Promise.resolve();
    }
    if (newPassword !== confirmPassword) {
      setForgotResetError("Passwords do not match");
      return Promise.resolve();
    }
    return checkPendingCode(email, code).then(function (result) {
      if (!result || !result.ok) {
        setForgotResetError((result && result.error) || "Invalid code");
        return;
      }
      var salt = randomHex(16);
      return hashWithSalt(salt, newPassword).then(function (passwordHash) {
        var acct = getAccount(email);
        if (!acct) {
          if (!isOwnerEmail(email)) {
            setForgotResetError("Account missing — Create account first");
            return;
          }
          /* local demo: owner bootstrap via Forgot password */
          acct = {
            email: email,
            credits: FREE_CREDITS,
            createdAt: Date.now(),
          };
        }
        acct.email = email;
        acct.salt = salt;
        acct.passwordHash = passwordHash;
        acct.verified = true;
        if (typeof acct.credits !== "number") acct.credits = FREE_CREDITS;
        delete acct.placeholder;
        acct.sessionToken = randomHex(24);
        upsertAccount(acct);
        clearPasswordFails(email);
        pendingResetEmail = null;
        pendingAuthPurpose = "verify";
        if (isRememberChecked()) {
          try {
            localStorage.setItem(REMEMBER_KEY, "1");
          } catch (eR) {}
        }
        unlockSession(acct);
        showToast("Password updated — signed in");
      });
    });
  }

  function changePassword(currentPw, newPw, confirmPw) {
    currentPw = String(currentPw || "");
    newPw = String(newPw || "");
    confirmPw = String(confirmPw || "");
    if (changePwError) {
      changePwError.hidden = true;
      changePwError.textContent = "";
    }
    if (changePwOk) {
      changePwOk.hidden = true;
      changePwOk.textContent = "";
    }
    if (!currentUser || !currentUser.email) {
      if (changePwError) {
        changePwError.textContent = "Sign in first";
        changePwError.hidden = false;
      }
      return Promise.resolve();
    }
    var email = normalizeEmail(currentUser.email);
    var acct = getAccount(email);
    if (!isAccountUsable(acct)) {
      if (changePwError) {
        changePwError.textContent = "Account incomplete — use Forgot password on sign-in";
        changePwError.hidden = false;
      }
      return Promise.resolve();
    }
    if (!isStrongPassword(newPw)) {
      if (changePwError) {
        changePwError.textContent = "New password: min " + MIN_PASSWORD + " chars, upper + lower + number";
        changePwError.hidden = false;
      }
      return Promise.resolve();
    }
    if (newPw !== confirmPw) {
      if (changePwError) {
        changePwError.textContent = "Passwords do not match";
        changePwError.hidden = false;
      }
      return Promise.resolve();
    }
    return hashWithSalt(acct.salt, currentPw).then(function (hash) {
      if (hash !== acct.passwordHash) {
        if (changePwError) {
          changePwError.textContent = "Current password is wrong";
          changePwError.hidden = false;
        }
        return;
      }
      var salt = randomHex(16);
      return hashWithSalt(salt, newPw).then(function (passwordHash) {
        acct.salt = salt;
        acct.passwordHash = passwordHash;
        acct.sessionToken = randomHex(24);
        upsertAccount(acct);
        currentUser.token = acct.sessionToken;
        saveUser(currentUser);
        if (changePwOk) {
          changePwOk.textContent = "Password updated";
          changePwOk.hidden = false;
        }
        if (changePwCurrent) changePwCurrent.value = "";
        if (changePwNew) changePwNew.value = "";
        if (changePwConfirm) changePwConfirm.value = "";
        showToast("Password changed");
      });
    });
  }

  function resetLocalSession() {
    var email = currentUser && (currentUser.email || currentUser.identity);
    if (email) {
      var acct = getAccount(email);
      if (acct) {
        acct.sessionToken = randomHex(24);
        upsertAccount(acct);
      }
    }
    currentUser = null;
    justSignedIn = false;
    pendingVerifyEmail = null;
    pendingVerifyViaApi = false;
    pendingResetEmail = null;
    sessionClear();
    clearPendingVerify();
    if (settingsModal) closeModal(settingsModal);
    if (ownerPanel) ownerPanel.hidden = true;
    showGuestStudio();
    showToast("Local session reset — guest demo available");
  }

  function signOut() {
    currentUser = null;
    justSignedIn = false;
    pendingVerifyEmail = null;
    pendingVerifyViaApi = false;
    sessionClear();
    if (resultsEl) resultsEl.classList.remove("active");
    if (upgradeCta) upgradeCta.hidden = true;
    lastClips = [];
    setEmptyVisible(true);
    if (navProBadge) navProBadge.hidden = true;
    syncOwnerVisibility();
    showGuestStudio();
    applyFeatureFlagsUI();
    showToast("Signed out — guest demo available");
  }

  function consumeCredit() {
    if (isSignedIn()) {
      if (isOwner() || isPro()) {
        updateCreditsUI();
        return true;
      }
      if (currentUser.credits <= 0) return false;
      currentUser.credits -= 1;
      saveUser(currentUser);
      updateCreditsUI();
      return true;
    }
    var g = getGuestCredits();
    if (g <= 0) return false;
    setGuestCredits(g - 1);
    updateCreditsUI();
    return true;
  }

  var tabSignin = document.getElementById("tab-signin");
  var tabSignup = document.getElementById("tab-signup");
  if (tabSignin) tabSignin.addEventListener("click", function () { setAuthMode("signin"); });
  if (tabSignup) tabSignup.addEventListener("click", function () { setAuthMode("signup"); });
  setAuthMode("signin");

  if (authForm) {
    authForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var id = (authIdentity && authIdentity.value) || "";
      var pw = (authPassword && authPassword.value) || "";
      var submitBtn = document.getElementById("auth-submit-btn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-busy", "true");
      }
      registerOrSignIn(id, pw)
        .catch(function (err) {
          setAuthError((err && err.message) || "Auth failed — try again");
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute("aria-busy");
          }
        });
    });
  }

  if (verifyForm) {
    verifyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var vBtn = verifyForm.querySelector('button[type="submit"]');
      if (vBtn) {
        vBtn.disabled = true;
        vBtn.setAttribute("aria-busy", "true");
      }
      completeVerification(verifyCode && verifyCode.value)
        .catch(function () {
          setVerifyError("Verification failed");
        })
        .then(function () {
          if (vBtn) {
            vBtn.disabled = false;
            vBtn.removeAttribute("aria-busy");
          }
        });
    });
  }

  if (sendCodeBtn) {
    sendCodeBtn.addEventListener("click", function () {
      var email = pendingVerifyEmail;
      if (!email) {
        setVerifyError("No email pending");
        return;
      }
      sendCodeBtn.disabled = true;
      sendCode(email)
        .then(function () {
          sendCodeBtn.disabled = false;
        })
        .catch(function () {
          sendCodeBtn.disabled = false;
          setVerifyError("Could not send code");
        });
    });
  }

  if (verifyBackBtn) {
    verifyBackBtn.addEventListener("click", function () {
      showSignInPanel();
    });
  }

  if (demoCodeClose) {
    demoCodeClose.addEventListener("click", function () {
      closeModal(demoCodeModal);
    });
  }
  if (demoCodeModal) {
    demoCodeModal.addEventListener("click", function (e) {
      if (e.target === demoCodeModal) closeModal(demoCodeModal);
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
      signOut();
    });
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener("click", function () {
      showForgotPanel(authIdentity && authIdentity.value);
    });
  }
  if (forgotBackBtn) {
    forgotBackBtn.addEventListener("click", function () {
      showSignInPanel();
    });
  }
  if (forgotEmailForm) {
    forgotEmailForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var em = (forgotEmail && forgotEmail.value) || "";
      if (forgotSendBtn) forgotSendBtn.disabled = true;
      startPasswordReset(em)
        .then(function () {
          if (forgotSendBtn) forgotSendBtn.disabled = false;
        })
        .catch(function () {
          if (forgotSendBtn) forgotSendBtn.disabled = false;
          setForgotError("Could not send reset code");
        });
    });
  }
  if (forgotResendBtn) {
    forgotResendBtn.addEventListener("click", function () {
      var em = pendingResetEmail || (forgotEmail && forgotEmail.value) || "";
      if (!em) {
        setForgotResetError("No email pending");
        return;
      }
      forgotResendBtn.disabled = true;
      pendingAuthPurpose = "reset";
      sendVerificationCode(em, "reset")
        .then(function () {
          forgotResendBtn.disabled = false;
        })
        .catch(function () {
          forgotResendBtn.disabled = false;
          setForgotResetError("Could not resend code");
        });
    });
  }
  if (forgotResetForm) {
    forgotResetForm.addEventListener("submit", function (e) {
      e.preventDefault();
      completePasswordReset(
        forgotCode && forgotCode.value,
        forgotNewPassword && forgotNewPassword.value,
        forgotNewPasswordConfirm && forgotNewPasswordConfirm.value
      ).catch(function () {
        setForgotResetError("Reset failed — try again");
      });
    });
  }
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      changePassword(
        changePwCurrent && changePwCurrent.value,
        changePwNew && changePwNew.value,
        changePwConfirm && changePwConfirm.value
      ).catch(function () {
        if (changePwError) {
          changePwError.textContent = "Could not change password";
          changePwError.hidden = false;
        }
      });
    });
  }
  if (settingsSignOutBtn) {
    settingsSignOutBtn.addEventListener("click", function () {
      if (settingsModal) closeModal(settingsModal);
      signOut();
    });
  }
  if (resetSessionBtn) {
    resetSessionBtn.addEventListener("click", function () {
      resetLocalSession();
    });
  }

  /* —— prefs —— */
  function loadPrefs() {
    try {
      var p = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
      if (p.style && CLIPS[p.style]) state.style = p.style;
      if (p.lang && ["en", "sv", "both"].indexOf(p.lang) !== -1) state.lang = p.lang;
      if (p.aspect && ["9:16", "1:1", "16:9"].indexOf(p.aspect) !== -1) state.aspect = p.aspect;
      if (typeof p.voidMode === "boolean") state.voidMode = p.voidMode;
    } catch (e) {}
  }

  function savePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function aspectClass(aspect) {
    if (aspect === "1:1") return "aspect-1-1";
    if (aspect === "16:9") return "aspect-16-9";
    return "aspect-9-16";
  }

  function aspectMetaLabel(aspect) {
    if (aspect === "1:1") return "square";
    if (aspect === "16:9") return "landscape";
    return "vertical";
  }

  function applyAspectChrome() {
    if (!clipsGrid) return;
    clipsGrid.classList.remove("aspect-9-16", "aspect-1-1", "aspect-16-9");
    clipsGrid.classList.add(aspectClass(state.aspect));
    document.querySelectorAll(".clip-meta .aspect-label").forEach(function (el) {
      el.textContent = aspectMetaLabel(state.aspect);
    });
  }

  function syncSegmented() {
    document.querySelectorAll("#style-presets .seg-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-style") === state.style);
    });
    document.querySelectorAll("#lang-toggle .seg-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === state.lang);
    });
    document.querySelectorAll("#aspect-toggle .seg-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-aspect") === state.aspect);
    });
    applyAspectChrome();
    var hint = document.getElementById("style-hint");
    if (hint) {
      hint.textContent =
        state.style === "story"
          ? "Story · cold open → escalate → reveal → payoff"
          : state.style === "funny"
            ? "Funny · reaction punch · chaos · fail energy"
            : "Viral · interrupt + delayed payoff";
    }
  }

  var stylePresets = document.getElementById("style-presets");
  var langToggle = document.getElementById("lang-toggle");
  var aspectToggle = document.getElementById("aspect-toggle");

  if (stylePresets) {
    stylePresets.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-style]");
      if (!btn) return;
      state.style = btn.getAttribute("data-style");
      savePrefs();
      syncSegmented();
      if (lastClips.length && resultsEl && resultsEl.classList.contains("active")) {
        renderClips();
        showToast("Style → " + (state.style === "viral" ? "Viral Hook" : state.style === "story" ? "Story" : "Funny"));
      }
      markOnboardStep("style");
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang]");
      if (!btn) return;
      state.lang = btn.getAttribute("data-lang");
      savePrefs();
      syncSegmented();
      if (lastClips.length && resultsEl && resultsEl.classList.contains("active")) {
        renderClips();
      }
      markOnboardStep("style");
    });
  }

  if (aspectToggle) {
    aspectToggle.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-aspect]");
      if (!btn) return;
      state.aspect = btn.getAttribute("data-aspect");
      savePrefs();
      syncSegmented();
      if (lastClips.length && resultsEl && resultsEl.classList.contains("active")) {
        renderClips();
      }
      markOnboardStep("aspect");
    });
  }


  var voidModeToggle = document.getElementById("void-mode-toggle");
  if (voidModeToggle) {
    voidModeToggle.addEventListener("click", function () {
      state.voidMode = !state.voidMode;
      savePrefs();
      applyVoidModeChrome();
      if (lastClips.length && resultsEl && resultsEl.classList.contains("active")) {
        renderClips();
      }
      showToast(state.voidMode ? "VOID mode on — Resonance emphasized" : "VOID mode off");
    });
  }


  /* —— toast —— */
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.hidden = false;
    toastEl.textContent = msg;
    requestAnimationFrame(function () {
      toastEl.classList.add("show");
    });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
      setTimeout(function () {
        toastEl.hidden = true;
      }, 280);
    }, 2200);
  }

  /* —— beta banner —— */
  function initBetaBanner() {
    if (!betaBanner) return;
    try {
      if (localStorage.getItem(BETA_BANNER_KEY) === "1") {
        betaBanner.hidden = true;
        return;
      }
    } catch (e) {}
    betaBanner.hidden = false;
    if (betaBannerDismiss) {
      betaBannerDismiss.addEventListener("click", function () {
        betaBanner.hidden = true;
        try {
          localStorage.setItem(BETA_BANNER_KEY, "1");
        } catch (e) {}
      });
    }
  }

  /* —— onboarding —— */
  function isOnboardingDismissed() {
    try {
      return localStorage.getItem(ONBOARD_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function dismissOnboarding() {
    try {
      localStorage.setItem(ONBOARD_KEY, "1");
    } catch (e) {}
    if (onboardingModal) onboardingModal.hidden = true;
  }

  function maybeShowOnboarding() {
    if (!currentUser || !onboardingModal) return;
    if (isOnboardingDismissed()) {
      onboardingModal.hidden = true;
      return;
    }
    // Show on first visit after sign-in (new session or returning without dismiss)
    onboardingModal.hidden = false;
  }

  function markOnboardStep(step) {
    var li = document.querySelector('#onboard-list [data-step="' + step + '"]');
    if (li) li.classList.add("done");
  }

  if (onboardingDone) {
    onboardingDone.addEventListener("click", function () {
      dismissOnboarding();
      if (urlInput) urlInput.focus();
    });
  }
  if (onboardingSkip) {
    onboardingSkip.addEventListener("click", dismissOnboarding);
  }

  /* —— settings —— */
  function openModal(el) {
    if (el) el.hidden = false;
  }
  function closeModal(el) {
    if (el) el.hidden = true;
  }

  if (settingsBtn) {
    settingsBtn.addEventListener("click", function () {
      syncOwnerAdminPanel();
      openModal(settingsModal);
    });
  }
  if (settingsClose) {
    settingsClose.addEventListener("click", function () {
      closeModal(settingsModal);
    });
  }
  if (settingsModal) {
    settingsModal.addEventListener("click", function (e) {
      if (e.target === settingsModal) closeModal(settingsModal);
    });
  }
  if (onboardingModal) {
    onboardingModal.addEventListener("click", function (e) {
      if (e.target === onboardingModal) dismissOnboarding();
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", function () {
      try {
        localStorage.removeItem(HISTORY_KEY);
        localStorage.removeItem(GEN_HISTORY_KEY);
      } catch (e) {}
      renderHistory();
      renderHistoryDrawer();
      showToast("History cleared");
    });
  }

  if (resetCreditsBtn) {
    resetCreditsBtn.addEventListener("click", function () {
      if (!currentUser) {
        showToast("Sign in first");
        return;
      }
      if (isOwner()) {
        showToast("Owner credits are unlimited");
        return;
      }
      currentUser.credits = FREE_CREDITS;
      saveUser(currentUser);
      updateCreditsUI();
      showToast("Credits reset to " + FREE_CREDITS + " (dev)");
    });
  }

  function syncOwnerAdminPanel() {
    syncOwnerVisibility();
    var on = isMaintenanceOn();
    if (maintenanceToggle) {
      maintenanceToggle.setAttribute("aria-checked", on ? "true" : "false");
      maintenanceToggle.classList.toggle("is-on", on);
    }
    if (maintenanceToggleStatus) {
      maintenanceToggleStatus.textContent = on ? "On" : "Off";
    }
    if (ownerMaintToggle) {
      ownerMaintToggle.setAttribute("aria-checked", on ? "true" : "false");
      ownerMaintToggle.classList.toggle("is-on", on);
    }
    if (ownerMaintStatus) ownerMaintStatus.textContent = on ? "On" : "Off";
    applyFeatureFlagsUI();
    applyAnnounceBanner();
  }

  function formatExpiry(ts) {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleString();
    } catch (e) {
      return String(ts);
    }
  }

  function renderGiftCodes() {
    if (!giftCodesList) return;
    var list = loadGiftCodes();
    if (!list.length) {
      giftCodesList.innerHTML = '<p class="settings-hint">No gift codes yet.</p>';
      return;
    }
    giftCodesList.innerHTML = list
      .map(function (c) {
        var status = c.revoked
          ? "revoked"
          : c.redemptions >= c.maxRedemptions
            ? "used up"
            : c.redemptions + "/" + c.maxRedemptions + " used";
        return (
          '<div class="gift-code-row' +
          (c.revoked ? " is-revoked" : "") +
          '">' +
          '<div><code class="gift-code-val">' +
          escapeHtml(c.code) +
          "</code>" +
          '<span class="gift-meta">' +
          c.days +
          "d · " +
          status +
          "</span></div>" +
          (c.revoked
            ? ""
            : '<button type="button" class="btn btn-ghost btn-sm gift-revoke" data-code="' +
              escapeHtml(c.code) +
              '">Disable</button>') +
          "</div>"
        );
      })
      .join("");
    giftCodesList.querySelectorAll(".gift-revoke").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!isOwner()) return;
        var code = btn.getAttribute("data-code");
        if (!confirm("Revoke gift code " + code + "? New redemptions will stop. Already-redeemed Pro stays until expiry.")) {
          return;
        }
        revokeGiftCode(code);
        renderGiftCodes();
        refreshOwnerStats();
        showToast("Code revoked");
      });
    });
  }

  function renderWaitlistView() {
    if (!waitlistView) return;
    var list = getWaitlist();
    if (!list.length) {
      waitlistView.innerHTML = '<p class="settings-hint">Waitlist empty.</p>';
      return;
    }
    waitlistView.innerHTML =
      '<ul class="waitlist-ul">' +
      list
        .map(function (e) {
          return "<li>" + escapeHtml(e) + "</li>";
        })
        .join("") +
      "</ul>";
  }

  function refreshOwnerStats() {
    if (!isOwner()) return;
    var users = loadUsersMap();
    var emails = Object.keys(users);
    var verified = emails.filter(function (e) {
      return users[e] && users[e].verified;
    }).length;
    var ents = loadEntitlements();
    var proN = Object.keys(ents).filter(function (e) {
      var x = ents[e];
      return x && (x.unlimited || (x.proUntil && x.proUntil > Date.now()));
    }).length;
    var allCodes = loadGiftCodes();
    var codes = allCodes.filter(function (c) {
      return !c.revoked && c.redemptions < c.maxRedemptions;
    }).length;
    var el = function (id, v) {
      var n = document.getElementById(id);
      if (n) n.textContent = String(v);
    };
    el("stat-signups", emails.length);
    el("stat-verified", verified);
    el("stat-gens", getStatGens());
    el("stat-waitlist", getWaitlist().length);
    el("stat-codes", codes);
    el("stat-codes-issued", allCodes.length);
    el("stat-pro", proN);
    el("stat-bugs", loadBugReports().length);
    fetch("/api/owner/stats", { headers: ownerApiHeaders() })
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        });
      })
      .then(function (data) {
        if (!data || !data.ok) return;
        if (typeof data.pendingSwish === "number") el("stat-swish", data.pendingSwish);
        if (typeof data.activeProGrants === "number") el("stat-pro-server", data.activeProGrants);
      })
      .catch(function () {});
  }

  function openOwnerPanel() {
    if (!isOwner()) {
      showToast("Owner only");
      syncOwnerVisibility();
      return;
    }
    if (settingsModal) closeModal(settingsModal);
    if (appMain) appMain.hidden = true;
    if (ownerPanel) ownerPanel.hidden = false;
    syncOwnerAdminPanel();
    renderGiftCodes();
    renderWaitlistView();
    renderOwnerBugReports();
    refreshOwnerStats();
    loadSwishPending();
    if (announceInput) announceInput.value = getAnnounceMessage();
  }

  function closeOwnerPanel() {
    if (ownerPanel) ownerPanel.hidden = true;
    if (isSignedIn()) {
      if (appMain) appMain.hidden = false;
      applyMaintenanceUI();
      updateCreditsUI();
    } else {
      showGuestStudio();
    }
  }


  /**
   * Edit when you go public: ISO end of launch promo (release + 30 days).
   * Empty string → treat as now+30d so local UI shows launch prices until you set a real date.
   * Example: "2026-11-01T00:00:00+01:00"
   */
  var LAUNCH_PROMO_UNTIL_ISO = "";

  var PRICE_EUR = {
    normal: { monthly: 9.99, yearly: 79 },
    launch: { monthly: 4.99, yearly: 39 },
  };

  function promoEndsAtMs() {
    if (cachedPricing && cachedPricing.promoEndsAt) return cachedPricing.promoEndsAt;
    if (LAUNCH_PROMO_UNTIL_ISO) {
      var t = Date.parse(LAUNCH_PROMO_UNTIL_ISO);
      if (!isNaN(t)) return t;
    }
    try {
      var stored = localStorage.getItem("void_clips_promo_ends_at");
      if (stored) {
        var n = Number(stored);
        if (n > 0) return n;
      }
      var def = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("void_clips_promo_ends_at", String(def));
      return def;
    } catch (e) {
      return Date.now() + 30 * 24 * 60 * 60 * 1000;
    }
  }

  function isLaunchPromoActiveClient() {
    if (cachedPricing && typeof cachedPricing.launchPromo === "boolean") return cachedPricing.launchPromo;
    return Date.now() < promoEndsAtMs();
  }

  function formatEur(n) {
    var s = Number(n).toFixed(2);
    if (s.slice(-3) === ".00") s = String(Math.round(n));
    return "€" + s;
  }

  function applyPricingUI() {
    var launch = isLaunchPromoActiveClient();
    var liveM = launch ? PRICE_EUR.launch.monthly : PRICE_EUR.normal.monthly;
    var liveY = launch ? PRICE_EUR.launch.yearly : PRICE_EUR.normal.yearly;
    if (cachedPricing && cachedPricing.display) {
      liveM = Number(cachedPricing.display.monthlyLive);
      liveY = Number(cachedPricing.display.yearlyLive);
    }
    var mNow = document.getElementById("price-monthly-now");
    var yNow = document.getElementById("price-yearly-now");
    var mWas = document.getElementById("price-monthly-was");
    var yWas = document.getElementById("price-yearly-was");
    if (mNow) mNow.innerHTML = formatEur(liveM) + '<span class="plan-per">/mo</span>';
    if (yNow) yNow.innerHTML = formatEur(liveY) + '<span class="plan-per">/yr</span>';
    if (launch) {
      if (mWas) {
        mWas.hidden = false;
        mWas.textContent = formatEur(PRICE_EUR.normal.monthly);
      }
      if (yWas) {
        yWas.hidden = false;
        yWas.textContent = formatEur(PRICE_EUR.normal.yearly);
      }
      if (launchPromoBanner) launchPromoBanner.hidden = false;
      if (pricingPromoEnds) {
        pricingPromoEnds.hidden = false;
        try {
          pricingPromoEnds.textContent =
            "Launch price ends " + new Date(promoEndsAtMs()).toLocaleString() + " — then back to " + formatEur(PRICE_EUR.normal.monthly) + "/mo.";
        } catch (e) {
          pricingPromoEnds.textContent = "Back to normal price after 1 month (" + formatEur(PRICE_EUR.normal.monthly) + "/mo).";
        }
      }
      if (pricingEyebrow) pricingEyebrow.textContent = "Launch price · EUR";
    } else {
      if (mWas) mWas.hidden = true;
      if (yWas) yWas.hidden = true;
      if (launchPromoBanner) launchPromoBanner.hidden = true;
      if (pricingPromoEnds) pricingPromoEnds.hidden = true;
      if (pricingEyebrow) pricingEyebrow.textContent = "Pro · EUR";
    }
    var amountLabel = formatEur(selectedPlan === "yearly" ? liveY : liveM);
    if (paymentsStatusEl) {
      paymentsStatusEl.hidden = false;
      paymentsStatusEl.className = "payments-status is-ok";
      var swishNum =
        (cachedPricing && (cachedPricing.swishNumberDisplay || cachedPricing.swishNumberIntl)) ||
        "076-587 54 59";
      paymentsStatusEl.textContent = stripeConfigured
        ? "Pay with card (Stripe Checkout) or Swish to " +
          swishNum +
          " (unique VOID-XXXX ref; owner confirms Swish before Pro unlocks)."
        : "Swish (Sweden): send to " +
          swishNum +
          " with your unique VOID-XXXX ref. Owner confirms before Pro unlocks. Card checkout when Stripe is configured.";
    }
    if (swishPayBtn) {
      swishPayBtn.disabled = false;
      swishPayBtn.textContent = "Pay with Swish — " + amountLabel;
      swishPayBtn.hidden = false;
    }
    if (stripePayBtn) {
      if (stripeConfigured) {
        stripePayBtn.hidden = false;
        stripePayBtn.disabled = false;
        stripePayBtn.textContent = "Pay with card — " + amountLabel;
      } else {
        stripePayBtn.hidden = true;
        stripePayBtn.disabled = true;
      }
    }
    if (swishAmountDisplay && !activeSwish) {
      swishAmountDisplay.textContent = amountLabel;
    }
    if (swishNumberDisplay && cachedPricing) {
      var nd =
        cachedPricing.swishNumberDisplay ||
        cachedPricing.swishNumberIntl ||
        swishNumberDisplay.textContent;
      if (!activeSwish) swishNumberDisplay.textContent = nd;
    }
    if (pricingSub) {
      pricingSub.textContent = launch
        ? "Cheaper than before — launch price. Pay with card (Stripe) or Swish · or redeem a gift code."
        : "Unlimited gens + downloads. Pay with card (Stripe) or Swish · or redeem a gift code.";
    }
  }

  function showCheckoutMain() {
    if (checkoutActionsMain) checkoutActionsMain.hidden = false;
    if (swishPanel) swishPanel.hidden = true;
    if (swishWaitingMsg) swishWaitingMsg.hidden = true;
    if (swishMarkPaidBtn) {
      swishMarkPaidBtn.disabled = false;
      swishMarkPaidBtn.textContent = "I've paid · Jag har betalat";
    }
  }

  function showSwishPanel() {
    if (checkoutActionsMain) checkoutActionsMain.hidden = true;
    if (swishPanel) swishPanel.hidden = false;
  }

  function startSwishPayment() {
    if (!currentUser || !currentUser.verified) {
      showToast("Sign in first");
      return;
    }
    if (swishPayBtn) {
      swishPayBtn.disabled = true;
      swishPayBtn.setAttribute("aria-busy", "true");
      swishPayBtn.textContent = "Starting Swish…";
    }
    fetch("/api/swish/start", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ email: currentUser.email, plan: selectedPlan }),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return { res: r, body: body };
          });
      })
      .then(function (pack) {
        var body = pack.body || {};
        if (!pack.res.ok || !body.ok || !body.ref) {
          showToast((body && body.error) || "Could not start Swish");
          applyPricingUI();
          return;
        }
        activeSwish = {
          ref: body.ref,
          amountEur: body.amountEur,
          numberDisplay: body.numberDisplay || body.number,
          numberIntl: body.numberIntl || body.number,
          plan: body.plan,
        };
        if (swishAmountDisplay) swishAmountDisplay.textContent = formatEur(body.amountEur);
        if (swishNumberDisplay) {
          swishNumberDisplay.textContent =
            body.numberDisplay || body.numberIntl || body.number || "076-587 54 59";
        }
        if (swishRefDisplay) swishRefDisplay.textContent = body.ref;
        if (swishWaitingMsg) swishWaitingMsg.hidden = true;
        if (swishMarkPaidBtn) {
          swishMarkPaidBtn.disabled = false;
          swishMarkPaidBtn.textContent = "I've paid · Jag har betalat";
        }
        showSwishPanel();
        showToast("Swish ready — send " + formatEur(body.amountEur) + " with ref " + body.ref);
      })
      .catch(function () {
        showToast("Swish failed — check connection and try again");
      })
      .then(function () {
        if (swishPayBtn) {
          swishPayBtn.removeAttribute("aria-busy");
          applyPricingUI();
        }
      });
  }

  function markSwishPaid() {
    if (!currentUser || !activeSwish || !activeSwish.ref) {
      showToast("Start Swish first");
      return;
    }
    if (swishMarkPaidBtn) {
      swishMarkPaidBtn.disabled = true;
      swishMarkPaidBtn.textContent = "Submitting…";
    }
    fetch("/api/swish/mark-paid", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ email: currentUser.email, ref: activeSwish.ref }),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return { res: r, body: body };
          });
      })
      .then(function (pack) {
        var body = pack.body || {};
        if (!pack.res.ok || !body.ok) {
          showToast((body && body.error) || "Could not mark paid");
          if (swishMarkPaidBtn) {
            swishMarkPaidBtn.disabled = false;
            swishMarkPaidBtn.textContent = "I've paid · Jag har betalat";
          }
          return;
        }
        if (swishWaitingMsg) swishWaitingMsg.hidden = false;
        if (swishMarkPaidBtn) {
          swishMarkPaidBtn.disabled = true;
          swishMarkPaidBtn.textContent = "Waiting for confirmation…";
        }
        showToast("Waiting for owner to confirm — usually fast");
        /* Keep polling entitlement lightly in case owner confirms while panel open */
        var tries = 0;
        var poll = setInterval(function () {
          tries += 1;
          syncServerEntitlement(currentUser.email).then(function (ent) {
            if (ent && ent.pro) {
              clearInterval(poll);
              showToast("Pro unlocked — Swish confirmed!");
              if (upgradeCta) upgradeCta.hidden = true;
              closeModal(pricingModal);
              activeSwish = null;
              showCheckoutMain();
            }
          });
          if (tries >= 40) clearInterval(poll);
        }, 4000);
      })
      .catch(function () {
        showToast("Could not reach server");
        if (swishMarkPaidBtn) {
          swishMarkPaidBtn.disabled = false;
          swishMarkPaidBtn.textContent = "I've paid · Jag har betalat";
        }
      });
  }

  function loadSwishPending() {
    if (!isOwner() || !swishPendingList) return;
    swishPendingList.innerHTML = '<p class="settings-hint">Loading…</p>';
    fetch("/api/swish/pending", { headers: ownerApiHeaders() })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return { res: r, body: body };
          });
      })
      .then(function (pack) {
        var body = pack.body || {};
        if (!pack.res.ok || !body.ok) {
          swishPendingList.innerHTML =
            '<p class="settings-hint">' +
            escapeHtml((body && body.error) || "Could not load pending Swish payments") +
            "</p>";
          if (swishPendingCount) swishPendingCount.textContent = "error";
          return;
        }
        var list = body.pending || [];
        if (swishPendingCount) {
          swishPendingCount.textContent = list.length + " open";
        }
        if (!list.length) {
          swishPendingList.innerHTML =
            '<p class="settings-hint">No pending Swish payments. When a buyer taps I’ve paid, they show up here.</p>';
          return;
        }
        swishPendingList.innerHTML = list
          .map(function (e) {
            var when = e.claimedAt || e.createdAt;
            var whenStr = "";
            try {
              whenStr = when ? new Date(when).toLocaleString() : "";
            } catch (err) {}
            return (
              '<div class="swish-pending-row" data-ref="' +
              escapeHtml(e.ref) +
              '">' +
              "<div>" +
              "<code>" +
              escapeHtml(e.ref) +
              "</code> · " +
              escapeHtml(e.email) +
              "<br/><span class=\"settings-hint\">" +
              escapeHtml(e.plan) +
              " · €" +
              Number(e.amountEur).toFixed(2) +
              " · " +
              escapeHtml(e.status) +
              (whenStr ? " · " + escapeHtml(whenStr) : "") +
              "</span></div>" +
              '<div class="swish-pending-actions">' +
              '<button type="button" class="btn btn-primary btn-sm swish-confirm-btn" data-ref="' +
              escapeHtml(e.ref) +
              '">Confirm → grant Pro</button>' +
              '<button type="button" class="btn btn-ghost btn-sm danger-outline swish-reject-btn" data-ref="' +
              escapeHtml(e.ref) +
              '">Reject</button>' +
              "</div></div>"
            );
          })
          .join("");
      })
      .catch(function () {
        swishPendingList.innerHTML = '<p class="settings-hint">Network error loading Swish pending</p>';
      });
  }

  function confirmSwishRef(ref) {
    if (!isOwner() || !ref) return;
    if (!confirm("Confirm Swish " + ref + " and grant Pro? Only after you see the money in Swish.")) return;
    fetch("/api/swish/confirm", {
      method: "POST",
      headers: ownerApiHeaders(),
      body: JSON.stringify({ ref: ref }),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return { res: r, body: body };
          });
      })
      .then(function (pack) {
        var body = pack.body || {};
        if (pack.res.ok && body.ok) {
          showToast("Granted Pro to " + (body.email || ref));
          loadSwishPending();
          refreshOwnerStats();
        } else {
          showToast((body && body.error) || "Confirm failed");
        }
      })
      .catch(function () {
        showToast("Confirm failed — network");
      });
  }

  function rejectSwishRef(ref) {
    if (!isOwner() || !ref) return;
    if (!confirm("Reject Swish " + ref + "? Buyer will not get Pro.")) return;
    fetch("/api/swish/reject", {
      method: "POST",
      headers: ownerApiHeaders(),
      body: JSON.stringify({ ref: ref }),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (body) {
            return { res: r, body: body };
          });
      })
      .then(function (pack) {
        var body = pack.body || {};
        if (pack.res.ok && body.ok) {
          showToast("Rejected " + ref);
          loadSwishPending();
        } else {
          showToast((body && body.error) || "Reject failed");
        }
      })
      .catch(function () {
        showToast("Reject failed — network");
      });
  }

  function fetchPricing() {
    return fetch("/api/pricing")
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        });
      })
      .then(function (body) {
        if (body && body.ok) {
          cachedPricing = body;
          stripeConfigured = !!body.stripeConfigured;
          swishEnabled = body.swishEnabled !== false;
          if (body.promoEndsAt) {
            try {
              localStorage.setItem("void_clips_promo_ends_at", String(body.promoEndsAt));
            } catch (e) {}
          }
        }
        applyPricingUI();
        return body;
      })
      .catch(function () {
        stripeConfigured = false;
        applyPricingUI();
        return null;
      });
  }

  function syncServerEntitlement(email) {
    email = normalizeEmail(email);
    if (!email) return Promise.resolve(null);
    return fetch("/api/entitlement?email=" + encodeURIComponent(email), {
      headers: apiHeaders(),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        });
      })
      .then(function (body) {
        if (body && body.ok && body.pro && body.proUntil) {
          setEntitlement(email, {
            proUntil: body.proUntil,
            unlimited: false,
            source: body.source || "stripe",
          });
          if (currentUser && normalizeEmail(currentUser.email) === email) {
            currentUser.proUntil = body.proUntil;
            currentUser.pro = true;
            saveUser(currentUser);
            updateCreditsUI();
          }
          return body;
        }
        return body;
      })
      .catch(function () {
        return null;
      });
  }

  function claimCheckoutSession(sessionId) {
    return fetch("/api/claim-checkout", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ sessionId: sessionId }),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        }).then(function (body) {
          return { res: r, body: body };
        });
      })
      .then(function (pack) {
        var body = pack.body || {};
        if (pack.res.ok && body.ok && body.granted) {
          setEntitlement(body.email, {
            proUntil: body.proUntil,
            unlimited: false,
            source: "stripe",
          });
          if (currentUser && normalizeEmail(currentUser.email) === normalizeEmail(body.email)) {
            currentUser.proUntil = body.proUntil;
            currentUser.pro = true;
            saveUser(currentUser);
            updateCreditsUI();
          }
          if (upgradeCta) upgradeCta.hidden = true;
          showToast("Payment received — Pro active until " + formatExpiry(body.proUntil));
          return true;
        }
        showToast((body && body.error) || "Could not confirm payment");
        return false;
      })
      .catch(function () {
        showToast("Could not confirm payment with server");
        return false;
      });
  }

  function handleCheckoutReturn() {
    try {
      var params = new URLSearchParams(location.search || "");
      var status = params.get("checkout");
      var sid = params.get("session_id");
      if (!status) return;
      if (status === "success" && sid) {
        showToast("Confirming Stripe payment…");
        claimCheckoutSession(sid).then(function () {
          try {
            history.replaceState({}, "", location.pathname);
          } catch (e) {}
        });
      } else if (status === "cancel") {
        showToast("Checkout canceled — no charge");
        try {
          history.replaceState({}, "", location.pathname);
        } catch (e2) {}
      }
    } catch (e3) {}
  }

  function openPricingModal() {
    if (!currentUser || !currentUser.verified) {
      showToast("Sign in first");
      return;
    }
    setRedeemMsg("");
    if (ownerCodeInput) ownerCodeInput.value = "";
    selectedPlan = "monthly";
    activeSwish = null;
    showCheckoutMain();
    if (pricingPlans) {
      pricingPlans.querySelectorAll(".plan-card").forEach(function (btn) {
        var on = btn.getAttribute("data-plan") === selectedPlan;
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    applyPricingUI();
    openModal(pricingModal);
    fetchPricing();
  }

  if (maintenanceToggle) {
    maintenanceToggle.addEventListener("click", function () {
      if (!isOwner()) {
        showToast("Owner only");
        return;
      }
      var next = !isMaintenanceOn();
      if (next && !confirm("Turn ON maintenance / update mode? Non-owners will be blocked.")) return;
      setMaintenance(next);
      showToast(isMaintenanceOn() ? "Maintenance ON — non-owners blocked" : "Maintenance OFF");
    });
  }

  if (ownerMaintToggle) {
    ownerMaintToggle.addEventListener("click", function () {
      if (!isOwner()) return;
      var next = !isMaintenanceOn();
      if (next && !confirm("Turn ON maintenance / update mode? Non-owners will be blocked.")) return;
      setMaintenance(next);
      showToast(isMaintenanceOn() ? "Maintenance ON" : "Maintenance OFF");
    });
  }

  if (ownerPanelBtn) {
    ownerPanelBtn.addEventListener("click", openOwnerPanel);
  }
  if (openOwnerFromSettings) {
    openOwnerFromSettings.addEventListener("click", openOwnerPanel);
  }
  if (ownerPanelClose) {
    ownerPanelClose.addEventListener("click", closeOwnerPanel);
  }

  if (giftDuration) {
    giftDuration.addEventListener("change", function () {
      var custom = giftDuration.value === "custom";
      if (giftCustomDays) giftCustomDays.hidden = !custom;
      if (giftCustomDaysLabel) giftCustomDaysLabel.hidden = !custom;
    });
  }

  if (giftCodeForm) {
    giftCodeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isOwner()) return;
      try {
        var days =
          giftDuration && giftDuration.value === "custom"
            ? Number(giftCustomDays && giftCustomDays.value) || 14
            : Number(giftDuration && giftDuration.value) || 30;
        var entry = createGiftCode({
          code: giftCodeCustom && giftCodeCustom.value,
          days: days,
          maxRedemptions: giftMaxRedemptions && giftMaxRedemptions.value,
        });
        if (giftCodeCustom) giftCodeCustom.value = "";
        renderGiftCodes();
        refreshOwnerStats();
        showToast("Created " + entry.code);
      } catch (err) {
        showToast((err && err.message) || "Could not create code");
      }
    });
  }

  if (grantForm) {
    grantForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isOwner()) return;
      var email = grantEmail && grantEmail.value;
      var n = grantCredits && grantCredits.value;
      var total = addCreditsToEmail(email, n);
      showToast("Credits → " + normalizeEmail(email) + " (now " + total + ")");
      refreshOwnerStats();
    });
  }
  if (grantUnlimitedBtn) {
    grantUnlimitedBtn.addEventListener("click", function () {
      if (!isOwner()) return;
      var email = grantEmail && grantEmail.value;
      if (!email) {
        showToast("Enter an email");
        return;
      }
      grantUnlimited(email);
      showToast("Unlimited granted to " + normalizeEmail(email));
      refreshOwnerStats();
    });
  }

  if (announceForm) {
    announceForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isOwner()) return;
      var msg = setAnnounceMessage(announceInput && announceInput.value);
      pushSiteConfig({ announce: msg });
      showToast(msg ? "Announce set" : "Announce cleared");
    });
  }
  if (announceClearBtn) {
    announceClearBtn.addEventListener("click", function () {
      if (!isOwner()) return;
      setAnnounceMessage("");
      if (announceInput) announceInput.value = "";
      pushSiteConfig({ announce: "" });
      showToast("Announce cleared");
    });
  }
  if (announceBannerDismiss) {
    announceBannerDismiss.addEventListener("click", function () {
      var msg = getAnnounceMessage();
      try {
        if (msg) localStorage.setItem(ANNOUNCE_DISMISS_KEY, msg);
      } catch (e) {}
      if (announceBanner) announceBanner.hidden = true;
    });
  }

  function wireFlagToggle(btn, key) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (!isOwner()) {
        showToast("Owner only");
        return;
      }
      var flags = loadFeatureFlags();
      var next = !flags[key];
      if (key === "signups" && !next && !confirm("Turn OFF new signups? Existing users can still sign in.")) return;
      setFeatureFlag(key, next);
      showToast((key === "batch" ? "Batch" : key === "labs" ? "Labs" : "Signups") + (next ? " ON" : " OFF"));
    });
  }
  wireFlagToggle(flagBatchToggle, "batch");
  wireFlagToggle(flagLabsToggle, "labs");
  wireFlagToggle(flagSignupsToggle, "signups");

  if (proGrantForm) {
    proGrantForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isOwner()) return;
      var email = proGrantEmail && proGrantEmail.value;
      var days = Math.max(1, Math.min(3650, Math.floor(Number(proGrantDays && proGrantDays.value) || 30)));
      if (!email) {
        showToast("Enter an email");
        return;
      }
      showToast("Granting Pro…");
      ownerGrantPro(email, days).then(function (result) {
        if (result.server) {
          showToast(
            "Pro granted → " + result.email + " until " + formatExpiry(result.until)
          );
        } else {
          showToast(
            (result.error || "Server failed") +
              " — local Pro until " +
              formatExpiry(result.until)
          );
        }
        refreshOwnerStats();
      });
    });
  }
  if (proRevokeBtn) {
    proRevokeBtn.addEventListener("click", function () {
      if (!isOwner()) return;
      var email = proGrantEmail && proGrantEmail.value;
      if (!email) {
        showToast("Enter an email");
        return;
      }
      if (!confirm("Revoke Pro for " + normalizeEmail(email) + "?")) return;
      showToast("Revoking Pro…");
      ownerRevokePro(email).then(function (result) {
        if (result.server) {
          showToast("Pro revoked for " + result.email);
        } else {
          showToast(
            (result.error || "Server failed") +
              " — Pro cleared locally for " +
              result.email
          );
        }
        refreshOwnerStats();
      });
    });
  }

  if (forceCreditsForm) {
    forceCreditsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isOwner()) return;
      var email = forceCreditsEmail && forceCreditsEmail.value;
      var n = forceCreditsValue && forceCreditsValue.value;
      if (!email) {
        showToast("Enter an email");
        return;
      }
      var total = setCreditsExact(email, n);
      showToast("Credits set → " + normalizeEmail(email) + " = " + total);
      refreshOwnerStats();
    });
  }

  if (lookupForm) {
    lookupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isOwner()) return;
      var email = normalizeEmail(lookupEmail && lookupEmail.value);
      if (!email || email.indexOf("@") === -1) {
        showToast("Valid email required");
        return;
      }
      var acct = getAccount(email);
      var ent = getEntitlement(email);
      var localPro = !!(ent.unlimited || (ent.proUntil && ent.proUntil > Date.now()));
      var lines = [
        "email: " + email,
        "local account: " + (acct ? "yes" : "no"),
        "verified: " + (acct && acct.verified ? "yes" : "no"),
        "credits: " + (acct && typeof acct.credits === "number" ? acct.credits : "—"),
        "local Pro: " + (localPro ? "yes" : "no"),
        "local unlimited: " + (ent.unlimited ? "yes" : "no"),
        "local proUntil: " + (ent.proUntil ? formatExpiry(ent.proUntil) : "—"),
        "local source: " + (ent.source || "—"),
        "server: looking up…",
      ];
      if (lookupResult) {
        lookupResult.hidden = false;
        lookupResult.textContent = lines.join("\n");
      }
      fetch("/api/owner/lookup?email=" + encodeURIComponent(email), { headers: ownerApiHeaders() })
        .then(function (r) {
          return r.json().catch(function () {
            return {};
          });
        })
        .then(function (data) {
          if (!lookupResult) return;
          if (data && data.ok) {
            lines[lines.length - 1] =
              "server Pro: " +
              (data.pro ? "yes" : "no") +
              " · until " +
              (data.proUntil ? formatExpiry(data.proUntil) : "—") +
              " · plan " +
              (data.plan || "—") +
              " · source " +
              (data.source || "—");
          } else {
            lines[lines.length - 1] = "server: unavailable (" + ((data && data.error) || "no response") + ")";
          }
          lookupResult.textContent = lines.join("\n");
        })
        .catch(function () {
          if (!lookupResult) return;
          lines[lines.length - 1] = "server: unreachable";
          lookupResult.textContent = lines.join("\n");
        });
    });
  }

  function clearWaitlistLocal() {
    try {
      localStorage.removeItem(WAITLIST_KEY);
    } catch (e) {}
    if (waitlistMsg) {
      waitlistMsg.textContent = "";
      waitlistMsg.classList.remove("show");
    }
    if (upgradeWaitlistMsg) {
      upgradeWaitlistMsg.textContent = "";
      upgradeWaitlistMsg.classList.remove("show");
    }
    renderWaitlistView();
    refreshOwnerStats();
    showToast("Waitlist cleared (local)");
  }

  if (resetWaitlistBtn) {
    resetWaitlistBtn.addEventListener("click", function () {
      if (!isOwner()) {
        showToast("Owner only");
        return;
      }
      clearWaitlistLocal();
    });
  }

  if (clearUsersBtn) {
    clearUsersBtn.addEventListener("click", function () {
      if (!isOwner()) {
        showToast("Owner only");
        return;
      }
      if (!confirm("Clear ALL local users, sessions, entitlements, and pending verify codes? You will be signed out.")) {
        return;
      }
      try {
        localStorage.removeItem(USERS_KEY);
        localStorage.removeItem(VERIFY_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(ENTITLEMENTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);
      } catch (e) {}
      sessionClear();
      currentUser = null;
      lastClips = [];
      if (resultsEl) resultsEl.classList.remove("active");
      setEmptyVisible(true);
      closeOwnerPanel();
      showGuestStudio();
      showToast("All users data cleared (local)");
    });
  }

  if (pricingBtn) {
    pricingBtn.addEventListener("click", openPricingModal);
  }
  if (upgradeProBtn) {
    upgradeProBtn.addEventListener("click", openPricingModal);
  }
  if (pricingClose) {
    pricingClose.addEventListener("click", function () {
      closeModal(pricingModal);
    });
  }
  if (pricingModal) {
    pricingModal.addEventListener("click", function (e) {
      if (e.target === pricingModal) closeModal(pricingModal);
    });
  }
  if (pricingPlans) {
    pricingPlans.addEventListener("click", function (e) {
      var btn = e.target.closest(".plan-card");
      if (!btn) return;
      selectedPlan = btn.getAttribute("data-plan") || "monthly";
      pricingPlans.querySelectorAll(".plan-card").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      applyPricingUI();
    });
  }
  if (stripePayBtn) {
    stripePayBtn.addEventListener("click", function () {
      if (!currentUser || !currentUser.verified) {
        showToast("Sign in first");
        return;
      }
      if (!stripeConfigured) {
        showToast("Card checkout unavailable — use Swish or a gift code");
        applyPricingUI();
        return;
      }
      stripePayBtn.disabled = true;
      stripePayBtn.setAttribute("aria-busy", "true");
      stripePayBtn.textContent = "Redirecting to Stripe…";
      fetch("/api/create-checkout", {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({ email: currentUser.email, plan: selectedPlan }),
      })
        .then(function (r) {
          return r.json().catch(function () {
            return {};
          }).then(function (body) {
            return { res: r, body: body };
          });
        })
        .then(function (pack) {
          var body = pack.body || {};
          if (pack.res.ok && body.url) {
            window.location.href = body.url;
            return;
          }
          stripeConfigured = !!body.stripeConfigured;
          showToast(body.error || "Checkout unavailable");
          applyPricingUI();
        })
        .catch(function () {
          showToast("Checkout failed — check connection and try again");
          applyPricingUI();
        })
        .then(function () {
          if (stripePayBtn) {
            stripePayBtn.removeAttribute("aria-busy");
            applyPricingUI();
          }
        });
    });
  }
  if (swishPayBtn) {
    swishPayBtn.addEventListener("click", startSwishPayment);
  }
  if (swishMarkPaidBtn) {
    swishMarkPaidBtn.addEventListener("click", markSwishPaid);
  }
  if (swishBackBtn) {
    swishBackBtn.addEventListener("click", function () {
      activeSwish = null;
      showCheckoutMain();
      applyPricingUI();
    });
  }
  if (swishCopyNumber) {
    swishCopyNumber.addEventListener("click", function () {
      var t =
        (activeSwish && (activeSwish.numberDisplay || activeSwish.numberIntl)) ||
        (swishNumberDisplay && swishNumberDisplay.textContent) ||
        (cachedPricing && cachedPricing.swishNumberDisplay) ||
        "076-587 54 59";
      copyText(t, swishCopyNumber, "Copied");
    });
  }
  if (swishCopyRef) {
    swishCopyRef.addEventListener("click", function () {
      var t = (activeSwish && activeSwish.ref) || (swishRefDisplay && swishRefDisplay.textContent) || "";
      if (!t || t.indexOf("·") !== -1) {
        showToast("Start Swish first to get a reference");
        return;
      }
      copyText(t, swishCopyRef, "Copied");
    });
  }
  if (swishPendingRefresh) {
    swishPendingRefresh.addEventListener("click", function () {
      if (!isOwner()) return;
      loadSwishPending();
    });
  }
  if (swishPendingList) {
    swishPendingList.addEventListener("click", function (e) {
      var conf = e.target.closest(".swish-confirm-btn");
      var rej = e.target.closest(".swish-reject-btn");
      if (conf) {
        confirmSwishRef(conf.getAttribute("data-ref"));
        return;
      }
      if (rej) {
        rejectSwishRef(rej.getAttribute("data-ref"));
      }
    });
  }

  if (redeemCodeBtn) {
    redeemCodeBtn.addEventListener("click", function () {
      if (!currentUser || !currentUser.verified) {
        setRedeemMsg("Sign in first");
        return;
      }
      var code = ownerCodeInput && ownerCodeInput.value;
      var result = redeemGiftCode(code, currentUser.email);
      if (!result.ok) {
        setRedeemMsg(result.error || "Redeem failed");
        return;
      }
      setRedeemMsg("Pro unlocked for " + result.days + " days", true);
      if (upgradeCta) upgradeCta.hidden = true;
      updateCreditsUI();
      showToast("Code redeemed — Pro for " + result.days + "d");
      setTimeout(function () {
        closeModal(pricingModal);
      }, 600);
    });
  }

  /* —— help / support (Gmail) —— */
  function loadBugReports() {
    try {
      var list = JSON.parse(localStorage.getItem(BUGS_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  }

  function saveBugReports(list) {
    try {
      localStorage.setItem(BUGS_KEY, JSON.stringify(list));
    } catch (err) {}
  }

  function updateBugMailtoHref() {
    if (!bugMailto) return;
    var subject = bugMailtoSubject || "VOID Clips Support";
    var bodyRaw = (bugText && bugText.value) || "";
    var href =
      "mailto:" +
      OWNER_EMAIL +
      "?subject=" +
      encodeURIComponent(subject);
    if (String(bodyRaw).trim()) {
      href += "&body=" + encodeURIComponent(String(bodyRaw).trim().slice(0, 1000));
    }
    bugMailto.href = href;
  }

  function openBugModal(opts) {
    opts = opts || {};
    bugMailtoSubject = opts.subject || "VOID Clips Support";
    if (bugModal) {
      var title = document.getElementById("bug-title");
      if (title) {
        title.textContent = opts.bugMode ? "Report a bug" : "Need help?";
      }
    }
    openModal(bugModal);
    updateBugMailtoHref();
    if (bugText) {
      if (!opts.keepText) bugText.value = "";
      setTimeout(function () {
        bugText.focus();
        updateBugMailtoHref();
      }, 40);
    }
  }

  if (reportBugBtn) {
    reportBugBtn.addEventListener("click", function () {
      openBugModal({ subject: "VOID Clips Support" });
    });
  }
  if (reportBugSecondaryBtn) {
    reportBugSecondaryBtn.addEventListener("click", function () {
      openBugModal({ subject: "VOID Clips Bug", bugMode: true });
    });
  }
  if (bugClose) {
    bugClose.addEventListener("click", function () {
      closeModal(bugModal);
    });
  }
  if (bugModal) {
    bugModal.addEventListener("click", function (e) {
      if (e.target === bugModal) closeModal(bugModal);
    });
  }
  if (bugText) {
    bugText.addEventListener("input", updateBugMailtoHref);
  }

  if (bugForm) {
    bugForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = (bugText && bugText.value) || "";
      text = String(text).trim();
      if (!text) {
        showToast("Write a short message first, or use Email support");
        return;
      }
      var list = loadBugReports();
      list.push({
        text: text.slice(0, 1000),
        at: Date.now(),
        user: currentUser ? currentUser.identity : null,
        kind: bugMailtoSubject && /bug/i.test(bugMailtoSubject) ? "bug" : "support",
      });
      saveBugReports(list);
      closeModal(bugModal);
      showToast("Saved locally — for real help email " + OWNER_EMAIL);
      if (isOwner()) renderOwnerBugReports();
    });
  }

  if (bugMailto) {
    bugMailto.addEventListener("click", function () {
      updateBugMailtoHref();
    });
  }

  function renderOwnerBugReports() {
    if (!ownerBugsList) return;
    var list = loadBugReports().slice().sort(function (a, b) {
      return (b.at || 0) - (a.at || 0);
    });
    if (ownerBugsCount) {
      ownerBugsCount.textContent = list.length ? list.length + " report(s)" : "None";
    }
    var statBugs = document.getElementById("stat-bugs");
    if (statBugs) statBugs.textContent = String(list.length);
    if (!list.length) {
      ownerBugsList.innerHTML =
        '<p class="settings-hint">No local reports yet. Users should email <strong>' +
        escapeHtml(OWNER_EMAIL) +
        "</strong> for real help.</p>";
      return;
    }
    var recent = list.slice(0, 25);
    ownerBugsList.innerHTML = recent
      .map(function (item) {
        var when = item.at ? new Date(item.at).toLocaleString() : "—";
        var who = item.user ? escapeHtml(String(item.user)) : "anonymous";
        var kind = item.kind === "bug" ? "Bug" : "Help";
        return (
          '<div class="owner-bug-item">' +
          '<div class="owner-bug-meta"><span class="owner-bug-kind">' +
          kind +
          "</span> · " +
          escapeHtml(when) +
          " · " +
          who +
          "</div>" +
          '<p class="owner-bug-text">' +
          escapeHtml(String(item.text || "")).replace(/\n/g, "<br>") +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  if (ownerBugsRefresh) {
    ownerBugsRefresh.addEventListener("click", function () {
      if (!isOwner()) return;
      renderOwnerBugReports();
      showToast("Bug list refreshed");
    });
  }
  if (ownerBugsClear) {
    ownerBugsClear.addEventListener("click", function () {
      if (!isOwner()) return;
      if (!confirm("Clear all local bug/help reports on this device?")) return;
      saveBugReports([]);
      renderOwnerBugReports();
      showToast("Local reports cleared");
    });
  }

  /* —— history —— */
  function getHistory() {
    try {
      var raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function pushHistory(url) {
    var list = getHistory().filter(function (u) {
      return u !== url;
    });
    list.unshift(url);
    if (list.length > MAX_HISTORY) list = list.slice(0, MAX_HISTORY);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
    } catch (e) {}
    renderHistory();
  }

  function shortUrl(url) {
    try {
      var u = new URL(url.indexOf("http") === 0 ? url : "https://" + url);
      var path = u.pathname.length > 24 ? u.pathname.slice(0, 22) + "…" : u.pathname;
      return u.hostname.replace(/^www\./, "") + (path === "/" ? "" : path);
    } catch (e) {
      return url.length > 36 ? url.slice(0, 34) + "…" : url;
    }
  }

  function renderHistory() {
    if (!recentWrap || !recentList) return;
    var list = getHistory();
    if (!list.length) {
      recentWrap.hidden = true;
      return;
    }
    recentWrap.hidden = false;
    recentList.innerHTML = "";
    list.forEach(function (url) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "recent-chip";
      chip.textContent = shortUrl(url);
      chip.title = url;
      chip.addEventListener("click", function () {
        urlInput.value = url;
        urlInput.focus();
        updatePasteDetect();
        hideError();
        markOnboardStep("paste");
      });
      recentList.appendChild(chip);
    });
  }

  /* —— clips —— */
  function attachResonance(clip, index) {
    var useSv = state.lang === "sv";
    var table = useSv ? RESONANCE_SV : RESONANCE;
    var pack = table[state.style] || table.viral;
    var r = pack[index] || pack[0] || {
      score: 75,
      why: "Solid hook density for the feed.",
      persona: "Stay sharp. Post colder.",
      pin: "Pinned: drop your take. No soft comments.",
      timing: "Hook early · cut clean · end on a question"
    };
    clip.score = r.score;
    clip.why = r.why;
    clip.persona = r.persona;
    clip.pin = r.pin;
    clip.timing = r.timing || clip.beat || "";
    clip.styleKey = state.style;
    return clip;
  }

  function buildClipSet() {
    var pack = CLIPS[state.style] || CLIPS.viral;
    var en = pack.en;
    var sv = pack.sv;
    var out = [];
    var i;
    if (state.lang === "sv") {
      for (i = 0; i < sv.length; i++) out.push(attachResonance(Object.assign({}, sv[i]), i));
    } else if (state.lang === "both") {
      for (i = 0; i < en.length; i++) {
        out.push(
          attachResonance(
            {
              hook: en[i].hook,
              hookSv: sv[i].hook,
              caption: en[i].caption,
              captionSv: sv[i].caption,
              duration: en[i].duration,
              beat: en[i].beat,
              label: en[i].label,
              grad: en[i].grad,
              vibe: en[i].vibe,
            },
            i
          )
        );
      }
    } else {
      for (i = 0; i < en.length; i++) out.push(attachResonance(Object.assign({}, en[i]), i));
    }
    return out;
  }

  function captionFor(clip) {
    if (clip.hookSv) return clip.hook + "\n" + clip.hookSv;
    return clip.hook;
  }

  function hashtagPack() {
    if (state.lang === "sv") return HASHTAGS_SV[state.style] || HASHTAGS_SV.viral;
    if (state.lang === "both") {
      return (HASHTAGS[state.style] || HASHTAGS.viral) + " · " + (HASHTAGS_SV[state.style] || HASHTAGS_SV.viral);
    }
    return HASHTAGS[state.style] || HASHTAGS.viral;
  }

  function buildExportPack() {
    var clips = lastClips.length ? lastClips : buildClipSet();
    var tags = hashtagPack();
    var lines = [];
    lines.push("VOID Clips · " + (state.style || "viral").toUpperCase() + " · " + (state.aspect || "9:16"));
    lines.push("");
    clips.forEach(function (clip, i) {
      lines.push("--- Clip " + (i + 1) + " · " + (clip.label || "") + " · " + (clip.duration || "") + " ---");
      lines.push(captionFor(clip));
      if (clip.caption) lines.push("On-screen: " + clip.caption + (clip.captionSv ? " / " + clip.captionSv : ""));
      if (clip.beat) lines.push("Beat: " + clip.beat);
      if (clip.timing) lines.push("Timing: " + clip.timing);
      if (typeof clip.score === "number") lines.push("Resonance: " + clip.score + "/100 — " + (clip.why || ""));
      if (clip.persona) lines.push("Persona: " + clip.persona);
      if (clip.pin) lines.push("Pin: " + clip.pin);
      lines.push(tags);
      lines.push("");
    });
    return lines.join("\n").trim();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function playIconSvg() {
    return (
      '<span class="play-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' +
      "</span>"
    );
  }

  function copyText(text, btn, okLabel) {
    var done = function () {
      if (btn) {
        var prev = btn.textContent;
        btn.textContent = okLabel || "Copied!";
        setTimeout(function () {
          btn.textContent = prev;
        }, 1400);
      }
      showToast("Copied to clipboard");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      done();
    }
  }

  function setEmptyVisible(show) {
    if (!emptyState) return;
    if (show) {
      emptyState.hidden = false;
      emptyState.classList.remove("hidden-by-results");
    } else {
      emptyState.hidden = true;
      emptyState.classList.add("hidden-by-results");
    }
  }

  function hideError() {
    if (errorState) errorState.hidden = true;
    if (urlInput) urlInput.classList.remove("is-error");
  }

  function showError() {
    if (errorState) errorState.hidden = false;
    if (urlInput) {
      urlInput.classList.add("is-error");
      urlInput.focus();
      setTimeout(function () {
        urlInput.classList.remove("is-error");
      }, 1600);
    }
  }

  function resonanceBlockHtml(clip) {
    var score = typeof clip.score === "number" ? clip.score : 75;
    var pct = Math.max(0, Math.min(100, score));
    var tier =
      score >= 92 ? "S-tier viral" : score >= 82 ? "Strong keep" : score >= 72 ? "Postable" : "Pair with stronger hook";
    var timingHtml = clip.timing
      ? '<p class="resonance-timing"><span class="resonance-why-label">Cut cue</span> ' +
        escapeHtml(clip.timing) +
        "</p>"
      : "";
    return (
      '<div class="resonance-block" data-resonance>' +
      '<div class="resonance-head">' +
      '<span class="resonance-label">VOID Resonance</span>' +
      '<span class="resonance-score" aria-label="Resonance score ' +
      score +
      ' out of 100">' +
      score +
      '<span class="resonance-score-max">/100</span></span>' +
      "</div>" +
      '<div class="resonance-meter" role="img" aria-label="Resonance meter ' +
      score +
      ' percent">' +
      '<div class="resonance-meter-fill" style="width:' +
      pct +
      '%"></div>' +
      "</div>" +
      '<p class="resonance-tier">' +
      escapeHtml(tier) +
      "</p>" +
      '<p class="resonance-why"><span class="resonance-why-label">Why it hits</span> ' +
      escapeHtml(clip.why || "") +
      "</p>" +
      timingHtml +
      '<div class="resonance-row">' +
      '<div class="resonance-field">' +
      '<div class="resonance-field-head">' +
      '<span class="resonance-field-label">Persona · @V_O_I_.D</span>' +
      '<button type="button" class="btn btn-ghost btn-xs copy-persona">Copy</button>' +
      "</div>" +
      '<p class="resonance-persona">' +
      escapeHtml(clip.persona || "") +
      "</p>" +
      "</div>" +
      '<div class="resonance-field">' +
      '<div class="resonance-field-head">' +
      '<span class="resonance-field-label">Pin-comment bait</span>' +
      '<button type="button" class="btn btn-ghost btn-xs copy-pin">Copy</button>' +
      "</div>" +
      '<p class="resonance-pin">' +
      escapeHtml(clip.pin || "") +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function applyVoidModeChrome() {
    document.body.classList.toggle("void-mode-on", !!state.voidMode);
    document.body.classList.toggle("void-mode-off", !state.voidMode);
    var toggle = document.getElementById("void-mode-toggle");
    if (toggle) {
      toggle.setAttribute("aria-checked", state.voidMode ? "true" : "false");
      toggle.classList.toggle("is-on", !!state.voidMode);
    }
    var status = document.getElementById("void-mode-status");
    if (status) status.textContent = state.voidMode ? "On" : "Off";
  }

  function overlayCaption(clip) {
    if (state.lang === "sv" && clip.caption) {
      /* Swedish packs store caption in caption field already when lang=sv */
      return clip.caption;
    }
    if (clip.captionSv && state.lang === "sv") return clip.captionSv;
    if (state.lang === "both" && clip.caption && clip.captionSv) {
      return clip.caption + " · " + clip.captionSv;
    }
    return clip.caption || "";
  }

  function sharePayload(clip) {
    var tags = hashtagPack();
    return (
      captionFor(clip) +
      "\n\n" +
      (clip.persona ? clip.persona + "\n\n" : "") +
      tags +
      "\n\n— via VOID Clips"
    );
  }

  function downloadClipPack(clip, index) {
    var body =
      "VOID Clips export\n" +
      "Style: " +
      (state.style || "viral") +
      " · Aspect: " +
      (state.aspect || "9:16") +
      "\n\n" +
      captionFor(clip) +
      "\n\nOn-screen: " +
      (overlayCaption(clip) || "—") +
      "\nBeat: " +
      (clip.beat || "—") +
      "\nTiming: " +
      (clip.timing || "—") +
      "\nResonance: " +
      (typeof clip.score === "number" ? clip.score + "/100" : "—") +
      "\n" +
      (clip.why || "") +
      "\n\nPersona:\n" +
      (clip.persona || "") +
      "\n\nPin:\n" +
      (clip.pin || "") +
      "\n\n" +
      hashtagPack() +
      "\n";
    var blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "void-clip-" + (index + 1) + "-" + (state.style || "viral") + ".txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
  }

  function renderClips(sourceLabel) {
    var clips = buildClipSet();
    clips.forEach(function (c, i) {
      enrichClipExtras(c, i);
    });
    renderClipsFromData(clips, sourceLabel);
  }

  function copyAllCaptions(btn) {
    if (!lastClips.length && !(resultsEl && resultsEl.classList.contains("active"))) {
      showToast("Generate clips first");
      return;
    }
    copyText(buildExportPack(), btn, "Copied!");
    markOnboardStep("copy");
  }

  if (copyHashtagsBtn) {
    copyHashtagsBtn.addEventListener("click", function () {
      copyText(hashtagPack(), copyHashtagsBtn, "Copied!");
    });
  }
  if (copyAllCaptionsBtn) {
    copyAllCaptionsBtn.addEventListener("click", function () {
      copyAllCaptions(copyAllCaptionsBtn);
    });
  }
  if (copyExportPackBtn) {
    copyExportPackBtn.addEventListener("click", function () {
      copyAllCaptions(copyExportPackBtn);
    });
  }

  /* —— URL / paste detect + oEmbed preview —— */
  function isLikelyUrl(value) {
    var v = (value || "").trim();
    if (!v) return false;
    if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|tiktok\.com|vm\.tiktok\.com)\//i.test(v)) {
      return true;
    }
    if (/^https?:\/\/.+\..+/i.test(v)) return true;
    return false;
  }

  function normalizeMediaUrl(value) {
    var v = String(value || "").trim();
    if (!v) return "";
    if (v.indexOf("http") !== 0) v = "https://" + v;
    return v;
  }

  function platformFromUrl(url) {
    var u = (url || "").toLowerCase();
    if (u.indexOf("tiktok") !== -1) return "TikTok";
    if (u.indexOf("youtube") !== -1 || u.indexOf("youtu.be") !== -1) return "YouTube";
    return "video";
  }

  function isYoutubeOrTikTok(url) {
    var p = platformFromUrl(url);
    return p === "YouTube" || p === "TikTok";
  }

  function youtubeIdFromUrl(raw) {
    try {
      var u = new URL(normalizeMediaUrl(raw));
      var host = (u.hostname || "").replace(/^www\./, "").toLowerCase();
      if (host === "youtu.be") {
        return (u.pathname || "/").slice(1).split("/")[0] || null;
      }
      if (
        host === "youtube.com" ||
        host === "m.youtube.com" ||
        host === "music.youtube.com"
      ) {
        if (u.searchParams.get("v")) return u.searchParams.get("v");
        var m = (u.pathname || "").match(/\/(?:shorts|embed|live|v)\/([^/?#]+)/);
        if (m) return m[1];
      }
    } catch (e) {}
    return null;
  }

  function youtubeThumbCandidates(id) {
    if (!id) return [];
    return [
      "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg",
      "https://i.ytimg.com/vi/" + id + "/mqdefault.jpg",
      "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg",
    ];
  }

  function bindYoutubeThumbFallback(img, id) {
    if (!img || !id) return;
    var candidates = youtubeThumbCandidates(id);
    var i = 0;
    img.src = candidates[0];
    img.onerror = function () {
      i += 1;
      if (i < candidates.length) {
        img.src = candidates[i];
      } else {
        img.onerror = null;
      }
    };
  }

  function clearLinkPreview() {
    var wrap = document.getElementById("link-preview");
    var skel = wrap && wrap.querySelector(".link-preview-skel");
    var card = wrap && wrap.querySelector(".link-preview-card");
    var img = document.getElementById("link-preview-img");
    if (wrap) wrap.hidden = true;
    if (skel) skel.hidden = true;
    if (card) card.hidden = true;
    if (img) {
      img.removeAttribute("src");
      img.onerror = null;
      img.alt = "";
    }
  }

  function showLinkPreviewLoading() {
    var wrap = document.getElementById("link-preview");
    var skel = wrap && wrap.querySelector(".link-preview-skel");
    var card = wrap && wrap.querySelector(".link-preview-card");
    if (!wrap) return;
    wrap.hidden = false;
    if (skel) skel.hidden = false;
    if (card) card.hidden = true;
  }

  function showLinkPreviewCard(meta) {
    var wrap = document.getElementById("link-preview");
    var skel = wrap && wrap.querySelector(".link-preview-skel");
    var card = wrap && wrap.querySelector(".link-preview-card");
    var img = document.getElementById("link-preview-img");
    var badge = document.getElementById("link-preview-badge");
    var titleEl = document.getElementById("link-preview-title");
    var subEl = document.getElementById("link-preview-sub");
    if (!wrap || !meta) return;
    wrap.hidden = false;
    if (skel) skel.hidden = true;
    if (card) card.hidden = false;
    if (badge) {
      badge.textContent = meta.provider || platformFromUrl(meta.url) || "Video";
      badge.classList.remove("is-youtube", "is-tiktok");
      if ((meta.provider || "") === "YouTube") badge.classList.add("is-youtube");
      if ((meta.provider || "") === "TikTok") badge.classList.add("is-tiktok");
    }
    if (titleEl) {
      titleEl.textContent = meta.title || shortUrl(meta.url) || "Linked video";
    }
    if (subEl) {
      subEl.textContent = meta.title ? "Ready to generate" : "Thumbnail loaded";
    }
    if (img) {
      img.alt = meta.title ? meta.title : "Video thumbnail";
      if (meta.provider === "YouTube" && meta.youtubeId) {
        bindYoutubeThumbFallback(img, meta.youtubeId);
      } else if (meta.thumbnail) {
        img.onerror = null;
        img.src = meta.thumbnail;
      }
    }
  }

  function cacheKeyForUrl(url) {
    return normalizeMediaUrl(url).split("#")[0];
  }

  function fetchLinkMeta(url) {
    var normalized = normalizeMediaUrl(url);
    var key = cacheKeyForUrl(normalized);
    if (!isYoutubeOrTikTok(normalized)) {
      return Promise.resolve(null);
    }

    var cached = linkMetaCache[key];
    if (cached && !cached.partial) {
      return Promise.resolve(cached);
    }

    fetchLinkMeta._inflight = fetchLinkMeta._inflight || Object.create(null);
    if (fetchLinkMeta._inflight[key]) {
      if (cached) return Promise.resolve(cached);
      return fetchLinkMeta._inflight[key];
    }

    var provider = platformFromUrl(normalized);
    var ytId = provider === "YouTube" ? youtubeIdFromUrl(normalized) : null;
    if (ytId && !cached) {
      linkMetaCache[key] = {
        ok: true,
        url: normalized,
        title: "",
        thumbnail: youtubeThumbCandidates(ytId)[0],
        provider: "YouTube",
        youtubeId: ytId,
        partial: true,
      };
    }

    var request = fetch("/api/oembed?url=" + encodeURIComponent(normalized))
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false };
        });
      })
      .then(function (body) {
        delete fetchLinkMeta._inflight[key];
        if (body && body.ok) {
          var meta = {
            ok: true,
            url: normalized,
            title: body.title || "",
            thumbnail: body.thumbnail || (ytId ? youtubeThumbCandidates(ytId)[0] : ""),
            provider: body.provider || provider,
            youtubeId: ytId || null,
          };
          linkMetaCache[key] = meta;
          return meta;
        }
        if (linkMetaCache[key]) {
          linkMetaCache[key].partial = false;
          return linkMetaCache[key];
        }
        return null;
      })
      .catch(function () {
        delete fetchLinkMeta._inflight[key];
        if (linkMetaCache[key]) {
          linkMetaCache[key].partial = false;
          return linkMetaCache[key];
        }
        return null;
      });

    fetchLinkMeta._inflight[key] = request;
    if (linkMetaCache[key]) return Promise.resolve(linkMetaCache[key]);
    return request;
  }

  function refreshLinkPreviewFromMeta(url, meta, reqId) {
    if (reqId && reqId !== linkPreviewReq) return;
    if (!meta || !(meta.thumbnail || meta.youtubeId)) {
      if (!meta) clearLinkPreview();
      return;
    }
    lastLinkMeta = meta;
    showLinkPreviewCard(meta);
    if (meta.partial) {
      fetchLinkMeta(url);
      var key = cacheKeyForUrl(url);
      var inflight = fetchLinkMeta._inflight && fetchLinkMeta._inflight[key];
      if (inflight) {
        inflight.then(function (full) {
          if (reqId && reqId !== linkPreviewReq) return;
          if (full) {
            lastLinkMeta = full;
            showLinkPreviewCard(full);
          }
        });
      }
    }
  }

  function updateLinkPreview() {
    if (!urlInput) return;
    var v = (urlInput.value || "").trim();
    linkPreviewReq += 1;
    var reqId = linkPreviewReq;
    if (!v || !isLikelyUrl(v) || !isYoutubeOrTikTok(v)) {
      clearLinkPreview();
      if (!v || !isLikelyUrl(v)) lastLinkMeta = null;
      return;
    }
    var normalized = normalizeMediaUrl(v);
    var cached = linkMetaCache[cacheKeyForUrl(normalized)];
    if (cached) {
      refreshLinkPreviewFromMeta(normalized, cached, reqId);
      return;
    }
    var ytId = youtubeIdFromUrl(normalized);
    if (ytId) {
      /* Instant thumb; fetchLinkMeta upgrades title via proxy */
      refreshLinkPreviewFromMeta(
        normalized,
        {
          ok: true,
          url: normalized,
          title: "",
          thumbnail: youtubeThumbCandidates(ytId)[0],
          provider: "YouTube",
          youtubeId: ytId,
          partial: true,
        },
        reqId
      );
      return;
    }
    showLinkPreviewLoading();
    fetchLinkMeta(normalized).then(function (meta) {
      if (reqId !== linkPreviewReq) return;
      if (meta) refreshLinkPreviewFromMeta(normalized, meta, reqId);
      else clearLinkPreview();
    });
  }

  function metaForUrl(url) {
    if (!url) return lastLinkMeta;
    var key = cacheKeyForUrl(url);
    if (linkMetaCache[key]) return linkMetaCache[key];
    if (lastLinkMeta && cacheKeyForUrl(lastLinkMeta.url || "") === key) return lastLinkMeta;
    return null;
  }

  function sourceThumbHtml(url) {
    var meta = metaForUrl(url);
    var thumb = meta && meta.thumbnail;
    if (!thumb && meta && meta.youtubeId) {
      thumb = youtubeThumbCandidates(meta.youtubeId)[0];
    }
    if (!thumb) return "";
    return (
      '<div class="thumb-source" style="background-image:url(\'' +
      escapeHtml(thumb).replace(/'/g, "%27") +
      "')\" aria-hidden=\"true\"></div>"
    );
  }

  function sourceThumbClass(url) {
    var meta = metaForUrl(url);
    if (meta && (meta.thumbnail || meta.youtubeId)) return " has-source-thumb";
    return "";
  }

  function clearBatchLinkPreviews() {
    var wrap = document.getElementById("batch-link-previews");
    if (!wrap) return;
    wrap.innerHTML = "";
    wrap.hidden = true;
  }

  function renderBatchLinkPreviews() {
    var wrap = document.getElementById("batch-link-previews");
    var batchInput = document.getElementById("batch-url-input");
    if (!wrap || !batchInput) return;
    var urls = parseBatchUrls(batchInput.value).filter(isYoutubeOrTikTok).slice(0, 8);
    if (!urls.length) {
      clearBatchLinkPreviews();
      return;
    }
    wrap.hidden = false;
    wrap.innerHTML = "";
    urls.forEach(function (url) {
      var chip = document.createElement("div");
      chip.className = "batch-thumb-chip is-loading";
      chip.title = url;
      chip.innerHTML =
        '<span class="batch-thumb-ph" aria-hidden="true"></span>' +
        '<span class="batch-thumb-chip-title">' +
        escapeHtml(shortUrl(url)) +
        "</span>" +
        '<span class="batch-thumb-chip-badge">' +
        escapeHtml(platformFromUrl(url)) +
        "</span>";
      wrap.appendChild(chip);

      var ytId = youtubeIdFromUrl(url);
      if (ytId) {
        var img = document.createElement("img");
        img.alt = "";
        img.width = 36;
        img.height = 36;
        img.decoding = "async";
        bindYoutubeThumbFallback(img, ytId);
        var ph = chip.querySelector(".batch-thumb-ph");
        if (ph) chip.replaceChild(img, ph);
        chip.classList.remove("is-loading");
      }

      fetchLinkMeta(url).then(function (meta) {
        if (!meta) return;
        chip.classList.remove("is-loading");
        var titleEl = chip.querySelector(".batch-thumb-chip-title");
        if (titleEl && meta.title) titleEl.textContent = meta.title;
        if (!ytId && meta.thumbnail) {
          var existing = chip.querySelector("img");
          if (existing) {
            existing.src = meta.thumbnail;
          } else {
            var img2 = document.createElement("img");
            img2.alt = "";
            img2.width = 36;
            img2.height = 36;
            img2.decoding = "async";
            img2.src = meta.thumbnail;
            var ph2 = chip.querySelector(".batch-thumb-ph");
            if (ph2) chip.replaceChild(img2, ph2);
            else chip.insertBefore(img2, chip.firstChild);
          }
        }
      });
    });
  }

  function scheduleBatchLinkPreviews() {
    if (batchPreviewTimer) clearTimeout(batchPreviewTimer);
    batchPreviewTimer = setTimeout(renderBatchLinkPreviews, 280);
  }

  function updatePasteDetect() {
    if (!urlInput) return;
    var v = (urlInput.value || "").trim();
    var ok = isLikelyUrl(v);
    if (pasteHint) pasteHint.hidden = !ok;
    urlInput.classList.toggle("is-valid", ok);
    if (ok) {
      hideError();
      markOnboardStep("paste");
    }
    updateLinkPreview();
  }

  if (urlInput) {
    urlInput.addEventListener("input", updatePasteDetect);
    urlInput.addEventListener("paste", function () {
      setTimeout(updatePasteDetect, 0);
    });
  }

  /* —— loading progress —— */
  function setProgressStep(activeIndex) {
    if (!progressSteps) return;
    var items = progressSteps.querySelectorAll(".prog-step");
    items.forEach(function (el, i) {
      el.classList.remove("active", "done");
      if (i < activeIndex) el.classList.add("done");
      else if (i === activeIndex) el.classList.add("active");
    });
  }

  function setGenerateBusy(busy) {
    if (!generateBtn) return;
    if (busy) {
      if (!generateBtn.dataset.label) generateBtn.dataset.label = generateBtn.textContent;
      generateBtn.textContent = "Generating…";
      generateBtn.classList.add("is-generating");
      generateBtn.disabled = true;
    } else {
      generateBtn.textContent = generateBtn.dataset.label || "Generate";
      generateBtn.classList.remove("is-generating");
    }
  }

  function startLoading(onDone) {
    resultsEl.classList.remove("active");
    setEmptyVisible(false);
    hideError();
    loadingEl.classList.add("active");
    setGenerateBusy(true);

    var step = 0;
    setProgressStep(0);
    loadingStatus.textContent = PROGRESS[0].status;

    if (loadingTimer) clearInterval(loadingTimer);
    loadingTimer = setInterval(function () {
      step += 1;
      if (step < PROGRESS.length) {
        setProgressStep(step);
        loadingStatus.textContent = PROGRESS[step].status;
      }
    }, 850);

    setTimeout(function () {
      clearInterval(loadingTimer);
      loadingTimer = null;
      setProgressStep(PROGRESS.length);
      loadingEl.classList.remove("active");
      setGenerateBusy(false);
      updateCreditsUI();
      onDone();
    }, 2900);
  }

  function generate() {
    if (isMaintenanceOn() && !isOwner()) {
      applyMaintenanceUI();
      showToast("VOID Clips is updating — back soon");
      return;
    }
    if (!isSignedIn()) {
      ensureGuestCredits();
      if (getGuestCredits() <= 0) {
        showAuthGate({ soft: true });
        showToast("Guest demos used up — sign in for 10 free gens");
        return;
      }
    } else if (!isOwner() && !isPro() && currentUser.credits <= 0) {
      updateCreditsUI();
      if (upgradeCta) {
        upgradeCta.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      showToast("No free generations left");
      return;
    }

    var url = (urlInput.value || "").trim();
    if (!isLikelyUrl(url)) {
      showError();
      return;
    }

    if (url.indexOf("http") !== 0) url = "https://" + url;
    urlInput.value = url;
    updatePasteDetect();
    markOnboardStep("paste");
    fetchLinkMeta(url).then(function (meta) {
      if (meta) lastLinkMeta = meta;
    });

    var batchGroups = document.getElementById("batch-groups");
    if (batchGroups) {
      batchGroups.hidden = true;
      batchGroups.innerHTML = "";
    }

    startLoading(function () {
      consumeCredit();
      bumpStatGens();
      var clips = buildClipSet();
      clips.forEach(function (c, i) {
        enrichClipExtras(c, i);
      });
      finishGeneration(url, clips);
      renderClipsFromData(clips, platformFromUrl(url));
      resultsEl.classList.add("active");
      resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      markOnboardStep("generate");
      if (isOwner()) {
        showToast("∞ / Owner");
      } else if (isPro()) {
        showToast("∞ / Pro");
      } else if (isSignedIn() && currentUser && currentUser.credits > 0) {
        showToast(creditsLabel(currentUser.credits));
      } else if (!isSignedIn()) {
        var left = getGuestCredits();
        showToast(
          left > 0
            ? left + " guest demo" + (left === 1 ? "" : "s") + " left"
            : "Guest demos done — sign in for 10 free"
        );
      } else {
        showToast("Out of free gens — upgrade or redeem a code");
      }
    });
  }

  if (generateBtn) generateBtn.addEventListener("click", generate);

  function openSoftAuth() {
    showAuthGate({ soft: true });
  }
  if (navSigninBtn) navSigninBtn.addEventListener("click", openSoftAuth);
  if (guestBannerSignin) guestBannerSignin.addEventListener("click", openSoftAuth);
  if (authContinueGuest) {
    authContinueGuest.addEventListener("click", function () {
      showGuestStudio();
      showToast("Guest demo — " + getGuestCredits() + " free try" + (getGuestCredits() === 1 ? "" : "s"));
    });
  }

  var regenerateBtn = document.getElementById("regenerate-btn");
  if (regenerateBtn) {
    regenerateBtn.addEventListener("click", function () {
      if (urlInput && (urlInput.value || "").trim()) {
        generate();
      } else {
        showToast("Paste a link first");
        if (urlInput) urlInput.focus();
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        generate();
      }
    });
  }

  /* keyboard shortcuts */
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      generate();
    }
    if (e.key === "Escape") {
      if (demoCodeModal && !demoCodeModal.hidden) {
        closeModal(demoCodeModal);
        return;
      }
      if (bugModal && !bugModal.hidden) {
        closeModal(bugModal);
        return;
      }
      if (pricingModal && !pricingModal.hidden) {
        closeModal(pricingModal);
        return;
      }
      if (ownerPanel && !ownerPanel.hidden) {
        closeOwnerPanel();
        return;
      }
      if (settingsModal && !settingsModal.hidden) {
        closeModal(settingsModal);
        return;
      }
      if (onboardingModal && !onboardingModal.hidden) {
        dismissOnboarding();
        return;
      }
      if (urlInput && document.activeElement === urlInput) {
        urlInput.value = "";
        updatePasteDetect();
        clearLinkPreview();
        hideError();
      }
    }
  });

  /* —— waitlist —— */
  function getWaitlist() {
    try {
      var raw = localStorage.getItem(WAITLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function joinWaitlist(email, msgEl, inputEl) {
    email = String(email || "").trim().toLowerCase();
    if (!email || email.indexOf("@") === -1) return false;
    var list = getWaitlist();
    if (list.indexOf(email) === -1) {
      list.push(email);
      try {
        localStorage.setItem(WAITLIST_KEY, JSON.stringify(list));
      } catch (err) {}
    }
    if (msgEl) {
      msgEl.textContent = "You're on the list. We'll ping you when live AI drops.";
      msgEl.classList.add("show");
    }
    if (inputEl) inputEl.value = "";
    showToast("Joined waitlist");
    return true;
  }

  if (waitlistForm) {
    waitlistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      joinWaitlist(waitlistEmail && waitlistEmail.value, waitlistMsg, waitlistEmail);
    });
  }

  if (upgradeWaitlistForm) {
    upgradeWaitlistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      joinWaitlist(
        upgradeWaitlistEmail && upgradeWaitlistEmail.value,
        upgradeWaitlistMsg,
        upgradeWaitlistEmail
      );
    });
  }

  /* —— password strength hint (signup) —— */
  function updatePasswordHint() {
    var hint = document.getElementById("auth-pw-hint");
    var pwEl = document.getElementById("auth-password");
    if (!hint || !pwEl) return;
    if (authMode !== "signup") {
      hint.hidden = true;
      return;
    }
    var pw = String(pwEl.value || "");
    hint.hidden = false;
    if (!pw) {
      hint.textContent = "Min 10 · upper + lower + number";
      hint.className = "auth-pw-hint";
      return;
    }
    var okLen = pw.length >= MIN_PASSWORD;
    var okUp = /[A-Z]/.test(pw);
    var okLow = /[a-z]/.test(pw);
    var okNum = /[0-9]/.test(pw);
    var missing = [];
    if (!okLen) missing.push("10+ chars");
    if (!okUp) missing.push("upper");
    if (!okLow) missing.push("lower");
    if (!okNum) missing.push("number");
    if (!missing.length) {
      hint.textContent = "Strong password ✓";
      hint.className = "auth-pw-hint is-ok";
    } else {
      hint.textContent = "Still need: " + missing.join(" · ");
      hint.className = "auth-pw-hint is-weak";
    }
  }
  var authPwEl = document.getElementById("auth-password");
  if (authPwEl) {
    authPwEl.addEventListener("input", updatePasswordHint);
    authPwEl.addEventListener("focus", updatePasswordHint);
  }

  /* —— wrong-origin banner: only for file:// (http/https incl. PUBLIC_BASE = OK) —— */
  function initOriginBanner() {
    var banner = document.getElementById("origin-banner");
    if (!banner) return;
    var isHttp = location.protocol === "http:" || location.protocol === "https:";
    if (isHttp) {
      banner.hidden = true;
      return;
    }
    try {
      if (sessionStorage.getItem("void_clips_origin_banner_dismissed") === "1") {
        banner.hidden = true;
        return;
      }
    } catch (e) {}
    banner.hidden = false;
    var dismiss = document.getElementById("origin-banner-dismiss");
    if (dismiss) {
      dismiss.addEventListener("click", function () {
        banner.hidden = true;
        try {
          sessionStorage.setItem("void_clips_origin_banner_dismissed", "1");
        } catch (e2) {}
      });
    }
  }

  /* ========== VOID Studio + Labs (creator tools) ========== */
  var GEN_HISTORY_KEY = "void_clips_gen_history";
  var FAVORITES_KEY = "void_clips_favorites";
  var VOICE_KEY = "void_clips_brand_voice";
  var STREAK_KEY = "void_clips_daily_streak";
  var MAX_GEN_HISTORY = 15;
  var MAX_FAVORITES = 40;

  var HOOK_VARIANTS = {
    viral: {
      en: [
        ["Wait — rewind that last second", "The algo buried this. Don't let it."],
        ["Keep watching if you've ever almost quit", "This is the cut I almost killed."],
        ["One move. Feed never looks the same.", "Steal this before your niche does."],
        ["If this feels too accurate… it is.", "POV: the timeline finally snitched."],
      ],
      sv: [
        ["Vänta — spola tillbaka den sista sekunden", "Algon grävde ner det här. Låt den inte."],
        ["Fortsätt om du nästan gett upp", "Det här klippet höll jag på att döda."],
        ["Ett drag. Feeden ser aldrig likadan ut.", "Stjäl innan din nisch gör det."],
        ["Om det känns för träffande… det är det.", "POV: tidslinjen skvallrade äntligen."],
      ],
    },
    story: {
      en: [
        ["I shouldn't have opened that thread", "Cold open: one notification ruined sleep."],
        ["This is where it got quiet for real", "The beat before everything flipped."],
        ["They cut this line from the story", "The part nobody warned you about."],
        ["Credits roll. I'm already gone.", "Sequel bait — if Part 1 hit."],
      ],
      sv: [
        ["Jag borde inte öppnat den tråden", "Cold open: en notis förstörde sömnen."],
        ["Här blev det tyst på riktigt", "Takten innan allt vände."],
        ["De klippte den här raden ur storyn", "Delen ingen varnade dig för."],
        ["Credits. Jag är redan borta.", "Sequel-bete — om del 1 tog."],
      ],
    },
    funny: {
      en: [
        ["Say it louder for the people in denial", "No notes. Just chaos."],
        ["Brain.exe has stopped responding", "HR called. We ignored it."],
        ["Speedrun: how plans die", "0.4s of confidence, then ruins."],
        ["Warning: may cause secondhand cringe", "Mute if you're soft. Match if you're not."],
      ],
      sv: [
        ["Säg det högre för de i förnekelse", "Inga notes. Bara kaos."],
        ["Hjärna.exe har slutat svara", "HR ringde. Vi ignorerade."],
        ["Speedrun: hur planer dör", "0,4s självförtroende, sen ruiner."],
        ["Varning: kan ge secondhand-cringe", "Mute om du är mjuk. Matcha om inte."],
      ],
    },
  };

  var PLATFORM_META = {
    tiktok: { label: "TikTok", hint: "Punchy · ~150 chars" },
    shorts: { label: "YT Shorts", hint: "Clear · searchable" },
    reels: { label: "IG Reels", hint: "Aesthetic · save-bait" },
  };

  var THUMB_WORDS = {
    viral: { en: [["WAIT FOR IT", "DON'T SKIP", "STOLEN CUT"], ["ALMOST DELETED", "REWIND", "FEED CHECK"], ["ONE MOVE", "SAVE THIS", "ALGO BAIT"], ["TOO REAL", "POV", "CAUGHT"]],
      sv: [["VÄNTA", "SKIPPA INTE", "RÅKLIPP"], ["NÄSTAN RADERAD", "SPOLA", "FEED-CHECK"], ["ETT DRAG", "SPARA", "ALGO-BETE"], ["FÖR RIKTIGT", "POV", "PÅKOMEN"]] },
    story: { en: [["PART 1", "DON'T OPEN", "THE THREAD"], ["THEN…", "IT GOT QUIET", "ESCALATE"], ["THE CUT", "NO WARNING", "REVEAL"], ["END.", "WALKED OUT", "SEQUEL?"]],
      sv: [["DEL 1", "ÖPPNA INTE", "TRÅDEN"], ["SEN…", "DET BLEV TYST", "UPPBYGGNAD"], ["KLIPPET", "INGEN VARNING", "REVEAL"], ["SLUT.", "GICK", "DEL 2?"]] },
    funny: { en: [["NO FILTER", "WHOLE CHEST", "SAY IT"], ["3AM BRAIN", "NO HR", "CHAOS"], ["0.4s PLAN", "FAIL EDIT", "RUINS"], ["MUTE?", "WARNING", "CRINGE"]],
      sv: [["INGEN FILTER", "HELA BRÖSTET", "SÄG DET"], ["03:00", "INGEN HR", "KAOS"], ["0,4s PLAN", "FAIL", "RUINER"], ["MUTE?", "VARNING", "CRINGE"]] },
  };

  function emptyChecklist() {
    return { hook: false, caption: false, hashtags: false, pinComment: false, thumbnail: false };
  }

  function uid(prefix) {
    return (prefix || "id") + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  }

  function loadJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  function getBrandVoice() {
    var v = loadJson(VOICE_KEY, null);
    if (!v || typeof v !== "object") return { name: "", vibe: "", banned: [] };
    return {
      name: String(v.name || "").trim(),
      vibe: String(v.vibe || "").trim(),
      banned: Array.isArray(v.banned)
        ? v.banned
        : String(v.banned || "")
            .split(",")
            .map(function (s) {
              return s.trim();
            })
            .filter(Boolean),
    };
  }

  function saveBrandVoice(v) {
    saveJson(VOICE_KEY, {
      name: (v.name || "").trim(),
      vibe: (v.vibe || "").trim(),
      banned: (v.banned || [])
        .map(function (s) {
          return String(s).trim();
        })
        .filter(Boolean),
    });
  }

  function applyVoiceToText(text) {
    if (!text) return text;
    var voice = getBrandVoice();
    var out = String(text);
    (voice.banned || []).forEach(function (w) {
      if (!w) return;
      try {
        var re = new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
        out = out.replace(re, "—");
      } catch (e) {}
    });
    if (voice.name && out.indexOf("@V_O_I_.D") !== -1) {
      out = out.replace(/@V_O_I_\.D/g, voice.name.indexOf("@") === 0 ? voice.name : "@" + voice.name.replace(/^@/, ""));
    }
    return out;
  }

  function voicePrefix() {
    var voice = getBrandVoice();
    if (!voice.vibe) return "";
    return "[" + voice.vibe + "] ";
  }

  function getStreak() {
    return loadJson(STREAK_KEY, { count: 0, lastDay: "" });
  }

  function dayKeyLocal() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function bumpStreak() {
    var s = getStreak();
    var today = dayKeyLocal();
    if (s.lastDay === today) {
      updateStreakUI();
      return s;
    }
    var y = new Date();
    y.setDate(y.getDate() - 1);
    var yKey = y.getFullYear() + "-" + String(y.getMonth() + 1).padStart(2, "0") + "-" + String(y.getDate()).padStart(2, "0");
    if (s.lastDay === yKey) s.count = (s.count || 0) + 1;
    else s.count = 1;
    s.lastDay = today;
    saveJson(STREAK_KEY, s);
    updateStreakUI();
    var flair =
      s.count >= 7
        ? "Weekly VOID — " + s.count + " day streak"
        : s.count >= 3
          ? "Streak ×" + s.count + " — keep the void lit"
          : "Daily VOID logged · day " + s.count;
    showToast(flair);
    return s;
  }

  function updateStreakUI() {
    var el = document.getElementById("streak-pill");
    if (!el) return;
    var s = getStreak();
    if (!s.count) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.textContent = "🔥 " + s.count;
    el.title = "Daily VOID streak · " + s.count + " day" + (s.count === 1 ? "" : "s");
  }

  function getGenHistory() {
    var list = loadJson(GEN_HISTORY_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function pushGenHistory(entry) {
    var list = getGenHistory().filter(function (g) {
      return g && g.id !== entry.id;
    });
    list.unshift(entry);
    if (list.length > MAX_GEN_HISTORY) list = list.slice(0, MAX_GEN_HISTORY);
    saveJson(GEN_HISTORY_KEY, list);
  }

  function updateGenChecklist(genId, clipIndex, checklist) {
    var list = getGenHistory();
    var changed = false;
    list.forEach(function (g) {
      if (g.id !== genId) return;
      if (!g.checklists) g.checklists = {};
      g.checklists[String(clipIndex)] = checklist;
      changed = true;
    });
    if (changed) saveJson(GEN_HISTORY_KEY, list);
  }

  function getFavorites() {
    var list = loadJson(FAVORITES_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function favKeyFor(clip, sourceUrl) {
    return (sourceUrl || "") + "::" + (clip.hook || "") + "::" + (clip.label || "");
  }

  function isFavorited(clip, sourceUrl) {
    var key = favKeyFor(clip, sourceUrl);
    return getFavorites().some(function (f) {
      return f.key === key;
    });
  }

  function toggleFavorite(clip, sourceUrl) {
    var key = favKeyFor(clip, sourceUrl);
    var list = getFavorites();
    var idx = -1;
    list.forEach(function (f, i) {
      if (f.key === key) idx = i;
    });
    if (idx >= 0) {
      list.splice(idx, 1);
      saveJson(FAVORITES_KEY, list);
      showToast("Removed from favorites");
      return false;
    }
    list.unshift({
      key: key,
      id: uid("fav"),
      hook: clip.hook,
      caption: clip.caption,
      score: clip.score,
      pin: clip.pin,
      label: clip.label,
      sourceUrl: sourceUrl || lastSourceUrl || "",
      style: state.style,
      timestamp: Date.now(),
      platforms: clip.platforms || null,
    });
    if (list.length > MAX_FAVORITES) list = list.slice(0, MAX_FAVORITES);
    saveJson(FAVORITES_KEY, list);
    showToast("Starred · Favorites");
    return true;
  }

  function clampScore(n) {
    return Math.max(40, Math.min(99, Math.round(n)));
  }

  function buildScrollStop(clip, index) {
    var base = typeof clip.score === "number" ? clip.score : 75;
    var wobble = ((index * 7 + (clip.hook || "").length) % 9) - 4;
    return {
      hook: clampScore(base + 4 + wobble),
      payoff: clampScore(base - 2 - wobble * 0.5),
      curiosity: clampScore(base + 1 + (index % 3) * 2),
      shareability: clampScore(base - 5 + (index % 2) * 4),
    };
  }

  function buildHookVariants(clip, index) {
    var langKey = state.lang === "sv" ? "sv" : "en";
    var pack = (HOOK_VARIANTS[state.style] || HOOK_VARIANTS.viral)[langKey] || [];
    var alts = pack[index] || pack[0] || ["Alt hook A", "Alt hook B"];
    var variants = [clip.hook].concat(alts).slice(0, 3);
    return variants.map(function (h, i) {
      return { id: String.fromCharCode(65 + i), text: applyVoiceToText(voicePrefix() && i > 0 ? h : h) };
    });
  }

  function buildPlatformPacks(clip) {
    var hook = applyVoiceToText(clip.hook || "");
    var tags = hashtagPack();
    var shortTags = tags.split(" ").slice(0, 5).join(" ");
    var tiktok = hook.length > 120 ? hook.slice(0, 117) + "…" : hook;
    tiktok = tiktok + "\n\n" + shortTags;
    var shorts =
      hook +
      "\n\nWatch to the end — then tell me the second it flipped.\n\n" +
      tags;
    var reels =
      "✨ " +
      hook +
      "\n\nSave this for later. Soft launches don't survive here.\n\n" +
      shortTags +
      " #reels";
    if (state.lang === "sv") {
      shorts =
        hook +
        "\n\nTitta till slutet — säg vilken sekund det vände.\n\n" +
        tags;
      reels =
        "✨ " +
        hook +
        "\n\nSpara till senare. Mjuka starter överlever inte här.\n\n" +
        shortTags +
        " #reels";
    }
    return {
      tiktok: { caption: tiktok, hint: PLATFORM_META.tiktok.hint },
      shorts: { caption: shorts, hint: PLATFORM_META.shorts.hint },
      reels: { caption: reels, hint: PLATFORM_META.reels.hint },
    };
  }

  function buildCommentWar(clip) {
    var pin = applyVoiceToText(clip.pin || "Drop your take.");
    var sv = state.lang === "sv";
    var pins = sv
      ? [
          pin,
          "Pin: tidsstämpla sekunden det vände. Inga mjuka svar.",
          "Första kommentaren vinner — säg vilken del som bröt dig.",
          "Del 2 om detta tar 1k. Kommentera VOID om du är kvar.",
          "Tagga den som fortfarande scrollar förbi guld.",
        ]
      : [
          pin,
          "Pin: timestamp the second it flipped. No soft replies.",
          "First comment wins — which beat broke you?",
          "Part 2 if this hits 1k. Comment VOID if you're still here.",
          "Tag the one who still scrolls past gold.",
        ];
    var replies = sv
      ? [
          "Du märkte X? De flesta missar det.",
          "Säg emot mig i svaren — jag läser allt.",
          "Om du bara gillar: du är tyst. Om du kommenterar: du är kvar.",
        ]
      : [
          "You caught X? Most people miss it.",
          "Disagree in the replies — I read all of them.",
          "Likes are quiet. Comments mean you're still in the room.",
        ];
    return { pins: pins.slice(0, 5), replies: replies.slice(0, 3) };
  }

  function buildThumbTexts(clip, index) {
    var langKey = state.lang === "sv" ? "sv" : "en";
    var pack = (THUMB_WORDS[state.style] || THUMB_WORDS.viral)[langKey] || [];
    var words = pack[index] || pack[0] || ["HOOK", "WATCH", "NOW"];
    return words.slice(0, 3);
  }

  function buildSeriesPack(url) {
    var sv = state.lang === "sv";
    var base = shortUrl(url || lastSourceUrl || "your cut");
    if (sv) {
      return [
        {
          part: 1,
          hook: "Del 1 — jag borde stängt av innan det här",
          caption: "DEL 1 · CLIFF",
          beat: "Cold open · cliff :28",
          note: "Avsluta mitt i spänningen. CTA: del 2 imorgon.",
        },
        {
          part: 2,
          hook: "Del 2 — det som hände efter tystnaden",
          caption: "DEL 2 · VÄNDNING",
          beat: "Payoff tease · new question",
          note: "Betala lite, öppna större hål. CTA: finalen snart.",
        },
        {
          part: 3,
          hook: "Del 3 — sista klippet från " + base,
          caption: "FINAL",
          beat: "Full payoff · sequel bait",
          note: "Stäng loopen. Soft-CTA till nästa serie.",
        },
      ];
    }
    return [
      {
        part: 1,
        hook: "Part 1 — I should've stopped before this",
        caption: "PART 1 · CLIFF",
        beat: "Cold open · cliff :28",
        note: "End mid-tension. CTA: Part 2 drops next.",
      },
      {
        part: 2,
        hook: "Part 2 — what happened after the silence",
        caption: "PART 2 · TURN",
        beat: "Payoff tease · new question",
        note: "Pay a little, open a bigger hole. CTA: finale soon.",
      },
      {
        part: 3,
        hook: "Part 3 — the last cut from " + base,
        caption: "FINAL",
        beat: "Full payoff · sequel bait",
        note: "Close the loop. Soft-CTA into the next series.",
      },
    ];
  }

  function detectNicheTags(url, clips) {
    var blob = ((url || "") + " " + (clips || [])
      .map(function (c) {
        return (c.hook || "") + " " + (c.label || "") + " " + (c.vibe || "");
      })
      .join(" ")).toLowerCase();
    var tags = [];
    if (/story|part|message|silence|reveal/.test(blob)) tags.push("storytime");
    if (/funny|fail|chaos|meme|brain|mute/.test(blob)) tags.push("comedy");
    if (/pov|viral|hook|algo|feed|save/.test(blob)) tags.push("viral");
    if (/tiktok/.test(blob)) tags.push("tiktok");
    if (/youtube|youtu\.be/.test(blob)) tags.push("youtube");
    if (!tags.length) tags.push(state.style || "viral");
    if (state.style && tags.indexOf(state.style) === -1) tags.push(state.style);
    return tags.slice(0, 4);
  }

  function buildPulse(url, clips) {
    var tags = detectNicheTags(url, clips);
    var niche = tags[0] || "viral";
    /* Heuristic windows — demo planning aid, not live analytics */
    var seEu =
      niche === "comedy"
        ? { label: "SE / EU", windows: ["17:30–19:00", "21:00–22:30"], best: "18:15 CET" }
        : niche === "storytime"
          ? { label: "SE / EU", windows: ["07:30–08:30", "20:00–21:30"], best: "20:40 CET" }
          : { label: "SE / EU", windows: ["12:00–13:00", "18:00–20:00"], best: "19:10 CET" };
    var us =
      niche === "comedy"
        ? { label: "US", windows: ["11:00–13:00 ET", "19:00–21:00 ET"], best: "12:20 ET" }
        : niche === "storytime"
          ? { label: "US", windows: ["07:00–08:00 ET", "21:00–22:30 ET"], best: "21:35 ET" }
          : { label: "US", windows: ["09:00–10:30 ET", "18:30–20:00 ET"], best: "19:05 ET" };
    var bars = [
      { name: seEu.best, pct: 92 },
      { name: seEu.windows[0], pct: 74 },
      { name: us.best, pct: 88 },
      { name: us.windows[0], pct: 71 },
    ];
    return { tags: tags, seEu: seEu, us: us, bars: bars, niche: niche };
  }

  function enrichClipExtras(clip, index) {
    clip.id = clip.id || uid("clip");
    clip.hookVariants = buildHookVariants(clip, index);
    clip.platforms = buildPlatformPacks(clip);
    clip.scrollStop = buildScrollStop(clip, index);
    clip.commentWar = buildCommentWar(clip);
    clip.thumbTexts = buildThumbTexts(clip, index);
    clip.checklist = clip.checklist || emptyChecklist();
    if (clip.persona) clip.persona = applyVoiceToText(clip.persona);
    if (clip.pin) clip.pin = applyVoiceToText(clip.pin);
    return clip;
  }

  function openDrawer(el) {
    if (!el) return;
    el.hidden = false;
    document.body.classList.add("drawer-open");
  }

  function closeDrawer(el) {
    if (!el) return;
    el.hidden = true;
    if (!document.querySelector(".drawer-overlay:not([hidden])")) {
      document.body.classList.remove("drawer-open");
    }
  }

  function formatGenTime(ts) {
    try {
      return new Date(ts).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  }

  function avgResonance(clips) {
    if (!clips || !clips.length) return 0;
    var sum = 0;
    clips.forEach(function (c) {
      sum += typeof c.score === "number" ? c.score : 75;
    });
    return Math.round(sum / clips.length);
  }

  function renderHistoryDrawer() {
    var listEl = document.getElementById("history-list");
    var emptyEl = document.getElementById("history-empty");
    if (!listEl) return;
    var list = getGenHistory();
    listEl.innerHTML = "";
    if (!list.length) {
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    list.forEach(function (g) {
      var row = document.createElement("article");
      row.className = "drawer-item";
      var avg = typeof g.resonance === "number" ? g.resonance : avgResonance(g.clips);
      row.innerHTML =
        '<div class="drawer-item-main">' +
        '<p class="drawer-item-title">' +
        escapeHtml(shortUrl(g.url || "")) +
        "</p>" +
        '<p class="drawer-item-meta">' +
        escapeHtml(formatGenTime(g.timestamp)) +
        " · " +
        escapeHtml((g.style || "viral") + "") +
        " · Resonance " +
        avg +
        (g.series ? " · Series" : "") +
        "</p>" +
        "</div>" +
        '<div class="drawer-item-actions">' +
        '<button type="button" class="btn btn-ghost btn-xs hist-open">Open</button>' +
        '<button type="button" class="btn btn-ghost btn-xs hist-copy">Copy link</button>' +
        "</div>";
      row.querySelector(".hist-open").addEventListener("click", function () {
        reopenGeneration(g);
      });
      row.querySelector(".hist-copy").addEventListener("click", function () {
        copyText(g.url || "", this, "Copied!");
      });
      listEl.appendChild(row);
    });
  }

  function renderFavoritesDrawer() {
    var listEl = document.getElementById("favorites-list");
    var emptyEl = document.getElementById("favorites-empty");
    if (!listEl) return;
    var list = getFavorites();
    listEl.innerHTML = "";
    if (!list.length) {
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    list.forEach(function (f) {
      var row = document.createElement("article");
      row.className = "drawer-item";
      row.innerHTML =
        '<div class="drawer-item-main">' +
        '<p class="drawer-item-title">' +
        escapeHtml(f.hook || "") +
        "</p>" +
        '<p class="drawer-item-meta">' +
        escapeHtml(f.label || "") +
        (typeof f.score === "number" ? " · " + f.score : "") +
        (f.sourceUrl ? " · " + shortUrl(f.sourceUrl) : "") +
        "</p>" +
        "</div>" +
        '<div class="drawer-item-actions">' +
        '<button type="button" class="btn btn-ghost btn-xs fav-copy">Copy</button>' +
        '<button type="button" class="btn btn-ghost btn-xs fav-unpin">Unpin</button>' +
        "</div>";
      row.querySelector(".fav-copy").addEventListener("click", function () {
        copyText((f.hook || "") + "\n\n" + (f.pin || ""), this, "Copied!");
      });
      row.querySelector(".fav-unpin").addEventListener("click", function () {
        var next = getFavorites().filter(function (x) {
          return x.id !== f.id;
        });
        saveJson(FAVORITES_KEY, next);
        renderFavoritesDrawer();
        showToast("Unpinned");
      });
      listEl.appendChild(row);
    });
  }

  function reopenGeneration(g) {
    if (!g) return;
    if (g.style && CLIPS[g.style]) state.style = g.style;
    if (g.lang) state.lang = g.lang;
    if (g.aspect) state.aspect = g.aspect;
    if (typeof g.voidMode === "boolean") state.voidMode = g.voidMode;
    if (typeof g.series === "boolean") state.seriesMode = g.series;
    syncSegmented();
    applySeriesChrome();
    applyVoidModeChrome();
    if (urlInput) urlInput.value = g.url || "";
    updatePasteDetect();
    lastClips = (g.clips || []).map(function (c, i) {
      var clip = Object.assign({}, c);
      if (g.checklists && g.checklists[String(i)]) clip.checklist = g.checklists[String(i)];
      return enrichClipExtras(clip, i);
    });
    lastSourceUrl = g.url || "";
    lastGenId = g.id;
    var batchGroups = document.getElementById("batch-groups");
    if (batchGroups) {
      batchGroups.hidden = true;
      batchGroups.innerHTML = "";
    }
    renderClipsFromData(lastClips, platformFromUrl(g.url));
    renderVoidLabs(g.url, lastClips);
    resultsEl.classList.add("active");
    setEmptyVisible(false);
    closeDrawer(document.getElementById("history-drawer"));
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Reopened generation");
  }

  function scrollStopHtml(ss) {
    if (!ss) return "";
    var keys = [
      { k: "hook", label: "Hook" },
      { k: "payoff", label: "Payoff" },
      { k: "curiosity", label: "Curiosity" },
      { k: "shareability", label: "Share" },
    ];
    var bars = keys
      .map(function (item) {
        var v = ss[item.k] || 70;
        return (
          '<div class="ss-row">' +
          '<span class="ss-label">' +
          item.label +
          "</span>" +
          '<div class="ss-meter"><div class="ss-fill" style="width:' +
          v +
          '%"></div></div>' +
          '<span class="ss-val">' +
          v +
          "</span>" +
          "</div>"
        );
      })
      .join("");
    return (
      '<div class="scroll-stop-block">' +
      '<div class="creator-block-head"><span class="creator-block-label">Scroll-stop breakdown</span></div>' +
      bars +
      "</div>"
    );
  }

  function creatorToolsHtml(clip, index) {
    var variants = clip.hookVariants || [];
    var variantRows = variants
      .map(function (v) {
        return (
          '<div class="ab-row">' +
          '<span class="ab-badge">' +
          escapeHtml(v.id) +
          "</span>" +
          '<p class="ab-text">' +
          escapeHtml(v.text) +
          "</p>" +
          '<button type="button" class="btn btn-ghost btn-xs copy-ab" data-ab="' +
          escapeHtml(v.id) +
          '">Copy</button>' +
          "</div>"
        );
      })
      .join("");

    var platChips = ["tiktok", "shorts", "reels"]
      .map(function (k, i) {
        return (
          '<button type="button" class="plat-chip' +
          (i === 0 ? " is-active" : "") +
          '" data-plat="' +
          k +
          '">' +
          escapeHtml(PLATFORM_META[k].label) +
          "</button>"
        );
      })
      .join("");

    var firstPlat = (clip.platforms && clip.platforms.tiktok) || { caption: "", hint: "" };
    var thumbs = (clip.thumbTexts || [])
      .map(function (t) {
        return (
          '<button type="button" class="thumb-idea copy-thumb-idea">' +
          '<span class="thumb-idea-text">' +
          escapeHtml(t) +
          "</span>" +
          "<span class=\"thumb-idea-copy\">Copy</span></button>"
        );
      })
      .join("");

    var cl = clip.checklist || emptyChecklist();
    var checks = [
      { k: "hook", label: "Hook locked" },
      { k: "caption", label: "Caption pasted" },
      { k: "hashtags", label: "Hashtags ready" },
      { k: "pinComment", label: "Pin comment set" },
      { k: "thumbnail", label: "Thumbnail note" },
    ]
      .map(function (c) {
        return (
          '<label class="post-check">' +
          '<input type="checkbox" data-check="' +
          c.k +
          '"' +
          (cl[c.k] ? " checked" : "") +
          " />" +
          "<span>" +
          c.label +
          "</span></label>"
        );
      })
      .join("");

    return (
      '<div class="creator-tools" data-creator-tools>' +
      '<div class="creator-tabs" role="tablist">' +
      '<button type="button" class="creator-tab is-active" data-ctab="hooks">Hooks A/B</button>' +
      '<button type="button" class="creator-tab" data-ctab="platforms">Platforms</button>' +
      '<button type="button" class="creator-tab" data-ctab="post">Post</button>' +
      "</div>" +
      '<div class="creator-panel is-active" data-cpanel="hooks">' +
      '<p class="creator-hint">A/B test these · one-tap copy</p>' +
      variantRows +
      "</div>" +
      '<div class="creator-panel" data-cpanel="platforms" hidden>' +
      '<div class="plat-chips">' +
      platChips +
      "</div>" +
      '<p class="plat-hint">' +
      escapeHtml(firstPlat.hint || "") +
      "</p>" +
      '<p class="plat-caption" data-plat-caption>' +
      escapeHtml(firstPlat.caption || "") +
      "</p>" +
      '<button type="button" class="btn btn-ghost btn-xs copy-plat">Copy caption</button>' +
      "</div>" +
      '<div class="creator-panel" data-cpanel="post" hidden>' +
      '<div class="post-check-list">' +
      checks +
      "</div>" +
      '<p class="creator-hint" style="margin-top:0.65rem">Thumbnail text</p>' +
      '<div class="thumb-ideas">' +
      thumbs +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function wireCreatorTools(card, clip, index) {
    var root = card.querySelector("[data-creator-tools]");
    if (!root) return;

    root.querySelectorAll(".creator-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-ctab");
        root.querySelectorAll(".creator-tab").forEach(function (t) {
          t.classList.toggle("is-active", t === tab);
        });
        root.querySelectorAll(".creator-panel").forEach(function (p) {
          var on = p.getAttribute("data-cpanel") === id;
          p.hidden = !on;
          p.classList.toggle("is-active", on);
        });
      });
    });

    root.querySelectorAll(".copy-ab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-ab");
        var v = (clip.hookVariants || []).find(function (x) {
          return x.id === id;
        });
        copyText((v && v.text) || "", btn, "Copied!");
        markOnboardStep("copy");
      });
    });

    var platCaption = root.querySelector("[data-plat-caption]");
    var platHint = root.querySelector(".plat-hint");
    var activePlat = "tiktok";
    root.querySelectorAll(".plat-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        activePlat = chip.getAttribute("data-plat");
        root.querySelectorAll(".plat-chip").forEach(function (c) {
          c.classList.toggle("is-active", c === chip);
        });
        var pack = (clip.platforms && clip.platforms[activePlat]) || {};
        if (platCaption) platCaption.textContent = pack.caption || "";
        if (platHint) platHint.textContent = pack.hint || "";
      });
    });
    var copyPlat = root.querySelector(".copy-plat");
    if (copyPlat) {
      copyPlat.addEventListener("click", function () {
        var pack = (clip.platforms && clip.platforms[activePlat]) || {};
        copyText(pack.caption || "", copyPlat, "Copied!");
        markOnboardStep("copy");
      });
    }

    root.querySelectorAll(".copy-thumb-idea").forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        copyText((clip.thumbTexts && clip.thumbTexts[i]) || btn.querySelector(".thumb-idea-text").textContent, btn, "Copied!");
      });
    });

    root.querySelectorAll(".post-check input").forEach(function (input) {
      input.addEventListener("change", function () {
        if (!clip.checklist) clip.checklist = emptyChecklist();
        clip.checklist[input.getAttribute("data-check")] = !!input.checked;
        if (lastGenId) updateGenChecklist(lastGenId, index, clip.checklist);
      });
    });
  }

  function renderClipsFromData(clips, sourceLabel) {
    lastClips = clips;
    clipsGrid.innerHTML = "";
    applyAspectChrome();
    applyVoidModeChrome();
    clipsGrid.setAttribute("data-style", state.style || "viral");

    clips.forEach(function (clip, index) {
      var titleHtml = escapeHtml(clip.hook);
      if (clip.hookSv) {
        titleHtml += '<span class="hook-sv">' + escapeHtml(clip.hookSv) + "</span>";
      }
      var burn = overlayCaption(clip);
      var score = typeof clip.score === "number" ? clip.score : 75;
      var styleKey = state.style || "viral";
      var favOn = isFavorited(clip, lastSourceUrl);

      var card = document.createElement("article");
      card.className =
        "clip-card style-" + styleKey + (state.voidMode ? " has-resonance-emphasis" : "");
      card.setAttribute("data-clip-index", String(index));
      var sourceUrl = lastSourceUrl || "";
      card.innerHTML =
        '<div class="clip-thumb ' +
        escapeHtml(clip.grad || "grad-viral-1") +
        sourceThumbClass(sourceUrl) +
        '" data-vibe="' +
        escapeHtml(clip.vibe || "") +
        '">' +
        sourceThumbHtml(sourceUrl) +
        '<div class="thumb-safe safe-top" aria-hidden="true"></div>' +
        '<div class="thumb-safe safe-bottom" aria-hidden="true"></div>' +
        '<div class="thumb-grain" aria-hidden="true"></div>' +
        '<div class="thumb-motion" aria-hidden="true"></div>' +
        '<span class="thumb-platform">' +
        escapeHtml(sourceLabel || "Shorts") +
        "</span>" +
        '<span class="thumb-score" title="VOID Resonance">' +
        score +
        "</span>" +
        '<button type="button" class="fav-star' +
        (favOn ? " is-on" : "") +
        '" title="Favorite" aria-label="Favorite" aria-pressed="' +
        (favOn ? "true" : "false") +
        '">★</button>' +
        (burn ? '<p class="thumb-caption" aria-hidden="true">' + escapeHtml(burn) + "</p>" : "") +
        '<div class="thumb-progress" aria-hidden="true"><span class="thumb-progress-fill"></span></div>' +
        playIconSvg() +
        '<span class="duration">' +
        escapeHtml(clip.duration || "") +
        "</span>" +
        (clip.beat ? '<span class="thumb-beat">' + escapeHtml(clip.beat) + "</span>" : "") +
        "</div>" +
        '<div class="clip-body">' +
        '<div class="clip-rank">Clip ' +
        (index + 1) +
        " of " +
        clips.length +
        "</div>" +
        '<h3 class="clip-hook">' +
        titleHtml +
        "</h3>" +
        '<div class="clip-meta">' +
        "<span>" +
        escapeHtml(clip.label || "") +
        "</span>" +
        '<span class="dot"></span>' +
        '<span class="aspect-label">' +
        aspectMetaLabel(state.aspect) +
        "</span>" +
        '<span class="dot"></span>' +
        '<span class="style-chip">' +
        escapeHtml(styleKey) +
        "</span>" +
        "</div>" +
        resonanceBlockHtml(clip) +
        scrollStopHtml(clip.scrollStop) +
        creatorToolsHtml(clip, index) +
        '<div class="clip-actions">' +
        '<button type="button" class="btn btn-ghost btn-sm copy-caption">Copy caption</button>' +
        '<button type="button" class="btn btn-ghost btn-sm share-clip">Share</button>' +
        '<button type="button" class="btn btn-ghost btn-sm share-card-btn" title="PNG share card">Share card</button>' +
        (isOwner() || isPro()
          ? '<button type="button" class="btn btn-primary btn-sm download-pro" title="Download caption pack">Download</button>'
          : '<button type="button" class="btn btn-primary btn-sm btn-pro" disabled title="Pro unlocks downloads">Download</button>') +
        "</div>" +
        "</div>";

      card.querySelector(".copy-caption").addEventListener("click", function () {
        var full = captionFor(clip) + "\n\n" + hashtagPack();
        copyText(full, this);
        markOnboardStep("copy");
      });

      var shareBtn = card.querySelector(".share-clip");
      if (shareBtn) {
        shareBtn.addEventListener("click", function () {
          var payload = sharePayload(clip);
          if (navigator.share) {
            navigator
              .share({ title: "VOID Clips", text: payload })
              .then(function () {
                showToast("Shared");
                markOnboardStep("copy");
              })
              .catch(function () {
                copyText(payload, shareBtn, "Copied!");
                markOnboardStep("copy");
              });
          } else {
            copyText(payload, shareBtn, "Copied!");
            markOnboardStep("copy");
          }
        });
      }

      var dlBtn = card.querySelector(".download-pro");
      if (dlBtn) {
        dlBtn.addEventListener("click", function () {
          downloadClipPack(clip, index);
          showToast(isOwner() ? "Owner pack downloaded" : "Pro pack downloaded");
          markOnboardStep("copy");
        });
      }

      var personaBtn = card.querySelector(".copy-persona");
      if (personaBtn) {
        personaBtn.addEventListener("click", function () {
          copyText(clip.persona || "", this, "Copied!");
          markOnboardStep("copy");
        });
      }
      var pinBtn = card.querySelector(".copy-pin");
      if (pinBtn) {
        pinBtn.addEventListener("click", function () {
          copyText(clip.pin || "", this, "Copied!");
          markOnboardStep("copy");
        });
      }

      var favBtn = card.querySelector(".fav-star");
      if (favBtn) {
        favBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          var on = toggleFavorite(clip, lastSourceUrl);
          favBtn.classList.toggle("is-on", on);
          favBtn.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }

      var shareCardBtn = card.querySelector(".share-card-btn");
      if (shareCardBtn) {
        shareCardBtn.addEventListener("click", function () {
          exportShareCard(clip, index);
        });
      }

      var thumb = card.querySelector(".clip-thumb");
      if (thumb) {
        thumb.addEventListener("click", function (e) {
          if (e.target.closest(".fav-star")) return;
          thumb.classList.remove("is-playing");
          void thumb.offsetWidth;
          thumb.classList.add("is-playing");
          showToast("Preview · demo motion");
        });
      }

      wireCreatorTools(card, clip, index);
      clipsGrid.appendChild(card);
    });

    var styleLabel = state.style === "viral" ? "Viral" : state.style === "story" ? "Story" : "Funny";
    var langLabel = state.lang === "both" ? "EN+SV" : state.lang.toUpperCase();
    resultsMeta.textContent =
      clips.length +
      " clips · " +
      styleLabel +
      " · " +
      langLabel +
      " · " +
      state.aspect +
      (state.voidMode ? " · Resonance" : "") +
      (state.seriesMode ? " · Series" : "") +
      " · demo" +
      (sourceLabel ? " · " + sourceLabel : "");

    hashtagText.textContent = hashtagPack();
    setEmptyVisible(false);
    var flow = document.getElementById("results-flow");
    if (flow) flow.hidden = false;
  }

  function exportShareCard(clip, index) {
    var canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    var ctx = canvas.getContext("2d");
    if (!ctx) {
      showToast("Canvas unavailable");
      return;
    }
    var grd = ctx.createLinearGradient(0, 0, 1080, 1920);
    grd.addColorStop(0, "#0a0614");
    grd.addColorStop(0.45, "#1a0b2e");
    grd.addColorStop(1, "#050506");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.fillStyle = "rgba(139,92,246,0.35)";
    ctx.beginPath();
    ctx.arc(900, 280, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(196,181,253,0.12)";
    ctx.beginPath();
    ctx.arc(180, 1600, 280, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#c4b5fd";
    ctx.font = "700 36px Space Grotesk, system-ui, sans-serif";
    ctx.fillText("VOID CLIPS", 80, 140);
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "500 28px Space Grotesk, system-ui, sans-serif";
    ctx.fillText("Resonance " + (clip.score || 75) + "/100", 80, 190);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 64px Space Grotesk, system-ui, sans-serif";
    wrapCanvasText(ctx, clip.hook || "Untitled hook", 80, 520, 920, 76);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "500 30px Space Grotesk, system-ui, sans-serif";
    ctx.fillText((clip.label || "Clip") + " · " + (state.style || "viral"), 80, 1680);
    ctx.fillText("@V_O_I_.D", 80, 1735);

    canvas.toBlob(function (blob) {
      if (!blob) {
        showToast("Could not export card");
        return;
      }
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "void-share-card-" + (index + 1) + ".png";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 800);
      showToast("Share card PNG saved");
    }, "image/png");
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = String(text).split(" ");
    var line = "";
    var yy = y;
    for (var n = 0; n < words.length; n++) {
      var test = line + words[n] + " ";
      if (ctx.measureText(test).width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, yy);
        line = words[n] + " ";
        yy += lineHeight;
        if (yy > y + lineHeight * 6) break;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), x, yy);
  }

  function renderVoidLabs(url, clips) {
    var labs = document.getElementById("void-labs");
    if (!labs) return;
    labs.hidden = false;
    var pulse = buildPulse(url, clips);
    var pulseEl = document.getElementById("labs-pulse");
    if (pulseEl) {
      pulseEl.innerHTML =
        '<div class="labs-card-head"><span class="labs-card-title">VOID Pulse</span><span class="labs-card-tag">' +
        escapeHtml(pulse.niche) +
        "</span></div>" +
        '<p class="labs-card-sub">Best-time heuristic for ' +
        escapeHtml(pulse.tags.join(" · ")) +
        " — planning aid, not live analytics.</p>" +
        '<div class="pulse-grid">' +
        '<div class="pulse-region"><p class="pulse-region-label">' +
        escapeHtml(pulse.seEu.label) +
        '</p><p class="pulse-best">' +
        escapeHtml(pulse.seEu.best) +
        '</p><p class="pulse-windows">' +
        escapeHtml(pulse.seEu.windows.join(" · ")) +
        "</p></div>" +
        '<div class="pulse-region"><p class="pulse-region-label">' +
        escapeHtml(pulse.us.label) +
        '</p><p class="pulse-best">' +
        escapeHtml(pulse.us.best) +
        '</p><p class="pulse-windows">' +
        escapeHtml(pulse.us.windows.join(" · ")) +
        "</p></div></div>" +
        '<div class="pulse-bars">' +
        pulse.bars
          .map(function (b) {
            return (
              '<div class="pulse-bar-row"><span>' +
              escapeHtml(b.name) +
              '</span><div class="pulse-bar"><i style="width:' +
              b.pct +
              '%"></i></div></div>'
            );
          })
          .join("") +
        "</div>";
    }

    var seriesEl = document.getElementById("labs-series");
    if (seriesEl) {
      if (state.seriesMode) {
        seriesEl.hidden = false;
        var series = buildSeriesPack(url);
        seriesEl.innerHTML =
          '<div class="labs-card-head"><span class="labs-card-title">Series mode</span><span class="labs-card-tag">3-part</span></div>' +
          '<p class="labs-card-sub">Cliffhanger ladder from one source — film yourself, we plan the drops.</p>' +
          series
            .map(function (p) {
              return (
                '<div class="series-row">' +
                '<span class="series-part">P' +
                p.part +
                "</span>" +
                '<div class="series-body"><p class="series-hook">' +
                escapeHtml(p.hook) +
                '</p><p class="series-meta">' +
                escapeHtml(p.caption) +
                " · " +
                escapeHtml(p.beat) +
                '</p><p class="series-note">' +
                escapeHtml(p.note) +
                '</p></div>' +
                '<button type="button" class="btn btn-ghost btn-xs copy-series" data-part="' +
                p.part +
                '">Copy</button></div>'
              );
            })
            .join("");
        seriesEl.querySelectorAll(".copy-series").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var part = Number(btn.getAttribute("data-part"));
            var p = series.find(function (x) {
              return x.part === part;
            });
            if (!p) return;
            copyText(p.hook + "\n" + p.caption + "\n" + p.note, btn, "Copied!");
          });
        });
      } else {
        seriesEl.hidden = true;
        seriesEl.innerHTML = "";
      }
    }

    var warEl = document.getElementById("labs-war");
    var top = (clips && clips[0]) || null;
    if (warEl && top && top.commentWar) {
      var war = top.commentWar;
      warEl.innerHTML =
        '<div class="labs-card-head"><span class="labs-card-title">Comment war kit</span><span class="labs-card-tag">Clip 1</span></div>' +
        '<p class="labs-card-sub">5 pin variants + 3 reply baits — farm the thread, not the algorithm gods.</p>' +
        '<p class="creator-hint">Pinned variants</p>' +
        war.pins
          .map(function (t, i) {
            return (
              '<div class="war-line"><span class="ab-badge">' +
              (i + 1) +
              '</span><p>' +
              escapeHtml(t) +
              '</p><button type="button" class="btn btn-ghost btn-xs copy-war-pin" data-i="' +
              i +
              '">Copy</button></div>'
            );
          })
          .join("") +
        '<p class="creator-hint" style="margin-top:0.75rem">Reply bait</p>' +
        war.replies
          .map(function (t, i) {
            return (
              '<div class="war-line"><span class="ab-badge">R' +
              (i + 1) +
              '</span><p>' +
              escapeHtml(t) +
              '</p><button type="button" class="btn btn-ghost btn-xs copy-war-reply" data-i="' +
              i +
              '">Copy</button></div>'
            );
          })
          .join("");
      warEl.querySelectorAll(".copy-war-pin").forEach(function (btn) {
        btn.addEventListener("click", function () {
          copyText(war.pins[Number(btn.getAttribute("data-i"))] || "", btn, "Copied!");
        });
      });
      warEl.querySelectorAll(".copy-war-reply").forEach(function (btn) {
        btn.addEventListener("click", function () {
          copyText(war.replies[Number(btn.getAttribute("data-i"))] || "", btn, "Copied!");
        });
      });
    }
  }

  function applySeriesChrome() {
    var toggle = document.getElementById("series-mode-toggle");
    if (toggle) {
      toggle.setAttribute("aria-checked", state.seriesMode ? "true" : "false");
      toggle.classList.toggle("is-on", !!state.seriesMode);
    }
    var status = document.getElementById("series-mode-status");
    if (status) status.textContent = state.seriesMode ? "On" : "Off";
  }

  function parseBatchUrls(raw) {
    return String(raw || "")
      .split(/[\n,]+/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean)
      .map(function (u) {
        return u.indexOf("http") === 0 ? u : "https://" + u;
      })
      .filter(function (u) {
        return isLikelyUrl(u);
      });
  }

  function creditsRemaining() {
    if (isSignedIn()) {
      if (isOwner() || isPro()) return Infinity;
      return typeof currentUser.credits === "number" ? currentUser.credits : 0;
    }
    return getGuestCredits();
  }

  function finishGeneration(url, clips) {
    lastSourceUrl = url;
    var cached = metaForUrl(url);
    if (cached) lastLinkMeta = cached;
    else {
      fetchLinkMeta(url).then(function (meta) {
        if (meta && lastSourceUrl === url) lastLinkMeta = meta;
      });
    }
    lastGenId = uid("gen");
    var entry = {
      id: lastGenId,
      url: url,
      style: state.style,
      lang: state.lang,
      aspect: state.aspect,
      voidMode: !!state.voidMode,
      series: !!state.seriesMode,
      timestamp: Date.now(),
      clips: clips,
      resonance: avgResonance(clips),
      checklists: {},
    };
    clips.forEach(function (c, i) {
      entry.checklists[String(i)] = c.checklist || emptyChecklist();
    });
    pushGenHistory(entry);
    pushHistory(url);
    bumpStreak();
    renderVoidLabs(url, clips);
  }

  function runSingleGenerate(url, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      startLoading(function () {
        consumeCredit();
        bumpStatGens();
        var clips = buildClipSet();
        clips.forEach(function (c, i) {
          enrichClipExtras(c, i);
        });
        if (!opts.skipHistory) finishGeneration(url, clips);
        else {
          lastSourceUrl = url;
          bumpStreak();
        }
        resolve({ url: url, clips: clips });
      });
    });
  }

  function renderBatchGroups(groups) {
    var wrap = document.getElementById("batch-groups");
    if (!wrap) return;
    wrap.hidden = false;
    wrap.innerHTML = "";
    clipsGrid.innerHTML = "";
    groups.forEach(function (g, gi) {
      var section = document.createElement("section");
      section.className = "batch-group";
      var gMeta = metaForUrl(g.url);
      var headThumb = "";
      if (gMeta && (gMeta.thumbnail || gMeta.youtubeId)) {
        var gThumb = gMeta.thumbnail || youtubeThumbCandidates(gMeta.youtubeId)[0];
        headThumb =
          '<img class="batch-group-thumb" src="' +
          escapeHtml(gThumb) +
          '" alt="" width="40" height="40" decoding="async" />';
      }
      section.innerHTML =
        '<div class="batch-group-head">' +
        headThumb +
        "<div><h3>" +
        escapeHtml(shortUrl(g.url)) +
        '</h3><span class="results-meta">' +
        g.clips.length +
        " clips · " +
        escapeHtml(platformFromUrl(g.url)) +
        '</span></div></div><div class="clips-grid aspect-9-16 batch-group-grid" data-style="' +
        escapeHtml(state.style || "viral") +
        '"></div>';
      wrap.appendChild(section);
      var grid = section.querySelector(".batch-group-grid");
      var savedGrid = clipsGrid;
      /* temporarily point renderer — use lightweight cards */
      g.clips.forEach(function (clip, index) {
        var mini = document.createElement("article");
        mini.className = "clip-card style-" + (state.style || "viral");
        mini.innerHTML =
          '<div class="clip-body" style="padding-top:1rem">' +
          '<div class="clip-rank">Clip ' +
          (index + 1) +
          " · Resonance " +
          (clip.score || 75) +
          "</div>" +
          '<h3 class="clip-hook">' +
          escapeHtml(clip.hook) +
          "</h3>" +
          '<div class="clip-actions">' +
          '<button type="button" class="btn btn-ghost btn-sm batch-copy">Copy</button>' +
          '<button type="button" class="btn btn-ghost btn-sm batch-focus">Open full</button>' +
          "</div></div>";
        mini.querySelector(".batch-copy").addEventListener("click", function () {
          copyText(captionFor(clip) + "\n\n" + hashtagPack(), this);
        });
        mini.querySelector(".batch-focus").addEventListener("click", function () {
          wrap.hidden = true;
          lastSourceUrl = g.url;
          if (urlInput) urlInput.value = g.url;
          renderClipsFromData(g.clips, platformFromUrl(g.url));
          renderVoidLabs(g.url, g.clips);
          showToast("Focused · " + shortUrl(g.url));
        });
        grid.appendChild(mini);
      });
      void savedGrid;
      void gi;
    });
    if (groups.length) {
      lastClips = groups[0].clips;
      lastSourceUrl = groups[0].url;
      renderVoidLabs(groups[0].url, groups[0].clips);
    }
    resultsMeta.textContent = groups.length + " sources · batch · demo";
    hashtagText.textContent = hashtagPack();
    setEmptyVisible(false);
    var flow = document.getElementById("results-flow");
    if (flow) flow.hidden = false;
  }

  async function runBatchGenerate() {
    if (batchBusy) return;
    var urls = parseBatchUrls((document.getElementById("batch-url-input") || {}).value);
    if (!urls.length) {
      showToast("Paste at least one valid link");
      return;
    }
    if (!isSignedIn()) {
      ensureGuestCredits();
      if (getGuestCredits() <= 0) {
        showAuthGate({ soft: true });
        showToast("Guest demos used up — sign in for 10 free gens");
        return;
      }
    }
    var remain = creditsRemaining();
    if (!isOwner() && !isPro() && remain <= 0) {
      updateCreditsUI();
      if (!isSignedIn()) {
        showAuthGate({ soft: true });
        showToast("Guest demos used up — sign in for 10 free gens");
      } else {
        showToast("No free generations left");
      }
      return;
    }
    var maxN = isOwner() || isPro() ? urls.length : Math.min(urls.length, remain);
    if (maxN < urls.length) {
      showToast("Generating " + maxN + " of " + urls.length + " (credits)");
    }
    batchBusy = true;
    urls.slice(0, maxN).forEach(function (u) {
      fetchLinkMeta(u);
    });
    var groups = [];
    var i;
    for (i = 0; i < maxN; i++) {
      var url = urls[i];
      /* sequential demo loads */
      var result = await runSingleGenerate(url, { skipHistory: false });
      groups.push(result);
      if (urlInput) urlInput.value = url;
    }
    batchBusy = false;
    resultsEl.classList.add("active");
    renderBatchGroups(groups);
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    markOnboardStep("generate");
    showToast("Batch done · " + groups.length + " source" + (groups.length === 1 ? "" : "s"));
  }

  function syncVoiceForm() {
    var v = getBrandVoice();
    var n = document.getElementById("voice-name");
    var vibe = document.getElementById("voice-vibe");
    var ban = document.getElementById("voice-banned");
    if (n) n.value = v.name || "";
    if (vibe) vibe.value = v.vibe || "";
    if (ban) ban.value = (v.banned || []).join(", ");
    var prev = document.getElementById("voice-preview");
    if (prev) {
      if (v.name || v.vibe) {
        prev.hidden = false;
        prev.textContent = "Active · " + (v.name || "unnamed") + (v.vibe ? " · " + v.vibe : "");
      } else {
        prev.hidden = true;
      }
    }
  }

  function wireStudioUI() {
    updateStreakUI();
    applySeriesChrome();
    syncVoiceForm();

    function bindOpen(id, drawerId, renderFn) {
      var btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener("click", function () {
        if (renderFn) renderFn();
        openDrawer(document.getElementById(drawerId));
      });
    }
    bindOpen("open-history-btn", "history-drawer", renderHistoryDrawer);
    bindOpen("open-history-btn-top", "history-drawer", renderHistoryDrawer);
    bindOpen("open-favorites-btn", "favorites-drawer", renderFavoritesDrawer);
    bindOpen("open-favorites-btn-top", "favorites-drawer", renderFavoritesDrawer);
    bindOpen("open-voice-btn", "voice-drawer", syncVoiceForm);
    bindOpen("open-labs-btn", null, function () {
      if (!loadFeatureFlags().labs && !isOwner()) {
        showToast("Labs is temporarily off");
        return;
      }
      var labs = document.getElementById("void-labs");
      if (labs) {
        labs.hidden = false;
        labs.scrollIntoView({ behavior: "smooth", block: "start" });
      } else showToast("Generate first to unlock Labs");
    });
    bindOpen("open-labs-btn-top", null, function () {
      if (!loadFeatureFlags().labs && !isOwner()) {
        showToast("Labs is temporarily off");
        return;
      }
      var labs = document.getElementById("void-labs");
      if (labs && !labs.hidden) labs.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (lastClips.length) {
        renderVoidLabs(lastSourceUrl, lastClips);
        document.getElementById("void-labs").scrollIntoView({ behavior: "smooth", block: "start" });
      } else showToast("Generate first to unlock Labs");
    });

    ["history-drawer", "favorites-drawer", "voice-drawer"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", function (e) {
        if (e.target === el) closeDrawer(el);
      });
      var closeBtn = document.getElementById(id.replace("-drawer", "-drawer-close"));
      /* ids are history-drawer-close etc */
    });
    var hdc = document.getElementById("history-drawer-close");
    if (hdc) hdc.addEventListener("click", function () { closeDrawer(document.getElementById("history-drawer")); });
    var fdc = document.getElementById("favorites-drawer-close");
    if (fdc) fdc.addEventListener("click", function () { closeDrawer(document.getElementById("favorites-drawer")); });
    var vdc = document.getElementById("voice-drawer-close");
    if (vdc) vdc.addEventListener("click", function () { closeDrawer(document.getElementById("voice-drawer")); });

    var clearGen = document.getElementById("clear-gen-history-btn");
    if (clearGen) {
      clearGen.addEventListener("click", function () {
        try {
          localStorage.removeItem(GEN_HISTORY_KEY);
        } catch (e) {}
        renderHistoryDrawer();
        showToast("Generation history cleared");
      });
    }

    var batchToggle = document.getElementById("batch-toggle");
    var singleRow = document.getElementById("single-url-row");
    var batchRow = document.getElementById("batch-url-row");
    var batchInput = document.getElementById("batch-url-input");
    var batchCount = document.getElementById("batch-count");
    var batchGenBtn = document.getElementById("batch-generate-btn");
    if (batchToggle) {
      batchToggle.addEventListener("click", function () {
        if (!loadFeatureFlags().batch && !isOwner()) {
          showToast("Batch is temporarily off");
          return;
        }
        state.batchMode = !state.batchMode;
        batchToggle.setAttribute("aria-pressed", state.batchMode ? "true" : "false");
        batchToggle.classList.toggle("is-on", state.batchMode);
        if (singleRow) singleRow.hidden = !!state.batchMode;
        if (batchRow) batchRow.hidden = !state.batchMode;
        if (state.batchMode) {
          clearLinkPreview();
          if (batchInput) {
            batchInput.focus();
            refreshBatchCount();
          }
        } else {
          clearBatchLinkPreviews();
          updateLinkPreview();
        }
      });
    }
    function refreshBatchCount() {
      if (!batchCount || !batchInput) return;
      var n = parseBatchUrls(batchInput.value).length;
      batchCount.textContent = n + " link" + (n === 1 ? "" : "s");
      scheduleBatchLinkPreviews();
    }
    if (batchInput) {
      batchInput.addEventListener("input", refreshBatchCount);
      batchInput.addEventListener("paste", function () {
        setTimeout(refreshBatchCount, 0);
      });
    }
    if (batchGenBtn) batchGenBtn.addEventListener("click", function () { runBatchGenerate(); });

    var seriesToggle = document.getElementById("series-mode-toggle");
    if (seriesToggle) {
      seriesToggle.addEventListener("click", function () {
        state.seriesMode = !state.seriesMode;
        applySeriesChrome();
        showToast(state.seriesMode ? "Series mode on — 3-part ladder in Labs" : "Series mode off");
        if (lastClips.length) renderVoidLabs(lastSourceUrl, lastClips);
      });
    }

    var voiceForm = document.getElementById("voice-form");
    if (voiceForm) {
      voiceForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var banned = (document.getElementById("voice-banned").value || "")
          .split(",")
          .map(function (s) { return s.trim(); })
          .filter(Boolean);
        saveBrandVoice({
          name: document.getElementById("voice-name").value,
          vibe: document.getElementById("voice-vibe").value,
          banned: banned,
        });
        syncVoiceForm();
        showToast("Brand voice saved");
        if (lastClips.length) {
          lastClips.forEach(function (c, i) { enrichClipExtras(c, i); });
          renderClipsFromData(lastClips, platformFromUrl(lastSourceUrl));
          renderVoidLabs(lastSourceUrl, lastClips);
        }
      });
    }
    var voiceClear = document.getElementById("voice-clear-btn");
    if (voiceClear) {
      voiceClear.addEventListener("click", function () {
        try { localStorage.removeItem(VOICE_KEY); } catch (e) {}
        syncVoiceForm();
        showToast("Brand voice cleared");
      });
    }
  }


  /* —— init —— */
  if (authRemember && preferRememberDevice()) {
    authRemember.checked = true;
  }

  initOriginBanner();
  wireLogoImages();
  updatePasswordHint();
  loadPrefs();
  syncSegmented();
  applyVoidModeChrome();
  applySeriesChrome();
  renderHistory();
  wireStudioUI();
  setEmptyVisible(true);
  updatePasteDetect();
  initBetaBanner();
  applyAnnounceBanner();
  applyFeatureFlagsUI();
  syncOwnerVisibility();

  fetchPricing();
  handleCheckoutReturn();
  fetchSiteConfig();

  currentUser = loadUser();
  if (isMaintenanceOn() && !isOwner()) {
    applyMaintenanceUI();
  } else if (currentUser && currentUser.verified) {
    showSignedIn();
    syncServerEntitlement(currentUser.email);
  } else {
    currentUser = null;
    showGuestStudio();
  }
  syncOwnerAdminPanel();

  if (location.hash === "#waitlist-form") {
    var wl = document.getElementById("waitlist-form");
    if (wl && currentUser) {
      setTimeout(function () {
        wl.scrollIntoView({ behavior: "smooth", block: "center" });
        if (waitlistEmail) waitlistEmail.focus();
      }, 100);
    }
  }
})();
