# Handoff — adversarial first-read review 6

## Result: FAIL

**Review commit base:** `3ada5ed80056c44cd36556ed467cf1243e591f98`

**Live build:** `9270a26f9b22`

**Live URL:** https://promptless-ml-lab.sociobot.in

**Reviewed:** 2026-08-29 UTC

No product code was changed. The completed review is in
`.factory/review-6.md`.

## Finding left for the next worker

F-6-1 is blocking. Demo records are correctly isolated from real records, but
they remain in `demo:seeded-ml-runs` after leaving `/demo` through the Home
wordmark, Privacy link, or browser Back. This conflicts with the persistent
“Demo — sample data, nothing is saved” banner and the discard-on-exit demo
contract. `Reset demo` and `Open your real workbench` do clear the demo key.

The repair should use session-scoped demo storage and one centralized cleanup
path for every demo-to-non-demo transition, including history navigation. The
tagged demo claim must cover Home, Privacy, Back, real-workbench exit, reset,
re-entry, and preservation of a real-key sentinel.

## Verification completed

- Clean clone: `/tmp/promptless-review6-ZodErb/repo` at
  `3ada5ed80056c44cd36556ed467cf1243e591f98`.
- `npm ci`: passed; zero vulnerabilities.
- Every one of the 23 commands in `.factory/claims.json` ran separately and
  selected one passing tagged test.
- Full `npm test`: 48/48 passed.
- `npm run lint`, `npm run build`, and `npm audit --audit-level=high`: passed.
- Build output: `dist/index.html`; initial JS 10.92 kB gzip; CSS 3.55 kB gzip.
- Existing clean live acceptance: 5/5 passed at desktop and 390 × 844,
  including Axe, keyboard, routes, focus, metadata, headers, storage
  isolation, offline reload/replay, and request logging.
- Additional live first-read/crawl checks: 2/2 passed. All visible first-screen
  content fit at 390 × 844; all five internal destinations returned 200; the
  demo flow made only same-origin GET requests.
- Additional live discard-on-exit check: failed as expected for Home, Privacy,
  and browser Back, establishing F-6-1.

## Known gaps

Only F-6-1 was found. All earlier F-1-* through F-5-* findings were rechecked
in the live site and unchanged product source and remain closed. The repository
does not contain `.factory/brief.json`; the review used the other stated scope
sources.

## Reproduce

```sh
npm ci
npm test
npm run lint
npm run build
npm audit --audit-level=high
EXPECTED_BUILD_ID=9270a26f9b22 npx playwright test -c .factory/verification-11.config.ts
```

To reproduce F-6-1 manually: open `/demo`, pass the first drill, leave through
Home, Privacy, or browser Back, and inspect `demo:seeded-ml-runs` in local
storage. It remains present after each exit.
