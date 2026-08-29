# Handoff — repair 6

## Result: repaired, deployed, and verified live

This repair closes the single release blocker in independent verification 10
for candidate `29d8f3c4f04a0bb2fc86d661e2055848f7456c3b`.

Commit `61790d441253ad94d244123b61b33c75f7fb8052` is pushed to `main` and is
deployed to https://promptless-ml-lab.sociobot.in through Azure Static Web Apps
deployment `5cf8ab00-fd83-4481-a8a6-3458b1f8217e` in Central US.

The verifier found that keyboard focus on the demo banner’s **Open your real
workbench** link inherited the blue global focus ring (`rgb(20, 62, 153)`) on
the moss banner (`rgb(49, 92, 60)`), a `1.25:1` contrast ratio. The old
context override only matched `.text-button`, but the exit control is an
anchor. The repair adds a dedicated inverse focus token and targets demo-banner
anchors. Its rendered white 4px outline now has `7.70:1` contrast against the
same moss background.

## What changed

- Added `--focus-on-moss` and applies it to `.demo-banner a:focus-visible` in
  `src/style.css`.
- Added `@regression:demo-exit-focus-contrast` in `tests/app.spec.ts`. It uses
  the real Tab sequence to focus the exit link at 1440 × 900 and 390 × 844,
  checks the rendered 4px solid outline, and calculates the rendered color
  contrast against the banner background. It requires at least `3:1`.
- Preserved the 30-drill sample, demo/real storage split, local-only behavior,
  service worker, routing, privacy wording, and visual system. `.factory/brief.json`
  remains absent in this checkout; scope was preserved from the verification
  report, README, demo guide, claims, and design record.

## Exact verification evidence

- Clean install: `npm ci` completed with 24 packages and zero vulnerabilities.
- Full browser suite: `npm test -- --reporter=line` passed **47/47**.
- Claim matrix: all **24/24** exact commands from `.factory/claims.json` passed
  separately, each selecting its one `@claim:<id>` browser test.
- Type/lint: `npm run lint` passed (`tsc --noEmit`).
- Production build: `npm run build` passed and generated `dist/index.html`.
- Dependency audit: `npm audit` found zero vulnerabilities. `git diff --check`
  passed.
- Desktop and 390px mobile keyboard coverage includes the new focus-contrast
  test, existing focus-retention/route-focus tests, 44px targets, and reflow.
- Accessibility: the full suite’s Axe scans over all public routes at desktop
  and 390px passed with no serious violations. Local `verify-url.sh` checks for
  `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and `/terms` all returned 200
  with a title, `lang=en`, one h1, one main, labelled controls/images, and no
  console errors. Evidence: `.factory/qa-evidence/repair6-local-*`.
- Privacy, offline/update, response policy, and identity boundaries remain
  exercised by the passing request-log, offline reload/update, CSP/headers,
  no-upload, and no-account tests. This static product has no backend,
  authentication, payment, or consumer package, so server rate-limit and
  package-consumer checks do not apply.
- Lighthouse mobile against the production build: Performance **100**,
  Accessibility **100**, Best Practices **100**, SEO **100**; FCP 1.13s, LCP
  1.43s, TBT 82ms, CLS 0, transfer 77,709 bytes. Evidence:
  `.factory/qa-evidence/repair6-local-lighthouse.json`.
- Asset budgets: main JS 28,721 bytes raw / 10,738 gzip; checker worker 11,756
  bytes raw / 4,461 gzip; CSS 11,257 bytes raw / 3,361 gzip; initial HTML + CSS
  + JS 14,458 gzip; mobile hero 33,170 bytes.
- Live deployment: `verify-url.sh` passed `/`, `/demo`, `/?demo=1`, `/lab`,
  `/privacy`, and `/terms`, each with 200, route-specific metadata, one h1,
  one main, labelled controls/images, and no console errors. Evidence:
  `.factory/qa-evidence/repair6-live-*`.
- Live identity and privacy check: the rendered footer reports build
  `61790d441253`; desktop and 390px keyboard focus both compute to a white,
  solid 4px outline on moss at `7.70:1`; the visited demo made same-origin GET
  requests only and logged no console errors.
- Live response policy: `/demo` returns HSTS, `nosniff`, strict referrer
  policy, `X-Frame-Options: DENY`, and the declared self-only CSP including
  `frame-ancestors 'none'`. An unknown route returns HTTP 404.

## Run and deploy

```sh
npm ci
npm test
npm run lint
npm run build
npm audit
/opt/fleet/lib/deploy-static.sh promptless-ml-lab dist
```

The work-order deployment completed against the existing static product at
`https://promptless-ml-lab.sociobot.in`. Verify the deployed demo by opening
`/demo`, pressing Tab seven times from page load, and observing the white focus
ring on **Open your real workbench**.

## Known gaps

None. The repair is scoped to the verifier’s sole release blocker.
