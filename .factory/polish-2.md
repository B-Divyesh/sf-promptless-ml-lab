# Polish round 2 — cumulative adversarial review closure

**Review base:** `c04f71e4afebf2dce2df70cc323066d2f7988eaa`  
**Released candidate named by work order:** `31855d1489cbcbf99bf4bbdba9533bc8e751267b`  
**Repair commit:** `74e0fd0def968336e69180594007dd8e608a5d5a`  
**Live release:** https://promptless-ml-lab.sociobot.in  
**Deployment:** `accd111e-c05e-4830-ba64-89ea036392b6`  
**Result:** PASS — every F-1-* and F-2-* finding is closed.

## Finding map

| Finding | Change made | Evidence | Live check |
|---|---|---|---|
| F-1-1 | Retained the one-click isolated sample route and strengthened it with a 390×844 viewport check. | `@claim:one-click-sample`; `.factory/qa-evidence/polish2-local-demo/screenshot-mobile.png` | Live test `cold first screen and isolated mobile demo close F-1 and F-2-1`; `.factory/qa-evidence/polish2-live-demo-first-screen.png`; `/` → `/demo` passed. |
| F-1-2 | Kept the narrowed, tested catalog statement and changed “exercise data” to “drill data.” | `@claim:catalog-evaluator`; `@regression:review-copy` | Cold landing copy and all 30 evaluator paths passed. |
| F-1-3 | Kept the untestable artwork-provenance sentence out of visitor copy. Provenance remains in `.factory/design.md`. | `@regression:review-copy` | Live landing crawl confirmed the retired sentence is absent. |
| F-1-4 | Kept the runtime-resource claim declared and tested. | `@claim:no-third-party-runtime` | Cold live landing-to-demo request log contained only the product origin. |
| F-1-5 | Kept the README opening split and standardized it to “short PyTorch drill.” | `@regression:review-copy`; `.factory/copy-audit.md` | README audit found no sentence above 22 words. |
| F-1-6 | Kept “How the drills work.” | `@regression:review-copy` | Live landing copy check passed. |
| F-1-7 | Kept the empty hero slogan removed. | `@regression:review-copy` | Live landing copy check passed. |
| F-1-8 | Kept “Check my answer” and “Open your real workbench.” | `@regression:review-copy`; `@claim:real-workbench` | Live query-demo test opened `/lab` and retained the storage boundary. |
| F-1-9 | Kept “Choose a short ML drill.” | `@regression:review-copy` | Live landing copy check passed. |
| F-2-1 | Moved the selected drill before the catalog on mobile and compacted the intro, status, drill facts, and editor. | `@claim:one-click-sample` now asserts the heading, dataset, expected result, and editor intersect 390×844; `.factory/qa-evidence/polish2-local-demo/screenshot-mobile.png` | `.factory/qa-evidence/polish2-live-demo-first-screen.png` shows seed 11, dataset, result, task, and editable starter without scrolling. |
| F-2-2 | Replaced the emulator-result sentence with the command-only instruction “Install dependencies with npm ci.” Removed the vulnerable emulator dependency and used a local test server. | `@regression:review-copy`; `npm ci`; `npm audit` reports zero vulnerabilities. | No runtime effect; live route checks passed. |
| F-2-3 | Added the `build-output` claim and a tagged artifact test. | `@claim:build-output` asserts `dist/index.html`, JavaScript, service worker, 404, and built config. | Deployed artifact serves the stamped `74e0fd0def96` build. |
| F-2-4 | Rewrote the config sentence in plain words and added the `deployment-config` claim. | `@claim:deployment-config` inspects direct-link routes, 404 override, cache rule, CSP, and `nosniff`. | `/privacy` returned 200; an unknown route returned 404; live CSP and cache headers passed. |
| F-2-5 | Standardized the selectable unit to “drill” across landing, README, metadata, legal copy, demo docs, and 404 copy. “Task” remains only as the instruction label inside a drill. | `@regression:review-copy`; `@regression:plain-words`; `.factory/copy-audit.md` | Live copy scan passed on every public route. |
| F-2-6 | Replaced evaluator jargon with “The checker accepts the PyTorch operation named in each drill. It reruns the same seven results from the same inputs.” | `@regression:review-copy`; `@claim:fixture-evaluator`; `@claim:deterministic-trace` | Live landing copy check passed. |
| F-2-7 | Rewrote the README evaluator description using “answer line,” “fixed inputs,” and “tests cover this behavior.” | `@regression:review-copy`; all 30 paths in `@claim:catalog-evaluator` | Clean-clone copy and evaluator tests passed. |
| F-2-8 | Replaced “application shell” with “files needed to reopen `/demo` offline” in README, demo docs, and privacy copy. | `@regression:review-copy`; `@claim:offline-reload`; `@regression:sw-navigation` | Cold live demo reloaded while the browser context was offline. |
| F-2-9 | Removed “THE WORKBENCH” from the landing page. | `@regression:review-copy` rejects the retired label. | Live landing copy check passed. |
| F-2-10 | Added local JSON import with schema/version validation, 2 MB and 100-record limits, count preview, explicit confirmation, duplicate rejection, active-namespace writes, clear errors, and replay. | `@claim:import-records`; `@claim:import-namespace`; `@claim:import-replay`; `.factory/qa-evidence/polish2-live-import.png` | Live `/?demo=1` imported one record only to `demo:`, preserved a `real:` sentinel, replayed successfully, reset demo, and opened `/lab`. |

## Verification evidence

- Clean clone: `/tmp/promptless-polish2-Mh26uu/repo` at `74e0fd0def968336e69180594007dd8e608a5d5a`.
- Every command in `.factory/claims.json` ran separately: 22/22 passed, each selecting exactly one tagged test.
- Full clean-clone browser suite: 43/43 passed. It includes desktop/mobile axe scans, keyboard and focus checks, privacy request logs, offline reload, 404 status, CSP, metadata, and all earlier regression boundaries.
- `npm run lint`, `npm run build`, and `npm audit`: passed; zero vulnerabilities. Build output: 10.68 kB initial JavaScript gzip and 3.34 kB CSS gzip.
- Local URL verifier: `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and `/terms` passed with zero console errors. Evidence is under `.factory/qa-evidence/polish2-local-*`.
- Live URL verifier: the same six entries passed with exact titles, `lang=en`, one h1, one main, alt text, labels, and zero console errors. Evidence is under `.factory/qa-evidence/polish2-live-*`.
- Live Playwright acceptance: 4/4 passed in `.factory/live-polish-2.spec.ts`, including mobile first viewport, import, isolation, replay, reset, real exit, focus, metadata, 404, response policy, and axe.
- Local Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 2.1 s, TBT 10 ms, CLS 0, transfer 198 KiB. Report: `.factory/qa-evidence/polish2-local-lighthouse.json`.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.7 s, TBT 0 ms, CLS 0, transfer 170 KiB. Report: `.factory/qa-evidence/polish2-live-lighthouse.json`.

No finding remains open.
