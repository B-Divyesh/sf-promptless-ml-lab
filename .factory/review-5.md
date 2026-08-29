# Adversarial first-read review 5 — Seeded ML Drills

**Reviewed:** 2026-08-29 UTC  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Repository candidate:** `50689c2ddd7e15fe2e3f7a4533c8e152a0899248`  
**Live build:** `d717c1068864`  
**Verdict:** **FAIL**

The demo, storage boundary, routes, accessibility baseline, and all 24 declared
test commands work. The product still fails this review. The first headline
describes broader model practice than the one-line operation checker provides,
the primary action promises a run record that does not exist after the click,
and the 6–10 minute claim is not measured. A PASS requires zero findings and
no untested claim.

`.factory/brief.json` is absent. This review used the supplied work order,
`AGENTS.md`, `.factory/design.md`, `.factory/demo.md`, the live product, and the
README as the scope sources.

## First 30 seconds

Fresh Chromium contexts opened the live root at 390 × 844 and 1440 × 900 with
empty storage and scroll position zero.

- **What I think it does:** It offers fixed, browser-checked PyTorch drills.
- **Who it is for:** Self-taught ML learners who want short practice.
- **What I should click:** “Try it with sample data.”

The audience and action are clear. The actual job is not stated accurately
enough. The headline says “Practice reproducible ML models,” but the product
does not run a model or PyTorch; it validates one supported answer line in a
closed browser evaluator. That limitation appears below the first screen.
F-5-1 therefore fails the mandatory first-read gate.

At 390 × 844, the headline ended at y=551.94, the audience sentence at
y=627.94, the primary action at y=694.94, and its outcome note at y=746.94.
All three facts fit, although the offline fact ends at y=843.69, only 0.31 px
inside the viewport. Desktop showed the same information without scrolling.

## Findings

### Blocking

#### F-5-1 — The first-screen job statement overstates what the checker does

**Exact quote / location:** Landing h1: “Practice reproducible ML models.”
README opening: “Practice reproducible ML models in short, fixed drills.”

**Why:** A first-time visitor can reasonably expect to run or train models.
The product instead checks one supported PyTorch expression against fixed
inputs in a browser evaluator. It explicitly says below the fold that it does
not execute arbitrary Python or PyTorch. The first screen therefore answers
“what does this do?” too broadly, and no claim entry proves model practice.

**Concrete fix:** Change the h1 to “Practice PyTorch operations in fixed
drills.” Change the audience line to “For self-taught ML learners who want one
short drill with a browser check.” Use the same precise description in the
README, title, meta description, OG copy, Twitter copy, and catalog description.

#### F-1-1 — Reopened: the primary action promises a record that is not opened

**Exact quote / location:** Beside “Try it with sample data”: “Opens a seeded
drill and local run record.” The matching `one-click-sample` manifest claim
says the same.

**Observed result:** Immediately after one click, `/demo` shows `0 / 5 passed`,
`demo:seeded-ml-runs` is null, Export is disabled, and the records section says
“No records yet. Pass a check or import records to add one here.” A record is
created only after the visitor edits the answer and selects “Check my answer.”

**Why:** This is the required adjacent explanation of what the primary action
does. It is false at the point promised. The tagged test hides the mismatch by
clicking the action, then entering `x.shape`, then checking the answer before
asserting that the demo key exists. Review 1 required the click itself to prove
the promised result, so this is a half-fixed earlier finding and remains
blocking under its original id.

**Concrete fix:** Prefer the accurate rewrite “Opens a tensor-shape drill with
fixed sample inputs.” Update `one-click-sample` to assert the immediate
post-click state before any second action. If a sample record is intentional,
seed a clearly labeled sample record on entry and assert it exists immediately.

#### F-5-2 — The 6–10 minute estimate is an untested quantitative claim

**Exact quote / location:** Landing catalog: “Estimated 6–10 minutes each.”
Every demo catalog item also displays a value from 6 to 10 minutes.

**Why:** The `estimated-drill-duration` test only parses the displayed labels
and confirms their configured values fall between 6 and 10. It does not measure
completion time or cite observed timing evidence. The claims contract requires
quantitative time claims to be measured in the sandbox. A tautological label
check does not establish that a learner can complete a drill in that range.

**Concrete fix:** Remove the time estimate and its claim, or collect a defined
timing sample and document the method, population, result, and acceptable
margin. The tagged test must validate that evidence rather than reread the UI.

### Minor

