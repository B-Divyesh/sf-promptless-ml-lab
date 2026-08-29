# Polish round 4 — cumulative adversarial review closure

**Review base:** `3a5e87968957040d523c1a5f799580226df4aa14`  
**Repair commits:** `09836cdd537b30770bcd15b372687d395493c7d3`, `c0cfe914ea936b6ca87a57f2d08c2dbcc3198491`  
**Deployed build:** `c0cfe914ea93`  
**Deployment:** `ffde09b0-5d64-485e-9de1-f6e5f2bf8ddc` to https://promptless-ml-lab.sociobot.in  
**Result:** PASS — every F-1-*, F-2-*, F-3-1, and F-4-* finding is closed.

## Finding map

| Finding | Change made | Evidence | Screenshot / live check |
|---|---|---|---|
| F-1-1 | Retained one-click `/demo`; expanded its claim to verify direct `/?demo=1`, banner, reset, editor, and namespace isolation. | `@claim:one-click-sample` | `polish4-live-demo/screenshot-mobile.png`; `/` → `/demo` and `/?demo=1`, PASS |
| F-1-2 | Kept the narrow tested catalog wording about stated operations and fixed drill data. | `@claim:catalog-evaluator`; `@regression:review-copy` | `polish4-live-root/screenshot-desktop.png`; `/`, PASS |
| F-1-3 | Kept artwork provenance out of visitor copy; it remains in the design record. | `@regression:review-copy` | `polish4-live-root/screenshot-desktop.png`; `/`, PASS |
| F-1-4 | Kept the same-origin runtime-resource claim and request-log test. | `@claim:no-third-party-runtime` | `polish4-live/f4-1-privacy-demo.png`; `/` and `/demo`, PASS |
| F-1-5 | Kept the README opening split into short plain sentences. | `@regression:review-copy`; `@regression:plain-words` | `polish4-live-root/screenshot-desktop.png`; copy check, PASS |
| F-1-6 | Kept “How the drills work” as the useful section name. | `@regression:review-copy` | `polish4-live-root/screenshot-desktop.png`; `/`, PASS |
| F-1-7 | Kept the non-informative hero slogan removed. | `@regression:review-copy` | `polish4-live-root/screenshot-mobile.png`; `/`, PASS |
| F-1-8 | Kept result-naming controls “Check my answer” and “Open your real workbench”. | `@claim:real-workbench`; `@regression:review-copy` | `polish4-live-demo/screenshot-mobile.png`; `/demo`, PASS |
| F-1-9 | Kept “Choose a short ML drill.” | `@regression:review-copy` | `polish4-live-root/screenshot-desktop.png`; `/`, PASS |
| F-2-1 | Kept selected seed, data, result, task, and editor before the mobile catalog. | `@claim:one-click-sample` viewport assertions | `polish4-live-demo/screenshot-mobile.png`; `/demo` at 390 × 844, PASS |
| F-2-2 | Kept command-only install guidance and the pinned browser-test stack. | clean-clone `npm ci`; `@regression:review-copy` | `polish4-live-root/screenshot-desktop.png`; README check, PASS |
| F-2-3 | Kept the build-output claim and static artifact checks. | `@claim:build-output`; final `npm run build` | `polish4-live-root/verify.json`; hashed assets, PASS |
| F-2-4 | Kept plain deployment wording and direct-route, 404, cache, CSP, and nosniff checks. | `@claim:deployment-config`; live routes test | `polish4-live-privacy/verify.json`; `/privacy` and 404, PASS |
| F-2-5 | Kept **drill** as the selectable unit; **task** only labels an instruction within it. | `@regression:review-copy`; `@regression:plain-words` | `polish4-live-demo/screenshot-desktop.png`; all routes, PASS |
| F-2-6 | Kept the plain checker explanation about named operations and seven repeated results. | `@claim:fixture-evaluator`; `@claim:deterministic-trace` | `polish4-live-root/screenshot-desktop.png`; `/`, PASS |
| F-2-7 | Kept the README explanation in terms of answer lines and fixed inputs. | `@claim:catalog-evaluator`; `@regression:review-copy` | `polish4-live-demo/screenshot-desktop.png`; README check, PASS |
| F-2-8 | Kept outcome-based offline wording and service-worker navigation. | expanded `@claim:offline-reload` | `polish4-live/f4-3-offline-replay.png`; `/demo`, PASS |
| F-2-9 | Kept the decorative “THE WORKBENCH” label removed. | `@regression:review-copy` | `polish4-live-root/screenshot-desktop.png`; `/`, PASS |
| F-2-10 | Kept local import validation, preview, duplicate rejection, namespace writes, and replay. | `@claim:import-records`; `@claim:import-namespace`; `@claim:import-replay` | `polish4-live/f4-4-demo-import.png`; `/?demo=1` and `/lab`, PASS |
| F-3-1 | Kept all three first-screen facts fully inside 390 × 844. | `@regression:first-screen-facts`; live cumulative test | `polish4-live/cumulative-landing-mobile.png`; `/`, PASS |
| F-4-1 | Added `no-code-or-identity-upload`; it enters a unique marker, checks, exports, imports, inspects all request URL/method/header/body data, and rejects identity controls. | `@claim:no-code-or-identity-upload`; live `F-4-1` | `polish4-live/f4-1-privacy-demo.png`; `/privacy`, `/terms`, `/?demo=1`, PASS |
| F-4-2 | Added `five-drill-practice-set`; it proves 0/5 through 5/5, distinct-only counting, reload, reset, and real-key isolation. | `@claim:five-drill-practice-set`; live `F-4-2` | `polish4-live/f4-2-five-drills.png`; `/demo`, PASS |
| F-4-3 | Expanded offline reload to save a record, reload offline, find its seed, replay it, and require service-worker responses. | `@claim:offline-reload`; live `F-4-3` | `polish4-live/f4-3-offline-replay.png`; `/demo`, PASS |
| F-4-4 | Expanded import isolation with a fresh real-workbench context and demo sentinel. | `@claim:import-namespace`; live `F-4-4` | `polish4-live/f4-4-demo-import.png`; `/?demo=1` and `/lab`, PASS |

All screenshot paths above are under `.factory/qa-evidence/`.

## Final performance polish

The live mobile audit found the 1280px hero image was oversized at 390px. The
concrete-and-moss artwork is unchanged, but mobile now selects a 640px, 33 KB
WebP. The source selection is protected by `@regression:mobile-overflow`.
Final live Lighthouse: Performance 99, Accessibility 100, Best Practices 100,
SEO 100; LCP 2.1 s, TBT 0 ms, CLS 0, transfer 48 KiB. Evidence:
`.factory/qa-evidence/polish4-live-lighthouse.json`.

## Verification

- Final clean clone: `/tmp/promptless-polish4-final-nqWCE2/repo` at `c0cfe914ea936b6ca87a57f2d08c2dbcc3198491`.
- `npm ci`, `npm run lint`, `npm run build`, and `npm audit` passed.
- All 24 manifest commands ran separately and selected one passing tagged claim test. The full browser suite passed 46/46.
- Live acceptance: 5/5 passed with build stamp `c0cfe914ea93`, covering F-4, first screen, query demo, metadata, focus, 404, headers, mobile reflow, and Axe.
- `verify-url.sh` passed locally and live for `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and `/terms`, with zero console errors.

No finding remains open.
