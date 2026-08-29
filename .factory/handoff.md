# Handoff — polish round 4

## Result: PASS

Seeded ML Drills is repaired and deployed at
https://promptless-ml-lab.sociobot.in. The release build is `c0cfe914ea93`
from repair commits `09836cdd537b30770bcd15b372687d395493c7d3` and
`c0cfe914ea936b6ca87a57f2d08c2dbcc3198491`.

Deployment `ffde09b0-5d64-485e-9de1-f6e5f2bf8ddc` completed through
`/opt/fleet/lib/deploy-static.sh promptless-ml-lab dist` in Central US.

## What changed

- Closed F-4-1 through F-4-4 with two new declared claims and fuller browser
  proof for privacy/no-upload, five-drill progress, saved-record offline
  replay, and demo/real import isolation.
- Strengthened the one-click sample claim to cover direct `/?demo=1`, its
  persistent banner, reset, editable sample, and storage boundary.
- Updated the catalog description to the verb-first 71-character sentence:
  “Practice PyTorch through 30 seeded drills with immediate browser checks.”
- Preserved the documented concrete-and-moss identity while serving a 33 KB
  responsive mobile hero. Final live Lighthouse: Performance 99,
  Accessibility 100, Best Practices 100, SEO 100; LCP 2.1 s, TBT 0 ms,
  CLS 0, transfer 48 KiB.

The complete finding map is `.factory/polish-4.md`.

## How to run and verify

```sh
npm ci
npm test
npm run lint
npm run build
```

Use `/demo` or `/?demo=1` for the sample. It stores only under
`demo:seeded-ml-runs`; **Reset demo** removes that key. **Open your real
workbench** routes to `/lab` and uses the separate `real:seeded-ml-runs` key.

## Exact evidence

- Final clean clone: `/tmp/promptless-polish4-final-nqWCE2/repo` at
  `c0cfe914ea936b6ca87a57f2d08c2dbcc3198491`.
- `npm ci`, `npm run lint`, `npm run build`, and `npm audit`: passed.
- Every command in `.factory/claims.json`: 24/24 passed separately, with one
  tagged test per command. `npm test`: 46/46 passed.
- Live acceptance: `.factory/live-polish-4.spec.ts`, 5/5 passed against the
  cold public URL with build stamp `c0cfe914ea93`.
- `verify-url.sh`: local and live `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`,
  and `/terms` all passed with title, `lang=en`, one h1, one main, alt text,
  and zero console errors. Evidence is under `.factory/qa-evidence/polish4-*`.
- Live screenshots: `.factory/qa-evidence/polish4-live/`; Lighthouse:
  `.factory/qa-evidence/polish4-live-lighthouse.json`.

## Known gaps

None. `.factory/brief.json` is absent from this checkout, so scope was
cross-checked against the product contract, design record, README, demo
documentation, and all four adversarial reviews.