#### F-5-3 — “Immediate” is an unlisted speed claim

**Exact quotes / locations:** README: “Seeded ML Drills gives self-taught ML
learners one short PyTorch drill with an immediate check.” README: “It has 30
drills with fixed seeds, toy datasets, immediate browser checks, and exportable
local run records.” The same adjective appears in the root meta/OG/Twitter copy
and `.factory/catalog-description.txt`.

**Why:** “Immediate” is a speed promise. No claims entry sets or measures a
response-time threshold. The checker tests establish outcomes, not latency.

**Concrete fix:** Remove the adjective: use “with a browser check” and “browser
checks.” If speed is material, state a number and add a timed claim test with a
defined margin.

#### F-5-4 — The landing page omits the required product preview

**Location:** Between the first screen and “How the drills work.” The only
content is “Choose a short ML drill,” one explanatory sentence, and a link to
open the catalog.

**Why:** The standard site skeleton requires the product itself or a live
preview in this position. The landing page shows atmospheric art and another
CTA, but no drill, fixed inputs, expected result, editor, or run-record preview.
The separate demo is strong, but it does not fill the landing-page structure.

**Concrete fix:** Add a compact, read-only preview of “Read tensor shapes” with
seed 11, the 8 × 3 inputs, the task, expected result, and a sample passed record.
Link the preview action to `/demo`.

## Copy audit

Counts treat hyphenated terms, paths, and number ranges as one word. The tables
include headings, labels, controls, alt text, and footer copy because those are
part of the first read. No unit exceeds 22 words and no banned adjective from
the supplied plain-words list appears. Flags below cover accuracy, untested
claims, and missing information.

### Landing page

| Copy unit | Words | Flag |
|---|---:|---|
| Skip to drills | 3 | — |
| SEED ML drills | 3 | — |
| Demo | 1 | — |
| Drills | 1 | — |
| Privacy | 1 | — |
| FIXED SEEDS / NO CHAT REQUIRED | 6 | — |
| Practice reproducible ML models. | 4 | F-5-1 |
| For self-taught learners who need one short ML drill and a check now. | 13 | — |
| Try it with sample data | 5 | — |
| Opens a seeded drill and local run record. | 8 | F-1-1 |
| Free. | 1 | — |
| All 30 drills are open. | 5 | — |
| Runs stay in this browser. | 5 | — |
| Works offline after your first visit. | 6 | — |
| A concrete workbench with moss growing along a plotted learning curve. | 11 | — |
| Choose a short ML drill. | 5 | — |
| Each drill checks its stated operation against fixed drill data. | 10 | — |
| Open the 30 drills | 4 | — |
| Estimated 6–10 minutes each | 4 | F-5-2 |
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
| Terms | 1 | — |
| Built by Param Factory | 4 | — |

The visible controls otherwise name results: “Open the 30 drills,” “Check my
answer,” “Restore starter,” “Import run records,” “Export run records,” “Reset
demo,” and “Open your real workbench.” Headings name their sections, and the
same selectable unit is consistently called a “drill.”

### README

| Sentence or copy unit | Words | Flag |
|---|---:|---|
| Seeded ML Drills | 3 | — |
| Practice reproducible ML models in short, fixed drills. | 8 | F-5-1 |
| Seeded ML Drills gives self-taught ML learners one short PyTorch drill with an immediate check. | 15 | F-5-3 |
| You do not need to choose a project or ask a chatbot. | 12 | — |
| It has 30 drills with fixed seeds, toy datasets, immediate browser checks, and exportable local run records. | 17 | F-5-3 |
| Try the sample | 3 | — |
| Open `/demo` after starting the app. | 6 | — |
| The demo begins on a tensor-shape drill with seed 11. | 10 | — |
| Its records use the separate `demo:seeded-ml-runs` local-storage key. | 8 | — |
| Reset demo clears that key. | 5 | — |
| Open your real workbench discards demo records, then switches to the separate `real:seeded-ml-runs` key. | 14 | — |
| The browser checks one answer line against each drill's fixed inputs. | 12 | — |
| An answer must use the operation named by the drill and produce the expected value. | 15 | — |
| It rejects changed inputs, unrelated shortcuts, and incomplete expressions. | 8 | — |
| The tests cover this behavior in all 30 drills. | 9 | — |
| The checker does not execute arbitrary Python or PyTorch. | 9 | — |
| Use your own Python environment for production verification. | 8 | — |
| Run records can be exported as JSON and imported into another browser. | 12 | — |
| Import checks the file, previews the record count, and rejects malformed or duplicate records. | 13 | — |
| Imported records stay in the open demo or real workbench. | 10 | — |
| Each imported record can be replayed against its drill's fixed inputs. | 11 | — |
| Develop | 1 | — |
| Test and build | 3 | — |
| Install dependencies with `npm ci`. | 5 | — |
| `npm run build` creates `dist/index.html` and the static deployment assets. | 9 | — |
| The project uses no runtime third-party scripts, remote fonts, or analytics. | 11 | — |
| After the first visit, the service worker saves the files needed to reopen `/demo` offline. | 16 | — |
| Deploy | 1 | — |
| Deploy `dist/` to Azure Static Web Apps. | 7 | — |
| The built config supports direct links, the 404 page, caching, and browser security headers. | 13 | — |
| Privacy and terms | 3 | — |
| Read Privacy and Terms. | 4 | — |
| Run records remain in the visitor's browser unless they choose to export a JSON file. | 15 | — |
| License | 1 | — |
| MIT. | 1 | — |
| See LICENSE. | 2 | — |

