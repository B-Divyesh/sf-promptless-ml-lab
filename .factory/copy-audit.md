# Copy audit — polish round 5

Counts treat hyphenated terms, paths, and version strings as one word. No
visitor-facing unit exceeds 22 words or uses a banned marketing word.

The 390 × 844 first-screen check also confirms that all three landing facts
are fully visible before scrolling.

## Landing page

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
| Seven repeated results: 0.9 → 0.1 | 5 | — |
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

## Workbench and import controls

| Copy unit | Words | Flag |
|---|---:|---|
| Demo — sample data, nothing is saved. | 6 | — |
| Reset demo | 2 | — |
| Open your real workbench | 4 | — |
| Run one seeded drill. | 4 | — |
| Complete five distinct drills for one practice set. | 8 | — |
| Read tensor shapes | 3 | — |
| 8 samples × 3 features | 5 | — |
| Return the shape of x. | 6 | — |
| Your PyTorch line | 3 | — |
| Check my answer | 3 | — |
| Restore starter | 2 | — |
| Seven repeated results | 3 | — |
| Replayable run records | 3 | — |
| Import run records | 3 | — |
| Export run records | 3 | — |
| 1 record is ready to import. | 6 | — |
| Import 1 record | 3 | — |
| Cancel import | 2 | — |
| Choose another drill | 3 | — |

## Review finding rewrites

- “Task,” “exercise,” “fixture,” “supported expression,” “contract,” and
  “application shell” no longer name the selectable drill or explain its
  visitor-facing behavior.
- “THE WORKBENCH” was removed from the landing page.
- “Practice reproducible ML models,” “immediate,” and the 6–10 minute estimate
  were removed. The first-screen wording now names fixed PyTorch operations,
  and the adjacent action note describes only the state produced by one click.
- The README uses sentences of 22 words or fewer.
- `@regression:review-copy` rejects every retired phrase and
  `@regression:plain-words` checks visible sentence lengths and banned words.

## Catalog description

| Copy unit | Words | Characters | Flag |
|---|---:|---:|---|
| Practice PyTorch operations through 30 fixed drills with browser checks. | 10 | 70 | — |

It begins with a verb and stays below the 120-character limit.

## Terminology

| Concept | Product word |
|---|---|
| Selectable practice unit | drill |
| Instruction within a drill | task |
| Tiny fixed data | inputs or dataset |
| Saved outcome | run record |
| Seven repeated metric values | results |
| Sample-only mode | demo |
| Personal, non-demo workspace | real workbench |
