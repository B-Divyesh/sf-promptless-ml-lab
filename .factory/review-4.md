# Adversarial first-read review 4 — Seeded ML Drills

**Reviewed:** 2026-08-29 UTC

**Live URL:** https://promptless-ml-lab.sociobot.in

**Candidate:** `06a15987b9e5f9466c4987223e46931898ceed9f`

**Verdict:** **FAIL**

The cold first read, sample flow, sandbox boundary, current behavior, routes,
accessibility checks, and all 22 declared claim commands pass. The review still
fails because four user-facing promises do not have claim tests that prove
their full wording. A PASS requires zero findings and no untested claim.

`.factory/brief.json` is absent from this checkout. The missed-leverage check
therefore used the product contract, live product, README, design record, and
demo contract. The product files have not changed since repair `55ab660`; the
commits after it contain verification documentation and evidence.

## First 30 seconds

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 900 with empty
storage and scroll position zero.

- **What it does:** “Practice reproducible ML models.”
- **For whom:** “For self-taught learners who need one short ML drill and a
  check now.”
- **What to click first:** “Try it with sample data.” The adjacent result says,
  “Opens a seeded drill and local run record.”

All three answers appear before scrolling at both sizes. On mobile, the primary
action ends at y=694.66 and its result note ends at y=746.66. The three facts
end at y=790.91, y=817.16, and y=843.41. The third fact therefore fits the
844 px viewport by 0.59 px. The page width is exactly 390 px, with no console
or page errors.

## Findings

### Blocking

None. Every listed claim command passed.

### Minor

#### F-4-1 — The no-upload and identity statements have no matching claim entry

**Locations / exact quotes:** `/privacy`: “It does not send your code, run
records, or identity to a server.” `/terms`: “You keep your code. Nothing in
this version uploads it.”

**Why:** `local-browser-runs` declares only “Runs stay in this browser.” Its
test records request URLs during one demo run and allows every same-origin
request. It does not check request methods or bodies for entered code, and no
claim entry covers identity collection. The live request log in this review
contained only same-origin GETs, so current behavior is sound, but the stronger
published privacy promise can regress without failing its declared test.

**Concrete fix:** Add one `no-code-or-identity-upload` entry naming both routes.
Its tagged test should enter a unique code marker, run a check, import and
export a record, inspect URL, method, headers, and post data for every request,
and assert that no identity field or account control exists. Alternatively,
replace both sentences with the narrower tested statement “Run records stay in
this browser.”

#### F-4-2 — The five-drill practice-set counter is an unlisted feature claim

**Location / exact quote:** `/demo` and `/lab`, directly below the h1:
“Complete five distinct drills for one practice set. 0 / 5 passed.”

**Why:** The counter promises distinct-drill progress and a five-drill practice
set, but `.factory/claims.json` contains no entry for it. No tagged claim test
checks incrementing, de-duplication, the fifth completion, reload, or reset.

**Concrete fix:** Add a `five-drill-practice-set` claim. In a fresh demo,
complete five different drills and assert 1/5 through 5/5; repeat one drill and
confirm it is counted once; reload and confirm the count; reset and confirm
0/5 without changing real storage. Remove the counter if it is not a supported
product promise.

#### F-4-3 — The offline test does not prove the saved-record promise

**Location / exact quote:** `/demo` and `/lab` offline status: “Offline. Your
saved run records and drills are available.”

**Why:** `@claim:offline-reload` visits the demo, switches offline, reloads, and
asserts only the workbench heading. It never creates or finds a saved run
record. This review confirmed that a saved record and Replay work offline, but
the current claim test would still pass if saved records disappeared.

**Concrete fix:** Expand `offline-reload` and its manifest wording. Save a
passing demo record online, switch offline, reload, assert that exact seed and
record remain visible, replay it successfully, and confirm no network request
leaves the sandbox.

#### F-4-4 — The active-workbench import claim tests only demo mode

**Location / exact quote:** README, “Try the sample”: “Imported records stay in
the open demo or real workbench.” Manifest claim `import-namespace`: “Imported
records are saved only in the active workbench.”

**Why:** `@claim:import-namespace` imports only while `/demo` is active and
checks a real-key sentinel. It never imports on `/lab` with a demo-key sentinel,
so half of the two-mode promise is untested. The current shared key-selection
code appears correct, but the required sandbox test does not prove both sides.

**Concrete fix:** Extend the one tagged `import-namespace` test with a second,
fresh context: open `/lab`, seed `demo:seeded-ml-runs`, import a valid record,
and assert only `real:seeded-ml-runs` changes. Keep the existing demo-side
assertion. If only demo import is supported, rewrite the README sentence as
“Imported records stay in the open demo workbench.”

## Copy audit

