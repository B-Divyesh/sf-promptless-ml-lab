# Adversarial first-read review 1 — Seeded ML Drills

**Reviewed:** 2026-08-29 UTC
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verdict:** **FAIL**

The core first-read, demo, privacy, route, and declared-claim checks work. The verdict is FAIL because material landing/README statements lack corresponding claim entries and sandbox tests, and because several copy units fail the supplied plain-words standard. A PASS requires zero findings.

## First 30 seconds

Fresh Chromium contexts at 390 × 844 and 1280 × 900 showed the primary action without scrolling (mobile bounds: x=18, y=649.7, 205.6 × 45 px).

- **What it does:** “Practice reproducible ML models.”
- **For whom:** “For self-taught learners who need one small model task and a check now.”
- **First click:** “Try it with sample data”; the adjacent text says “Opens a seeded drill and local run record.”

This gate passes. The opening answers all three questions on both tested viewports.

## Findings

### Blocking

#### F-1-1 — The one-click sample outcome is an unlisted claim

**Location / exact quote:** Landing hero: “Opens a seeded drill and local run record.” README, “Try the sample”: “The demo begins on a tensor-shape drill with seed 11.”

**Why:** The primary action promises a particular result, but no .factory/claims.json entry tests the landing-to-populated-demo outcome from a clean context. The live behavior worked, but the claims contract requires a declared, repeatable check.

**Fix:** Add one-click-sample with a tagged test that opens /, activates “Try it with sample data”, asserts /demo, the banner, the tensor-shape task, and a separate demo: key. List both locations in where.

### Minor

#### F-1-2 — The catalog-composition claim has no claim entry

**Location / exact quote:** Landing catalog: “Each drill uses a fixed seed, a toy dataset, and a small expected result.”

**Why:** catalog-evaluator checks stated operations and accepted answers, not all three visible properties. A visitor can rely on those properties when choosing a drill.

**Fix:** Add drill-fixtures-visible with a clean-demo test covering all 30 visible seed, dataset, and expected-result fields, or rewrite the sentence to state only the already-tested evaluator contract.

#### F-1-3 — Artwork provenance is an unlisted, untestable landing claim

**Location / exact quote:** Footer: “Hero art is generated original artwork.”

**Why:** This factual provenance assertion has no claim entry or observable sandbox test. A browser test cannot establish that an image is original or generated.

**Fix:** Remove the visitor-facing assertion and retain the provenance in .factory/design.md, where the prompt and generation record already live. If visible credit is required, publish a verifiable provenance record and test that record at build time.

#### F-1-4 — The README makes an unlisted no-third-party-runtime claim

**Location / exact quote:** README, “Test and build”: “The project uses no runtime third-party scripts, remote fonts, or analytics.”

**Why:** This is a privacy statement a reader can rely on. The manifest has no entry for it; local-browser-runs is narrower in wording and declared location.

**Fix:** Add no-third-party-runtime, with a clean landing-and-demo request-log test asserting same-origin resources only and no third-party script/font resource. Add this README location to where.

#### F-1-5 — One README sentence exceeds the 22-word limit

**Location / exact quote:** README opening: “Seeded ML Drills is for self-taught machine-learning practitioners who want a small, repeatable PyTorch task without choosing a project or asking a chatbot.” (23 words)

**Why:** It breaks the hard cap and combines audience, task format, project choice, and chat avoidance into one sentence.

**Fix:** Replace it with: “Seeded ML Drills gives self-taught ML learners one small PyTorch task with an immediate check. You do not need to choose a project or ask a chatbot.”

#### F-1-6 — A landing heading is a mood instruction, not a section name

**Location / exact quote:** Landing h2: “Build the habit in three steps.”

**Why:** Heard out of context in a heading list, it does not name the section. “Build the habit” is motivational language rather than useful navigation.

**Fix:** Rename it “How the drills work”.

#### F-1-7 — The hero caption is a slogan with no usable information

**Location / exact quote:** Hero figcaption: “One small trace at a time.”

**Why:** It does not explain the image, product, or an action, and could appear on an unrelated practice product.

**Fix:** Delete it, or replace it with the specific, already-tested statement “Each passed drill saves a deterministic seven-point trace.”

#### F-1-8 — Two controls do not name their result in plain words

**Location / exact quote:** Workbench button “Run hidden checks”; demo-banner link “Start for real”.

**Why:** “Hidden checks” is unexplained internal terminology. “Start for real” does not tell the visitor which page opens.

