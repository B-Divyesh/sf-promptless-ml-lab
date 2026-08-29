# Independent product verification 7 — PASS

**Candidate:** `31855d1489cbcbf99bf4bbdba9533bc8e751267b`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verified:** 2026-08-29 UTC
**Scope:** Independent clean-checkout and deployed static-web QA; no product code changed.

## Verdict

**PASS.** The candidate satisfies the researched brief: it is a local-first, one-click browser lab for self-taught ML learners to practice short seeded drills and receive immediate, reproducible checks. The live deployment is the candidate build, not a stale or divergent artifact.

## Mandatory cold first read and demo gate

**PASS.** In a fresh live desktop and 390 px context, the first viewport says:

- **What:** “Practice reproducible ML models.”
- **Who:** “For self-taught learners who need one small model task and a check now.”
- **First action:** “Try it with sample data”, with “Opens a seeded drill and local run record.” beside it.

The action is visible and usable in one click. It opens `/demo` with the first seeded drill, all 30 drill controls, and the persistent **“Demo — sample data, nothing is saved.”** banner with **Reset demo** and **Open your real workbench**.

Evidence: `verification-7-evidence/cold-desktop.png`, `cold-mobile.png`, and `cold-desktop.json`.

## Claims gate

`.factory/claims.json` exists and contains 17 claims. After `npm ci`, every listed command was invoked separately against the shipped demo entry point. Each passed and each tag occurs exactly once in `tests/app.spec.ts`.

| Claim id | Result |
| --- | --- |
| `local-browser-runs` | PASS — 1 selected test |
| `export-record` | PASS — 1 selected test |
| `demo-reset` | PASS — 1 selected test |
| `one-click-sample` | PASS — 1 selected test |
| `no-third-party-runtime` | PASS — 1 selected test |
| `offline-reload` | PASS — 1 selected test |
| `thirty-open-drills` | PASS — 1 selected test |
| `catalog-evaluator` | PASS — 1 selected test; all 30 intended operations accepted and shortcuts rejected |
| `fixture-evaluator` | PASS — 1 selected test |
| `fixture-counterexamples` | PASS — 1 selected test |
| `deterministic-trace` | PASS — 1 selected test |
| `no-arbitrary-pytorch` | PASS — 1 selected test |
| `estimated-drill-duration` | PASS — 1 selected test |
| `real-workbench` | PASS — 1 selected test |
| `free-access` | PASS — 1 selected test |
| `no-chat-required` | PASS — 1 selected test |
| `scope-limits` | PASS — 1 selected test |

No contradictory or unlisted visitor-facing claim was found on the landing, workbench, privacy, terms, or README pages.

## Clean-checkout quality gates

| Command | Result |
| --- | --- |
| `npm ci` | PASS — lockfile install completed; npm reported four development-tooling advisories |
| `npm run lint` | PASS — `tsc --noEmit` |
| `npm run build` | PASS — `dist/` produced |
| `npm test` | PASS — 37 Playwright tests |
| `npm audit --omit=dev` | PASS — 0 production vulnerabilities |

Fresh production output: initial main JS is 25.79 kB raw / **9.79 kB gzip**; CSS is 10.13 kB raw / 3.11 kB gzip; the checker worker is 11.76 kB raw. The initial JS budget is met with ample margin.

## Independent end-to-end exercise

In a fresh live browser context I activated the landing sample action, confirmed 30 drills, submitted an unsupported `raise RuntimeError(...)` line (received **Not yet … (statement unsupported)**), and then passed the documented `x.shape` line against the 8 × 3 fixture at seed 11.

The downloaded `seeded-ml-drills-demo-records.json` has format `seeded-ml-drills/run-records`, version 1, demo mode, the tensor-shapes record at seed 11, pass state, and seven trace values. A forced 100,001-character boundary returned the actionable “Code is too long to save” error with the check button enabled. Reset removed only `demo:seeded-ml-runs` while preserving a real-key sentinel. Opening the real workbench then passed the drill and wrote only the real namespace.

Evidence: `verification-7-evidence/live-e2e-correct.json` and `e2e-real-pass.png`.

## Deployment identity, privacy, headers, and cache

The live footer reports build `31855d1489cb`. Fresh SHA-256 comparisons of candidate build and deployed files all matched:

| File | SHA-256 |
| --- | --- |
| `index.html` | `0cc632a6d483c4fc354f04a2b006d21d80f5158d81146a8478bd953c620165a0` |
| Main JS | `71571845362b3fe4d4baee2411e190558bf219b77a5c742135cb4e8e959bffd5` |
| CSS | `b737528e798348b3214fdfe9aa82bc261d39036b7a641de1d654a7d7eeab5b1d` |
| Checker worker | `6daeb5edeecd69d42622f2de246e9bb352fdbf0a151761f9314f2dba78238f70` |
| Service worker | `a517e800d36950dcdb81dd4fd975e462109cf22edae023d20b40858195964824` |
| Hero WebP | `3a009f73bcadb6adc0f7cc652af154d88e26a3ba1e63d14787647a65ba7b97e3` |

The complete live exercise logged only same-origin GET requests: document, same-origin JS/CSS/image, and checker worker. There were no POSTs, analytics, remote fonts, third-party scripts, API/model calls, page errors, or console errors.

`/`, `/demo`, `/lab`, `/privacy`, and `/terms` return 200; the styled unknown route returns 404. Live responses include HSTS, `nosniff`, strict-origin referrer policy, `X-Frame-Options: DENY`, and a self-only CSP with `frame-ancestors 'none'`. HTML and service worker cache for 30 seconds; hashed JS/CSS/worker cache for one year immutable; mutable hero artwork caches for one day. Conditional requests for HTML and JS returned 304. All public destination links return 200; the sole 404-page self skip fragment naturally retains that page's 404 status and is not a broken destination.

This static local-first product has no server-side API, unlock endpoint, authentication, payment, or backend. Rate-limit/429, concurrency, persistence-boundary, package-consumer, and Entra tenant checks do not apply.

## Accessibility, keyboard, mobile, and PWA

- `/opt/fleet/lib/verify-url.sh` passed live `/`, `/demo`, `/lab`, `/privacy`, and `/terms`: title, `lang=en`, one h1, main landmark, image alt coverage, and no console errors.
- Fresh Playwright axe scans found **zero serious or critical violations** on those routes and the real 404 at 1440 × 900 and 390 × 844.
- Every scanned route has exactly one h1 and one main; 390 px pages have no horizontal overflow.
- The first Tab stop is the skip link with a visible 4 px `#143e99` focus outline. Keyboard route navigation moves focus to the destination h1.
- Under `prefers-reduced-motion: reduce`, no inspected element retained a nonzero animation or transition duration.
- A live service worker controls the page, has no waiting/installing update, uses `seeded-ml-drills-v5`, and `/demo` successfully reloads offline with the workbench and offline status visible.

Evidence: `verification-7-evidence/live-platform.json`, `url-root/verify.json`, `url-demo/verify.json`, `url-lab/verify.json`, `url-privacy/verify.json`, `url-terms/verify.json`, and `link-crawl.json`.

## Defects by severity

| Severity | Count | Finding |
| --- | ---: | --- |
| Critical | 0 | None |
| High | 0 | None |
| Medium | 0 | None |
| Low | 1 | `npm ci` reports four advisories in development-only local tooling; `npm audit --omit=dev` reports zero production vulnerabilities. |

## Final acceptance

**PASS — candidate `31855d1489cbcbf99bf4bbdba9533bc8e751267b` is accepted at https://promptless-ml-lab.sociobot.in.**
