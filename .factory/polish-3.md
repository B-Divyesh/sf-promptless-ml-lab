# Polish round 3 — cumulative adversarial review closure

**Review base:** `154730ff62be392e4c42d63da98b305d19d46b22`  
**Released candidate named by work order:** `b501c0e71332216fa08d69fe39586245e65bb174`  
**Repair commit:** `55ab660e4861af1995d217982fe81c28f88e5a48`  
**Live release:** https://promptless-ml-lab.sociobot.in  
**Deployment:** `14569ece-61a5-4654-ac7e-259de3a23aa1`  
**Result:** PASS — every F-1-*, F-2-*, and F-3-* finding is closed.

## Finding map

| Finding | Change made | Test evidence | Screenshot and cold live check |
|---|---|---|---|
| F-1-1 | Retained the one-click `/demo` sample, banner, demo namespace, and real-data sentinel boundary. | `@claim:one-click-sample`; live test `cumulative one-click demo, privacy, reset, and offline behavior work live`. | `.factory/qa-evidence/polish3-live-demo-first-screen.png`; `/` → `/demo`, PASS. |
| F-1-2 | Retained the narrowed catalog statement that every drill checks its stated operation against fixed drill data. | `@claim:catalog-evaluator`; `@regression:review-copy`. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; `/`, PASS. |
| F-1-3 | Kept the untestable artwork-provenance sentence out of visitor copy; provenance remains in `.factory/design.md`. | `@regression:review-copy`; live cumulative copy scan. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; `/`, PASS. |
| F-1-4 | Retained the declared same-origin runtime-resource claim and request-log test. | `@claim:no-third-party-runtime`; live one-click request log. | `.factory/qa-evidence/polish3-live-demo/screenshot-desktop.png`; `/demo`, PASS. |
| F-1-5 | Kept the README opening split into two short sentences. | `@regression:review-copy`; `@regression:plain-words`; `.factory/copy-audit.md`. | `.factory/qa-evidence/polish3-live-root/screenshot-mobile.png`; source and live copy, PASS. |
| F-1-6 | Kept the section name “How the drills work”. | `@regression:review-copy`; live cumulative copy scan. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; `/`, PASS. |
| F-1-7 | Kept the empty “One small trace at a time” slogan removed. | `@regression:review-copy`; live cumulative copy scan. | `.factory/qa-evidence/polish3-live-root/screenshot-mobile.png`; `/`, PASS. |
| F-1-8 | Kept result-naming controls “Check my answer” and “Open your real workbench”. | `@regression:review-copy`; `@claim:real-workbench`. | `.factory/qa-evidence/polish3-live-demo/screenshot-mobile.png`; `/demo` and `/lab`, PASS. |
| F-1-9 | Kept “Choose a short ML drill.” | `@regression:review-copy`; live cumulative copy scan. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; `/`, PASS. |
| F-2-1 | Retained the mobile workbench order and compact sample so the selected seed, data, expected result, and editor intersect the first viewport. | `@claim:one-click-sample`; live one-click test. | `.factory/qa-evidence/polish3-live-demo-first-screen.png`; 390 × 844 `/demo`, PASS. |
| F-2-2 | Kept command-only install guidance and the pinned Playwright 1.58.2 dependency. | `@regression:review-copy`; clean-clone `npm ci`. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; README and clean clone, PASS. |
| F-2-3 | Retained the `build-output` claim and artifact assertions. | `@claim:build-output`; clean-clone `npm run build`. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; deployed hashed assets, PASS. |
| F-2-4 | Retained plain deployment wording plus direct-route, 404, cache, CSP, and `nosniff` checks. | `@claim:deployment-config`; live routes/headers test. | `.factory/qa-evidence/polish3-live-privacy/screenshot-desktop.png`; `/privacy` 200 and unknown route 404, PASS. |
| F-2-5 | Kept **drill** as the selectable practice-unit term; **task** only labels the instruction inside a drill. | `@regression:review-copy`; `@regression:plain-words`. | `.factory/qa-evidence/polish3-live-demo/screenshot-desktop.png`; all public routes, PASS. |
| F-2-6 | Kept the plain checker explanation about the named PyTorch operation and seven repeated results. | `@claim:fixture-evaluator`; `@claim:deterministic-trace`; `@regression:review-copy`. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; `/`, PASS. |
| F-2-7 | Kept the README explanation in terms of an answer line and fixed inputs. | `@regression:review-copy`; `@claim:catalog-evaluator`. | `.factory/qa-evidence/polish3-live-demo/screenshot-desktop.png`; clean source and live behavior, PASS. |
| F-2-8 | Kept outcome-based offline wording and service-worker navigation behavior. | `@claim:offline-reload`; `@regression:sw-navigation`; live offline reload. | `.factory/qa-evidence/polish3-live-demo/screenshot-mobile.png`; cold `/demo` offline reload, PASS. |
| F-2-9 | Kept the decorative “THE WORKBENCH” label removed. | `@regression:review-copy`; live cumulative copy scan. | `.factory/qa-evidence/polish3-live-root/screenshot-desktop.png`; `/`, PASS. |
| F-2-10 | Retained JSON import validation, count preview, duplicate rejection, active-namespace writes, and replay. | `@claim:import-records`; `@claim:import-namespace`; `@claim:import-replay`; live import test. | `.factory/qa-evidence/polish3-live-import.png`; `/?demo=1`, PASS. |
| F-3-1 | Reduced only the ≤410px facts margin from 28px to 18px. Added a full-edge assertion for all three facts at 390 × 844. | `@regression:first-screen-facts`; live test `F-3-1 cold 390px landing shows all three complete facts`. | `.factory/qa-evidence/polish3-live-first-screen.png`; bottoms 790.91, 817.16, and 843.41 px, PASS. |

