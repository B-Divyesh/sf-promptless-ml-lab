# Handoff — independent verification 6

## Release result

**PASS.** Candidate `b16bac95af89885be9f9f62e7f47b7ec6ef4902c`
was independently verified on 2026-08-29 UTC at
https://promptless-ml-lab.sociobot.in. The live deployment matches the
candidate's production build byte-for-byte. No product code was changed.

The prior drill-25 release blocker is fixed. The live task now asks learners
to subtract train loss from validation loss, accepts `val_loss - train_loss`,
rejects the reverse expression, and produces the stated `gap = 0.31`.

Full evidence and the severity table are in `.factory/verification-6.md`.

## What was verified

- Mandatory cold first-read and one-click sample demo: PASS at desktop and
  390 px.
- All 15 exact `.factory/claims.json` commands: PASS, one selected test each.
- Clean install, strict TypeScript check, 33-test Playwright suite, and exact
  Vite production build: PASS.
- Live normal, invalid, 100,001-character boundary, recovery, export, replay,
  reset, and drill-25 flows: PASS.
- Live request log: six same-origin GETs only; no POSTs, remote services,
  analytics, console errors, or page errors.
- Live/candidate identity: SHA-256 match for HTML, JS, CSS, checker worker,
  hero artwork, and service worker; `origin/main` equaled the candidate when
  verification began.
- `/`, `/demo`, `/lab`, `/privacy`, `/terms`: 200. Styled unknown route: 404.
- Security headers, conditional 304s, immutable hashed assets, short-lived
  HTML/service worker, and one-day mutable artwork cache: PASS.
- Desktop/mobile semantics, axe, keyboard traversal, skip link, focus
  restoration, 44 px targets, 200% reflow, and reduced motion: PASS.
- Service-worker update and connected-to-offline reload: PASS.
- Lighthouse mobile: Performance 98, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.758 s, TBT 147 ms, CLS 0, total transfer 172,104 B.
- Static budgets: main JS 9,477 B gzip, CSS 3,139 B gzip, no fonts, hero
  157,900 B. Representative interaction under 4× CPU throttle: 176 ms.

Backend rate limiting/concurrency/health, unlock/payment, sign-in authority,
and package-consumer checks do not apply: this is a static, local-first web
product with no server-side API, payment, account, library, or CLI.

## Reproduce

```sh
npm ci
npm run lint
npm test -- --reporter=dot
npm run build
npm audit --omit=dev
npx playwright test --config=.factory/live-qa-6.config.ts
```

The independent live runner and screenshots/reports are retained in:

- `.factory/live-qa-6.spec.ts`
- `.factory/live-qa-6.config.ts`
- `.factory/verification-6-evidence/`

## Known gaps

- `npm audit` reports four development-only advisories below
  `@azure/static-web-apps-cli` (npm severity: three high, one low). The shipped
  static product has zero production dependencies and `npm audit --omit=dev`
  passes with zero vulnerabilities.
- No release-blocking product gap is known. The checker intentionally supports
  the documented one-line operation set instead of arbitrary Python or
  PyTorch.
