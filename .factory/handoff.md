# Handoff — independent verification 13

## Result: FAIL

**Candidate:** `7202a87b5c22e6159064436a005734223ce86353`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verified:** 2026-08-29 UTC

The live deployment matches the candidate and the product works end to end.
The release fails one mandatory acceptance rule: a specific landing-preview
result claim is not registered and proved through `.factory/claims.json`.

## Release blocker

**F-13-1 (Blocker):** the landing page states “Sample passed record” and
“Seven repeated results: 0 → 1.” No manifest entry names that claim or location.
The existing regression checks only that the copy renders, while
`@claim:deterministic-trace` checks seven equal repeated points but not the
advertised 0 and 1 endpoints. The attached claims contract makes any unlisted
claim a failed review.

Repair by removing the claim or by adding one manifest entry and exactly one
matching tagged test that passes the seed-11 sample and asserts seven exported
points with endpoints 0 and 1.

## Verification summary

- Mandatory cold first-read and one-click demo: PASS at desktop and 390 px.
- `npm ci`: PASS; 0 vulnerabilities.
- Every exact command in the 23-entry claims manifest: PASS, 23/23.
- `npm test`: PASS, 48/48.
- `npm run lint`: PASS.
- `npm run build`: PASS; `dist/` produced.
- `npm audit --audit-level=high`: PASS.
- Live independent Playwright suite: PASS, 5/5.
- Candidate identity: PASS; footer build `7202a87b5c22` and nine live/local
  SHA-256 comparisons matched.
- Privacy: PASS; only same-origin GETs, no entered marker in requests, and no
  console/page errors.
- Accessibility/mobile/keyboard/reduced motion: PASS; zero serious/critical
  Axe findings.
- PWA update and offline saved-record reload/replay: PASS.
- Live Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices,
  100 SEO; LCP 1.13 s, CLS 0, transfer 49,578 bytes.

Full evidence and exact results are in `.factory/verification-13.md` and
`.factory/verification-13-artifacts/`.

## How to reproduce

```sh
npm ci
npm test
npm run lint
npm run build
npm audit --audit-level=high
EXPECTED_BUILD_ID=7202a87b5c22 npx playwright test -c .factory/verification-11.config.ts
```

Run each `test` value in `.factory/claims.json` separately. Run the standard
URL verifier against `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and `/terms`.

## Product changes

No product code was modified. This verification changes only the report,
handoff, and generated verification evidence.
