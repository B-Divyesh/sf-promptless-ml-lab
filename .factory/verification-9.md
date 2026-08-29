# Independent verification — round 9

## Verdict: PASS

Candidate `ded9fe4f7603f9b06e02365327fc7d20dac84cc1` is accepted against the
original builder work order and researched brief. This was a fresh independent
verification of the deployed static product at
https://promptless-ml-lab.sociobot.in on 2026-08-29. No product code was
modified.

## Mandatory first-read gate

A cold desktop visit returns 200 and immediately states:

- What it does: “Practice reproducible ML models.”
- Who it is for: “For self-taught learners who need one short ML drill and a
  check now.”
- What to click first: “Try it with sample data,” with “Opens a seeded drill
  and local run record” beside it.

One click opens `/demo`, shows the persistent “Demo — sample data, nothing is
saved” banner, and presents the seed-11 tensor-shape drill with its 8 × 3 input,
expected `(8, 3)` result, editor, and 30-drill catalog. The first-read and
one-click demo gate passes. At 390 × 844, all three required facts are fully in
the first viewport and the page has no horizontal overflow.

Evidence:
`verification-9-evidence/live-first-read-desktop.png`,
`verification-9-evidence/live-demo-after-one-click.png`, and
`verification-9-evidence/verify-root/screenshot-mobile.png`.

## Required claims gate

`.factory/claims.json` exists and contains 22 claims. After `npm ci`, every
listed command was run separately against the clean demo entry point. Each
selected exactly one tagged test and passed.

| Claim | Exact command | Result |
|---|---|---|
| local-browser-runs | `npm test -- --grep @claim:local-browser-runs` | PASS |
| export-record | `npm test -- --grep @claim:export-record` | PASS |
| import-records | `npm test -- --grep @claim:import-records` | PASS |
| import-namespace | `npm test -- --grep @claim:import-namespace` | PASS |
| import-replay | `npm test -- --grep @claim:import-replay` | PASS |
| demo-reset | `npm test -- --grep @claim:demo-reset` | PASS |
| one-click-sample | `npm test -- --grep @claim:one-click-sample` | PASS |
| no-third-party-runtime | `npm test -- --grep @claim:no-third-party-runtime` | PASS |
| build-output | `npm test -- --grep @claim:build-output` | PASS |
| deployment-config | `npm test -- --grep @claim:deployment-config` | PASS |
| offline-reload | `npm test -- --grep @claim:offline-reload` | PASS |
| thirty-open-drills | `npm test -- --grep @claim:thirty-open-drills` | PASS |
| catalog-evaluator | `npm test -- --grep @claim:catalog-evaluator` | PASS |
| fixture-evaluator | `npm test -- --grep @claim:fixture-evaluator` | PASS |
| fixture-counterexamples | `npm test -- --grep @claim:fixture-counterexamples` | PASS |
| deterministic-trace | `npm test -- --grep @claim:deterministic-trace` | PASS |
| no-arbitrary-pytorch | `npm test -- --grep @claim:no-arbitrary-pytorch` | PASS |
| estimated-drill-duration | `npm test -- --grep @claim:estimated-drill-duration` | PASS |
| real-workbench | `npm test -- --grep @claim:real-workbench` | PASS |
| free-access | `npm test -- --grep @claim:free-access` | PASS |
| no-chat-required | `npm test -- --grep @claim:no-chat-required` | PASS |
| scope-limits | `npm test -- --grep @claim:scope-limits` | PASS |

Each claim ID appears exactly once in `tests/app.spec.ts`. Cross-checking the
landing page, workbench, privacy and terms pages, README, and copy audit found
no unlisted material visitor promise.

## Clean local gates

- `npm ci`: PASS; 24 packages installed from the lockfile, 0 vulnerabilities.
- `npm test`: PASS; 44/44 Playwright tests in 1.0 minute.
- `npm run lint`: PASS; `tsc --noEmit` returned 0.
- `npm run build`: PASS; exact production build created `dist/`.
- `npm audit`: PASS; 0 vulnerabilities.
- `git diff --check`: PASS.

Production output is 28,605 bytes of initial application JavaScript (10.68
KiB gzip), 11,231 bytes of CSS (3.35 KiB gzip), an 11,756-byte checker worker,
and a 157,900-byte hero WebP. These pass the 200 KiB JS, 50 KiB CSS, and 300 KiB
hero budgets. The original social image is 1200 × 630, and the touch icon is
180 × 180.

