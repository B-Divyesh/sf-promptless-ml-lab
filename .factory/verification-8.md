# Independent verification — round 8

## Verdict: PASS

Candidate acf1e83e48b24dec46690a042c8848fb128ae98b is accepted for the researched
brief. This was a fresh independent check of the deployed static site at
https://promptless-ml-lab.sociobot.in on 2026-08-29. The live document,
JavaScript, CSS, and service worker are byte-for-byte the production build of
this candidate.

## First-read test

Cold visit to / returned 200 with the headline “Practice reproducible ML
models.” The first screen says it is for self-taught learners who need a short
ML drill and immediate check, and the visible first action is “Try it with
sample data” with the outcome stated beside it. One click opens /demo directly
into the seed-11 tensor-shape drill and its local run record. This satisfies
the plain-words and one-click sample requirements.

## Required claims gate

.factory/claims.json exists and declares 22 claims. After npm ci, I ran every
listed command individually from the clean candidate via the demo entry point.
All passed; Playwright's final metadata is status passed with no failed tests.

| Claim ID | Exact test | Result |
|---|---|---|
| local-browser-runs | npm test -- --grep @claim:local-browser-runs | PASS |
| export-record | npm test -- --grep @claim:export-record | PASS |
| import-records | npm test -- --grep @claim:import-records | PASS |
| import-namespace | npm test -- --grep @claim:import-namespace | PASS |
| import-replay | npm test -- --grep @claim:import-replay | PASS |
| demo-reset | npm test -- --grep @claim:demo-reset | PASS |
| one-click-sample | npm test -- --grep @claim:one-click-sample | PASS |
| no-third-party-runtime | npm test -- --grep @claim:no-third-party-runtime | PASS |
| build-output | npm test -- --grep @claim:build-output | PASS |
| deployment-config | npm test -- --grep @claim:deployment-config | PASS |
| offline-reload | npm test -- --grep @claim:offline-reload | PASS |
| thirty-open-drills | npm test -- --grep @claim:thirty-open-drills | PASS |
| catalog-evaluator | npm test -- --grep @claim:catalog-evaluator | PASS |
| fixture-evaluator | npm test -- --grep @claim:fixture-evaluator | PASS |
| fixture-counterexamples | npm test -- --grep @claim:fixture-counterexamples | PASS |
| deterministic-trace | npm test -- --grep @claim:deterministic-trace | PASS |
| no-arbitrary-pytorch | npm test -- --grep @claim:no-arbitrary-pytorch | PASS |
| estimated-drill-duration | npm test -- --grep @claim:estimated-drill-duration | PASS |
| real-workbench | npm test -- --grep @claim:real-workbench | PASS |
| free-access | npm test -- --grep @claim:free-access | PASS |
| no-chat-required | npm test -- --grep @claim:no-chat-required | PASS |
| scope-limits | npm test -- --grep @claim:scope-limits | PASS |

The complete local browser suite then collected 43 tests and finished passed.

## Local build and product behavior

- npm ci passed; audit reported 0 vulnerabilities.
- npm test passed: 43/43.
- npm run lint passed (tsc --noEmit).
- npm run build passed and produced dist/.
- npm audit --omit=dev reported 0 vulnerabilities.
- Production output: initial JS 10.66 KiB gzip, CSS 3.36 KiB gzip, and hero
  WebP 157,900 bytes. These meet the 200 KiB JS, 50 KiB CSS, and 300 KiB hero
  budgets.

Independent live demo exercise at 390 × 844 verified:

- Keyboard focus plus Enter activates the sample CTA; the focus outline is
  rgb(20, 62, 153).
- /demo exposes 30 enabled drills with no horizontal overflow.
- An unrelated shortcut is rejected with actionable “Not yet” feedback.
- Restoring the starter and submitting x.shape passes and saves seed 11.
- Exported JSON has the declared record format, seed 11, and seven trace values.
- Reset demo removes only demo:seeded-ml-runs and leaves a real-workbench
  sentinel untouched.
- A 100,001-character answer is refused without disabling recovery.
- With reduced motion, trace animation is none and transition duration is 0s.
- The service worker is active, controls the page, has no waiting update, and
  /demo reloaded successfully while offline after the first visit.

The local claim and regression suite additionally covers malformed and
duplicate import recovery, import namespace isolation, import replay, all 30
intended operations and counterexamples, real-workbench switching,
stale-cache refresh, route/back-button focus, and storage-quota recovery.

## Live deployment, privacy, and headers

The landing page displays build acf1e83e48b2. Local and live byte comparisons
passed for index.html, assets/index-CN4K34kw.js, assets/index-DB_Qh9v1.css, and
sw.js. The index SHA-256 was
0fe4ded1ce977e436b5447d7fa645dcdca64472ff5ad2f87dc53d57a1f1fd2aa.

Fresh landing traffic fetched only the same-origin document, JS, CSS, and hero
image. A full demo flow (check, export, reset, offline reload) made 16
requests, every one to https://promptless-ml-lab.sociobot.in. No analytics,
remote fonts, third-party scripts, sign-in, or API calls were observed. The
static product exposes no server-side endpoint, so rate-limit and Entra checks
are not applicable.

/, /demo, /lab, /privacy, and /terms returned 200. The designed unknown route
returned 404.html with HTTP 404. Every in-site link resolved successfully.
Valid routes had no console or page errors. Chromium emits its normal “Failed
to load resource: 404” network-console entry only when directly navigating to
the intentionally missing route; this is the required real-404 response, not
an application exception.

Observed controls:

- CSP permits self-only scripts, styles, connections, and workers and has
  frame-ancestors 'none'; X-Frame-Options is DENY, nosniff and strict referrer
  policy are present, and HSTS is enabled.
- HTML and service worker use max-age=30, must-revalidate.
- Hashed JS uses public, max-age=31536000, immutable.
- Mutable artwork uses public, max-age=86400.

## Accessibility and performance

Playwright axe scans on /, /demo, /lab, /privacy, /terms, and the 404 page at
both 1280 × 900 and 390 × 844 found 0 serious and 0 critical violations (12
route/viewport scans). Each scan found exactly one h1 and one main; all 390px
scans had scrollWidth equal to clientWidth. Manual visual review confirmed the
designed focus treatment, usable 44px navigation links, plain first-screen
copy, and the documented brutalist concrete/moss identity.

Three mobile Lighthouse runs against live / recorded performance scores of 89
(invalid browser-tab-crash run), 98, and 96; the two clean runs pass the 90
target. Their FCP was 1.0s, LCP 1.8–1.9s, transfer 170 KiB, accessibility 100,
best practices 100, and SEO 100. The initial 89 result included a Lighthouse
browser-tab-crash notice and is not used as a valid score.

## Defects by severity

None.

## Scope notes

This is a static PWA/web product, not a library, CLI, backend, or sign-in
product. No consumer-package, concurrency/persistence, or sign-in checks
apply. No product code was modified during verification.
