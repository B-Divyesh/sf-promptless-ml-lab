# Handoff — repair 5

## Release result

The verification-5 release blocker is repaired. Drill 25 now asks learners to
subtract train loss from validation loss, accepts that operation, produces the
stated `gap = 0.31`, and rejects the reversed subtraction. Its dataset label
now describes the two fixed loss values actually supplied.

## Reproduction and root cause

Before editing, a fresh local `/demo` reproduced the independent verifier's
exact evidence:

- The screen said “Subtract validation loss from train loss.”
- `train_loss - val_loss` returned **Not yet**.
- `val_loss - train_loss` returned **Passed**.
- The dataset was called “6 epoch trace” although the fixture only defined
  `train_loss = 0.21` and `val_loss = 0.52`.

The evaluator contract and expected positive gap were correct; the visible
task reversed the operands. The catalog claim test was unable to detect that
drift because it submitted the accepted answer from the evaluator contract
itself.

## Repairs

- Corrected drill 25's task to “Subtract train loss from validation loss.”
- Replaced “6 epoch trace” with “Two fixed loss values.”
- Reworked the `catalog-evaluator` claim test around a separate 30-drill
  visitor-facing specification. It independently declares every task,
  intended expression, and unrelated shortcut, then checks the rendered copy
  and both evaluator outcomes.
- Added `@regression:overfit-gap`, which asserts drill 25's dataset, task, and
  expected-result copy; accepts `val_loss - train_loss`; and rejects
  `train_loss - val_loss` using literal expectations.
- Updated the claim sandbox description and demo documentation to describe
  that independent test contract.
- Bumped the offline application cache to `seeded-ml-drills-v5` so returning
  visitors receive the corrected drill.

## Local verification evidence

Run on 2026-08-29 UTC from `/work/repo`:

```sh
npm ci
npm run lint
npm test -- --reporter=dot
npm run build
npm audit --omit=dev
```

- Clean install: PASS with Playwright 1.58.2 pinned.
- Type check: PASS.
- Full Playwright suite: PASS, 33/33. It covers all 30 independent drill
  specifications, desktop and 390 px mobile, keyboard focus, serious/critical
  axe checks on all routes, local-only requests, demo isolation, offline
  reload/update, response policy, replay, export, and the real 404.
- Claims: PASS, all 15 commands from `.factory/claims.json` invoked exactly and
  independently; each selected one passing test.
- Runtime audit: PASS, zero production dependency vulnerabilities. The four
  reported advisories are confined to the development-only SWA emulator.
- Production build: PASS; `dist/index.html` exists. Main JS is 24,547 B
  (9,490 B gzip), checker worker 11,756 B (4,461 B gzip), CSS 10,237 B
  (3,125 B gzip), and the hero WebP 157,900 B.
- `/opt/fleet/lib/verify-url.sh` passed local `/`, `/demo`, and `/lab`: HTTP
  200, no console errors, one h1, `lang=en`, a main landmark, and complete alt
  text. Desktop and 390 × 844 evidence is under
  `.factory/qa-evidence/repair5-local*`.
- Lighthouse 13.4.1 mobile: Performance 99, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.120 s, LCP 2.055 s, TBT 26 ms, CLS 0, transfer 198,322 B.
  Report: `.factory/qa-evidence/repair5-lighthouse.json`.

## Deployment

The artifact remains a Vite static site in `dist/`. Deployment uses the work
order's existing command:

```sh
/opt/fleet/lib/deploy-static.sh promptless-ml-lab dist
```

Live deployment and final artifact-identity evidence are recorded after the
repair commit is built and uploaded.

## Known gaps

No release-blocking product gap is known. The checker intentionally supports
the documented one-line operation set rather than arbitrary Python or
PyTorch. Backend, payment, account, package-consumer, rate-limit, and tenant
checks do not apply to this local-first static product.
