# Polish round 5 — cumulative adversarial review closure

**Review base:** `26e875d88a6d803fa9e36d05888c47b6862a54c3`  
**Repaired product commit:** `abee7cde689c399fa70e7b943bd79bd9905ca211`  
**Deployed build stamp:** `abee7cde689c`  
**Deployment:** `431e1cb9-3fbb-476f-8147-f4928778dc08` to
https://promptless-ml-lab.sociobot.in  
**Result:** PASS — all F-1-* through F-5-* findings are closed.

## Finding map

The evidence screenshots are fresh cold production captures. `root` means
`https://promptless-ml-lab.sociobot.in/`; `demo` means the live `/demo` route.

| Finding | Change made | Evidence | Screenshot and cold live check |
|---|---|---|---|
| F-1-1 (including the review-5 reopen) | Rewrote the primary-action note to the exact immediate outcome: opening the tensor-shape drill with fixed sample inputs. The tagged claim now proves the state before any check writes a record; direct `?demo=1`, banner, reset, and real-key isolation are covered. | `@claim:one-click-sample`; `@regression:one-click-check`; clean-clone claim matrix | [`cold-query-demo-mobile.png`](qa-evidence/polish5-live/cold-query-demo-mobile.png); cold `/?demo=1` has banner, Reset demo, editable starter, no `demo:` record, and untouched `real:` sentinel. |
| F-1-2 | Kept the narrower, tested statement that every drill checks its stated operation against fixed drill data. | `@claim:catalog-evaluator`; `@regression:review-copy` | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); root copy matches the tested claim. |
| F-1-3 | Kept artwork provenance out of visitor-facing copy; the generation record remains in `design.md`. | `@regression:review-copy` | [`root/screenshot-mobile.png`](qa-evidence/polish5-live/root/screenshot-mobile.png); cold root has no provenance claim. |
| F-1-4 | Kept the declared same-origin runtime claim and request-log coverage. | `@claim:no-third-party-runtime`; live keyboard/privacy flow | [`demo/screenshot-desktop.png`](qa-evidence/polish5-live/demo/screenshot-desktop.png); live root → demo logged same-origin resources only. |
| F-1-5 | README remains split into short sentences; the revised opening precisely names fixed PyTorch operations. | `@regression:review-copy`; `@regression:plain-words` | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); cold root and README copy scan pass. |
| F-1-6 | Retained the useful “How the drills work” section heading. | `@regression:review-copy` | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); root, PASS. |
| F-1-7 | Retained the removal of the non-informative hero slogan. | `@regression:review-copy` | [`root/screenshot-mobile.png`](qa-evidence/polish5-live/root/screenshot-mobile.png); root, PASS. |
| F-1-8 | Retained result-naming controls: “Check my answer” and “Open your real workbench.” | `@claim:real-workbench`; live keyboard flow | [`demo/screenshot-mobile.png`](qa-evidence/polish5-live/demo/screenshot-mobile.png); demo and `/lab`, PASS. |
| F-1-9 | Retained “Choose a short ML drill” as the catalog heading. | `@regression:review-copy` | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); root, PASS. |
| F-2-1 | Retained the mobile workbench order: selected drill, seed, dataset, task, result, and editable starter precede the catalog. | `@claim:one-click-sample` viewport assertions | [`demo/screenshot-mobile.png`](qa-evidence/polish5-live/demo/screenshot-mobile.png); `/demo` at 390 × 844, PASS. |
| F-2-2 | Retained command-only dependency installation guidance. | clean-clone `npm ci`; `@regression:review-copy` | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); README and clean clone, PASS. |
| F-2-3 | Retained the `build-output` claim and artifact check. | `@claim:build-output`; clean-clone `npm run build` | [`root/verify.json`](qa-evidence/polish5-live/root/verify.json); deployed hashed assets, PASS. |
| F-2-4 | Retained plain deployment wording and direct-route, 404, caching, CSP, and `nosniff` checks. | `@claim:deployment-config`; live route/header suite | [`privacy/verify.json`](qa-evidence/polish5-live/privacy/verify.json); `/privacy` 200 and cold missing path 404, PASS. |
| F-2-5 | Retained **drill** as the selectable-unit term; **task** only labels its instruction. | `@regression:review-copy`; `@regression:plain-words` | [`demo/screenshot-desktop.png`](qa-evidence/polish5-live/demo/screenshot-desktop.png); public routes, PASS. |
| F-2-6 | Retained the plain checker explanation about the named operation and seven repeated results. | `@claim:fixture-evaluator`; `@claim:deterministic-trace` | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); root, PASS. |
| F-2-7 | Retained README wording about one answer line and fixed inputs. | `@claim:catalog-evaluator`; `@regression:review-copy` | [`demo/screenshot-desktop.png`](qa-evidence/polish5-live/demo/screenshot-desktop.png); README and demo, PASS. |
| F-2-8 | Retained outcome-based offline wording. | `@claim:offline-reload`; live service-worker/offline replay | [`demo/screenshot-mobile.png`](qa-evidence/polish5-live/demo/screenshot-mobile.png); `/demo`, PASS. |
| F-2-9 | Retained removal of “THE WORKBENCH” from the landing page. | `@regression:review-copy` | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); root, PASS. |
| F-2-10 | Retained JSON import validation, count preview, duplicate rejection, active-namespace writes, and replay. | `@claim:import-records`; `@claim:import-namespace`; `@claim:import-replay`; live import flow | [`demo/screenshot-desktop.png`](qa-evidence/polish5-live/demo/screenshot-desktop.png); `/demo` and `/lab`, PASS. |
| F-3-1 | Retained the 390 px first-screen facts layout; moving mobile artwork after the copy gives the revised precise heading enough room. | `@regression:first-screen-facts`; live cold check | [`cold-root-mobile.png`](qa-evidence/polish5-live/cold-root-mobile.png); all three fact bottoms are within 844 px. |
| F-4-1 | Retained the privacy claim test that injects a unique code marker and inspects all network methods, headers, URLs, and bodies. | `@claim:no-code-or-identity-upload`; live keyboard/privacy flow | [`privacy/screenshot-mobile.png`](qa-evidence/polish5-live/privacy/screenshot-mobile.png); `/privacy`, `/terms`, and demo, PASS. |
| F-4-2 | Retained the five-distinct-drill counter claim, including repeat, reload, reset, and namespace checks. | `@claim:five-drill-practice-set` | [`demo/screenshot-desktop.png`](qa-evidence/polish5-live/demo/screenshot-desktop.png); `/demo`, PASS. |
| F-4-3 | Retained saved-record offline reload and replay coverage. | `@claim:offline-reload`; live offline replay | [`demo/screenshot-mobile.png`](qa-evidence/polish5-live/demo/screenshot-mobile.png); `/demo`, PASS. |
| F-4-4 | Retained import isolation coverage in both demo and real workbenches. | `@claim:import-namespace`; live import flow | [`lab/screenshot-desktop.png`](qa-evidence/polish5-live/lab/screenshot-desktop.png); `/demo` and `/lab`, PASS. |
| F-5-1 | Replaced the overbroad model-practice wording everywhere it appears: h1, audience line, README, title, description, OG, Twitter, and catalog description now say fixed PyTorch operations with browser checks. | `@regression:review-copy`; `@regression:metadata`; live cold suite | [`cold-root-mobile.png`](qa-evidence/polish5-live/cold-root-mobile.png); root title is “Seeded ML Drills — Practice PyTorch operations,” PASS. |
| F-5-2 | Removed the 6–10 minute estimate from landing and every catalog item, removed its manifest claim, and deleted the tautological label test. | `@regression:review-copy`; clean claim-manifest audit (23 testable claims) | [`demo/screenshot-desktop.png`](qa-evidence/polish5-live/demo/screenshot-desktop.png); root and demo have no duration promise, PASS. |
| F-5-3 | Removed every visitor-facing “immediate” speed promise from README, metadata, social metadata, and catalog description. | `@regression:review-copy`; `@regression:plain-words` | [`root/verify.json`](qa-evidence/polish5-live/root/verify.json); cold root metadata and copy, PASS. |
| F-5-4 | Added a product-specific, read-only sample preview between the first screen and catalog: seed 11, 8 × 3 data, task, expected result, sample passed record, and a link to demo. | `@regression:landing-preview`; live cold suite | [`root/screenshot-desktop.png`](qa-evidence/polish5-live/root/screenshot-desktop.png); root preview and its demo action, PASS. |

