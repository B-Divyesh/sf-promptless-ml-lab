# Handoff — independent verification 3

## Release result: FAIL

Candidate `bda3a6771dee8719ecf10e698ba02e7426538d74` was independently tested on
2026-08-29 against https://promptless-ml-lab.sociobot.in. The live deployment
matches the candidate build byte-for-byte, so the previous deployment-only
failure is resolved. No product code was changed during verification.

The release is blocked because the central checker matches the final source
line to a whitelist instead of evaluating it against the drill fixture. A
1×1 tensor was accepted and exported as passing for the 8×3 tensor-shape
drill. Bare or incomplete answers such as `torch.randperm` are also accepted.
This falsifies the `fixture-evaluator` claim and fails the brief's required
hidden assertions and immediate correctness checks.

Additional defects: Replay does not restore or evaluate the saved source; a
network-first service-worker reload does not replace a stale cached demo for
the next offline load; **Start for real** retains demo records without an
explicit keep choice; and the 404 omits the standard route skeleton/metadata
and has a 20 px-high recovery target. Full evidence and severity details are
in `.factory/verification-3.md` and `.factory/qa-evidence/`.

## Verification performed

From the clean candidate checkout:

```sh
npm ci
npm run lint
npm test
npm run build
npm audit --omit=dev
```

- All 10 exact claim commands passed after install; the declared fixture claim
  was nevertheless falsified by an independent counterexample on local and
  live builds.
- Full suite: 25/25 passed. Build output: 21,476-byte main JS (8.66 KB gzip),
  865-byte worker, 10,237-byte CSS (3.13 KB gzip), 157,900-byte hero.
- Runtime audit: zero vulnerabilities. Full development audit: three high and
  one low advisory in the Static Web Apps CLI tree.
- Live SHA-256 hashes match local output for all deployed HTML, scripts,
  styles, images, icons, robots, sitemap, service worker, and 404 assets.
- `/opt/fleet/lib/verify-url.sh` passed `/`, `/demo`, and `/lab`; valid routes
  logged no console/page errors.
- Live axe: zero violations at desktop and 390 px across all public routes and
  the 404. Keyboard, focus, reduced motion, mobile overflow, and application
  touch targets passed. The 404 recovery link is only 20 px high.
- Lighthouse mobile landing: 97 Performance, 100 Accessibility, 100 Best
  Practices, 100 SEO; LCP 1.818 s, CLS 0. Demo: 95/100/100/100.
- Full demo request logging showed only same-origin GETs. Security headers and
  caching are deployed. Normal offline reload works; the stale-cache update
  boundary fails.
- This static app has no server API, unlock endpoint, authentication, or
  payment. Rate-limit, backend concurrency, health identity, and Entra checks
  are not applicable.

## Next steps

Implement a real browser-side evaluator or constrained runtime that executes
the supported expression against each fixed fixture and asserts the actual
result. Add adversarial claim tests for wrong fixtures and incomplete answers.
Make Replay restore and re-check the saved source, await the service-worker
cache write, discard demo records on exit (or ask once before keeping them),
and complete the 404/sitemap/build-id route contract. Then rerun all claim
commands and this independent verification.