**Fix:** Rename them “Check my answer” and “Open your real workbench”, including their accessible names and related tests.

#### F-1-9 — “concept-sized” is unexplained jargon

**Location / exact quote:** Landing catalog h2: “Choose a concept-sized drill.”

**Why:** A first-time visitor is not given a meaning for “concept-sized”.

**Fix:** Change it to “Choose a short ML drill.”

## Copy audit

Counts use visible copy units: sentences, headings, controls, labels, and footer copy. Repeated navigation labels are listed once. An em dash has no plain-words flag. F-* refers to the finding above.

### Landing page

| Copy unit | Words | Flag |
| --- | ---: | --- |
| Skip to drills | 3 | — |
| SEED ML drills | 3 | — |
| Demo | 1 | — |
| Drills | 1 | — |
| Privacy | 1 | — |
| FIXED SEEDS / NO CHAT REQUIRED | 6 | — |
| Practice reproducible ML models. | 4 | — |
| For self-taught learners who need one small model task and a check now. | 13 | — |
| Try it with sample data | 5 | — |
| Opens a seeded drill and local run record. | 8 | F-1-1 |
| Free. | 1 | — |
| All 30 drills are open. | 5 | — |
| Runs stay in this browser. | 5 | — |
| Works offline after your first visit. | 6 | — |
| One small trace at a time. | 6 | F-1-7 |
| THE WORKBENCH | 2 | — |
| Choose a concept-sized drill. | 4 | F-1-9 |
| Each drill uses a fixed seed, a toy dataset, and a small expected result. | 14 | F-1-2 |
| Open the 30 drills | 4 | — |
| Estimated 6–10 minutes each | 4 | — |
| Build the habit in three steps. | 6 | F-1-6 |
| Pick a drill. | 3 | — |
| Start with tensors, losses, or evaluation. | 6 | — |
| Write one line. | 3 | — |
| Use the supplied tiny dataset and seed. | 7 | — |
| Save the record. | 3 | — |
| Export the run when the check passes. | 7 | — |
| What this lab does not do. | 6 | — |
| It does not host models, rank people, or give generated solutions. | 11 | — |
| Checks evaluate a supported answer line against fixed exercise data and replay a deterministic trace. | 15 | — |
| It does not execute arbitrary Python or PyTorch. | 8 | — |
| Short ML practice with fixed inputs. | 6 | — |
| Terms | 1 | — |
| Built by Param Factory | 4 | — |
| Hero art is generated original artwork. | 6 | F-1-3 |

Additional button audit: “Run hidden checks” and “Start for real” are F-1-8.

### README

| Copy unit | Words | Flag |
| --- | ---: | --- |
| Seeded ML Drills | 3 | — |
| Practice reproducible ML models in short, fixed exercises. | 8 | — |
| Seeded ML Drills is for self-taught machine-learning practitioners who want a small, repeatable PyTorch task without choosing a project or asking a chatbot. | 23 | F-1-5 |
| It has 30 drills with fixed seeds, toy datasets, immediate browser checks, and exportable local run records. | 17 | — |
| Try the sample | 3 | — |
| Open /demo after starting the app. | 6 | — |
| The demo begins on a tensor-shape drill with seed 11. | 10 | F-1-1 |
| Its records use the separate demo:seeded-ml-runs local-storage key. | 8 | — |
| Reset demo clears that key. | 5 | — |
| Start for real discards demo records, then switches to the separate real:seeded-ml-runs key. | 13 | — |
| The browser check runs a supported expression against each drill’s immutable fixed exercise fixture and replays the drill’s fixed trace. | 20 | — |
| An answer must use the operation named by the drill and produce the expected value. | 15 | — |
| It rejects changed fixtures, unrelated shortcuts, and incomplete expressions. | 9 | — |
| The test suite checks this contract for all 30 drills. | 10 | — |
| The evaluator does not execute arbitrary Python or PyTorch. | 9 | — |
| Use your own Python environment for production verification. | 8 | — |
| Develop | 1 | — |
| Test and build | 3 | — |
| npm ci installs the pinned Azure Static Web Apps emulator used by the browser tests. | 15 | — |
| npm run build writes the static deployment to dist/, with index.html at its root. | 14 | — |
| The project uses no runtime third-party scripts, remote fonts, or analytics. | 11 | F-1-4 |
| The service worker caches the application shell after the first visit, so /demo can reload offline. | 16 | — |
| Deploy | 1 | — |
| Deploy dist/ to Azure Static Web Apps. | 7 | — |
| staticwebapp.config.json is included in the build output with SPA fallback, 404 handling, cache rules, and security headers. | 17 | — |
| Privacy and terms | 3 | — |
| Read Privacy and Terms. | 4 | — |
| Run records remain in the visitor’s browser unless they choose to export a JSON file. | 15 | — |
| License | 1 | — |
| MIT. | 1 | — |
| See LICENSE. | 2 | — |

