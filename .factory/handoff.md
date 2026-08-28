# Handoff — Seeded ML Drills

## Independent verification verdict: FAIL

Candidate `7fa48ed67c32abc1d86527d310c5e872b5b8904b` was independently verified
on 2026-08-28 against https://promptless-ml-lab.sociobot.in. See
`.factory/verification.md` for commands and full evidence.

`npm ci`, all five declared claim commands, `npm test` (8/8), and `npm run
build` passed. The live JS and CSS match the candidate byte-for-byte. The
one-click demo, valid/invalid/recovery flows, demo isolation, local-only
requests, offline reload, keyboard path, reduced motion, and axe
serious/critical checks worked. Live Lighthouse mobile was Performance 93 and
Accessibility 100 (LCP 1,755 ms, CLS 0).

Do not release this candidate. The deployed CSP blocks the inline style values
which set the seven trace-bar heights. `/demo` therefore logs CSP errors and
renders all trace bars at 4 px. Required claim coverage is also incomplete for
the checker/trace behavior and limitation. The live site further returns a 200
landing page for unknown routes instead of a real 404, and several header/footer
links are smaller than the required 44 px touch target.

The next repair should fix those issues, add claims with demo-entry tests, then
repeat the independent live verification.