## Independent deployed behavior

The verifier-only suite in `.factory/verification-9.spec.ts` passed 5/5 against
the live URL. It covered:

- Desktop and 390px mobile first read and one-click sample entry.
- Keyboard-only activation, route focus, back/forward focus, a designed 4px
  focus outline, 44px controls, and no keyboard trap.
- A normal tensor-shape answer, an unrelated shortcut, a 100,001-character
  boundary, recovery, seed-11 record creation, seven-point export, replay, and
  demo reset.
- Malformed import, valid preview and confirmation, replay, duplicate rejection,
  and isolation from a real-workbench sentinel.
- All 30 drills enabled, with the full local suite independently accepting each
  stated operation and rejecting its declared shortcut.
- Reduced motion with no non-zero animation or transition duration.

The worker reports actionable “Not yet” feedback without revealing a solution,
and the oversized answer leaves the control enabled and focused for recovery.
The checker limitation is stated on the landing page, in the workbench, README,
and terms: it checks one line against fixed inputs and does not execute arbitrary
Python or PyTorch.

## Deployment identity, privacy, headers, and PWA

The live footer reports build `ded9fe4f7603`. Local and live bytes match for
`index.html`, the application JavaScript, CSS, checker worker, service worker,
and 404 page. Representative SHA-256 values:

- `index.html`: `20195056df5d159673f3ff8022226953f0efa8f1414e2aeb001727135c2010fc`
- `assets/index-BSUPlIT2.js`:
  `8c6d1de3075d35fb58bd2805a59893c6b1bc6438647a7f06307a9652533e6627`
- `assets/index-DkRoIdhg.css`:
  `7ef6bc12fb8351733d4effe0971aecb983c64a30dfa5c5fae601c8fdd4dbdf52`
- `sw.js`: `3e11c967959748158610f62e626c03470a1103015eda6a76d1e28a6ea2573890`

The complete mobile drill flow recorded only same-origin GET requests. No
analytics, remote font, third-party script, API call, code upload, or identity
request was observed. Demo activity wrote only `demo:seeded-ml-runs`; reset
removed it and preserved `real:seeded-ml-runs`.

Observed live headers include HSTS with `includeSubDomains`, `nosniff`,
`strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, and a self-only CSP
for scripts, styles, connections, fonts, and workers with
`frame-ancestors 'none'`. HTML and `sw.js` use `max-age=30, must-revalidate`;
hashed JS/CSS use `max-age=31536000, immutable`; mutable artwork uses
`max-age=86400`.

The `seeded-ml-drills-v6` service worker was activated, controlled the page,
had no waiting or installing update after `registration.update()`, and reloaded
`/demo` successfully offline. This static product has no server-side product or
unlock endpoint, sign-in, billing, or API. Rate-limit, concurrency, persistence,
consumer-package, and Entra checks are therefore not applicable.

## Routes, accessibility, and performance

`/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and `/terms` returned 200. The
designed unknown route returned the product 404 page with HTTP 404. All crawled
site links resolved. The factory `verify-url.sh` passed each public entry point
with no console or page errors.

Independent axe scans covered `/`, `/demo`, `/lab`, `/privacy`, and `/terms` at
1280 × 900 and 390 × 844, plus the 404 page. They found 0 serious and 0 critical
violations. Every route had `lang="en"`, a route-specific title and canonical,
exactly one `h1`, one `main`, an ordered heading outline, alt text, and no mobile
overflow. Valid routes produced no console or page errors. Chromium's normal
failed-resource message occurs only for the intentionally requested HTTP 404.

Fresh live mobile Lighthouse evidence at
`verification-9-evidence/lighthouse-live.json`:

- Performance: 98
- Accessibility: 100
- Best practices: 100
- SEO: 100
- FCP: 1.0 s; LCP: 1.8 s; TBT: 130 ms; CLS: 0
- Total transfer: 170 KiB

A representative drill-selection interaction under 4× CPU throttling remained
below the 200 ms response budget.

## Defects by severity

- Critical: none.
- High: none.
- Medium: none.
- Low: none.

## Reproduction

```sh
npm ci
npm test
npm run lint
npm run build
npm audit
npx playwright test --config=.factory/verification-9.config.ts
```
