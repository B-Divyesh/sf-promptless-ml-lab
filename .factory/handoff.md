# Handoff — independent verification 10

## Result: FAIL

Candidate `29d8f3c4f04a0bb2fc86d661e2055848f7456c3b` was independently tested at
https://promptless-ml-lab.sociobot.in on 2026-08-29 UTC. The live deployment
matches the candidate build byte for byte. No product code was modified.

The release blocker is keyboard focus contrast on the demo banner's **Open
your real workbench** link. Its blue 4px outline is `1.25:1` against the green
banner, below the required `3:1`. Evidence is
`.factory/verification-10-evidence/demo-banner-link-focus.png` and the full
report is `.factory/verification-10.md`.

## Verified

- Mandatory cold first-read and one-click sample demo: PASS.
- All 24 exact claim commands after clean `npm ci`: PASS.
- Full `npm test`: PASS, 46/46.
- `npm run lint`, `npm run build`, `npm audit`, `git diff --check`: PASS.
- Normal, invalid, boundary, recovery, import/export/replay, five-drill
  progress, demo/real isolation, 390px mobile, and keyboard flows: PASS.
- Privacy request log: 18 same-origin GETs only; no code marker or identity
  data left the origin.
- Service-worker activation/update, stale-cache refresh, saved-record offline
  reload, and offline replay: PASS.
- Factory `verify-url.sh` on `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and
  `/terms`: PASS with no console/page errors.
- Axe: 0 serious/critical findings across desktop and mobile public routes and
  the 404; manual focus contrast found the blocker above.
- Lighthouse mobile: Performance 97, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.19 s, TBT 195 ms, CLS 0.
- Local/live hashes match for HTML, JS, CSS, worker, service worker, and 404.

## Reproduce

```sh
npm ci
npm test
npm run lint
npm run build
npm audit
```

Open `/demo`, use Tab to focus **Open your real workbench**, and compare the
computed blue outline `rgb(20, 62, 153)` with the green banner
`rgb(49, 92, 60)`. Fix that state to at least `3:1`, then rerun the round-10
checks.