## Demo and sandbox behavior

**PASS.** In a fresh mobile context, /demo immediately showed the populated “Run one seeded drill.” workbench, the tensor-shape task, and 30 drill controls. The persistent banner read “Demo — sample data, nothing is saved.” and contained functional Reset demo and Start for real controls.

After passing the first drill, Reset removed demo:seeded-ml-runs; a pre-seeded real:seeded-ml-runs sentinel remained untouched. Start for real routed to /lab, removed the demo key, and opened “YOUR WORKBENCH.” The fresh landing/demo flow requested only same-origin GETs (document, JavaScript, CSS, and hero image); no analytics or third-party request was observed.

## Claims

**PASS for declared claims.** I made a clean clone at /tmp/promptless-review-Hm3YTJ, ran npm ci, then invoked every command in .factory/claims.json separately. All 15 selected exactly one tagged test and passed: local-browser-runs, export-record, demo-reset, offline-reload, thirty-open-drills, catalog-evaluator, fixture-evaluator, fixture-counterexamples, deterministic-trace, no-arbitrary-pytorch, estimated-drill-duration, real-workbench, free-access, no-chat-required, and scope-limits.

The unlisted-claim findings F-1-1 through F-1-4 remain. Passing current declared tests cannot make undocumented promises compliant.

## Earlier-review regression check

There are no earlier .factory/review-*.md or .factory/polish-*.md files. I read the earlier verification reports and handoff and rechecked each defect on the live site and in current code.

| Earlier defect | Current confirmation |
| --- | --- |
| substring-only / fixture-blind checker | Fixed: checker-worker.ts parses the fixed starter fixture, requires an exact operation contract, evaluates it in a closed runtime, and checks its value; live invalid-fixture and incomplete-expression flows reject. |
| unreachable real workbench | Fixed: live Start for real opens /lab; source routes /lab to renderLab() with the real: namespace. |
| oversized input leaves checking disabled | Fixed: 100,001 characters returns the actionable size error with an enabled run button; source guards it before worker creation. |
| rerender loses keyboard focus | Fixed: run/filter renders pass an explicit focus target; current regression tests cover it. |
| stale service-worker demo HTML | Fixed: current source/service worker uses seeded-ml-drills-v5 and a regression test covers online refresh then offline reload. |
| CSP blocks inline trace bars | Fixed: bars use predefined classes, no inline styles, and the cold live browser recorded no console errors. |
| styled 404 returns 200 | Fixed: live unknown route returned HTTP 404 and “That drill does not exist.” |
| undersized targets / 390 px overflow | Fixed: the mobile context measured no interactive target below 44 px and scrollWidth was 390. |
| drill 25 operation/result mismatch | Fixed: live drill 25 states val_loss - train_loss, accepts it, rejects the reverse, and shows gap = 0.31. |

None of those earlier findings is re-opened.

## Structure, accessibility, and routes

**PASS.** Live /, /demo, /lab, /privacy, and /terms each returned 200 with one h1, one main landmark, route-specific title and canonical URL. /not-a-real-drill returned 404 with the styled recovery page. The first screen and demo loaded without console/page errors. Header/footer links were consistent, root-page links resolved, and source supplies OG/Twitter metadata, favicon, apple touch icon, robots, sitemap, CSP, and static-web-app 404 configuration.

The live header sent frame-ancestors 'none' as a response header. The brutalist concrete-and-moss system matches the documented product-specific design rather than a generic SaaS surface. Current source/test coverage also checks route-change heading focus, back/forward focus restoration, skip link, keyboard traversal, reduced motion, mobile reflow, and serious/critical axe issues.

## Missed leverage

**No finding.** This product is intentionally short, deterministic, offline-capable practice. It already provides the obvious export and real workspace. An AI drafting step would undermine the no-chat practice model; no provider key is embedded.

## What would make this perfect

Add the four missing claim records/tests or remove the unsupported statements. Apply F-1-5 through F-1-9. Re-run the clean-clone claim matrix and live first-read/demo/route checks. Only then would this review reach PASS.
