# Independent product verification 5 — FAIL

**Candidate:** `a6958b33c35a158d8959129e18e0a3c255a2a535`  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Verified:** 2026-08-29 UTC  
**Role:** independent verifier; no product code changed

## Verdict

**FAIL.** The live deployment is healthy, matches the candidate byte-for-byte,
and passes the automated quality gates. However, one advertised drill rejects
the answer specified by its own task and accepts the opposite subtraction.
That falsifies the registered claim that every drill checks its stated
operation and breaks the brief's core immediate-check workflow.

## Mandatory first-read and demo gate

**PASS.** A cold live visit answers all three questions in the first viewport:

- What it does: **“Practice reproducible ML models.”**
- For whom: **“For self-taught learners who need one small model task and a
  check now.”**
- What to click: **“Try it with sample data”**, followed by “Opens a seeded
  drill and local run record.”

The action is visible at desktop and 390 × 844, works with Enter, and opens
`/demo` in one click. The resulting screen is already a populated 30-drill
workbench and has the persistent banner **“Demo — sample data, nothing is
saved”**, plus **Reset demo** and **Start for real**.

Evidence:

- `verification-evidence/live-cold-desktop.png`
- `verification-evidence/live-cold-mobile.png`
- `verification-evidence/live-demo-desktop.png`
- `verification-evidence/live-demo-mobile.png`

## Claims gate

`.factory/claims.json` exists. After the clean lockfile install, every listed
command was invoked exactly and independently against the repository's Static
Web Apps demo entry point. All 15 commands exited 0 and each selected one test.

| Claim | Exact command | Result |
| --- | --- | --- |
| `local-browser-runs` | `npm test -- --grep @claim:local-browser-runs` | PASS |
| `export-record` | `npm test -- --grep @claim:export-record` | PASS |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | PASS |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `thirty-open-drills` | `npm test -- --grep @claim:thirty-open-drills` | PASS |
| `catalog-evaluator` | `npm test -- --grep @claim:catalog-evaluator` | PASS mechanically; claim falsified live below |
| `fixture-evaluator` | `npm test -- --grep @claim:fixture-evaluator` | PASS |
| `fixture-counterexamples` | `npm test -- --grep @claim:fixture-counterexamples` | PASS |
| `deterministic-trace` | `npm test -- --grep @claim:deterministic-trace` | PASS |
| `no-arbitrary-pytorch` | `npm test -- --grep @claim:no-arbitrary-pytorch` | PASS |
| `estimated-drill-duration` | `npm test -- --grep @claim:estimated-drill-duration` | PASS |
| `real-workbench` | `npm test -- --grep @claim:real-workbench` | PASS |
| `free-access` | `npm test -- --grep @claim:free-access` | PASS |
| `no-chat-required` | `npm test -- --grep @claim:no-chat-required` | PASS |
| `scope-limits` | `npm test -- --grep @claim:scope-limits` | PASS |

The manifest has exactly one `@claim:<id>` occurrence per entry. Landing and
README promises otherwise map to the registered claims. The catalog evaluator
test is self-referential: it submits `drillContracts[drill.id].answers[0]`, so
it cannot catch disagreement between the visitor-facing task and the contract.

## Release-blocking functional evidence

### High — drill 25 asks for one subtraction and accepts the reverse

In a fresh live `/demo` context, select **Spot an overfitting gap**. The page
shows:

- fixture: `train_loss = 0.21`, `val_loss = 0.52`
- task: **“Subtract validation loss from train loss.”**
- expected: `gap = 0.31`

Following that grammar gives `train_loss - val_loss` (`0.21 - 0.52 = -0.31`).
The live checker returns:

> Not yet. Use a valid answer line that produces gap = 0.31, then run checks
> again. (answer does not perform this drill’s operation)

Submitting the opposite expression, `val_loss - train_loss`, returns:

> Passed. Saved a replayable record with seed 113.

The contradiction is also direct in the candidate:

- `src/drills.ts:36` says “Subtract validation loss from train loss.”
- `src/drill-contracts.ts:40` only accepts `val_loss - train_loss`.
- `tests/app.spec.ts:81` reads the accepted answer from that same contract.

Evidence: `verification-evidence/live-overfit-wording-rejected.png`.

This is release-blocking because the brief promises 30 deterministic drills
with immediate checks, and the `catalog-evaluator` claim says each drill checks
its stated operation. A learner who follows this stated operation is marked
wrong.

## Other end-to-end evidence

A separate fresh live demo flow covered normal, invalid, boundary, and recovery
paths:

- Unsupported syntax was rejected without executing it.
- A 100,001-character answer returned “Code is too long to save,” and the Run
  control remained enabled.
- Replacing it with `tuple(x.size())` passed and saved seed 11.
- Exported JSON had mode `demo`, a passed `tensor-shapes` run, seed 11, and
  seven trace points.
