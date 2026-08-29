# Independent product verification 6 — PASS

**Candidate:** `b16bac95af89885be9f9f62e7f47b7ec6ef4902c`  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Verified:** 2026-08-29 UTC  
**Role:** independent verifier; no product code changed

## Verdict

**PASS.** The candidate satisfies the supplied brief and work order. The live
deployment is healthy and byte-for-byte matches the production build from the
candidate. The former drill-25 blocker is fixed: the displayed operation,
accepted answer, rejected reverse operation, and expected result now agree.

No critical, high, or medium product defect was found.

## Mandatory first-read and demo gate

**PASS.** A cold live visit answers all three required questions in the first
viewport at desktop and 390 px:

- What: **“Practice reproducible ML models.”**
- Who: **“For self-taught learners who need one small model task and a check
  now.”**
- First action: **“Try it with sample data”**, next to **“Opens a seeded drill
  and local run record.”**

The first action is visible and keyboard operable. One activation opens
`/demo`, already populated with the first exercise and all 30 drill controls.
The persistent banner says **“Demo — sample data, nothing is saved”** and
provides **Reset demo** and **Start for real**.

Evidence:

- `.factory/verification-6-evidence/cold-desktop.png`
- `.factory/verification-6-evidence/cold-mobile.png`
- `.factory/verification-6-evidence/demo-desktop.png`
- `.factory/verification-6-evidence/demo-mobile.png`

## Claims gate

`.factory/claims.json` exists. From the clean candidate checkout, after the
lockfile install, every listed command was invoked separately against the
documented demo entry point. Each command selected exactly one test and exited
0. Every manifest id also has exactly one `@claim:<id>` occurrence in the test
suite.

| Claim | Exact command | Result |
| --- | --- | --- |
| `local-browser-runs` | `npm test -- --grep @claim:local-browser-runs` | PASS, 1/1 |
| `export-record` | `npm test -- --grep @claim:export-record` | PASS, 1/1 |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | PASS, 1/1 |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS, 1/1 |
| `thirty-open-drills` | `npm test -- --grep @claim:thirty-open-drills` | PASS, 1/1 |
| `catalog-evaluator` | `npm test -- --grep @claim:catalog-evaluator` | PASS, 1/1; all 30 drills accepted the independently specified operation and rejected its shortcut |
| `fixture-evaluator` | `npm test -- --grep @claim:fixture-evaluator` | PASS, 1/1 |
| `fixture-counterexamples` | `npm test -- --grep @claim:fixture-counterexamples` | PASS, 1/1 |
| `deterministic-trace` | `npm test -- --grep @claim:deterministic-trace` | PASS, 1/1 |
| `no-arbitrary-pytorch` | `npm test -- --grep @claim:no-arbitrary-pytorch` | PASS, 1/1 |
| `estimated-drill-duration` | `npm test -- --grep @claim:estimated-drill-duration` | PASS, 1/1 |
| `real-workbench` | `npm test -- --grep @claim:real-workbench` | PASS, 1/1 |
| `free-access` | `npm test -- --grep @claim:free-access` | PASS, 1/1 |
| `no-chat-required` | `npm test -- --grep @claim:no-chat-required` | PASS, 1/1 |
| `scope-limits` | `npm test -- --grep @claim:scope-limits` | PASS, 1/1 |

Landing, workbench, privacy, terms, demo documentation, and README claims map
to the manifest. No contradictory or materially unlisted product claim was
found.

## End-to-end product exercise

A fresh live browser context exercised the smallest useful workflow and
recovery paths:

- Opened the sample in one click and saw 30 enabled drills.
- Submitted invalid text and received **Not yet** without a page error.
- Submitted a programmatically forced 100,001-character boundary value and
  received **Code is too long to save**; the Run control remained enabled.
- Replaced it with `tuple(x.size())`; the fixed 8 × 3 fixture passed at seed 11.
- Exported JSON and verified format/version/mode, drill id, seed, passed state,
  source, and exactly seven trace points.
- Replayed the exported run and received the same passed result at seed 11.
- Reset demo and verified `demo:seeded-ml-runs` was removed while a sentinel in
  `real:seeded-ml-runs` was untouched.
- The local claim suite separately proved **Start for real** discards demo data
  and writes only the real namespace.

The previous blocker received an independent live regression check. Drill 25
now displays **Two fixed loss values**, asks **Subtract train loss from
validation loss**, expects `gap = 0.31`, accepts `val_loss - train_loss`, and
rejects `train_loss - val_loss`.

Evidence: `.factory/verification-6-evidence/drill-25-live.png`.

## Clean-checkout quality gates

| Gate | Result |
| --- | --- |
| `npm ci` | PASS; 397 packages installed from lockfile |
| `npm run lint` | PASS; strict `tsc --noEmit` |
| `npm test -- --reporter=dot` | PASS; 33/33 |
| `npm run build` | PASS; `dist/` produced |
| `npm audit --omit=dev` | PASS; zero production vulnerabilities |
| `npm audit` | Non-shipping tooling only: three high and one low advisory below `@azure/static-web-apps-cli` |

The full suite covers the independent 30-drill specification, invalid and
changed fixtures, deterministic trace/export/replay, local storage isolation,
storage failure recovery, offline/stale-cache behavior, 404 routing, metadata,
touch targets, keyboard behavior, CSP, and desktop/mobile axe scans.

