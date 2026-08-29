# Adversarial first-read review 2 — Seeded ML Drills

**Reviewed:** 2026-08-29 UTC  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Candidate:** `21f16f1c259535e5fa7568a814d7002c55cee814`  
**Verdict:** **FAIL**

The landing first read is clear, every declared claim test passes, and the demo
is isolated. The verdict is still FAIL. At 390 px, the first screen after the
sample action does not show the selected sample task or editor. Three README
claims are also absent from the claims manifest, and the copy has the specific
plain-language defects listed below. A PASS requires zero findings.

## First 30 seconds

Fresh Chromium contexts at 390 × 844 and 1440 × 900 were opened at scroll
position zero.

- **What it does:** “Practice reproducible ML models.”
- **For whom:** “For self-taught learners who need one small model task and a
  check now.”
- **First click:** “Try it with sample data.” The adjacent text says, “Opens a
  seeded drill and local run record.”

This gate passes. On mobile, the action ended at y=694 and its outcome note at
y=747, both inside the 844 px first viewport. Desktop also showed both without
scrolling. The page had no horizontal overflow, console error, or page error.

## Findings

### Blocking

#### F-2-1 — The mobile demo first screen does not show the sample task in use

**Location / exact text:** `/demo`, 390 × 844, immediately after selecting
“Try it with sample data.” The visible product state says “0 / 5 passed,” shows
a disabled “Export run records” button, and then starts the drill catalog with
“Read tensor shapes” and “Add a broadcast bias.”

**Evidence:** The selected “Read tensor shapes” exercise heading begins at
y=1032.5. Its realistic fixture begins at y=1265.4, and the PyTorch editor
begins at y=1569.4. None appears in the first 844 px. The first screen therefore
looks like an empty catalog, not the product being used with sample data.

**Why this blocks:** The one-click demo contract requires the first screen after
the click to show a realistic sample already in the product. The data exists
below the fold, but a phone visitor must scroll past setup and catalog content
to find it.

**Concrete fix:** On mobile, place the selected exercise before the catalog and
compact the workbench introduction. Keep the banner visible, then show “Read
tensor shapes,” seed 11, “8 samples × 3 features,” the expected result, and the
starter editor inside the first viewport. Move the catalog into a later section
or a drill-picker disclosure. Extend `@claim:one-click-sample` to assert that
the fixture and editable starter intersect the 390 × 844 viewport, not merely
that off-screen nodes exist.

### Minor

#### F-2-2 — The README install statement is an unlisted claim

**Location / exact quote:** README, “Test and build”: “`npm ci` installs the
pinned Azure Static Web Apps emulator used by the browser tests.”

**Why:** This is a setup result a reader can rely on, but `.factory/claims.json`
has no entry for it. Running it successfully during this review does not meet
the manifest requirement.

**Concrete fix:** Add a `pinned-test-emulator` claim and one tagged test that
checks the lockfile-installed emulator version and starts the configured test
server. Alternatively, reduce the copy to the command-only instruction
“Install dependencies: `npm ci`.”

#### F-2-3 — The README build-output statement is an unlisted claim

**Location / exact quote:** README, “Test and build”: “`npm run build` writes
the static deployment to `dist/`, with `index.html` at its root.”

**Why:** The observable output is not represented by a claim entry with one
tagged test.

**Concrete fix:** Add `build-output` to `.factory/claims.json`. Its test must run
the build and assert `dist/index.html` and the expected static assets exist.

#### F-2-4 — The README deployment-config statement is unlisted and uses jargon

**Location / exact quote:** README, “Deploy”:
“`staticwebapp.config.json` is included in the build output with SPA fallback,
404 handling, cache rules, and security headers.”

**Why:** This promises four deployment behaviors without a matching claim
entry. “SPA fallback” also does not tell a first-time reader the result.

**Concrete fix:** Rewrite it as “The built config supports direct links, the
404 page, caching, and browser security headers.” Add a `deployment-config`
claim whose tagged test inspects the built config and verifies each behavior.

#### F-2-5 — The same practice unit has three names

**Locations / exact quotes:** Landing: “one small model task,” “Choose a short
ML drill,” and “fixed exercise data.” README: “fixed exercises,” “one small
PyTorch task,” “30 drills,” and “fixed exercise fixture.”

**Why:** “Task,” “drill,” and “exercise” refer to the same selectable practice
unit. A new learner must infer that they are synonyms.

**Concrete fix:** Use **drill** everywhere: “one short ML drill,” “fixed drill
data,” and “each drill’s fixed inputs.” Reserve “task” only for the labeled
instruction inside one drill.

