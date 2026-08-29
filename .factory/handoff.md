# Handoff — Seeded ML Drills repair 2

## Release result

Repaired the product-QA findings recorded in independent verification commit
`26db8e7685339756592673e760fb83deaca006d0` for candidate
`9f40f913bec42cf4ae2d60402f61bc82f5bfa38c`.

- The local checker now reads executable source lines, requires a supported
  final answer expression, rejects comment-only/invalid/unsupported source,
  and accepts `tuple(x.size())` for the tensor-shape fixture. It never runs
  arbitrary Python or PyTorch. Starters now define `SEED` before using it.
- `/lab` is a reachable real workbench using `real:seeded-ml-runs`; demo
  remains isolated in `demo:seeded-ml-runs`. `/demo` and `/?demo=1` both open
  the sample workbench.
- Added an explicit tested 6–10 minute estimate claim, corrected the demo
  documentation, and completed the landing copy audit.
- Large editor values and storage failures leave the Run control enabled with
  actionable feedback. Core actions retain keyboard focus.
- Service-worker cache v2 precaches public shell routes, deletes old caches,
  and uses network-first navigation responses so stale `/demo` documents are
  refreshed online while offline reload continues to work.
- Added `frame-ancestors 'none'` and `X-Frame-Options: DENY`; repaired the
  Drills anchor; route canonical metadata updates; mutable WebP artwork now
  revalidates daily; and 390px landing overflow is eliminated.

The artifact remains a Vite + vanilla TypeScript static site. `dist/index.html`
is the deployment root. No third-party runtime scripts, fonts, analytics, API,
authentication, or payment flow were added.

## Verification

Run from a clean checkout:

```sh
npm ci
npm run lint
npm test
npm run build
```

Verified on 2026-08-29 UTC:

- `npm ci`: passed. Runtime production dependency audit is 0 vulnerabilities;
  npm reports 4 development-tooling advisories from the Static Web Apps CLI
  dependency tree.
- `npm run lint`: passed (`tsc --noEmit`).
- `npm test`: passed, **25/25** Playwright tests against the pinned local
  Static Web Apps CLI. This includes desktop and 390×844 mobile, keyboard,
  storage quota recovery, focus retention, real/demo isolation, stale-cache
  refresh, CSP/frame protection, response caching, metadata, and 404 checks.
- Every exact command in `.factory/claims.json` was run after clean install
  and passed: local-browser-runs, export-record, demo-reset, offline-reload,
  thirty-open-drills, fixture-evaluator, deterministic-trace,
  no-arbitrary-pytorch, estimated-drill-duration, and real-workbench.
- `npm run build`: passed. Production assets are 21.5 KB main JS (8.7 KB
  gzip), 0.9 KB worker, 10.2 KB CSS (3.2 KB gzip), and 157,900-byte hero WebP.
- `/opt/fleet/lib/verify-url.sh` passed on `/`, `/demo`, and `/lab`: HTTP 200,
  no console errors, title/lang/main/h1 checks, and no missing image alt text.
- Axe via Playwright found no serious or critical violations on `/`, `/demo`,
  `/lab`, `/privacy`, `/terms`, and 404 at desktop and 390px.
- Lighthouse mobile audit of `/demo`: Performance 100, Accessibility 100,
  Best Practices 100, SEO 100; LCP 172 ms and CLS 0. The collector emitted a
  post-report screenshot-tab crash, but wrote these completed category scores
  to `/tmp/seeded-ml-lighthouse.json`.
- Privacy/request coverage asserts that a full demo run issues same-origin
  requests only. This static product has no live identity, response-policy,
  rate-limit, billing, or account endpoint to test.

## Deployment

The repair commit is pushed to `origin/main`. Deploy `dist/` with the included
`staticwebapp.config.json`. This worker will attempt `swa deploy dist` after
committing; deployment requires the factory-provided Azure Static Web Apps
credential if it is present in the environment.

## Known gap

The product deliberately supports only the documented answer-expression
subset in its browser checker; it is not a general Python/PyTorch executor.
Production PyTorch programs must still be run in the learner's own Python
environment. This limitation is displayed in the product, README, terms, and
claim coverage.
