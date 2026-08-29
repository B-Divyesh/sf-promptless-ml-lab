# Polish round 6 — complete finding map

**Repair implementation:** `173484dceffc2e65f0d9cd46db19f42dc9012c98`  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Status:** PASS — no open finding remains.

All evidence below was gathered against the repair build. The local routes use
the production `dist/` server. The live URLs were opened in fresh Chromium
contexts after the Static Web Apps deployment completed.

| Finding id | Change made | Evidence | Live URL check |
|---|---|---|---|
| F-1-1 | Kept the one-click promise accurate: it opens the seed-11 tensor-shape drill with fixed inputs, not a pre-created run record. | `@claim:one-click-sample`; `@regression:one-click-check`; [`query-demo`](qa-evidence/polish6-live/query-demo/screenshot-mobile.png) | `/?demo=1` shows the banner, Reset, fixed inputs, and editable starter. |
| F-1-2 | Kept the narrowed, provable catalog statement about stated operations and fixed drill data. | `@claim:catalog-evaluator`; [`root`](qa-evidence/polish6-live/root/screenshot-desktop.png) | `/` shows the tested catalog wording. |
| F-1-3 | Kept artwork provenance out of visitor copy; provenance remains in `design.md`. | `@regression:review-copy` | `/` and the styled 404 have no untestable provenance assertion. |
| F-1-4 | Kept the declared same-origin runtime claim and request-log test. | `@claim:no-third-party-runtime`; `@claim:no-code-or-identity-upload` | `/` → `/demo` made only same-origin GET requests. |
| F-1-5 | Kept the README opening split into short, concrete sentences. | `@regression:review-copy`; `@regression:plain-words` | `/` copy is unchanged and the README audit passes. |
| F-1-6 | Kept the useful section name “How the drills work.” | `@regression:review-copy`; [`root`](qa-evidence/polish6-live/root/screenshot-desktop.png) | `/` passes. |
| F-1-7 | Kept the empty hero slogan removed. | `@regression:review-copy` | `/` passes. |
| F-1-8 | Kept result-naming controls “Check my answer” and “Open your real workbench.” | `@claim:real-workbench`; keyboard live suite | `/demo` passes. |
| F-1-9 | Kept “Choose a short ML drill.” | `@regression:review-copy`; [`root`](qa-evidence/polish6-live/root/screenshot-desktop.png) | `/` passes. |
| F-2-1 | Kept the selected seed, dataset, task, result, and editor before the mobile catalog. | `@claim:one-click-sample` viewport assertions; [`demo`](qa-evidence/polish6-live/demo/screenshot-mobile.png) | `/demo` at 390 × 844 passes. |
| F-2-2 | Kept command-only dependency guidance and the pinned browser-test stack. | clean-clone `npm ci`; `@regression:review-copy` | README is served with no remote runtime dependency. |
| F-2-3 | Kept the `build-output` claim and artifact assertions. | `@claim:build-output`; clean-clone `npm run build` | deployed `dist/index.html` and assets load at `/`. |
| F-2-4 | Kept plain deployment wording and direct-link, 404, cache, CSP, and `nosniff` checks. | `@claim:deployment-config`; live verification route suite | `/privacy` is 200; a missing route is the designed HTTP 404. |
| F-2-5 | Kept **drill** as the selectable unit and **task** as its instruction label. | `@regression:review-copy`; `@regression:plain-words` | all public routes pass. |
| F-2-6 | Kept the plain checker explanation about named operations and seven results. | `@claim:fixture-evaluator`; `@claim:deterministic-trace` | `/` passes. |
| F-2-7 | Kept README wording about answer lines and fixed inputs. | `@regression:review-copy`; `@claim:catalog-evaluator` | `/demo` and README pass. |
| F-2-8 | Kept outcome-based offline wording. | `@claim:offline-reload`; live offline/replay suite | `/demo` reloads and replays offline. |
| F-2-9 | Kept the decorative “THE WORKBENCH” label removed. | `@regression:review-copy` | `/` passes. |
| F-2-10 | Kept JSON import validation, count preview, duplicate rejection, active-namespace writes, and replay. | `@claim:import-records`; `@claim:import-namespace`; `@claim:import-replay` | `/demo` and `/lab` pass. |
| F-3-1 | Kept all three first-screen facts fully visible at 390 × 844. | `@regression:first-screen-facts`; [`root mobile`](qa-evidence/polish6-live/root/screenshot-mobile.png) | `/` passes at 390 px. |
| F-4-1 | Kept the privacy claim test that checks entered code markers, all request fields, and account controls. | `@claim:no-code-or-identity-upload` | `/privacy`, `/terms`, and `/demo` pass. |
| F-4-2 | Kept the five-distinct-drill counter with repeat, reload, reset, and isolation checks. | `@claim:five-drill-practice-set` | `/demo` passes. |
| F-4-3 | Kept saved-record offline reload and replay coverage. | `@claim:offline-reload`; live offline/replay suite | `/demo` passes offline. |
| F-4-4 | Kept import-isolation coverage in both demo session storage and real local storage. | `@claim:import-namespace` | `/demo` and `/lab` pass. |
| F-5-1 | Kept accurate first-screen, metadata, README, and catalog wording about fixed PyTorch operations. | `@regression:review-copy`; `@regression:metadata`; [`root`](qa-evidence/polish6-live/root/screenshot-desktop.png) | `/` title is “Seeded ML Drills — Practice PyTorch operations.” |
| F-5-2 | Kept unmeasured duration estimates out of copy and the manifest. | `@regression:review-copy`; clean manifest audit | `/` and `/demo` have no time promise. |
| F-5-3 | Kept unmeasured “immediate” speed language out of visitor copy and metadata. | `@regression:review-copy`; `@regression:plain-words` | `/` passes. |
| F-5-4 | Kept the product-specific read-only seed-11 preview before the catalog. | `@regression:landing-preview`; [`root`](qa-evidence/polish6-live/root/screenshot-desktop.png) | `/` preview links to `/demo`. |
| F-6-1 | Moved demo records to `sessionStorage` and added one central route-boundary cleanup path for Home, Privacy, Back, and real-workbench exits; Reset uses the same remover and clears legacy local demo data. | `@claim:demo-reset`; `F-6-1 live demo records are discarded on Home, Privacy, Back, real-workbench exit, and Reset`; [`empty demo after exit`](qa-evidence/polish6-live/demo-home-exit.png) | `/demo` → `/`, `/privacy`, browser Back, and `/lab` all discard demo records; re-entry is empty. |

