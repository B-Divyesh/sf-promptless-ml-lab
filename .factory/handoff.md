# Handoff — repair 3

## What changed

- Replaced the answer-string whitelist with a closed browser-side expression
  evaluator. It parses only the supported PyTorch-shaped expression subset,
  builds each drill's fixed starter fixture independently, executes the submitted
  expression against that fixture, and asserts the resulting value. It has no
  `eval`, Python runtime, network access, or arbitrary browser API access.
- Made the fixture prelude immutable: a changed 1×1 tensor is rejected even
  when the final `x.shape` expression itself is valid. Bare function values,
  incomplete statements, and unsupported code are rejected.
- Replay now restores the saved source, reruns the check, and reports the
  current result without creating a duplicate record. Leaving demo mode clears
  the demo namespace before the real workbench opens.
- Bumped the service-worker cache to `v3` and keeps navigation/cache replacement
  promises alive with `waitUntil`, so the next offline reload gets the online
  replacement.
- Completed the public-route contract: `/lab` is in the sitemap, app footers
  show a Vite-stamped build id, and the styled 404 now has metadata, standard
  navigation/footer/skip link, and a 44 px recovery target.

## Verification evidence

Run from a clean dependency install on 2026-08-29 UTC:

```sh
npm ci
npm run lint
npm test -- --reporter=line
npm audit --omit=dev
npm run build
```

- `npm run lint`: PASS.
- Full Playwright suite: PASS, 26/26. It covers desktop and 390 px mobile,
  keyboard/focus, axe serious/critical checks on every public route, privacy
  request logging, offline reload, service-worker update replacement, replay,
  demo isolation, 404 recovery target, and the constrained evaluator.
- All 11 exact commands declared in `.factory/claims.json` were invoked from
  the manifest and passed, including the new
  `@claim:fixture-counterexamples` adversarial check.
- `npm audit --omit=dev`: PASS, 0 runtime vulnerabilities. Full development
  audit still reports the existing 3 high and 1 low advisory through the Static
  Web Apps CLI tooling tree.
- `npm run build`: PASS. Output is `dist/`; initial JavaScript is 22.05 KB
  (8.84 KB gzip), checker worker 9.08 KB, CSS 10.24 KB (3.13 KB gzip), and the
  hero remains 157.9 KB.
- `/opt/fleet/lib/verify-url.sh` passed the Static Web Apps emulator at `/`,
  `/demo`, and `/lab`: each had zero console/page errors, `lang=en`, one h1,
  a main landmark, and no missing image alt text. JSON/screenshots are in
  `.factory/qa-evidence/repair-local*`.

## Deployment

The source repair is committed and will be pushed and deployed to the existing
Azure Static Web Apps configuration (`promptless-ml-lab`, `dist/`). Live
verification details are appended after deployment.

## Known gaps

- The app deliberately supports only its documented expression subset; it is
  not a Python or PyTorch runtime. Production model code still belongs in a
  real Python environment.
