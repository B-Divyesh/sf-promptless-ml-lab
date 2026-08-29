# Independent product verification 12 — PASS

**Candidate:** `9270a26f9b22fd45cfad503a218108d273120b74`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verified:** 2026-08-29 UTC
**Result:** **PASS**

This is a fresh independent verification against the researched brief and factory acceptance contract. It supersedes earlier verification reports. No product code was modified.

## Mandatory first-read gate — PASS

A fresh live Chromium profile at 1440 × 900 showed, without interaction:

- What: “Practice PyTorch operations in fixed drills.”
- Who: “For self-taught ML learners who want one short drill with a browser check.”
- First action: **Try it with sample data**, with the adjacent explanation “Opens a tensor-shape drill with fixed sample inputs.”

The action is visible in the first viewport and opens `/demo` in one click. It immediately presents the seed-11 Read tensor shapes exercise, 8 × 3 input, expected `(8, 3)` result, starter editor, persistent “Demo — sample data, nothing is saved” banner, **Reset demo**, and **Open your real workbench**. The first-read and one-click requirement therefore passes. Screenshot: `verification-12-evidence/live-cold-desktop.png`.

## Clean checkout and mandatory claims — PASS

The checkout began at exactly the candidate SHA with no tracked changes.

| Gate | Evidence | Result |
| --- | --- | --- |
| Install | `npm ci`; 25 packages audited | PASS — 0 vulnerabilities |
| Claims manifest | `.factory/claims.json` lists 23 unique ids | PASS |
| Every claim test | `npx playwright test --grep '@claim:'` | PASS — 23/23 |
| Full browser suite | `npm test` | PASS — 48/48 |
| Types/lint | `npm run lint` | PASS |
| Production build | `npm run build` | PASS — `dist/` produced |
| Dependency audit | `npm audit --audit-level=high` | PASS — 0 vulnerabilities |

The 23 claim tests use the demo entry point and cover local-only runs, export, import validation/preview/duplicates, namespace isolation, replay, reset, one-click sample, no third-party runtime, build/config, offline reload, 30 open drills, all catalog contracts, fixed fixtures and counterexamples, deterministic traces, unsupported-code rejection, real workbench, free access, no chat, scope limits, no upload, and five-drill practice progress.

## End-to-end exercise — PASS

The live independent suite passed 5/5 with `EXPECTED_BUILD_ID=9270a26f9b22 npx playwright test -c .factory/verification-11.config.ts`.

- A correct `x.shape` answer passed and saved a demo record with seed 11, version 1, pass state, source, and seven trace values.
- Comment-only, altered 1 × 1 fixture, arbitrary Python, and bare/incomplete responses returned “Not yet” without execution. A 100,001-character entry returned “Code is too long to save”; restore kept keyboard focus usable.
- Exported JSON contained the expected seed, pass state, and seven trace points; replay checked saved source.
- Malformed and >2 MB import files were rejected; cancel did not mutate state; valid input previewed one record before confirmation; duplicates were rejected; imports stayed in the active demo/real namespace.
- The catalog evaluator accepted each intended operation and rejected each declared shortcut across all 30 drills.

## Privacy, live deployment, and PWA — PASS

The cold page made four requests, all same-origin: document, local JS, local CSS, and local hero image. The complete keyboard/demo flow recorded only same-origin GET requests; a unique entered code marker was absent from all request URLs, headers, and bodies. There were no console errors or page errors.

Live footer build id is `9270a26f9b22`. SHA-256 hashes of the live and locally built `/`, hashed app JS/CSS, checker worker, service worker, and 404 document matched exactly. Direct `/demo`, `/lab`, `/privacy`, and `/terms` requests each returned 200; an unknown direct route returned the styled 404 with HTTP 404.

Security headers were present: HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, `X-Frame-Options: DENY`, and CSP restricted to `'self'`, including `connect-src 'self'` and `frame-ancestors 'none'`. Hashed assets use `max-age=31536000, immutable`; HTML and `sw.js` use 30-second revalidation. A service-worker update left one activated controller with no waiting worker; offline reload then retained the saved demo record and replay function.

This static web app has no server-side product endpoint, sign-in, payment, or product-unlock call. Rate-limit / Retry-After and Entra authority checks are not applicable.

## Accessibility, mobile, and performance — PASS

All public routes and 404 passed zero serious/critical Axe violations at desktop and 390 × 844. The suite confirmed one h1, title, `lang=en`, main, canonical route metadata, image alt coverage, semantic heading order, no horizontal overflow, 44 px controls, keyboard skip/focus, route focus, high-contrast 3 px focus treatment, and reduced-motion (zero active animation or transition durations).

Fresh live Lighthouse (`verification-12-evidence/lighthouse-live.json`) scored 95 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO. LCP was 1.22 s, CLS 0, and transfer size 49.5 KB. Built app JS is 10.88 KB gzip, the worker 4.47 KB gzip, and CSS 3.57 KB gzip—well inside the static-web budgets.

`verify-url.sh` was not present in this checkout. The live Playwright suite performed its required title/lang/main/alt/console checks as part of the wider route and accessibility tests.

## Defects by severity

| Severity | Findings |
| --- | --- |
| Blocker | None |
| Critical | None |
| High | None |
| Medium | None |
| Low | None |

## Evidence

- `verification-12-evidence/live-cold-desktop.png` — cold first screen.
- `verification-12-evidence/lighthouse-live.json` — fresh Lighthouse result.
- `verification-12-evidence/live-mobile-demo.png` — fresh 390 px demo state.
