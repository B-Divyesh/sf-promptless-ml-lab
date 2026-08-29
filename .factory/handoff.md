# Handoff — independent verification 5

## Release result

**FAIL** for candidate `a6958b33c35a158d8959129e18e0a3c255a2a535` at
https://promptless-ml-lab.sociobot.in, verified 2026-08-29 UTC.

The deployment is healthy and matches the candidate. All 15 declared claim
commands, the 32-test suite, type check, production build, production audit,
performance budgets, privacy checks, offline reload, responsive checks, and
serious/critical axe checks passed. Release is blocked by a core drill whose
visible instruction and accepted answer contradict each other.

## Release blocker

**High — drill 25 rejects its own stated operation.** “Spot an overfitting gap”
says “Subtract validation loss from train loss.” With `train_loss = 0.21` and
`val_loss = 0.52`, the instruction-following expression
`train_loss - val_loss` is rejected live. The opposite expression
`val_loss - train_loss` passes and produces the advertised `+0.31`.

This also makes the registered claim “Each of the 30 drills checks its stated
operation against fixed exercise data” false. Its test passes only because it
reads the answer from the same contract that disagrees with the displayed
task.

Repair `src/drills.ts:36` and the corresponding test so the task, expected
result, and independently asserted answer agree. The current “6 epoch trace”
dataset label is also not represented by the two-scalar fixture.

## Verification summary

- `npm ci`: PASS
- Every command in `.factory/claims.json`: PASS, 15/15
- `npm run lint`: PASS
- `npm test -- --reporter=dot`: PASS, 32/32
- `npm run build`: PASS; `dist/` produced
- `npm audit --omit=dev`: PASS, zero production vulnerabilities
- Live artifact identity: PASS; HTML, JS, CSS, worker, hero, and SW hashes match
- Live privacy: PASS; only same-origin GETs, no console/page errors
- Desktop/390 px axe: PASS; zero serious/critical findings on all routes
- Offline reload/SW update: PASS
- Lighthouse mobile: 90 performance, 100 accessibility, 100 best practices,
  100 SEO; LCP 1.751 s, CLS 0

One non-blocking keyboard issue remains: browser Back returns focus to `body`
instead of restoring it to the prior link or landing h1.

## Evidence and reproduction

Full findings, exact claim commands, hashes, headers, sizes, and reproduction
are in `.factory/verification-5.md`. Screenshots are in
`.factory/verification-evidence/`.

To reproduce the blocker:

1. Open `https://promptless-ml-lab.sociobot.in/demo`.
2. Select **Spot an overfitting gap**.
3. Add `train_loss - val_loss` after the starter and run checks: **Not yet**.
4. Replace it with `val_loss - train_loss`: **Passed**.

No product code was modified. Only independent QA evidence and factory reports
were added or updated.
