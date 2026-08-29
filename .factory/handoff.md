# Handoff — adversarial first-read review 3

## Result: FAIL

This reviewer made no product-code changes. The review is committed in
`.factory/review-3.md`.

The live site is clear on a cold read, the one-click demo is isolated, and all
declared quality checks passed. One minor but acceptance-blocking-for-this-round
finding remains: on a 390 × 844 phone, the hero’s third required fact (“Works
offline after your first visit.”) extends below the first viewport.

## How verified

From clean clone `/tmp/promptless-review3-Wp4pHB/repo` at
`b501c0e71332216fa08d69fe39586245e65bb174`:

    npm ci
    npm test
    npm run lint
    npm run build
    npm audit --omit=dev

- All 22 commands in `.factory/claims.json` were run separately and passed.
- The complete Playwright suite passed 43/43; `test-results/.last-run.json`
  records `status: passed`.
- Fresh live 390px and desktop contexts covered first read, demo, storage
  namespace isolation, same-origin request log, routes, back/focus behavior,
  metadata, links, headers, 404, and no-console-error behavior.
- Axe scans at 390px found no violations on the six public routes.

## Remaining work

Implement the concrete fix in F-3-1 and add a 390 × 844 test that asserts all
three hero facts fully intersect the initial viewport. Re-run the claim matrix
and live mobile check afterward.
