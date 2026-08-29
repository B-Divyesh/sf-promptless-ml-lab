# Handoff — adversarial first-read review 1

## Result

**FAIL.** No product code was modified. The review found one blocking undeclared primary-demo claim and eight minor claim/copy/control findings. Details, exact quotes, word counts, and fixes are in .factory/review-1.md.

## What was verified

- Cold live landing at 390 × 844 and 1280 × 900: job, audience, and primary sample action were visible before scrolling.
- Live /demo: populated first drill, 30 controls, persistent demo banner, reset isolation, Start-for-real exit, and only same-origin GET requests.
- Live /, /demo, /lab, /privacy, /terms, and a missing route: titles, h1/main, canonicals, 404 response, metadata, and target sizing.
- Earlier verification defects were independently checked and confirmed fixed.
- Fresh clone /tmp/promptless-review-Hm3YTJ: npm ci, npm run build, and every individual command listed in .factory/claims.json passed.

## How to reproduce

1. Make a clean clone of /work/repo.
2. Run npm ci and npm run build.
3. Run npm test -- --grep @claim:<id> once for every id in .factory/claims.json.
4. Inspect the live site in fresh 390 px and desktop browser contexts and follow “Try it with sample data”.

## Remaining work

Implement F-1-1 through F-1-9 in .factory/review-1.md, especially missing claim records/tests for the primary sample path, fixture-summary copy, artwork provenance, and no-third-party-runtime statement. Re-run the complete review from a clean clone.