## Demo and sandbox behavior

The one-click route itself passes. At 390 × 844, `/demo` immediately shows the
persistent “Demo — sample data, nothing is saved.” banner, Reset demo, Open your
real workbench, the selected “Read tensor shapes” drill, seed 11, the 8 × 3
dataset, expected `(8, 3)`, task, and editable starter. The editor intersects
the first viewport. Direct `/demo` and `/?demo=1` entries work.

After a passing check, the record is written only to
`demo:seeded-ml-runs`. Reset removes that key and preserves a pre-seeded
`real:seeded-ml-runs` sentinel. Opening the real workbench removes demo data and
writes subsequent records only under `real:`. Import validation, preview,
duplicate rejection, namespace isolation, export, replay, and offline replay
all passed. F-1-1 concerns the false immediate action outcome, not the storage
boundary.

The complete live flow emitted only same-origin GET requests with no request
bodies. The unique resources were the document routes, hashed JavaScript and
CSS, the mobile artwork, the checker worker when used, and the service worker.
No analytics, remote font, model provider, identity request, or code-bearing
request was observed.

## Claims

A clean clone at `/tmp/promptless-review5-iJCjxG/repo`, commit
`50689c2ddd7e15fe2e3f7a4533c8e152a0899248`, was installed with `npm ci`.
Every exact command in `.factory/claims.json` was then run separately. Each
selected one tagged test and passed:

| Claim ids | Result |
|---|---|
| `local-browser-runs`, `export-record`, `import-records`, `import-namespace`, `import-replay`, `demo-reset` | PASS |
| `one-click-sample`, `no-third-party-runtime`, `build-output`, `deployment-config`, `offline-reload`, `thirty-open-drills` | PASS |
| `catalog-evaluator`, `fixture-evaluator`, `fixture-counterexamples`, `deterministic-trace`, `no-arbitrary-pytorch`, `estimated-drill-duration` | PASS |
| `real-workbench`, `free-access`, `no-chat-required`, `scope-limits`, `no-code-or-identity-upload`, `five-drill-practice-set` | PASS |

Green commands do not close the claim audit. `one-click-sample` proves the
record only after a second user action (F-1-1). `estimated-drill-duration`
repeats configured labels rather than measuring time (F-5-2). “Immediate” has
no entry or threshold (F-5-3). The broad model-practice headline also has no
testable claim entry and does not describe the evaluator precisely (F-5-1).

The full clean-clone suite passed 47/47. `npm run lint`, `npm run build`, and
`npm audit` passed; `dist/index.html` was produced, initial JavaScript was
28.72 kB raw / 10.74 kB gzip, and the audit reported zero vulnerabilities.

## Earlier findings and regression check

Every earlier review, polish report, and handoff was read. Each numbered
finding was checked in the current code/tests and on the live site where it has
a live surface.

