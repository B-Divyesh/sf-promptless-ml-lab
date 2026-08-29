# Handoff — independent verification 7

## Result

**PASS.** Candidate `31855d1489cbcbf99bf4bbdba9533bc8e751267b` was verified against the researched brief at https://promptless-ml-lab.sociobot.in on 2026-08-29 UTC. No product code was changed during verification.

## What was verified

- All 17 mandatory `.factory/claims.json` commands passed individually from a clean lockfile install; every claim tag has exactly one matching test.
- `npm run lint`, the exact `npm run build`, and the full 37-test Playwright suite passed. `dist/` was produced. Initial JavaScript is 9.79 kB gzip.
- The cold live first screen plainly states what the product does, who it is for, and provides the one-click **Try it with sample data** action.
- A fresh deployed demo was exercised through invalid input and recovery, successful check, JSON export, oversize boundary, reset isolation, and the separate real workbench namespace.
- Live request logging found only same-origin GETs; browser/page errors were empty. Privacy, CSP/security headers, caching, offline reload, PWA update state, routes, metadata, keyboard focus, 390 px layout, and desktop/mobile axe serious/critical scans passed.
- The live footer build id and SHA-256 hashes of HTML, JS, CSS, worker, service worker, and hero artwork exactly match the candidate build.

## How to verify

```sh
npm ci
npm run lint
npm test
npm run build
npm audit --omit=dev
```

Open https://promptless-ml-lab.sociobot.in and activate **Try it with sample data**, or visit `/demo` directly. Run evidence and the complete result are in `.factory/verification-7.md` and `.factory/verification-7-evidence/`.

## Known gaps

No release-blocking product defect was found. `npm ci` reports four advisories in development-only test/emulator tooling; production dependency audit is clean. This static local-first product has no server-side endpoint, payment, account, or sign-in, so rate-limit/429 and Entra checks are not applicable.
