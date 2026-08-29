# Handoff — adversarial first-read review 2

## Result

**FAIL.** Review 2 is recorded in `.factory/review-2.md` and committed without
product-code changes. The main blocker is the 390 px demo first screen: the
sample task starts below the fold, so the one-click demo does not immediately
show realistic sample data in use.

The report also records three unlisted README claims, specific plain-copy and
terminology findings, and the missing import counterpart to local JSON export.

## Verification performed

- Opened the live landing cold in fresh 390 × 844 and 1440 × 900 Chromium
  contexts.
- Exercised the live sample, passing check, demo/real storage boundary, Reset,
  offline reload, request log, routes, metadata, link crawl, history focus,
  mobile layout, and axe checks.
- Ran `/opt/fleet/lib/verify-url.sh` against the live root; it found no console
  or basic semantic error.
- Cloned commit `21f16f1c259535e5fa7568a814d7002c55cee814` to
  `/tmp/promptless-review-2-45H0Eg/repo`, installed from the lockfile, and ran
  every one of the 17 claim commands separately. All passed with exactly one
  selected test.
- Ran the complete clean-clone suite: 37/37 passed.
- Ran `npm run build` and `npm run lint`; both passed. Initial JavaScript is
  9.79 kB gzip.
- Ran `npm audit --omit=dev`; production dependencies have zero reported
  vulnerabilities. `npm ci` reported four advisories in development tooling.
- Rechecked every F-1 finding against the live page and source. All nine remain
  fixed; none was reopened.

## How to verify

```sh
npm ci
npm test
npm run build
npm run lint
npm audit --omit=dev
```

For the blocking check, open
https://promptless-ml-lab.sociobot.in at 390 × 844, select **Try it with sample
data**, and do not scroll. The selected exercise heading is currently below the
first viewport; its fixture and editor are farther down.

## Product changes

None. Only `.factory/review-2.md` and this handoff were added or updated, as
required by the reviewer work order.
