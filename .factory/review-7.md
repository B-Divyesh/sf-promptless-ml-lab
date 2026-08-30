# Adversarial first-read review 7 — Seeded ML Drills

**Reviewed:** 2026-08-30 UTC  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Repository candidate:** 92c4cd74cac16b78873ad43713f1294d40cd82c2  
**Live build:** d2fecbe87393 (later repository commits change verification records only)

## Verdict: PASS

There are no blocking or minor findings. This review was rerun from scratch on
the live site and a fresh clone. All 24 declared claims have an exact tagged
test and passed. The product is clear, tryable in one click, and the demo is
isolated from real data.

.factory/brief.json is absent. The scope and missed-leverage checks used
AGENTS.md, the live product, README, demo contract, design record, and claims
manifest.

## First 30 seconds

Fresh Chromium contexts, empty storage, and scroll position zero were used at
390 × 844 and 1440 × 900.

- **What it does:** Practice fixed PyTorch operations with a browser check.
- **For whom:** Self-taught ML learners needing a short drill.
- **What to click first:** **Try it with sample data**.

The first screen states all three directly. At 390px, the primary action was
fully visible at y=422–467; all three facts ended by y=637. There was no
horizontal overflow or console/page error. Desktop showed the same job,
audience, action, and facts before scrolling.

## Copy audit

Word counts treat hyphenated terms, paths, and numeric expressions as one word.
No landing or README sentence exceeds 22 words. No banned marketing adjective,
metaphor heading, inconsistent selectable-unit term, or non-result-naming
button was found. “drill” names the selectable unit; “task” only names its
instruction.

### Landing page

| Copy unit | Words | Flag |
| --- | ---: | --- |
| Skip to drills | 3 | — |
| SEED ML drills | 3 | — |
| Demo | 1 | — |
| Drills | 1 | — |
| Privacy | 1 | — |
| FIXED SEEDS / NO CHAT REQUIRED | 6 | — |
| Practice PyTorch operations in fixed drills. | 6 | — |
| For self-taught ML learners who want one short drill with a browser check. | 14 | — |
| Try it with sample data | 5 | — |
| Opens a tensor-shape drill with fixed sample inputs. | 8 | — |
| Free. | 1 | — |
| All 30 drills are open. | 5 | — |
| Runs stay in this browser. | 5 | — |
| Works offline after your first visit. | 6 | — |
| A concrete workbench with moss growing along a plotted learning curve. (image alt text) | 11 | — |
| Sample drill preview | 3 | — |
| Read tensor shapes | 3 | — |
| See the fixed inputs and expected result before opening the sample. | 11 | — |
| Try this sample drill | 5 | — |
| Seed / Dataset / Task / Expected result | 6 | — |
| 11 / 8 samples × 3 features / Return the shape of x. / (8, 3) | 15 | — |
| Sample passed record | 3 | — |
| Seven repeated results: 0 → 1 | 5 | — |
| Choose a short ML drill. | 5 | — |
| Each drill checks its stated operation against fixed drill data. | 10 | — |
| Open the 30 drills | 4 | — |
| How the drills work | 4 | — |
| Pick a drill. | 3 | — |
| Start with tensors, losses, or evaluation. | 6 | — |
| Write one line. | 3 | — |
| Use the supplied tiny dataset and seed. | 7 | — |
| Save the record. | 3 | — |
| Export the run when the check passes. | 7 | — |
| What this lab does not do. | 6 | — |
| It does not host models, rank people, or give generated solutions. | 11 | — |
| The checker accepts the PyTorch operation named in each drill. | 10 | — |
| It reruns the same seven results from the same inputs. | 10 | — |
| It does not execute arbitrary Python or PyTorch. | 8 | — |
| Short ML practice with fixed inputs. | 6 | — |
| Terms / Built by Param Factory | 5 | — |

### README

| Copy unit | Words | Flag |
| --- | ---: | --- |
| Seeded ML Drills | 3 | — |
| Practice PyTorch operations in fixed drills. | 6 | — |
| Seeded ML Drills gives self-taught ML learners one short PyTorch drill with a browser check. | 15 | — |
| You do not need to choose a project or ask a chatbot. | 12 | — |
| It has 30 drills with fixed seeds, toy datasets, browser checks, and exportable local run records. | 16 | — |
| Try the sample | 3 | — |
| Open /demo after starting the app. | 5 | — |
| The demo opens a tensor-shape drill with fixed sample inputs and seed 11. | 13 | — |
| Its records use the separate session-storage key demo:seeded-ml-runs. | 8 | — |
| Leaving demo or selecting Reset demo clears that key. | 9 | — |
| Open your real workbench discards demo records, then switches to real:seeded-ml-runs. | 10 | — |
| The browser checks one answer line against each drill's fixed inputs. | 11 | — |
| An answer must use the operation named by the drill and produce the expected value. | 15 | — |
| It rejects changed inputs, unrelated shortcuts, and incomplete expressions. | 9 | — |
| The tests cover this behavior in all 30 drills. | 9 | — |
| The checker does not execute arbitrary Python or PyTorch. | 9 | — |
| Use your own Python environment for production verification. | 8 | — |
| Run records can be exported as JSON and imported into another browser. | 11 | — |
| Import checks the file, previews the record count, and rejects malformed or duplicate records. | 13 | — |
| Imported records stay in the open demo or real workbench. | 10 | — |
| Each imported record can be replayed against its drill's fixed inputs. | 11 | — |
| Develop / npm ci / npm run dev | 5 | — |
| Test and build / npm test / npm run build | 8 | — |
| Install dependencies with npm ci. | 5 | — |
| npm run build creates dist/index.html and the static deployment assets. | 9 | — |
| The project uses no runtime third-party scripts, remote fonts, or analytics. | 11 | — |
| After the first visit, the service worker saves the files needed to reopen /demo offline. | 15 | — |
| Deploy dist/ to Azure Static Web Apps. | 7 | — |
| The built config supports direct links, the 404 page, caching, and browser security headers. | 14 | — |
| Read Privacy and Terms. | 4 | — |
| Run records remain in the visitor's browser unless they choose to export a JSON file. | 15 | — |
| MIT. | 1 | — |
| See LICENSE. | 2 | — |

