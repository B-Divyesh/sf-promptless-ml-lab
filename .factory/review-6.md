# Adversarial first-read review 6 — Seeded ML Drills

**Reviewed:** 2026-08-29 UTC

**Live URL:** https://promptless-ml-lab.sociobot.in

**Repository candidate:** `3ada5ed80056c44cd36556ed467cf1243e591f98`

**Live build:** `9270a26f9b22`

**Verdict:** **FAIL**

The first read, populated sample, real-data isolation, routes, accessibility,
and all 23 listed test commands work. The review still fails because demo run
records persist after three ordinary exits even though the banner says
“nothing is saved” and the demo contract requires data to be discarded when
leaving demo mode. A PASS requires zero findings.

`.factory/brief.json` is absent. Scope was checked against `AGENTS.md`, the
design and demo documents, README, claims manifest, current source, every
earlier review/polish report, and the live product.

## First 30 seconds

Fresh Chromium contexts opened the live root at 390 × 844 and 1440 × 900 with
empty storage and no scroll.

- **What it does:** It provides fixed PyTorch-operation drills checked in the
  browser.
- **For whom:** Self-taught ML learners who want a short drill with a browser
  check.
- **What to click first:** “Try it with sample data.” The adjacent result says,
  “Opens a tensor-shape drill with fixed sample inputs.”

The first-read gate passes. On mobile, the headline ended at y=324.13, the
audience sentence at y=400.13, the primary action at y=467.13, and its outcome
note at y=540.13. The three facts ended at y=584.38, y=610.63, and y=636.88.
All required information is fully visible before scrolling. Desktop also shows
all of it before scrolling. Neither viewport has horizontal overflow or a
console/page error.

## Findings

### Blocking

#### F-6-1 — Demo records survive ordinary exits despite “nothing is saved”

**Exact quote / location:** The persistent `/demo` banner says, “Demo — sample
data, nothing is saved.” The attached demo contract also requires, “Leaving
demo mode discards demo data.”

**Observed live result:** In separate fresh flows, I passed “Read tensor
shapes,” confirmed `demo:seeded-ml-runs` existed, and left `/demo` by each of
these routes:

- the `SEED ML drills` Home link;
- the header `Privacy` link;
- browser Back.

The demo key remained after all three exits. Re-entering `/demo` therefore
restores the prior demo record. Only `Reset demo` and `Open your real
workbench` clear it. The source confirms this: `saveRuns()` writes demo records
to `localStorage`, while cleanup occurs only for `data-exit-demo` and the reset
button.

**Why this blocks:** The demo remains isolated from `real:seeded-ml-runs`, but
it is not discard-on-exit and the absolute banner wording is false in normal
navigation. This is a weak sandbox under the supplied demo standard. The
listed `demo-reset` command passes because it tests the Reset button; it does
not prove the full claim text or any other exit.

**Concrete fix:** Store demo runs in session-scoped storage and centralize demo
cleanup for every transition from `/demo` or `?demo=1` to a non-demo route,
including `popstate`. Keep the real namespace unchanged. Extend the one tagged
demo claim test to pass a drill, leave through Home, Privacy, browser Back, and
the real-workbench action, then assert the demo key is absent and a real-key
sentinel is unchanged. Re-enter demo after each exit and assert an empty record
list. Keep Reset coverage and offline reload coverage.

### Minor

None.

## Copy audit

Counts follow visible copy units; hyphenated terms, paths, and numeric
expressions count as one unit. Navigation, headings, labels, controls, and
meaningful alt text are included because the requested checks also apply to
them. No landing or README unit exceeds 22 words. No banned marketing word,
unexplained metaphor heading, inconsistent practice-unit term, or
non-result-naming action was found.

### Landing page

| Copy unit | Words | Flag |
|---|---:|---|
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
| A concrete workbench with moss growing along a plotted learning curve. | 11 | — |
| Sample drill preview | 3 | — |
| Read tensor shapes | 3 | — |
| See the fixed inputs and expected result before opening the sample. | 11 | — |
| Try this sample drill | 5 | — |
| Seed | 1 | — |
| Dataset | 1 | — |
| 8 samples × 3 features | 5 | — |
| Task | 1 | — |
| Return the shape of x. | 6 | — |
| Expected result | 2 | — |
| (8, 3) | 1 | — |
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
| Terms | 1 | — |
| Built by Param Factory | 4 | — |

### README

