# Adversarial first-read review 3 — Seeded ML Drills

**Reviewed:** 2026-08-29 UTC  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Candidate:** `b501c0e71332216fa08d69fe39586245e65bb174`  
**Verdict:** **FAIL**

The product is clear, the demo is isolated, the current deployment matches the
reviewed build, and the declared checks pass. The verdict remains FAIL because
one required first-screen fact is clipped on a 390 × 844 phone. A PASS requires
zero findings.

## First 30 seconds

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900, at scroll
position zero.

- **What it does:** “Practice reproducible ML models.”
- **For whom:** “For self-taught learners who need one short ML drill and a
  check now.”
- **What to click first:** “Try it with sample data”; the outcome note is
  “Opens a seeded drill and local run record.”

Those three questions are answerable before scrolling at both sizes. The
landing page had no horizontal overflow or console/page errors. The visual
system is distinct: the concrete, moss, squared-slab, field-note treatment is
consistent with `.factory/design.md`, not a generic SaaS template.

## Findings

### Minor

#### F-3-1 — The third required first-screen fact is clipped on a 390px phone

**Location / exact quote:** Landing hero, 390 × 844 viewport: “Works offline
after your first visit.”

**Evidence:** In a fresh live context its bounds were `y=827.16`,
`height=26.25`; the bottom is `853.41`, below the 844px viewport. The first two
facts end at 800.91 and 827.16 respectively, but the full offline fact is not
visible without scrolling.

**Why:** The plain-words first-screen contract requires three plain facts.
The privacy/offline fact is present, but a phone visitor cannot read all of it
on the initial screen.

**Concrete fix:** In the `max-width: 410px` layout, reduce the hero facts top
margin from 28px to 18px (or make an equivalent ten-pixel reduction above the
facts). Add a 390 × 844 regression check that requires every `.facts li` bottom
edge to be at or above the viewport bottom.

## Copy audit

Counts treat paths and hyphenated terms as one word. The tables include visible
headings, controls, labels, footer copy, and the meaningful image alt text so
the audit does not hide copy outside prose. No sentence is over 22 words. No
banned marketing adjective, unexplained metaphor heading, inconsistent practice
unit term, or non-result-naming button was found. The one issue is F-3-1 above,
which is placement rather than wording.

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
| Works offline after your first visit. | 6 | F-3-1 placement |
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
| Run records remain in the visitor’s browser unless they choose to export a JSON file. | 15 | — |
| License | 1 | — |
| MIT. | 1 | — |
| See LICENSE. | 2 | — |

## Demo and sandbox behavior

**PASS.** From a fresh 390px context, the primary action opened `/demo` in one
click. The first screen showed the persistent “Demo — sample data, nothing is
saved.” banner, selected “Read tensor shapes” drill, seed 11, “8 samples × 3
features,” the task, expected `(8, 3)`, and the editable starter. The editor
intersected the first viewport (`y=680.80`). Desktop showed the selected drill,
its dataset, task, and expected result without scrolling.

`Reset demo` removed only `demo:seeded-ml-runs`; a pre-seeded
`real:seeded-ml-runs` sentinel was unchanged. `Open your real workbench`
discarded demo records and routed to `/lab`. Direct `/demo` and `/?demo=1`
entries behaved as demo mode. The landing-to-demo Playwright request log
contained only `https://promptless-ml-lab.sociobot.in`; no third-party,
analytics, or remote-font request appeared.

## Claims

**PASS — no untested or failed declared claim.** I made a clean clone at
`/tmp/promptless-review3-Wp4pHB/repo`, ran `npm ci`, then ran every command in
`.factory/claims.json` separately. Each selected one tagged passing test:

`local-browser-runs`, `export-record`, `import-records`, `import-namespace`,
`import-replay`, `demo-reset`, `one-click-sample`, `no-third-party-runtime`,
`build-output`, `deployment-config`, `offline-reload`, `thirty-open-drills`,
`catalog-evaluator`, `fixture-evaluator`, `fixture-counterexamples`,
`deterministic-trace`, `no-arbitrary-pytorch`, `estimated-drill-duration`,
`real-workbench`, `free-access`, `no-chat-required`, and `scope-limits`.

