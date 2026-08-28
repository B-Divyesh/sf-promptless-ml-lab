# Handoff — Seeded ML Drills repair

## Release result

Repaired every release-blocking finding in the independent verification of
candidate `7fa48ed67c32abc1d86527d310c5e872b5b8904b`.

- Trace bars no longer use CSP-blocked inline styles. They use fourteen
  predeclared up/down height classes, retain the intended 12–100% visible
  range, and produce no CSP console errors under `style-src 'self'`.
- Added declared, sandboxed claim coverage for operation recognition,
  deterministic trace replay, and the explicit non-execution limitation.
- Replaced the catch-all navigation fallback with explicit rewrites for
  `/demo`, `/privacy`, and `/terms`. Unknown paths now serve `404.html` with
  HTTP 404. The 404 page stylesheet is external so it also obeys the CSP.
- Header, footer, banner, skip, button, and replay controls now have 44 × 44
  px minimum hit areas.

The product remains a Vite + vanilla TypeScript static site; `dist/index.html`
is the deployment root. The existing brief, sample drill flow, local-only run
records, service worker, visual system, and deployment class are unchanged.

## Regression coverage

`tests/app.spec.ts` now runs against the Azure Static Web Apps emulator, not
Vite preview. It includes regressions for the strict CSP trace, real 404,
response headers, desktop/mobile target sizes, service-worker update state,
and mobile keyboard activation. It also runs axe serious/critical checks on
landing and demo at desktop and 390 × 844.

`.factory/claims.json` has eight claim entries. Each declared command was run
after `npm ci`, including the three new checker/trace/limitation claims.

## Verification evidence

Run from a clean install:

```sh
npm ci
npm test
npm run build
```

Verified on 2026-08-28:

- `npm ci`: passed, 0 vulnerabilities reported.
- All eight exact claim commands: passed (one test each).
- `npm test`: passed, 15/15 Playwright tests using Static Web Apps CLI 2.0.10.
- `npm run build`: passed; type-check passed and `dist/` was produced.
- Static Web Apps emulator: `/demo` returned strict CSP, Referrer-Policy, and
  `X-Content-Type-Options`; `/does-not-exist` returned HTTP 404 and the styled
  404 document. Landing and demo passed `verify-url.sh` with no console errors,
  one h1, a main landmark, `lang=en`, and no missing image alt text.
- Playwright axe integration: no serious or critical violations on landing and
  demo at desktop and 390 px. (The standalone axe CLI could not use the
  preinstalled Chromium because its bundled ChromeDriver only supports Chrome
  152; the project’s pinned Playwright axe integration ran against Chromium
  145 successfully.)
- Lighthouse mobile against the built Static Web Apps emulator: Performance
  99, Accessibility 100, LCP 2.1 s, CLS 0.
- Production output: main JS 8.31 KB gzip, worker 0.31 KB gzip, CSS 3.11 KB
  gzip, hero WebP 157,900 bytes. These meet the configured static budgets.
- Privacy and identity: the local-browser claim records only same-origin
  requests during a demo run. There is no account, API, or third-party identity
  flow in this static local-first product.

## Deployment

Deploy `dist/` as the Static Web Apps artifact. The committed
`staticwebapp.config.json` is copied into `dist/` and contains the required
route rewrites, real 404 override, caching, and security headers.

## Known gaps

None for this repair. The deliberate checker limitation remains: it recognizes
the required operation and replays a fixed trace; it does not execute arbitrary
Python or PyTorch. This is disclosed and now has claim coverage.