## Earlier unnumbered regression boundaries

The earlier reviews also recorded fixture-aware evaluation, real-workbench
routing, oversized-input recovery, rerender focus, service-worker freshness,
CSP-safe trace bars, HTTP 404, 44 px targets, mobile reflow, and drill-25
subtraction semantics. They remain covered by `npm test` and the five-test
live verification suite. The live suite passed 5/5 on this build, including
routes, Axe serious/critical scans, keyboard focus, reduced motion, privacy,
offline replay, headers, caching, and the 404 route.

## Final evidence

- Clean clone `/tmp/promptless-polish6-clean-jFNHHy/repo` at the repair
  implementation: `npm ci`, every one of 23 exact claim commands, `npm test`
  (48/48), `npm run lint`, `npm run build`, and
  `npm audit --audit-level=high` all passed.
- Local route checks: [`verify-url evidence`](qa-evidence/polish6-local/) and
  [`Lighthouse JSON`](qa-evidence/polish6-local/lighthouse.json). Lighthouse:
  100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.5 s,
  TBT 10 ms, CLS 0.
- Production route checks: [`verify-url evidence`](qa-evidence/polish6-live/)
  and [`Lighthouse JSON`](qa-evidence/polish6-live/lighthouse.json).
  Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100
  SEO; LCP 1.1 s, TBT 0 ms, CLS 0, transfer 48 KiB.