The complete clean-clone suite also passed 43/43 (`test-results/.last-run.json`
records `status: passed`), as did `npm run lint`, `npm run build`, and
`npm audit --omit=dev`. Every landing and README claim-like statement maps to
one or more of those declared claims; no unlisted claim finding was found.

## Earlier findings and regression check

I read `.factory/review-1.md`, `.factory/review-2.md`, `.factory/polish-1.md`,
`.factory/polish-2.md`, and the previous handoff. Each earlier finding was
checked against both the live deployment and current code/tests.

| Earlier finding | Current verification |
| --- | --- |
| F-1-1 | Fixed: one-click sample is declared and tests isolated `/demo` entry. |
| F-1-2 | Fixed: landing now states the declared, tested drill-data contract. |
| F-1-3 | Fixed: artwork-provenance copy is absent from visitor pages. |
| F-1-4 | Fixed: same-origin runtime resources are declared and request-log tested. |
| F-1-5 | Fixed: README opening is split; no sentence exceeds 22 words. |
| F-1-6 | Fixed: section is named “How the drills work”. |
| F-1-7 | Fixed: the empty hero slogan remains removed. |
| F-1-8 | Fixed: controls say “Check my answer” and “Open your real workbench”. |
| F-1-9 | Fixed: catalog says “Choose a short ML drill.” |
| F-2-1 | Fixed: mobile demo shows selected drill data and starter in the first viewport. |
| F-2-2 | Fixed: README has command-only install guidance. |
| F-2-3 | Fixed: `build-output` is declared and tested. |
| F-2-4 | Fixed: plain deployment wording and `deployment-config` test remain. |
| F-2-5 | Fixed: selectable practice unit is consistently “drill”. |
| F-2-6 | Fixed: landing limitation explains the checker in plain words. |
| F-2-7 | Fixed: README no longer uses evaluator-contract jargon. |
| F-2-8 | Fixed: README uses outcome language rather than “application shell”. |
| F-2-9 | Fixed: decorative “THE WORKBENCH” label remains absent. |
| F-2-10 | Fixed: JSON import validates, previews, isolates namespaces, and replays. |

The non-numbered pre-review boundaries listed in review 1 also remain fixed:
fixture-aware evaluation, reachable real workbench, oversized-input recovery,
focus preservation, service-worker refresh/offline reload, CSP-safe trace bars,
HTTP 404 behavior, mobile targets/overflow, and drill-25 subtraction semantics.

## Structure, routes, and accessibility

**PASS except F-3-1.** `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and
`/terms` returned 200; an unknown route returned the designed 404 with HTTP
404. Every application route had one `h1`, one `main`, its route-specific
title, description, and canonical URL. `robots.txt`, sitemap, favicon, apple
touch icon, and the 1200 × 630 OG image returned 200. Crawled internal links
resolved. Header/footer, Privacy, Terms, skip link, and visible focus treatment
were consistent.

Client navigation and Back moved focus to the new `h1` and updated the polite
route announcement. The response CSP carried `frame-ancestors 'none'` as a
header. Live axe scans at 390px found no violations on `/`, `/demo`, `/lab`,
`/privacy`, `/terms`, or the 404. No console or page errors occurred during the
cold landing/demo flow.

## Missed leverage

**No finding.** The obvious local-first companion feature, import alongside
export, is implemented. An AI solution assistant would conflict with the
explicit no-chat, self-practice job and is not implied by this brief. No
provider key or decorative AI feature is present.

## What would make this perfect

Close F-3-1, add its exact 390 × 844 viewport assertion, and rerun the
clean-clone claims and live cold mobile check. With every one of the three
plain facts fully visible before scrolling, this review has no remaining
finding.