## Demo and sandbox

**PASS.** One landing click opened /demo with the persistent banner, “Demo —
sample data, nothing is saved,” a working Reset demo control, and Open your
real workbench. The first 390px screen already showed the seed-11 tensor-shape
drill, 8 × 3 fixed data, task, expected result, and editable starter.

In a fresh live context, passing x.shape wrote only
sessionStorage[demo:seeded-ml-runs]; a pre-seeded
localStorage[real:seeded-ml-runs] sentinel was unchanged. Following the header
Privacy link removed the demo key. Re-entering /demo showed “No records yet,”
while the real sentinel remained. A landing-to-demo request log contained only
same-origin GET requests for the document, local JS/CSS, and local artwork.

## Claims

**PASS.** In fresh clone /tmp/promptless-review7-8yR5b2/repo, npm ci passed,
then every exact test command in the 24-entry claims manifest was executed
separately. Each selected and passed its single tagged test. The matrix covers
local-only runs, export/import/namespace/replay, demo cleanup, sample entry,
same-origin runtime, build/deployment, offline reload, all 30 drills,
evaluator/counterexample/trace behavior, the landing sample trace,
non-execution of arbitrary Python, real workbench, free access, no chat, scope,
no uploads, and the five-drill set.

npm test then passed all 49 tests; npm run lint and npm run build passed. Every
claim-like landing and README statement maps to a manifest entry; no unlisted
claim was found.

## Earlier findings regression check

Every earlier review, polish report, and prior handoff was read. Live and
source checks confirm every finding is fixed rather than merely marked fixed.

| Earlier finding(s) | Current confirmation |
| --- | --- |
| F-1-1 | The adjacent action text accurately promises the seed-11 fixed-input drill; the post-click state has no invented record. |
| F-1-2, F-1-4 | Narrow catalog and same-origin-runtime claims are declared and pass their request/evaluator tests. |
| F-1-3 | No visitor-facing artwork-provenance assertion remains; provenance is in design.md. |
| F-1-5 through F-1-9 | Copy is short and concrete; headings name sections; controls say what they do; catalog terminology is drill. |
| F-2-1 | The selected data, task, result, and starter are visible in the mobile demo first screen. |
| F-2-2 through F-2-4 | README installation, build, and deployment copy is plain and backed by clean-clone/build/deployment tests. |
| F-2-5 through F-2-9 | Terminology, checker explanation, offline language, and heading structure remain corrected. |
| F-2-10, F-4-4 | Import validation, preview, duplicate handling, demo/real isolation, and replay each pass declared tests. |
| F-3-1 | All three first-screen facts end within the 390 × 844 viewport. |
| F-4-1 through F-4-3 | Request-marker privacy, five-distinct-drill progress, and saved-record offline replay are declared and tested. |
| F-5-1 through F-5-4 | First-read scope is precise, the action outcome is honest, unmeasured duration/speed copy is absent, and the landing contains a seed-11 preview. |
| F-6-1 | Demo storage is session-scoped and cleared on Home, Privacy, Back, real-workbench exit, and Reset; live Privacy-exit isolation was rechecked. |

## Structure, accessibility, and routes

**PASS.** Live /, /demo, /?demo=1, /lab, /privacy, and /terms returned 200,
one h1, one main landmark, English metadata, a route-specific title,
description, canonical URL, consistent header/footer, and no horizontal
overflow at 390px. Internal links returned 200. /missing-review-7 returned the
styled 404 document with HTTP 404 and a recovery link.

The responses send CSP with frame-ancestors 'none', nosniff, and strict
referrer policy. The full local suite covers route-change focus announcement,
history/back behavior, skip link, keyboard operation, visible focus, 44px touch
targets, reduced motion, and Axe serious/critical checks. The concrete-and-moss
field-note system, type pairing, original art, and hard slab geometry match the
product-specific design, not a generic SaaS template.

## Missed leverage

**No finding.** Export/import and replay cover the useful portability loop.
This product is deterministic, no-chat practice; a generated solution or
decorative AI action would undermine that job and is not implied by available
scope. No provider key is embedded.

## What would make this perfect

Keep the exact claim matrix and rerun the cold mobile/desktop, demo-isolation,
and public-route checks after every deployment. No product change is required
for this reviewed build.
