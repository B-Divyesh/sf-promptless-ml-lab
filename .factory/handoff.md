# Handoff — adversarial polish round 6

## Result: PASS

**Repair implementation commit:** `173484dceffc2e65f0d9cd46db19f42dc9012c98`
**Deployed build:** `173484dceffc`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Static Web Apps deployment:** `b5c74af0-77a7-4c23-9e72-8a80d3170396`

## What changed

Closed F-6-1, the sole remaining cumulative finding. Demo records now use the
`demo:seeded-ml-runs` key in session storage. A single route-boundary cleanup
path discards them whenever a visitor leaves demo mode through Home, Privacy,
browser Back, or Open your real workbench. Reset uses the same cleanup helper.
The helper also removes the legacy local-storage demo key from earlier builds.
Real workbench records remain isolated in `real:seeded-ml-runs` local storage.

The `demo-reset` claim test now covers every exit path, re-entry with an empty
demo, Reset, a legacy-key absence, and an unchanged real-workbench sentinel.
README, Privacy, demo documentation, copy audit, catalog description, service
worker cache version, and live verification coverage were updated to match.

## Verification

Clean clone: `/tmp/promptless-polish6-clean-jFNHHy/repo` at the repair commit.

- `npm ci` passed with 0 vulnerabilities.
- Every exact command in the 23-entry `.factory/claims.json` manifest ran
  separately and selected one passing tagged test.
- Clean-clone `npm test` passed **48/48**.
- Clean-clone `npm run lint`, `npm run build`, `npm audit --audit-level=high`,
  and `git diff --check` passed. `dist/index.html` exists. Initial app JS is
  11.00 kB gzip; CSS is 3.55 kB gzip.
- Local `verify-url.sh` passed for `/`, `/demo`, `/?demo=1`, `/lab`,
  `/privacy`, and `/terms`, with zero console errors. Evidence:
  `.factory/qa-evidence/polish6-local/`.
- Local Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.5 s, TBT 10 ms, CLS 0. Report:
  `.factory/qa-evidence/polish6-local/lighthouse.json`.
- After deploying, a fresh live F-6-1 suite passed **1/1**. It created a demo
  record, exited through Home, Privacy, browser Back, and the real-workbench
  link in separate flows, then confirmed both demo stores were empty, the real
  sentinel was unchanged, and re-entered demo was empty. It also passed Reset.
  Screenshots: `.factory/qa-evidence/polish6-live/demo-home-exit.png` and
  `.factory/qa-evidence/polish6-live/demo-reset-empty.png`.
- Live `verify-url.sh` passed for the same six URLs, including route-specific
  titles, `lang`, one `h1`, one `main`, alt coverage, and no console errors.
- Live `EXPECTED_BUILD_ID=173484dceffc npx playwright test -c
  .factory/verification-11.config.ts` passed **5/5**. This checks first read,
  one-click demo, keyboard, exports/imports/replay, privacy requests, metadata,
  404, Axe serious/critical violations, focus, reduced motion, mobile reflow,
  headers, cache policy, service-worker update, and offline saved-record replay.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.1 s, TBT 0 ms, CLS 0, transfer 48 KiB. Report:
  `.factory/qa-evidence/polish6-live/lighthouse.json`.

## How to run

```sh
npm ci
npm test
npm run lint
npm run build
npm audit --audit-level=high
```

Run the exact claim matrix with the `test` commands in `.factory/claims.json`.
For deployed verification, run:

```sh
EXPECTED_BUILD_ID=173484dceffc npx playwright test -c .factory/verification-11.config.ts
EXPECTED_BUILD_ID=173484dceffc npx playwright test -c .factory/live-polish-6.config.ts
```

## Known gaps

None. All findings F-1-1 through F-6-1 and the earlier unnumbered regression
boundaries are covered by the current source and live verification.