- Replay returned “passed with seed 11.”
- Reset removed `demo:seeded-ml-runs`; `real:seeded-ml-runs` stayed absent.
- The local `real-workbench` claim separately proved Start for real clears the
  demo namespace and writes only the real namespace.

The complete local catalog test accepted its contract answer and rejected its
specified shortcut for all 30 drills. That confirms the repaired evaluator
machinery, but does not cure the drill-25 copy/contract contradiction.

## Local quality gates

Run from the clean candidate checkout:

| Gate | Result |
| --- | --- |
| `npm ci` | PASS; 397 packages installed |
| `npm run lint` | PASS; `tsc --noEmit` |
| `npm test -- --reporter=dot` | PASS; 32/32 |
| `npm run build` | PASS; `dist/` produced |
| `npm audit --omit=dev` | PASS; 0 production vulnerabilities |

Full `npm audit` reports four development-only advisories (three high, one
low) below `@azure/static-web-apps-cli`; none is shipped in the static runtime.

Fresh production artifact sizes:

| Asset | Raw | Gzip |
| --- | ---: | ---: |
| Main JS | 24,539 B | 9,472 B |
| Checker worker | 11,756 B | 4,474 B |
| CSS | 10,237 B | 3,139 B |
| Hero WebP | 157,900 B | 157,966 B |

There are no font files. The initial landing does not request the checker
worker. All static budgets are met.

## Live identity, privacy, headers, and caching

The live footer reports build `a6958b33c35a`. Fresh local and live SHA-256
hashes matched for `index.html`, main JS, CSS, checker worker, hero WebP, and
`sw.js`. `origin/main` also resolved to the full candidate during verification.

The live landing/demo/run/export/replay/reset flow made only same-origin GETs.
There were no analytics, remote fonts, third-party scripts, POSTs, code
uploads, console errors, or page errors.

Live responses provide HSTS, `nosniff`, `strict-origin-when-cross-origin`, CSP
with `frame-ancestors 'none'`, and `X-Frame-Options: DENY`. HTML and the service
worker revalidate after 30 seconds; hashed JS/CSS are immutable for one year;
the mutable hero caches for one day. `/`, `/demo`, `/lab`, `/privacy`, and
`/terms` return 200. The styled unknown route returns 404. All ordinary links
resolve successfully.

This static product has no backend endpoint, product-unlock request, account,
payment flow, or sign-in. API allowance/429, concurrency, persistence-server,
health/build endpoint, package-consumer, and Entra authority checks do not
apply.

## Accessibility, mobile, motion, and offline

- `/opt/fleet/lib/verify-url.sh` passed the live `/`, `/demo`, and `/lab` with
  HTTP 200, no console errors, one h1, `lang=en`, a main landmark, and complete
  image alt text.
- Axe found zero serious/critical findings on `/`, `/demo`, `/lab`, `/privacy`,
  `/terms`, and the 404 at both 1440 × 900 and 390 × 844.
- Every audited route has `lang=en`, one h1, one main landmark, route-specific
  title, and no image missing `alt`.
- At 390 px, `scrollWidth === clientWidth === 390`. Every visible link, button,
  and select in the demo measured at least 44 × 44 CSS px.
- Tab reached 43 unique workbench controls without a trap. Focus used a visible
  4 px ring. Enter activated the demo link. The skip link moved focus to the
  h1, and route navigation moved focus to the new h1.
- At a 640 px layout width (the 200% desktop-reflow equivalent), the demo had
  no horizontal overflow and retained the run control.
- With `prefers-reduced-motion: reduce`, no nonzero animation or transition
  duration remained.
- Service worker `seeded-ml-drills-v4` was active and controlling, with no
  waiting or installing worker after `registration.update()`. `/demo` reloaded
  offline with status 200 and the workbench visible.

Lighthouse mobile against the candidate live URL: Performance 90,
Accessibility 100, Best Practices 100, SEO 100; FCP 0.865 s, LCP 1.751 s,
TBT 411 ms, CLS 0, transfer 172,358 B.

## Non-blocking findings

### Low — browser Back does not restore focus

Keyboard navigation from the landing Privacy link correctly focuses the
Privacy h1. Using browser Back returns to `/`, but `document.activeElement` is
`body`, not the prior link or landing h1. Tab starts again at the skip link, so
the page remains usable, but this misses the routing contract's focus-restoring
detail.

### Informational — development audit advisories

The shipped static product has zero production dependencies and zero runtime
advisories. The local Static Web Apps emulator dependency carries the four
development-only advisories noted above.

## Required repair

Make drill 25's task, expected result, contract, and regression agree. The
smallest correct repair is to say **“Subtract train loss from validation loss”**
if `+0.31` and `val_loss - train_loss` are intended. Also replace the claimed
“6 epoch trace” dataset label or supply that trace. Add a test whose expected
instruction text and submitted expression are independently declared rather
than both sourced from `drillContracts`.