| Earlier finding | Current confirmation |
|---|---|
| F-1-1 | **REOPENED / BLOCKING:** listed now, but the click still opens no record and the test creates one only after another action. |
| F-1-2 | Fixed: landing uses the narrower fixed-drill-data statement; the 30-drill evaluator test passes. |
| F-1-3 | Fixed: visitor-facing artwork provenance is absent; provenance remains in the design record. |
| F-1-4 | Fixed: the same-origin runtime-resource claim is listed; live and local request logs pass. |
| F-1-5 | Fixed: README opening is split; no sentence exceeds 22 words. |
| F-1-6 | Fixed: the section is named “How the drills work.” |
| F-1-7 | Fixed: “One small trace at a time” is absent. |
| F-1-8 | Fixed: controls say “Check my answer” and “Open your real workbench.” |
| F-1-9 | Fixed: the catalog says “Choose a short ML drill.” |
| F-2-1 | Fixed: seed, data, result, task, and editor intersect the first 390 × 844 demo viewport. |
| F-2-2 | Fixed: README gives command-only install guidance; clean `npm ci` passes. |
| F-2-3 | Fixed: `build-output` is listed, passes, and `dist/index.html` exists. |
| F-2-4 | Fixed: deployment wording is plain; direct routes, 404, caching, CSP, and `nosniff` pass. |
| F-2-5 | Fixed: “drill” names the selectable unit; “Task” only labels its instruction. |
| F-2-6 | Fixed: the landing explains the named operation and seven repeated results. |
| F-2-7 | Fixed: README no longer uses evaluator-contract jargon. |
| F-2-8 | Fixed: README describes the offline result without “application shell.” |
| F-2-9 | Fixed: “THE WORKBENCH” is absent. |
| F-2-10 | Fixed: import validates, previews, isolates both namespaces, rejects duplicates, and replays. |
| F-3-1 | Fixed narrowly: the third fact ends at y=843.69 in the 844 px viewport. |
| F-4-1 | Fixed: the privacy test uses a unique code marker and inspects methods, headers, URLs, and bodies. |
| F-4-2 | Fixed: the five-distinct-drill counter, persistence, de-duplication, reset, and isolation test passes. |
| F-4-3 | Fixed: a saved run survives an offline reload and replays while offline. |
| F-4-4 | Fixed: import isolation is tested in both demo and real workbenches. |

The older non-numbered boundaries also pass: fixture-aware evaluation,
reachable real workbench, oversized-input recovery, rerender focus, fresh
service-worker navigation, CSP-safe trace bars, real HTTP 404, 44 px targets,
390 px overflow, and drill 25 subtraction semantics.

## Structure, routes, accessibility, and visual identity

The live routes otherwise pass the structural checks:

| Route | Status | Title | h1 / main |
|---|---:|---|---:|
| `/` | 200 | Seeded ML Drills — Practice reproducible models | 1 / 1 |
| `/demo` | 200 | Demo — Seeded ML Drills | 1 / 1 |
| `/lab` | 200 | Workbench — Seeded ML Drills | 1 / 1 |
| `/privacy` | 200 | Privacy — Seeded ML Drills | 1 / 1 |
| `/terms` | 200 | Terms — Seeded ML Drills | 1 / 1 |
| unknown path | 404 | Not found — Seeded ML Drills | 1 / 1 |

Each valid route has a specific description and canonical, ordered headings,
the consistent header/footer, legal links, a skip link, and route-change h1
focus with a polite announcement. Back navigation restores route focus. The
favicon, 180 px touch icon, 1200 × 630 OG image, robots file, sitemap, and
security headers are present. The sitemap lists all five routes. Every real
internal link collected across the routes and 404 returned 200; only the
deliberately missing URL returned 404.

The fresh live suite passed 5/5 and included Axe scans at desktop and mobile,
keyboard operation, 44 px targets, focus contrast, reduced motion, 390 px
reflow, metadata, back/forward focus, and the designed 404. The factory URL
verifier passed `/`, `/demo`, `/lab`, `/privacy`, and `/terms` with no console
errors. F-5-4 is the remaining skeleton-content omission.

The concrete-and-moss palette, generated still-life art, serif specimen voice,
square slabs, seed stamps, and field-note texture match `.factory/design.md`
and are recognizably product-specific. This is not a generic SaaS template.

## Missed leverage

No additional feature finding. Import, export, replay, offline use, isolated
sample data, and a separate real workbench cover the obvious local-first
extensions. Generated answers would bypass the deliberate practice task, so an
AI assistant is not implied. No provider key or decorative AI control exists.

## What would make this perfect

Use a first-screen headline that names the actual fixed PyTorch-operation
practice. Make the primary action note match its immediate outcome and test
that state before any second action. Remove or substantiate the 6–10 minute
estimate, remove unmeasured “immediate” wording, and add the required landing
preview. Then rerun every claim command, the clean full suite, and the live
mobile first-read/demo/request-log checks. Nothing else was found.