## Verification

- Clean clone: `/tmp/promptless-polish5-final-lgzAMU/repo` at repair commit
  `abee7cde689c399fa70e7b943bd79bd9905ca211`.
- `npm ci` passed with zero audit vulnerabilities. Every exact command in the
  23-entry claims manifest was run separately and selected one passing tagged
  test. The clean full browser suite passed 48/48.
- Clean-clone `npm run lint`, `npm run build`, and `npm audit --audit-level=high`
  passed. Build output has `dist/index.html`; initial JS is 10.92 kB gzip and
  CSS is 3.55 kB gzip.
- Local `verify-url.sh` passed for `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`,
  and `/terms`, with no console errors. Fresh artifacts are under
  `qa-evidence/polish5-local/`.
- Local mobile Lighthouse: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; LCP 1.43 s, TBT 79 ms, CLS 0. Report:
  `qa-evidence/polish5-local/lighthouse.json`.
- Production `verify-url.sh` passed for the same six URLs. The five-test cold
  live Playwright suite passed with `EXPECTED_BUILD_ID=abee7cde689c`, including
  desktop/mobile Axe scans with zero serious or critical violations, 44 px
  targets, focus contrast, reduced motion, 404, privacy, routes, import,
  offline replay, headers, and cache policy.
- A separate cold production `?demo=1` check confirmed the banner, Reset demo,
  editable seed-11 starter, no pre-created demo record, and an untouched real
  sentinel. Evidence: `qa-evidence/polish5-live/cold-query-demo-mobile.png`.
- Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; LCP 1.21 s, TBT 0 ms, CLS 0. Report:
  `qa-evidence/polish5-live/lighthouse.json`.

The standalone `@axe-core/cli` could not locate a system Chrome in this
container. The required Axe verification therefore ran through the installed
Playwright Chromium integration in both the local and live suites.
