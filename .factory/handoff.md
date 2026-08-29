# Handoff — polish round 3

## Result: PASS

All findings in `.factory/review-1.md`, `.factory/review-2.md`, and
`.factory/review-3.md` are closed. The mobile landing now fits all three plain
facts inside a cold 390 × 844 first screen. The one-click and `?demo=1` sample
paths remain isolated, and every earlier copy, claim, import, evaluator,
routing, focus, 404, legal, accessibility, privacy, offline, and mobile fix was
retested.

Repair commit: `55ab660e4861af1995d217982fe81c28f88e5a48`

Deployment: `14569ece-61a5-4654-ac7e-259de3a23aa1`

Live URL: https://promptless-ml-lab.sociobot.in

## What changed

- Reduced the ≤410px landing-facts margin from 28px to 18px. At 390 × 844,
  the three fact bottoms now measure 790.91, 817.16, and 843.41 px.
- Added `@regression:first-screen-facts`, which checks all three exact facts
  and requires every full bottom edge to fit inside the initial viewport.
- Updated the verb-first, 68-character catalog description to: “Practice
  PyTorch with 30 seeded drills and immediate browser checks.”
- Updated `.factory/copy-audit.md` and added `.factory/polish-3.md` with the
  complete F-1-1 through F-3-1 evidence map.

## How to verify

    npm ci
    npm test
    npm run lint
    npm run build
    npm audit

To repeat one declared claim, run its exact command from
`.factory/claims.json`. To repeat the deployed acceptance suite, run:

    npx playwright test --config=.factory/live-polish-3.config.ts

Clean-clone evidence came from `/tmp/promptless-polish3-clean-2EdBms/repo` at
the repair commit. All 22 claim commands passed separately and selected one
test each. The full browser suite passed 44/44. Type checking, production
build, and audit passed; audit found zero vulnerabilities. The build produced
10.68 kB gzip of initial application JavaScript and 3.35 kB gzip of CSS.

The factory URL verifier passed `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`,
and `/terms` locally and live with zero console errors. The live acceptance
suite passed 5/5. Axe found no serious or critical issues at desktop or 390px.
The unknown route returned the designed 404 with HTTP 404. Security headers,
same-origin-only requests, offline reload, demo reset, import replay, and
namespace isolation all passed.

Local Lighthouse mobile scored 99 Performance, 100 Accessibility, 100 Best
Practices, and 100 SEO (LCP 2.10 s, TBT 0 ms, CLS 0). Live Lighthouse mobile
scored 100 in all four categories (FCP 0.91 s, LCP 1.73 s, TBT 2 ms, CLS 0).
Reports and screenshots are under `.factory/qa-evidence/polish3-*`.

## Known gaps and next steps

None. No review finding, failed check, stub, or implementation TODO remains.
