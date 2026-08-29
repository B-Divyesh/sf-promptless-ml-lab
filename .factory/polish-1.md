# Polish round 1 — adversarial review closure

**Reviewed report:** `.factory/review-1.md` at commit `4cf198e52c198ed239c27b8a631fffc438c10558`  
**Repaired candidate:** `b16bac95af89885be9f9f62e7f47b7ec6ef4902c`  
**Live release:** https://promptless-ml-lab.sociobot.in  
**Result:** PASS — every F-1-* finding is closed.

No earlier `.factory/review-*.md` or `.factory/polish-*.md` file existed. The earlier verification defects summarized by review 1 were also rerun and remain fixed.

## Finding map

| Finding | Change made | Test evidence | Screenshot | Cold live check |
|---|---|---|---|---|
| F-1-1 | Added the `one-click-sample` claim and a clean-state test. It clicks the landing action, checks `/demo`, the persistent banner, tensor-shape sample, demo-key write, and untouched real-key sentinel. | `@claim:one-click-sample landing opens a populated isolated demo`; live test `review copy and one-click sample are correct on the live release` | `.factory/qa-evidence/polish1-live-demo/screenshot-mobile.png` | `/` → `/demo`, PASS |
| F-1-2 | Replaced the broader fixture-composition sentence with the already proved contract: “Each drill checks its stated operation against fixed exercise data.” | `@claim:catalog-evaluator every drill accepts its intended operation and rejects an unrelated shortcut`; `@regression:review-copy` | `.factory/qa-evidence/polish1-live/screenshot-desktop.png` | `/`, PASS |
| F-1-3 | Removed the untestable artwork-provenance sentence from the SPA and static 404 footers. Provenance remains in `.factory/design.md`. | `@regression:review-copy`; live test `review copy and one-click sample are correct on the live release` asserts the sentence is absent | `.factory/qa-evidence/polish1-live/screenshot-mobile.png` | `/` and missing route, PASS |
| F-1-4 | Added `no-third-party-runtime` to the claim manifest. Its test records the complete landing-to-demo request stream and checks that scripts, styles, fonts, and every other request are same-origin. | `@claim:no-third-party-runtime landing and demo load only same-origin resources`; live one-click test repeats the request assertion | `.factory/qa-evidence/polish1-live-demo/screenshot-desktop.png` | `/` → `/demo`, PASS |
| F-1-5 | Split the 23-word README sentence into two short sentences using the review's requested wording. | `@regression:review-copy required copy and catalog wording stay plain`; `.factory/copy-audit.md` | `.factory/qa-evidence/polish1-live/screenshot-desktop.png` | Source and README check, PASS |
| F-1-6 | Renamed “Build the habit in three steps.” to “How the drills work”. | `@regression:review-copy`; live review-copy test | `.factory/qa-evidence/polish1-live/screenshot-desktop.png` | `/`, PASS |
| F-1-7 | Removed the non-informative “One small trace at a time.” caption. | `@regression:review-copy`; live review-copy test | `.factory/qa-evidence/polish1-live/screenshot-mobile.png` | `/`, PASS |
| F-1-8 | Renamed “Run hidden checks” to “Check my answer” and “Start for real” to “Open your real workbench” in UI, tests, docs, and claim copy. | `@regression:review-copy`; `@claim:real-workbench`; live one-click and historic-boundary tests | `.factory/qa-evidence/polish1-live-demo/screenshot-mobile.png` | `/demo` and `/?demo=1`, PASS |
| F-1-9 | Renamed “Choose a concept-sized drill.” to “Choose a short ML drill.” | `@regression:review-copy`; live review-copy test | `.factory/qa-evidence/polish1-live/screenshot-desktop.png` | `/`, PASS |

## Required platform checks

- The direct `/?demo=1` entry shows the same isolated banner, sample, reset action, and real-workbench exit as `/demo`. Evidence: `.factory/qa-evidence/polish1-live-query/screenshot-mobile.png` and live test `query demo, real exit, and historic failure boundaries work live`.
- `/`, `/demo`, `/lab`, `/privacy`, and `/terms` return 200 with exact titles, descriptions, canonical URLs, one h1, one main, and working legal links. A missing route returns the designed 404 with HTTP 404. Evidence: live test `live routes have exact metadata, legal links, focus, status, and accessibility`.
- Client navigation and browser history focus the new h1 and update a polite route announcement. Evidence: `@regression:route-focus` and the live route test.
- At 390 px, the first action is above the fold, all routes avoid horizontal overflow, visible demo controls are at least 44 px, and reduced motion removes animation. Evidence: `@regression:mobile-overflow` and live test `live mobile first screen and workbench fit at 390px with 44px targets`.
- The desktop headline was widened after visual review so “reproducible” never breaks mid-word. Evidence: `.factory/qa-evidence/polish1-live/screenshot-desktop.png`.

## Earlier regression check

| Earlier defect summarized in review 1 | Evidence retained |
|---|---|
| Fixture-blind checker | `@claim:catalog-evaluator`, `@claim:fixture-evaluator`, `@claim:fixture-counterexamples` |
| Unreachable real workbench | `@claim:real-workbench` and live historic-boundary test |
| Oversized input disabled checking | `@regression:storage-errors` and live historic-boundary test |
| Rerender lost keyboard focus | `@regression:focus`, `@regression:route-focus` |
| Stale offline demo HTML | `@regression:sw-navigation`, `@claim:offline-reload`, live offline reload |
| CSP blocked trace bars | `@regression:csp-trace`, live response-policy test |
| Styled 404 returned 200 | `@regression:real-404`, live missing-route check |
| Undersized targets or 390 px overflow | `@regression:touch-targets`, `@regression:mobile-overflow`, live mobile test |
| Drill 25 mismatch | `@regression:overfit-gap` and live historic-boundary test |

## Verification summary

- Clean clone: `/tmp/promptless-polish-1-WxABXj/repo`.
- Every one of the 17 commands in `.factory/claims.json` ran separately and selected exactly one passing tagged test.
- Full local browser suite: 36/36 passed before the final copy guard; the final suite contains 37 tests.
- Live browser suite: 5/5 passed after deployment, including axe on every public route.
- `verify-url.sh`: `/`, `/demo`, and `/?demo=1` passed locally and live with zero console errors.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.7 s, TBT 40 ms, CLS 0, transfer 169 KiB. Report: `.factory/qa-evidence/polish1-live-lighthouse.json`.
- Deployment `08c069c8-bd00-40bf-918c-859c7390c5d6` completed through `/opt/fleet/lib/deploy-static.sh promptless-ml-lab dist` in `centralus`.
