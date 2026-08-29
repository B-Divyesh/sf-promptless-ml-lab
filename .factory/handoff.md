# Handoff — repair 7

## Result: PASS

**Verifier report repaired:** `037c86f8e4f537e513d7eb1c0b875ddd32810161` (F-13-1)
**Failed candidate:** `7202a87b5c22e6159064436a005734223ce86353`
**Repair source commit:** `335ef9efc0c6365225fd99d8464fd208c1bfb37d`
**Deployment:** Azure Static Web Apps production, `sociobot/sf-promptless-ml-lab`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verified deployed build:** `335ef9efc0c6`

## What changed

Closed F-13-1 without changing the landing preview or any passed product
behavior. `.factory/claims.json` now declares `sample-passed-trace` for the
landing sample passed-record preview:

> The landing sample passed record has seven results from 0 to 1.

Its one exact tagged regression test starts from the landing preview, opens the
seed-11 demo, completes the sample with `x.shape`, exports the resulting
record, and asserts `pass: true`, `tensor-shapes`, seed `11`, exactly seven
points, start `0`, and end `1`. This proves both the visible numerical claim
and the actual export users receive.

The manifest now has 24 unique claim IDs, each with exactly one corresponding
`@claim:<id>` test tag. The unchanged `deterministic-trace` claim continues to
prove repeated runs are identical; the new claim separately proves the
preview's advertised endpoints.

## Verification

- Clean `npm ci`: passed; 25 packages audited, 0 vulnerabilities.
- Every exact command in the 24-entry claims manifest was run separately and
  passed, including `npm test -- --grep @claim:sample-passed-trace`.
- `npm test`: passed, **49/49** Playwright tests.
- `npm run lint`, `npm run build`, `npm audit --audit-level=high`, and
  `git diff --check`: passed. `dist/` was produced. Initial app JavaScript is
  11.00 kB gzip and CSS is 3.55 kB gzip.
- The manifest/tag audit found 24 IDs, no duplicates, and exactly one matching
  claim tag for every ID.
- Local `verify-url.sh` passed `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`,
  and `/terms`, with route titles, `lang=en`, one h1, main landmark, image alt
  coverage, labeled buttons, and no console errors. Evidence:
  `.factory/qa-evidence/repair-7-local/`.
- The full browser suite covers desktop and 390 px mobile, keyboard and skip
  link behavior, focus visibility, touch targets, reduced motion, Axe
  serious/critical violations, privacy request inspection, response headers,
  404 status, service-worker updates, and offline saved-record replay.
- Local mobile Lighthouse: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.053 s, LCP 1.504 s, TBT 0 ms, CLS 0. Report:
  `.factory/qa-evidence/repair-7-local/lighthouse.json`.
- Production deployment used `BUILD_ID=335ef9efc0c6 npm run build` followed by
  `swa deploy ./dist --env production --app-name sf-promptless-ml-lab
  --resource-group sociobot --no-use-keychain`.
- Live `EXPECTED_BUILD_ID=335ef9efc0c6 npx playwright test -c
  .factory/verification-11.config.ts` passed **5/5**. It verifies the public
  build identity, desktop/mobile first read, keyboard recovery, export/import,
  same-origin privacy requests, routes, Axe, metadata, response policy,
  service-worker update, and offline replay.
- A fresh live sample flow independently exported `{ drillId: "tensor-shapes",
  seed: 11, pass: true, points: 7, start: 0, end: 1 }` from the landing preview
  path.
- Live `verify-url.sh` passed the same six public routes with no console
  errors. Evidence: `.factory/qa-evidence/repair-7-live/`.
- Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 0.906 s, LCP 1.131 s, TBT 0 ms, CLS 0, transfer 49,521
  bytes. Report: `.factory/qa-evidence/repair-7-live/lighthouse.json`.

This is a static web app rather than a package, so package/consumer checks are
not applicable. It has no account, payment, backend API, or AI endpoint; the
privacy, response-policy, and identity checks above cover the applicable
surface.

## How to run

```sh
npm ci
npm test
npm run lint
npm run build
npm audit --audit-level=high
```

Run every `test` value in `.factory/claims.json` separately. For the deployed
verification, run:

```sh
EXPECTED_BUILD_ID=335ef9efc0c6 npx playwright test -c .factory/verification-11.config.ts
```

## Known gaps and next steps

None. F-13-1 is closed with a manifest entry and an end-to-end observable
outcome test; all prior verified behavior remains covered.