Counts treat hyphenated terms, paths, and number ranges as one word. Repeated
navigation and footer labels are listed once. The audit includes headings,
controls, labels, and meaningful alt text so non-sentence copy is also checked.
No unit exceeds 22 words. No banned marketing adjective, metaphor heading,
inconsistent name for a selectable drill, or non-result-naming button was
found. F-4-4 is a claims-coverage flag, not a plain-words defect.

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
| For self-taught learners who need one short ML drill and a check now. | 13 | — |
| Try it with sample data | 5 | — |
| Opens a seeded drill and local run record. | 8 | — |
| Free. | 1 | — |
| All 30 drills are open. | 5 | — |
| Runs stay in this browser. | 5 | — |
| Works offline after your first visit. | 6 | — |
| A concrete workbench with moss growing along a plotted learning curve. | 11 | — |
| Choose a short ML drill. | 5 | — |
| Each drill checks its stated operation against fixed drill data. | 10 | — |
| Open the 30 drills | 4 | — |
| Estimated 6–10 minutes each | 4 | — |
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

### README

| Sentence or copy unit | Words | Flag |
| --- | ---: | --- |
| Seeded ML Drills | 3 | — |
| Practice reproducible ML models in short, fixed drills. | 8 | — |
| Seeded ML Drills gives self-taught ML learners one short PyTorch drill with an immediate check. | 15 | — |
| You do not need to choose a project or ask a chatbot. | 12 | — |
| It has 30 drills with fixed seeds, toy datasets, immediate browser checks, and exportable local run records. | 17 | — |
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
| Imported records stay in the open demo or real workbench. | 10 | F-4-4 |
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

### Terminology and controls

| Concept | One term used | Result |
| --- | --- | --- |
| Selectable practice unit | drill | Consistent; “Task” is only the instruction field inside a drill. |
| Saved result | run record | Consistent. |
| Isolated sample | demo | Consistent. |
| Answer action | check | Consistent. |

The visible actions name their results: “Try it with sample data,” “Open the 30
drills,” “Check my answer,” “Restore starter,” “Import run records,” “Export run
records,” “Replay,” “Reset demo,” and “Open your real workbench.”

## Demo and sandbox behavior

**PASS.** One click from the fresh landing page opens `/demo`. At 390 × 844,
the first post-click screen contains the persistent “Demo — sample data,
nothing is saved.” banner, Reset demo, Open your real workbench, “Read tensor
shapes,” seed 11, “8 samples × 3 features,” expected `(8, 3)`, the task, and the
editable starter. The editor begins at y=680.80 and intersects the first
viewport. All 30 drill controls are present.

Submitting `x.shape` creates a seven-point passing record only under
`demo:seeded-ml-runs`; a `real:seeded-ml-runs` sentinel is unchanged. Reset
removes the demo key and preserves the real sentinel. Opening the real
workbench removes demo storage and routes to `/lab`. A malformed import is
rejected, a valid import is previewed before saving, the imported record stays
in the demo namespace, Replay passes, and a duplicate is rejected.

The complete cold landing, demo, worker, reset, and offline flow produced eight
requests. Every request was a same-origin GET; no analytics, remote font,
provider API, console error, or page error appeared. After a saved run, an
offline reload retained the record and Replay passed. This confirms current
behavior; F-4-1 and F-4-3 concern missing regression coverage.

## Claims

**Declared commands: PASS. Coverage: FAIL because of F-4-1 through F-4-4.**

A clean clone was created at
`/tmp/promptless-review4-clean-rkG7k0/repo` at candidate `06a15987b9e5f9466c4987223e46931898ceed9f`.
After `npm ci`, every command from `.factory/claims.json` was invoked
separately. Each selected exactly one tagged test and passed.

| Claim id | Result |
| --- | --- |
| local-browser-runs | PASS — 1 test |
| export-record | PASS — 1 test |
| import-records | PASS — 1 test |
| import-namespace | PASS — 1 test; incomplete two-mode coverage, F-4-4 |
| import-replay | PASS — 1 test |
| demo-reset | PASS — 1 test |
| one-click-sample | PASS — 1 test |
| no-third-party-runtime | PASS — 1 test |
| build-output | PASS — 1 test |
| deployment-config | PASS — 1 test |
| offline-reload | PASS — 1 test; incomplete saved-record coverage, F-4-3 |
| thirty-open-drills | PASS — 1 test |
| catalog-evaluator | PASS — 1 test |
| fixture-evaluator | PASS — 1 test |
| fixture-counterexamples | PASS — 1 test |
| deterministic-trace | PASS — 1 test |
| no-arbitrary-pytorch | PASS — 1 test |
| estimated-drill-duration | PASS — 1 test |
| real-workbench | PASS — 1 test |
| free-access | PASS — 1 test |
| no-chat-required | PASS — 1 test |
| scope-limits | PASS — 1 test |

The clean-clone full suite passed 44/44. `npm run lint`, `npm run build`, and
`npm audit` passed. The build produced `dist/index.html`; initial application
JavaScript is 10.68 kB gzip and CSS is 3.35 kB gzip. The separate checker
worker is loaded when a check runs.

## Earlier findings and regression check

