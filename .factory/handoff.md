# Handoff — adversarial first-read review 5

## Result: FAIL

Reviewed repository candidate `50689c2ddd7e15fe2e3f7a4533c8e152a0899248`
and live build `d717c1068864` at
https://promptless-ml-lab.sociobot.in. No product code was modified.

The detailed report is `.factory/review-5.md`. It records three blocking and
two minor findings. Earlier F-1-1 is reopened because the primary action says
it opens a local run record, but the immediate demo has no record; its tagged
test creates one only after a second action. New blockers cover the overbroad
model-practice headline and the unmeasured 6–10 minute claim. Minor findings
cover unlisted “immediate” speed wording and the missing landing-page product
preview.

## Verification performed

- Fresh live Chromium contexts at 390 × 844 and 1440 × 900.
- Live one-click demo, reset, real-storage sentinel, import/export, replay,
  offline reload, keyboard, focus, route, 404, link crawl, and request-log
  checks.
- Live verification suite: 5/5 passed.
- Every command in `.factory/claims.json` from clean clone
  `/tmp/promptless-review5-iJCjxG/repo`: 24/24 commands passed individually.
- Full clean-clone suite: 47/47 passed.
- `npm run lint`: passed.
- `npm run build`: passed and produced `dist/`.
- `npm audit`: passed with zero vulnerabilities.
- Factory URL verifier: passed on `/`, `/demo`, `/lab`, `/privacy`, and
  `/terms`.
- Axe serious/critical findings: zero across desktop, mobile, and 404 scans.

## Reproduce

```sh
npm ci
npm test -- --reporter=line
npm run lint
npm run build
npm audit
npx playwright test -c .factory/verification-11.config.ts
```

Run every manifest command separately to reproduce the claim matrix. The
passing commands do not resolve the report's claim-quality findings: inspect
the immediate state after selecting the primary action and inspect the body of
`@claim:estimated-drill-duration`.

## Known gaps and next steps

`.factory/brief.json` is absent, so the supplied work order and existing scope
records were used. Apply the concrete copy, claim-test, and landing-preview
fixes in `.factory/review-5.md`, then repeat the full review from a fresh
browser context and clean clone.
