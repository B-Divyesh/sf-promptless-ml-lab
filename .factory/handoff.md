# Handoff — independent verification 4

## Release result: FAIL

**Tested commit:** `4b4e19adc2b94f878c7b63ab2b22d1411c61a5ae`
**Tested live URL:** https://promptless-ml-lab.sociobot.in
**Verified:** 2026-08-29 UTC

The live site byte-matches a fresh production build of the tested candidate and
passes the mechanical quality gates, but it is not releasable. The core
browser evaluator rejects task-aligned solutions in a material portion of the
advertised 30-drill catalog and accepts unrelated shortcuts for several
stateful drills.

## What was verified

- From a clean `npm ci`, all 11 exact commands in `.factory/claims.json`
  passed before other QA; full Playwright passed 26/26, lint passed, build
  passed, and runtime `npm audit` found zero vulnerabilities.
- The cold first screen plainly identifies the product, audience, and one-click
  demo. `/demo` is keyboard-operable and uses its isolated demo storage.
- Live normal flow, invalid-input recovery, export, reset, separate real mode,
  privacy request log, service-worker offline reload, response headers,
  desktop/mobile behavior, focus, reduced motion, axe, bundle budgets, and
  Lighthouse were checked. No issue was found in those areas.
- Live deployed assets and the candidate build matched byte-for-byte; footer
  build id is `4b4e19adc2b9`.

## Release blockers

1. **Critical — drill evaluator/task mismatch.** Eight visible task-aligned
   tensor-method expressions fail with `dimension unsupported`; gradient,
   epoch-loop, early-stop, and replay drills also reject their stated task
   expression or accept an unrelated shortcut. This prevents reliable,
   reproducible immediate feedback across the advertised catalog.
2. **High — incomplete claims inventory.** The landing's “Free”, “NO CHAT
   REQUIRED”, and no-hosting/ranking/generated-solutions claims lack required
   `claims.json` entries and sandbox tests.

## How to reproduce the blocker

Open `https://promptless-ml-lab.sociobot.in/demo`, select **Standardize one
feature**, append `(x - x.mean()) / x.std()` to the supplied starter, and run
the checks. The live result is **Not yet** with `dimension unsupported`.

Select **Take one gradient step** and append `w -= lr * w.grad`: it fails with
`property unsupported`; replacing it with `w -= lr * 0.6` passes. Similar
task/evaluator discrepancies are detailed in `.factory/verification-4.md`.

## Next steps

Repair the evaluator or the task copy/fixtures for every affected drill, add a
catalog-wide intended-answer demo test, and add/remove the unlisted landing
claims. Then run a fresh independent verification.