| Sentence or copy unit | Words | Flag |
|---|---:|---|
| Seeded ML Drills | 3 | — |
| Practice PyTorch operations in fixed drills. | 6 | — |
| Seeded ML Drills gives self-taught ML learners one short PyTorch drill with a browser check. | 15 | — |
| You do not need to choose a project or ask a chatbot. | 12 | — |
| It has 30 drills with fixed seeds, toy datasets, browser checks, and exportable local run records. | 16 | — |
| Try the sample | 3 | — |
| Open `/demo` after starting the app. | 6 | — |
| The demo opens a tensor-shape drill with fixed sample inputs and seed 11. | 13 | — |
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
| `npm run build` creates `dist/index.html` and the static deployment assets. | 10 | — |
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

The terminology is consistent: **drill** is the selectable practice unit,
**task** is its instruction, **inputs/dataset** are its fixed data, **run
record** is the saved result, **demo** is sample mode, and **real workbench**
is non-demo mode. “PyTorch,” “tensor,” and “seed” are necessary domain terms
for the named ML-learning audience.

## Demo and sandbox behavior

The one-click path itself passes. On the 390 × 844 live page, `/demo` shows the
persistent banner, Reset, the real-workbench exit, “Read tensor shapes,” seed
11, the 8 × 3 dataset, task, expected result, and editable starter. The editor
starts at y=680.80 and intersects the first viewport. Desktop shows the
selected task and fixed sample data on its first screen. Direct `/demo` and
`/?demo=1` work.

Passing the drill writes only `demo:seeded-ml-runs`; a preloaded
`real:seeded-ml-runs` sentinel remains byte-for-byte unchanged. Reset removes
the demo key and preserves the real key. Opening the real workbench removes the
demo key and writes later records only to `real:`. The live landing, demo,
checker, and reset flow made only five same-origin GET requests: document,
hashed JavaScript, hashed CSS, responsive artwork, and checker worker. There
were no request bodies, analytics, remote fonts, provider calls, console
errors, or page errors. Offline saved-record reload and replay pass.

F-6-1 is the remaining sandbox failure: the Home, Privacy, and Back exits leave
the persistent demo key behind.

## Claims

A clean clone at `/tmp/promptless-review6-ZodErb/repo` was created from
`3ada5ed80056c44cd36556ed467cf1243e591f98`. `npm ci` installed the lockfile
with zero vulnerabilities. Every exact command in `.factory/claims.json` ran
separately and selected one passing tagged test.

| Claim id | Listed command result |
|---|---|
| `local-browser-runs` | PASS |
| `export-record` | PASS |
| `import-records` | PASS |
| `import-namespace` | PASS |
| `import-replay` | PASS |
| `demo-reset` | PASS — incomplete semantic coverage; see F-6-1 |
| `one-click-sample` | PASS |
| `no-third-party-runtime` | PASS |
| `build-output` | PASS |
| `deployment-config` | PASS |
| `offline-reload` | PASS |
| `thirty-open-drills` | PASS |
| `catalog-evaluator` | PASS |
| `fixture-evaluator` | PASS |
| `fixture-counterexamples` | PASS |
| `deterministic-trace` | PASS |
| `no-arbitrary-pytorch` | PASS |
| `real-workbench` | PASS |
| `free-access` | PASS |
| `no-chat-required` | PASS |
| `scope-limits` | PASS |
| `no-code-or-identity-upload` | PASS |
| `five-drill-practice-set` | PASS |

The full clean-clone suite passed 48/48. `npm run lint`, `npm run build`, and
`npm audit --audit-level=high` passed. The build produced `dist/index.html`;
initial JavaScript is 10.92 kB gzip and CSS is 3.55 kB gzip.

Every claim-like sentence on the landing page, workbench, Privacy, Terms, and
README maps to the manifest. No unlisted claim was found. Coverage is still a
FAIL because `demo-reset` does not test the full “nothing is saved” wording,
and the stricter live discard-on-exit check fails for all three tested exits.

## Earlier findings and regression check

Every earlier `.factory/review-*.md`, `.factory/polish-*.md`, and the previous
handoff was read. The current live build and unchanged product source were
checked independently for each numbered finding.

