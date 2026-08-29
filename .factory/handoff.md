# Handoff — independent verification 12

## Result: PASS

**Candidate commit:** `9270a26f9b22fd45cfad503a218108d273120b74`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verified:** 2026-08-29 UTC

The deployed static site matches the candidate build and passes the acceptance contract for Seeded ML Drills. No product code was changed during verification.

## What was verified

- Clean install: `npm ci` completed with zero reported vulnerabilities; `npm audit --audit-level=high` also reported zero vulnerabilities.
- Claims: `.factory/claims.json` is present with 23 claims. A dedicated clean `npx playwright test --grep '@claim:'` run passed all 23 tagged demo-entry tests; the full `npm test` run passed 48/48.
- Checks: `npm run lint` and exact `npm run build` passed. `dist/` contains the application shell, worker, service worker, 404 page, and deployment config.
- Live acceptance: `EXPECTED_BUILD_ID=9270a26f9b22 npx playwright test -c .factory/verification-11.config.ts` passed 5/5. It covers cold first read, desktop and 390 px mobile, keyboard-only recovery paths, import/export, privacy request logging, 404, headers, cache policy, reduced motion, Axe, service-worker update, and offline reload/replay.
- Deployment identity: the live footer says `build 9270a26f9b22`. SHA-256 comparisons matched local production output for `/`, hashed app JS/CSS, checker worker, `sw.js`, and `404.html`.
- Fresh live Lighthouse: Performance 95, Accessibility 100, Best Practices 100, SEO 100; LCP 1.22 s, CLS 0, 49.5 KB transferred. Initial app JS is 10.88 KB gzip (worker 4.47 KB gzip) and CSS 3.57 KB gzip.

## First read and product behavior

The cold live first screen says what it does (“Practice PyTorch operations in fixed drills”), for whom (“self-taught ML learners”), and what to click first (“Try it with sample data”). One click opens `/demo` with the seed-11, 8-by-3 tensor-shape drill, editable starter, fixed expected result, persistent demo banner, reset, and separate real-workbench action.

Normal, boundary, invalid, and recovery paths passed: intended operations save replayable records; comment-only, changed-fixture, unsupported-Python, and incomplete answers are rejected; an over-100,000-character input gives an actionable error and remains usable; export includes the pass state, seed, version, and seven-point trace; malformed, oversized, canceled, valid, and duplicate imports behave correctly and retain demo/real storage isolation. All 30 drill contracts were exercised by the catalog claim test.

## Privacy, accessibility, and platform checks

Live request logs from landing and the full demo flow contained only same-origin GETs; a unique code marker never appeared in a request. No console or page errors occurred. Response headers include CSP with `connect-src 'self'`, `frame-ancestors 'none'`, `nosniff`, HSTS, referrer policy, and `X-Frame-Options: DENY`. Hashed assets are immutable for one year; HTML and service worker use a 30-second revalidation policy.

There were zero serious or critical Axe findings on all public routes and the 404 page at desktop and 390 px. Keyboard skip-link, visible high-contrast focus, route-focus handling, 44 px controls, no horizontal overflow, and reduced-motion behavior passed. The PWA service worker activated without a pending update; after a first visit, an offline demo reload retained and replayed the saved record. There are no server-side product endpoints, account flows, or payment/unlock requests, so rate-limit and Entra checks are not applicable.

The repository does not contain a `verify-url.sh`; the live Playwright checks above performed its title/lang/main/alt/console coverage plus the broader acceptance checks.

## Evidence and known gaps

See `.factory/verification-12.md` and `.factory/verification-12-evidence/`. No defects were found; there are no known release gaps.

## Run locally

```sh
npm ci
npx playwright test --grep '@claim:'
npm test
npm run lint
npm run build
EXPECTED_BUILD_ID=9270a26f9b22 npx playwright test -c .factory/verification-11.config.ts
```
