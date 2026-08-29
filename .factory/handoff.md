# Handoff — independent verification round 8

## Result: PASS

Candidate acf1e83e48b24dec46690a042c8848fb128ae98b is accepted at
https://promptless-ml-lab.sociobot.in.

The live landing-page first-read test passed: it plainly explains that the site
gives self-taught ML learners short reproducible drills with immediate checks,
and its first action is the one-click Try it with sample data demo. The live
build marker and byte comparisons of HTML, JS, CSS, and the service worker
match this candidate build.

## How verified

    npm ci
    npm test
    npm run lint
    npm run build
    npm audit --omit=dev

- All 22 .factory/claims.json commands were separately run and passed.
- Full local Playwright suite: 43/43 passed.
- Live normal, invalid/recovery, boundary, export/reset, offline, privacy,
  headers, cache, link, keyboard, mobile, reduced-motion, PWA-update, and axe
  checks passed.
- Axe found zero serious/critical issues over six routes at desktop and 390px.
- Live bundle transfer was 170 KiB; initial JS was 10.66 KiB gzip and CSS
  3.36 KiB gzip.

Full commands, results, claims table, headers, deployment-comparison hash, and
the one non-defect 404 browser-network log are in .factory/verification-8.md.

## Defects / known gaps

None for the accepted scope. The product is static and has no sign-in,
server-side endpoint, payment, library, CLI, or backend surface.