## Live deployment identity

`origin/main` and the checked-out commit both resolved to the full candidate
SHA. The live footer reports build `b16bac95af89`. Fresh SHA-256 comparisons
matched every runtime-critical file:

| File | SHA-256 result |
| --- | --- |
| `index.html` | MATCH — `e691165c12825c924b17a9f315ad7ee6f24b75bc24e8561c375b01bd6c94caf5` |
| Main JS | MATCH — `fd61aea33c94a2893d50b956432509b7be9692d5d8e5b75281d7197d47c01c9a` |
| CSS | MATCH — `38b950a814c954c41ee182309b63f2233c40c049b9e1ac47ca34a44a0b99e20f` |
| Checker worker | MATCH — `6daeb5edeecd69d42622f2de246e9bb352fdbf0a151761f9314f2dba78238f70` |
| Hero WebP | MATCH — `3a009f73bcadb6adc0f7cc652af154d88e26a3ba1e63d14787647a65ba7b97e3` |
| Service worker | MATCH — `a517e800d36950dcdb81dd4fd975e462109cf22edae023d20b40858195964824` |

## Privacy, requests, headers, and caching

The independent live demo flow logged six requests: `/demo`, main JS, CSS, and
three checker-worker loads for the three submitted checks. Every request was a
same-origin GET. There were no POSTs, analytics, remote fonts, third-party
scripts, model/API calls, code uploads, console errors, or page errors.

Browser and direct response inspection found:

- HSTS with subdomains/preload, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, CSP restricted to self
  with `frame-ancestors 'none'`, and `X-Frame-Options: DENY`.
- HTML and `sw.js`: `public, must-revalidate, max-age=30`.
- Hashed JS/CSS/worker: one year and `immutable`.
- Mutable hero artwork: one day and not immutable.
- Conditional requests for HTML and hashed JS returned 304.
- `/`, `/demo`, `/lab`, `/privacy`, and `/terms` returned 200. The styled
  unknown route returned 404. All ordinary links returned 200.

This static product has no server-side endpoint, unlock call, payment,
account, or sign-in. API allowance/429, backend concurrency, server
persistence, health/build endpoint, package-consumer, and Entra authority
checks are therefore not applicable.

## Accessibility, keyboard, mobile, and motion

- The supplied `/opt/fleet/lib/verify-url.sh` passed `/`, `/demo`, `/lab`,
  `/privacy`, and `/terms`, at desktop and 390 px, with no console errors, one
  h1, `lang=en`, a main landmark, and complete alt text.
- Playwright Axe found zero serious/critical findings on those five routes and
  the real 404 at both 1440 × 900 and 390 × 844.
- The skip link is first in the Tab order, has a 4 px visible focus ring, and
  activation moves focus to the landing h1. Tab/Enter opens the demo.
- Fifty successive Tab moves traversed at least 40 unique controls, including
  the filter, all drill choices, editor, and Run button, without a trap.
- Client-side route changes and browser Back/Forward move focus to the restored
  route h1.
- Every visible demo link, button, and select measured at least 44 × 44 CSS px.
- There was no horizontal overflow at 390 px or at the 640 px 200%-reflow
  equivalent. The run control remained available.
- Under `prefers-reduced-motion: reduce`, no element retained a nonzero
  animation or transition duration.

The independent live suite is retained as
`.factory/live-qa-6.spec.ts`; `npx playwright test
--config=.factory/live-qa-6.config.ts` passed 8/8. Screenshots and URL-smoke
reports are in `.factory/verification-6-evidence/`.

## Offline/PWA behavior

The live service worker was active and controlling. `registration.update()`
left no waiting or installing worker. Cache `seeded-ml-drills-v5` was present.
After a connected `/demo` visit, an offline reload returned 200, showed the
workbench, and changed the status text to **Offline**. The local regression
suite also proves that an online navigation replaces a deliberately stale
cached demo document before the next offline reload.

## Performance and budgets

Fresh production sizes:

| Asset | Raw | Gzip |
| --- | ---: | ---: |
| Initial main JS | 24,547 B | 9,477 B |
| Checker worker, loaded on check | 11,756 B | 4,474 B |
| CSS | 10,237 B | 3,139 B |
| Hero WebP | 157,900 B | 157,966 B |

There are no font files. All static budgets pass. Lighthouse 13.4.1 mobile on
the live root scored **Performance 98, Accessibility 100, Best Practices 100,
SEO 100**: FCP 1.124 s, LCP 1.758 s, TBT 147 ms, CLS 0, and 172,104 B total
transfer. Under 4× CPU throttling, the representative drill-selection Event
Timing maximum was 176 ms, under the 200 ms interaction budget.

Lighthouse evidence:
`.factory/verification-6-evidence/lighthouse-live.json`.

## Defects by severity

| Severity | Count | Finding |
| --- | ---: | --- |
| Critical | 0 | None |
| High | 0 | None |
| Medium | 0 | None |
| Low | 1 | Development-only SWA emulator dependency tree has four audit advisories (npm rates three high and one low). The deployed static product has no production dependencies or runtime advisory. |

## Final acceptance

**PASS — candidate `b16bac95af89885be9f9f62e7f47b7ec6ef4902c` is accepted at the tested live URL.**