## Earlier regression boundaries

The full 44-test clean-clone suite also rechecked every non-numbered defect
recorded by review 1: fixture-aware checking, the reachable real workbench,
oversized-input recovery, keyboard focus after rerender, fresh online service
worker navigation plus offline reload, CSP-safe trace bars, a real HTTP 404,
44px targets, 390px overflow, and drill 25's validation-minus-training result.
The live test `cumulative evaluator, size recovery, focus, and drill 25
boundaries work live` repeated the highest-risk evaluator failures against the
deployed build.

## Claims and clean-clone verification

Clean clone: `/tmp/promptless-polish3-clean-2EdBms/repo` at
`55ab660e4861af1995d217982fe81c28f88e5a48`.

- `npm ci`: passed; 24 packages installed from the lockfile.
- Every command in `.factory/claims.json` ran separately: 22/22 passed. The
  runner checked that each command had its exact `@claim:<id>` tag and that
  Playwright reported one selected test and one passing test.
- `npm test`: 44/44 passed.
- `npm run lint`: passed.
- `npm run build`: passed; `dist/index.html` was produced. Initial application
  JavaScript is 10.68 kB gzip; CSS is 3.35 kB gzip.
- `npm audit`: passed with zero vulnerabilities.

## Browser, accessibility, privacy, offline, and performance evidence

- Local URL verifier: `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and
  `/terms` passed with exact titles, `lang=en`, one h1, one main, complete alt
  text, labeled controls, and zero console errors. Evidence is under
  `.factory/qa-evidence/polish3-local-*`.
- Live URL verifier: the same six entries passed with zero console errors.
  Evidence is under `.factory/qa-evidence/polish3-live-*`.
- Live Playwright acceptance: 5/5 passed from fresh contexts. It covered the
  F-3-1 viewport edges, build stamp, sample and query demo entry, request
  privacy, namespace isolation, reset, import/replay, real exit, offline
  reload, checker failures, focus, routes, metadata, legal links, history
  focus, responsive overflow, 404 status, CSP, security headers, and axe.
- Axe through the local 44-test suite and live five-test suite found no serious
  or critical issue at desktop or 390px on every public route and the 404.
- Local Lighthouse mobile: Performance 99, Accessibility 100, Best Practices
  100, SEO 100; LCP 2.10 s, TBT 0 ms, CLS 0, transfer 202,298 bytes. Report:
  `.factory/qa-evidence/polish3-local-lighthouse.json`.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 0.91 s, LCP 1.73 s, TBT 2 ms, CLS 0, transfer 173,917
  bytes. Report: `.factory/qa-evidence/polish3-live-lighthouse.json`.

No finding remains open.