#### F-2-6 — The landing limitation uses unexplained evaluator jargon

**Location / exact quote:** Landing, “What this lab does not do”: “Checks
evaluate a supported answer line against fixed exercise data and replay a
deterministic trace.”

**Why:** “Supported answer line” does not say which answers are supported, and
“deterministic trace” does not tell a learner what they will see.

**Concrete fix:** Replace it with: “The checker accepts the PyTorch operation
named in each drill. It reruns the same seven results from the same inputs.”

#### F-2-7 — The README evaluator explanation is harder than the behavior

**Location / exact quotes:** “The browser check runs a supported expression
against each drill’s immutable fixed exercise fixture and replays the drill's
fixed trace.” “The test suite checks this contract for all 30 drills.”

**Why:** “Supported expression,” “immutable fixed exercise fixture,” “trace,”
and “contract” require implementation knowledge. “Immutable fixed” is also
redundant.

**Concrete fix:** Replace both with: “The browser checks one answer line against
each drill’s fixed inputs. The tests cover this behavior in all 30 drills.”

#### F-2-8 — The README offline sentence uses “application shell” jargon

**Location / exact quote:** “The service worker caches the application shell
after the first visit, so `/demo` can reload offline.”

**Why:** “Application shell” names an implementation pattern rather than the
files or outcome the reader needs.

**Concrete fix:** Use: “After the first visit, the service worker saves the
files needed to reopen `/demo` offline.”

#### F-2-9 — “THE WORKBENCH” is a decorative metaphor label

**Location / exact quote:** Landing label immediately before “Choose a short ML
drill”: “THE WORKBENCH”.

**Why:** It adds workshop mood but does not name content more clearly than the
following heading. It can also be mistaken for a separate product area.

**Concrete fix:** Remove the label. The existing heading “Choose a short ML
drill” already names the section.

#### F-2-10 — Exported local records cannot be imported

**Location:** `/demo` and `/lab` provide “Export run records” but no import
control.

**Why:** For a local-first tool, export without import does not let a learner
restore or move their replayable practice history to another browser. This is
the obvious portability step implied by local records and JSON export.

**Concrete fix:** Add “Import run records.” Validate the file format and
version, preview the number of records, reject malformed or duplicate entries,
and write only to the active namespace. Demo imports must remain under
`demo:seeded-ml-runs`. Add claims for import, namespace isolation, and replay
after import. No AI feature is warranted; generated solutions would conflict
with the product’s no-chat practice model.

## Copy audit

Counts treat hyphenated terms, code paths, and version strings as one word.
Navigation, labels, headings, buttons, alt text, and footer units are included
because they are part of the first-read copy. No unit exceeds 22 words and no
banned marketing adjective appears.

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
| For self-taught learners who need one small model task and a check now. | 13 | F-2-5 |
| Try it with sample data | 5 | — |
| Opens a seeded drill and local run record. | 8 | — |
| Free. | 1 | — |
| All 30 drills are open. | 5 | — |
| Runs stay in this browser. | 5 | — |
| Works offline after your first visit. | 6 | — |
| A concrete workbench with moss growing along a plotted learning curve. | 11 | — |
| THE WORKBENCH | 2 | F-2-9 |
| Choose a short ML drill. | 5 | — |
| Each drill checks its stated operation against fixed exercise data. | 10 | F-2-5 |
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
| Checks evaluate a supported answer line against fixed exercise data and replay a deterministic trace. | 15 | F-2-5, F-2-6 |
| It does not execute arbitrary Python or PyTorch. | 8 | — |
| Short ML practice with fixed inputs. | 6 | — |
| Privacy | 1 | — |
| Terms | 1 | — |
| Built by Param Factory | 4 | — |
| v1.0.0 | 1 | — |
| build 31855d1489cb | 2 | — |

The result-naming action check passes for “Try it with sample data,” “Open the
30 drills,” “Check my answer,” “Restore starter,” “Reset demo,” “Open your real
workbench,” and “Export run records.”

### README