| Earlier finding | Current confirmation |
|---|---|
| F-1-1 | Fixed: the action now promises fixed sample inputs, and the immediate post-click state has them without claiming a pre-created record. |
| F-1-2 | Fixed: landing uses the tested operation/fixed-data statement. |
| F-1-3 | Fixed: artwork provenance is absent from visitor copy and remains documented in `design.md`. |
| F-1-4 | Fixed: runtime-resource privacy is listed; local and live request logs are same-origin only. |
| F-1-5 | Fixed: README opening is split; no unit exceeds 22 words. |
| F-1-6 | Fixed: the section is named “How the drills work.” |
| F-1-7 | Fixed: the empty hero slogan remains absent. |
| F-1-8 | Fixed: controls say “Check my answer” and “Open your real workbench.” |
| F-1-9 | Fixed: the catalog heading says “Choose a short ML drill.” |
| F-2-1 | Fixed: the selected seed, dataset, task, result, and editor intersect the first 390 × 844 demo viewport. |
| F-2-2 | Fixed: README gives command-only install guidance; clean `npm ci` passes. |
| F-2-3 | Fixed: `build-output` passes and `dist/index.html` exists. |
| F-2-4 | Fixed: deployment wording is plain; direct routes, 404, caching, CSP, and `nosniff` pass. |
| F-2-5 | Fixed: **drill** names the selectable unit; **task** only labels its instruction. |
| F-2-6 | Fixed: landing explains the named operation and seven repeated results. |
| F-2-7 | Fixed: README uses answer-line and fixed-input wording rather than evaluator jargon. |
| F-2-8 | Fixed: offline copy describes the result without “application shell.” |
| F-2-9 | Fixed: “THE WORKBENCH” remains absent. |
| F-2-10 | Fixed: import validates, previews, isolates both namespaces, rejects duplicates, and replays. |
| F-3-1 | Fixed: the three mobile facts end at y=584.38, y=610.63, and y=636.88. |
| F-4-1 | Fixed: the privacy test uses a unique marker and inspects URLs, methods, headers, and bodies. |
| F-4-2 | Fixed: the five-distinct-drill counter, deduplication, reload, reset, and isolation test passes. |
| F-4-3 | Fixed: a saved record survives offline reload and replays from the service worker. |
| F-4-4 | Fixed: import isolation is tested in both demo and real workbenches. |
| F-5-1 | Fixed: the h1, metadata, README, and catalog description accurately say PyTorch operations, not model practice. |
| F-5-2 | Fixed: the unmeasured 6–10 minute estimate and claim are absent. |
| F-5-3 | Fixed: unmeasured “immediate” speed wording is absent. |
| F-5-4 | Fixed: the landing page includes the seed-11 read-only sample preview before the catalog. |

No earlier numbered finding is reopened. The older non-numbered boundaries
also pass: fixture-aware checking, reachable real workbench, oversized-input
recovery, rerender focus, fresh service-worker navigation, CSP-safe trace
bars, HTTP 404, 44 px targets, 390 px reflow, and drill 25 subtraction
semantics.

## Structure, routes, accessibility, and identity

| Route | HTTP | Title | h1 / main | Serious or critical Axe findings |
|---|---:|---|---:|---:|
| `/` | 200 | Seeded ML Drills — Practice PyTorch operations | 1 / 1 | 0 |
| `/demo` | 200 | Demo — Seeded ML Drills | 1 / 1 | 0 |
| `/lab` | 200 | Workbench — Seeded ML Drills | 1 / 1 | 0 |
| `/privacy` | 200 | Privacy — Seeded ML Drills | 1 / 1 | 0 |
| `/terms` | 200 | Terms — Seeded ML Drills | 1 / 1 | 0 |
| unknown path | 404 | Not found — Seeded ML Drills | 1 / 1 | 0 |

Each valid route has `lang=en`, a route-specific description and canonical,
ordered headings, the consistent header/footer, legal links, a skip link, and
one h1/main. The 1200 × 630 OG image, SVG favicon, 180 × 180 touch icon,
`robots.txt`, sitemap, response CSP, and security headers are present. The
sitemap lists all five public routes. A crawl across every route found five
unique internal destinations; all returned 200. The designed concrete-and-moss
404 returned 404 and provided a route home.

Client navigation and browser history focus the new or restored h1 and update
the polite announcement. The clean live suite passed 5/5 across desktop and
mobile, including keyboard operation, visible 3:1 focus, 44 px targets,
reduced motion, reflow, metadata, headers, service-worker update, offline
replay, and Axe. The concrete-and-moss palette, generated still life, serif
specimen voice, squared slabs, seed stamps, and field-note texture match
`.factory/design.md` and are distinct from a generic SaaS template.

## Missed leverage

No additional feature finding. Import, export, replay, offline use, an isolated
sample, and a separate real workbench cover the obvious local-first extensions
of this drill flow. Generated answers would bypass the deliberate practice
task, so an AI assistant is not implied. No provider key or decorative AI
control is present.

## What would make this perfect

Close F-6-1 by making every demo exit discard demo records and by testing all
exit paths under the one tagged demo claim. Re-run the 23-command clean-clone
claim matrix, the full suite, and the live Home/Privacy/Back storage checks.
Nothing else was found in this round.
