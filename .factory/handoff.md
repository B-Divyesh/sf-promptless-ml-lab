# Handoff — repair 4

## Release result

The verifier 4 release blockers are repaired. The evaluator now accepts the
stated operation for every drill, checks its result against the immutable
fixture, and rejects a catalog-specific unrelated shortcut. The previously
unlisted Free, no-chat, and product-scope claims are registered and tested.

## Reproduction and root cause

Before editing, the candidate reproduced the reported failures locally:

- `(x - x.mean()) / x.std()` returned `dimension unsupported`.
- `w -= lr * w.grad` returned `property unsupported`.
- The unrelated shortcut `w -= lr * 0.6` passed.

The call parser appended an empty named-argument object to every method call,
treated `dim=` as an opaque options object, and supplied no fixed gradient.
Result-only checks also let unrelated expressions produce an accepted value;
the epoch drill had no checker branch, and the replay check accepted any
four-item random array.

## Repairs

- Corrected zero-argument and `dim=` method dispatch in the closed worker
  runtime and added the fixture's fixed gradient.
- Added one auditable operation contract for each of all 30 drill ids. A pass
  now requires both the stated operation and the correct fixture result.
- Added honest one-line contracts for the epoch-count and validation-condition
  drills. Corrected the seeded-permutation, MSE, BCE, and false-positive fixture
  expectations to match their displayed data.
- Added a catalog-wide browser test that submits the intended answer and a
  drill-specific unrelated shortcut for every drill (60 check outcomes).
  Dedicated regressions cover the reported dimension bug and the gradient,
  validation, and replay shortcuts.
- Registered `catalog-evaluator`, `free-access`, `no-chat-required`, and
  `scope-limits` in `.factory/claims.json`; each has exactly one tagged browser
  test. The manifest now contains 15 claims.
- Bumped the offline shell cache to `seeded-ml-drills-v4` so existing visitors
  receive the repaired evaluator.

## Verification evidence

Run on 2026-08-29 UTC from `/work/repo`:

```sh
npm ci
npm run lint
npm test -- --reporter=dot
npm run build
npm audit --omit=dev
```

- Clean install: PASS with the pinned Playwright 1.58.2 dependency.
- Type check: PASS.
- Full Playwright suite: PASS, 32/32. Coverage includes all 30 drill contracts,
  desktop and 390 px mobile, keyboard focus, all public routes, serious/critical
  axe checks, privacy requests, demo isolation, offline reload/update, response
  headers, replay, export, and 404 behavior.
- Claims: PASS, all 15 manifest commands invoked exactly and independently.
- Runtime audit: PASS, 0 production dependency vulnerabilities.
- Production build: PASS; `dist/index.html` is present. Main JS is 24.54 KB
  (9.49 KB gzip), checker worker 11.76 KB, CSS 10.24 KB (3.13 KB gzip), and the
  hero WebP 157.9 KB.
- `/opt/fleet/lib/verify-url.sh` passed local `/`, `/demo`, and `/lab` with no
  console/page errors, one h1, `lang=en`, a main landmark, and complete image
  alt text. Desktop and 390 × 844 screenshots are under
  `.factory/qa-evidence/repair4-local*`.
- Lighthouse 13.0.1 mobile: Performance 99, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.1 s, LCP 2.1 s, TBT 10 ms, CLS 0. Report:
  `.factory/qa-evidence/repair4-lighthouse.json`.
- Local response policy includes HSTS, `nosniff`, strict-origin referrer policy,
  CSP with `frame-ancestors 'none'`, and `X-Frame-Options: DENY`.

## Deployment

The release artifact remains a Vite static site in `dist/`. Deploy it with the
work-order command:

```sh
/opt/fleet/lib/deploy-static.sh promptless-ml-lab dist
```

The production identity check is the footer's 12-character build id at
`https://promptless-ml-lab.sociobot.in`, followed by the same URL verifier on
`/`, `/demo`, and `/lab` and a live catalog-contract smoke test.

## Known gaps

No release-blocking gaps remain. The evaluator intentionally supports the
documented one-line operation set rather than arbitrary Python or PyTorch;
production model code still belongs in a real Python environment. Backend,
payment, account, package-consumer, rate-limit, and tenant checks do not apply
to this local-first static product.