| Copy unit | Words | Flag |
| --- | ---: | --- |
| Seeded ML Drills | 3 | — |
| Practice reproducible ML models in short, fixed exercises. | 8 | F-2-5 |
| Seeded ML Drills gives self-taught ML learners one small PyTorch task with an immediate check. | 15 | F-2-5 |
| You do not need to choose a project or ask a chatbot. | 12 | — |
| It has 30 drills with fixed seeds, toy datasets, immediate browser checks, and exportable local run records. | 17 | — |
| Try the sample | 3 | — |
| Open `/demo` after starting the app. | 6 | — |
| The demo begins on a tensor-shape drill with seed 11. | 10 | — |
| Its records use the separate `demo:seeded-ml-runs` local-storage key. | 8 | — |
| Reset demo clears that key. | 5 | — |
| Open your real workbench discards demo records, then switches to the separate `real:seeded-ml-runs` key. | 14 | — |
| The browser check runs a supported expression against each drill’s immutable fixed exercise fixture and replays the drill's fixed trace. | 20 | F-2-5, F-2-7 |
| An answer must use the operation named by the drill and produce the expected value. | 15 | — |
| It rejects changed fixtures, unrelated shortcuts, and incomplete expressions. | 9 | — |
| The test suite checks this contract for all 30 drills. | 10 | F-2-7 |
| The evaluator does not execute arbitrary Python or PyTorch. | 9 | — |
| Use your own Python environment for production verification. | 8 | — |
| Develop | 1 | — |
| Test and build | 3 | — |
| `npm ci` installs the pinned Azure Static Web Apps emulator used by the browser tests. | 15 | F-2-2 |
| `npm run build` writes the static deployment to `dist/`, with `index.html` at its root. | 14 | F-2-3 |
| The project uses no runtime third-party scripts, remote fonts, or analytics. | 11 | — |
| The service worker caches the application shell after the first visit, so `/demo` can reload offline. | 16 | F-2-8 |
| Deploy | 1 | — |
| Deploy `dist/` to Azure Static Web Apps. | 7 | — |
| `staticwebapp.config.json` is included in the build output with SPA fallback, 404 handling, cache rules, and security headers. | 17 | F-2-4 |
| Privacy and terms | 3 | — |
| Read Privacy and Terms. | 4 | — |
| Run records remain in the visitor’s browser unless they choose to export a JSON file. | 15 | — |
| License | 1 | — |
| MIT. | 1 | — |
| See LICENSE. | 2 | — |

### Terminology check

| Concept | Current words | Required word |
| --- | --- | --- |
| Selectable practice unit | task, drill, exercise | drill |
| Saved execution | run, run record | run record |
| Answer action | check, evaluate | check |
| Isolated try-out | demo with sample data | demo |

Only the first row produces a finding. “Run” as an action and “run record” as
the saved result can remain distinct. “Sample data” correctly names the data
inside demo mode.

## Demo and sandbox behavior

**FAIL because of F-2-1.** The entry path itself is one click and otherwise
works:

- `/demo` immediately has the persistent “Demo — sample data, nothing is
  saved.” banner, Reset demo, and Open your real workbench.
- The page contains all 30 drills and a real tensor-shape sample at seed 11.
- Submitting `tuple(x.size())` passes and stores a seven-point record only under
  `demo:seeded-ml-runs`.
- A preloaded `real:seeded-ml-runs` sentinel was unchanged after the demo run.
- Reset removed the demo key and preserved the real sentinel.
- Offline reload returned 200 and restored the populated workbench.
- The complete cold landing, demo, worker, reset, and offline flow made only
  same-origin GET requests. No analytics, third-party script, remote font,
  provider API, console error, or page error appeared.

The sandbox boundary passes. The post-click mobile presentation does not.

## Claims

**Declared tests: PASS. Coverage: FAIL because of F-2-2 through F-2-4.**

I cloned commit `21f16f1c259535e5fa7568a814d7002c55cee814` to
`/tmp/promptless-review-2-45H0Eg/repo`, ran `npm ci`, and invoked every command
from `.factory/claims.json` separately.

| Claim id | Result |
| --- | --- |
| local-browser-runs | PASS — one selected test |
| export-record | PASS — one selected test |
| demo-reset | PASS — one selected test |
| one-click-sample | PASS — one selected test |
| no-third-party-runtime | PASS — one selected test |
| offline-reload | PASS — one selected test |
| thirty-open-drills | PASS — one selected test |
| catalog-evaluator | PASS — one selected test; all 30 drills exercised |
| fixture-evaluator | PASS — one selected test |
| fixture-counterexamples | PASS — one selected test |
| deterministic-trace | PASS — one selected test |
| no-arbitrary-pytorch | PASS — one selected test |
| estimated-drill-duration | PASS — one selected test |
| real-workbench | PASS — one selected test |
| free-access | PASS — one selected test |
| no-chat-required | PASS — one selected test |
| scope-limits | PASS — one selected test |

