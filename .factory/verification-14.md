# Independent verification 14 — PASS

**Candidate:** `d2fecbe873934600a30601625168580bf83ea6bf`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Checked:** 2026-08-29 23:41–23:51 UTC
**Verdict:** **PASS** — no release-blocking, high, medium, or low defects found.

## First read and deployed identity

I opened the live landing page in a new browser context before using the product. Its first screen says “Practice PyTorch operations in fixed drills.” It says it is for “self-taught ML learners” who want “one short drill with a browser check,” and its primary visible action is **Try it with sample data**. The adjacent note says it opens a tensor-shape drill with fixed sample inputs. This is a plain-language answer to what it does, who it is for, and what to click first. The one-click demo opened `/demo` with the persistent “Demo — sample data, nothing is saved.” banner, reset control, the fixed seed-11 8-by-3 tensor, editable starter, and no prior record.

The live footer reports build `d2fecbe87393`. I rebuilt the checked-out candidate, fetched the deployed `index.html`, application JS, CSS, checker worker, and service worker, and byte-compared each to `dist/`: all five match. `staticwebapp.config.json` is deployment configuration and correctly is not a public asset (live request is 404).

Evidence: `verification-14-artifacts/live-cold-desktop.png`, `live-cold.json`, `live-local-sha256.txt`, and `live-local-match.json`.

## Required claims gate

`.factory/claims.json` exists and declares 24 unique claims. I ran every exact `test` command in it separately after `npm ci`, from the normal demo entry point. **24/24 passed**. This included the isolated demo/reset paths, same-origin privacy checks, export/import and replay, all-30-drill evaluator, counterexamples, deterministic seven-point trace, offline reload, no arbitrary PyTorch execution, and five-distinct-drill progress behavior. The source/tag audit also found one matching `@claim:<id>` test for every manifest ID.

The complete command transcript is `verification-14-artifacts/claim-tests.log`.

## Clean local verification

All commands were run from this clean candidate checkout:

| Check | Result |
|---|---|
| `npm ci` | passed; 25 packages audited, 0 vulnerabilities |
| `npm test` | passed, 49/49 Playwright tests |
| `npm run lint` | passed (`tsc --noEmit`) |
| `npm run build` | passed; produced `dist/` |
| `npm audit --audit-level=high` | passed; 0 vulnerabilities |

The production build is 11.00 kB gzip initial application JavaScript and 3.55 kB gzip CSS, below the static-product budgets. The 640px hero is 33,170 bytes and the initial live transfer measured 48 KiB.

Evidence: `verification-14-artifacts/npm-*.log` and `dist-files.txt`.

## Independent live product exercise

In a fresh live demo context I did the following:

- Submitted an invalid, comment-only answer: it remained saved as a “Not yet” record with the clear recovery message “Use a valid answer line that produces (8, 3)”.
- Submitted `x.shape` against the supplied seed-11 tensor: it passed and saved a replayable record.
- Exported records: the JSON had `tensor-shapes`, seed 11, `pass: true`, and exactly seven trace points.
- Replayed the passing record: it passed again.
- Imported malformed JSON: it was rejected without changing records; then imported a valid record after the visible one-record preview: it succeeded.
- Confirmed this demo wrote only `sessionStorage["demo:seeded-ml-runs"]` and did not write the real-workbench key.

The captured outgoing log contained six requests, all same-origin GETs; no request body contained the test record marker. There were no console errors or page errors. This corroborates the local-first privacy claim independently of the product’s claim tests.

Evidence: `verification-14-artifacts/independent-live-qa.json`.

## Accessibility, responsive behavior, PWA, and response policy

- Live axe scans of `/`, `/demo`, `/privacy`, and `/terms`: **0 serious, 0 critical** violations on every route.
- At 390x844 with reduced motion, keyboard Tab reached the primary demo action with a visible `rgb(20, 62, 153) solid 4px` focus outline; Enter opened the demo. There was 0px horizontal overflow and computed transition duration was 0s. The mobile screenshot shows the sample drill, expected result, and editor in the first viewport.
- In a fresh context, the active service worker had no pending update after `registration.update()`. After saving a demo record and taking the context offline, `/demo` reloaded from the service worker with the saved record still available and no page errors.
- `/`, `/demo`, `/privacy`, and `/terms` returned 200; an unknown route returned a styled 404 with status 404. Responses send `nosniff`, strict referrer policy, `X-Frame-Options: DENY`, and the restrictive CSP including `frame-ancestors 'none'`. Hashed JS has `Cache-Control: public, max-age=31536000, immutable`; artwork has a one-day cache lifetime; HTML and service worker revalidate at 30 seconds.
- Live Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9s, LCP 1.2s, TBT 130ms, CLS 0.

Evidence: `live-demo-mobile.png`, `independent-live-qa.json`, `live-headers.txt`, and `live-lighthouse-mobile.json`.

## Scope and applicability

This is a static, local-first web app. There is no account/sign-in flow, payment, third-party runtime, backend endpoint, API request allowance, library package, or CLI to exercise. Therefore Entra tenant, server 429, consumer package, concurrency, and backend-persistence checks are not applicable.

The supplied visual thesis is implemented consistently: the deliberate concrete-and-moss visual system, self-hosted/system typography, original local hero art, visible focus treatment, and reduced-motion behavior appear in the live page. The exposed product scope also matches the researched smallest useful product: 30 fixed-seed PyTorch drills, browser checks, local replayable records, no leaderboard/hosting/tutor, and transparent limitations.

## Defects by severity

| Severity | Findings |
|---|---|
| Release-blocking | None |
| High | None |
| Medium | None |
| Low | None |