Every earlier `.factory/review-*.md`, `.factory/polish-*.md`, and the prior
handoff was read. Each numbered finding was checked in the current source and
tests and on the live deployment where it has a live surface.

| Earlier finding | Current verification |
| --- | --- |
| F-1-1 | Fixed: `one-click-sample` is listed and passes; the live action opens the populated isolated demo. |
| F-1-2 | Fixed: the landing uses the narrower tested operation/fixed-data statement. |
| F-1-3 | Fixed: visitor-facing artwork provenance is absent; provenance remains in the design record. |
| F-1-4 | Fixed: `no-third-party-runtime` is listed and passes; the live request log is same-origin only. |
| F-1-5 | Fixed: the README opening is split and no sentence exceeds 22 words. |
| F-1-6 | Fixed: the section is named “How the drills work.” |
| F-1-7 | Fixed: “One small trace at a time” is absent from live and source copy. |
| F-1-8 | Fixed: controls say “Check my answer” and “Open your real workbench.” |
| F-1-9 | Fixed: the catalog says “Choose a short ML drill.” |
| F-2-1 | Fixed: seed, data, task, result, and editor intersect the first 390 × 844 demo viewport. |
| F-2-2 | Fixed: README gives the command-only `npm ci` instruction; clean installation passes. |
| F-2-3 | Fixed: `build-output` exists, passes, and `dist/index.html` is produced. |
| F-2-4 | Fixed: deployment wording is plain; direct links, 404, cache, CSP, and `nosniff` checks pass. |
| F-2-5 | Fixed: the selectable unit is consistently “drill”; “Task” labels only its instruction. |
| F-2-6 | Fixed: the landing explains the checker with named operations and seven repeated results. |
| F-2-7 | Fixed: README uses “answer line” and “fixed inputs,” not evaluator-contract jargon. |
| F-2-8 | Fixed: README states the offline result without “application shell.” |
| F-2-9 | Fixed: decorative “THE WORKBENCH” is absent from live and source copy. |
| F-2-10 | Fixed: live malformed/valid/duplicate import, preview, demo isolation, and Replay all pass. F-4-4 is narrower: real-mode import lacks claim coverage. |
| F-3-1 | Fixed: all three facts fit at 390 × 844; the third ends at y=843.41. |

The earlier non-numbered regression boundaries also pass in the 44-test suite:
fixture-aware checking, real-workbench access, oversized-input recovery,
rerender focus, fresh service-worker navigation and offline reload, CSP-safe
trace bars, HTTP 404 behavior, 44 px targets, mobile overflow, and drill 25's
validation-minus-training result.

## Structure, routes, accessibility, and identity

The structure checks pass.

| Route | Status | Title | h1 / main | Axe serious or critical |
| --- | ---: | --- | ---: | ---: |
| `/` | 200 | Seeded ML Drills — Practice reproducible models | 1 / 1 | 0 |
| `/demo` | 200 | Demo — Seeded ML Drills | 1 / 1 | 0 |
| `/?demo=1` | 200 | Demo — Seeded ML Drills | 1 / 1 | 0 |
| `/lab` | 200 | Workbench — Seeded ML Drills | 1 / 1 | 0 |
| `/privacy` | 200 | Privacy — Seeded ML Drills | 1 / 1 | 0 |
| `/terms` | 200 | Terms — Seeded ML Drills | 1 / 1 | 0 |
| unknown route | 404 | Not found — Seeded ML Drills | 1 / 1 | 0 |

Every valid route has `lang=en`, one h1, one main landmark, a route-specific
description and canonical URL, and the product OG image. The 1200 × 630 OG
image, SVG favicon, 180 × 180 apple-touch icon, `robots.txt`, and sitemap all
return 200. The sitemap lists all five public routes. All links collected from
the valid routes return 200. The missing route is a designed concrete-and-moss
404 with a route back.

Client navigation and Back focus the new or restored h1 and update the polite
route announcement. Factory URL verification passed all six valid entries with
no console errors. Live Axe scans found no serious or critical violations.
Response headers include the self-only CSP, `frame-ancestors 'none'`, HSTS,
`nosniff`, referrer policy, and frame denial.

The concrete, moss, serif specimen type, stamped controls, field marks, and
original still-life artwork match `.factory/design.md` and are distinct from a
generic SaaS template.

## Missed leverage

No additional feature finding. Import, export, replay, offline use, and an
isolated sample cover the obvious local-first extensions of the drill flow.
An answer-generating AI step would bypass the deliberate practice task and
conflict with “NO CHAT REQUIRED.” No provider key or decorative AI control is
present. Because `.factory/brief.json` is absent, this conclusion cannot be
cross-checked against a separate researched-opportunity file.

## What would make this perfect

Close F-4-1 through F-4-4: declare and test the full no-upload promise, the
five-distinct-drill counter, saved-record offline behavior, and both directions
of active-workbench import isolation. Then rerun all claim commands separately,
the full clean-clone suite, and the live mobile demo/request log. Nothing else
was found in this round.