The complete clean-clone suite also passed 37/37 tests. `npm run build` and
`npm run lint` passed; `dist/` was produced, and initial JavaScript was 9.79 kB
gzip. `npm audit --omit=dev` reported zero production vulnerabilities. `npm ci`
reported four development-tooling advisories.

## Earlier review and polish regression check

I read `.factory/review-1.md`, `.factory/polish-1.md`, and the current handoff.
Each earlier finding was checked on the live site and in current source rather
than accepted from its recorded status.

| Earlier finding | Independent result |
| --- | --- |
| F-1-1 one-click outcome unlisted | Fixed: `one-click-sample` exists, its test passes, and the live action opens the populated isolated demo. |
| F-1-2 catalog composition unlisted | Fixed: live/source now use the narrower tested evaluator statement. |
| F-1-3 artwork provenance unlisted | Fixed: the visitor-facing sentence is absent; provenance remains only in design documentation. |
| F-1-4 runtime third-party claim unlisted | Fixed: `no-third-party-runtime` exists and passes; the live request log is same-origin only. |
| F-1-5 README sentence over 22 words | Fixed: the sentence is split into 15 and 12 words. |
| F-1-6 mood heading | Fixed: live/source heading is “How the drills work.” |
| F-1-7 empty slogan | Fixed: “One small trace at a time” is absent. |
| F-1-8 vague controls | Fixed: live/source controls are “Check my answer” and “Open your real workbench.” |
| F-1-9 “concept-sized” jargon | Fixed: live/source heading is “Choose a short ML drill.” |

No F-1 finding is reopened. F-2-1 is a different demo-layout defect that the
earlier presence-only test did not detect.

The handoff's earlier checker, real-workbench, oversize-input, focus,
service-worker, CSP, 404, target-size, and drill-25 regression boundaries all
pass in the current 37-test suite. The documented development-only advisories
remain and are accurately disclosed.

## Structure, routes, accessibility, and visual identity

These checks pass.

| Route | Status | Title | h1 / main |
| --- | ---: | --- | --- |
| `/` | 200 | Seeded ML Drills — Practice reproducible models | 1 / 1 |
| `/demo` | 200 | Demo — Seeded ML Drills | 1 / 1 |
| `/lab` | 200 | Workbench — Seeded ML Drills | 1 / 1 |
| `/privacy` | 200 | Privacy — Seeded ML Drills | 1 / 1 |
| `/terms` | 200 | Terms — Seeded ML Drills | 1 / 1 |
| unknown path | 404 | Not found — Seeded ML Drills | 1 / 1 |

- Each route has `lang=en`, a route-specific description and canonical URL,
  OG/Twitter metadata, the product image, favicon, and apple-touch icon.
- `robots.txt` and `sitemap.xml` return 200 and list all public routes.
- Every landing link returned 200. Client navigation and back/forward moved
  focus to the restored h1.
- The unknown route returns the designed concrete-and-moss 404. Chromium logs
  the expected failed-document 404 line; there is no application exception.
- Live mobile axe scans found no serious or critical issue. The full local
  suite repeated axe checks at desktop and mobile sizes. The factory URL
  verifier reported a title, `lang=en`, one h1, a main landmark, complete alt
  text, labeled buttons, and no console errors.
- The 390 px routes do not overflow. Local keyboard, focus, 44 px target, and
  reduced-motion regressions pass.
- Response headers include a self-only CSP with `frame-ancestors 'none'`, HSTS,
  `nosniff`, a referrer policy, and frame denial.
- The tactile concrete, moss, serif specimen type, stamped controls, field
  marks, and original still-life art are distinct from a generic SaaS template
  and match `.factory/design.md`.

## Missed leverage

F-2-10 covers the missing import path. It is the useful complement to local
JSON export and replay. An AI assistant is not missing leverage here: generated
answers would bypass the deliberate one-line practice and contradict “NO CHAT
REQUIRED.” No model provider key or decorative AI feature is present.

`.factory/brief.json` is not present in this checkout, so this check used the
live product, README, design record, demo contract, and stated local-first job.

## What would make this perfect

Show the selected seed-11 task, fixture, and editable starter in the first
390 × 844 demo viewport, and add a viewport assertion that prevents regression.
List and test the three README build/setup claims. Standardize the practice-unit
term to “drill,” replace the flagged implementation jargon, and remove “THE
WORKBENCH.” Add a namespace-safe JSON import with validation and replay tests.
Then rerun every claim separately, the full suite, build, live request log,
mobile cold read, and route/accessibility checks. There is nothing else to do
only when that rerun produces zero findings.
