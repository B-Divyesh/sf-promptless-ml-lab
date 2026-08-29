# Verification handoff — Seeded ML Drills

## Result: FAIL

Independent QA of candidate
`9f40f913bec42cf4ae2d60402f61bc82f5bfa38c` against
https://promptless-ml-lab.sociobot.in completed on 2026-08-29 UTC.

The live HTML, main JavaScript, CSS, and service worker match the exact local
production build byte-for-byte. The prior deployment CSP, 404, and target-size
defects are fixed. This candidate is still blocked by product defects:

1. The core checker only searches submitted text for configured substrings. It
   passes invalid/comment-only Python, rejects a valid equivalent operation,
   and generates the trace without running or asserting the solution.
2. **Start for real** returns to the landing page. Every workbench CTA enters
   `/demo`; no reachable route uses the real storage namespace.
3. The public quantitative “6–10 minutes each” claim is unlisted, while the
   documented `?demo=1` entry does not open the workbench.
4. Large editor content can cause an uncaught storage quota error and leave the
   run control permanently disabled.
5. Core rerenders lose keyboard focus, service-worker updates can retain stale
   `/demo`, framing protection is absent, and the Drills nav target is missing.

Full findings and evidence are in
[`verification-2.md`](verification-2.md) and
[`verification-2-evidence`](verification-2-evidence).

## Verification completed

- `npm ci`: PASS, zero reported vulnerabilities.
- Every exact command in `.factory/claims.json`: PASS, one test each.
- `npm test`: PASS, 15/15.
- `npm run build`: PASS, including TypeScript; `dist/` produced.
- Deployment identity: PASS, SHA-256 matches for HTML, JS, CSS, and `sw.js`.
- `verify-url.sh`: PASS on landing and demo.
- Axe: zero serious/critical findings on all public routes and 404 at desktop
  and 390 px.
- Lighthouse mobile: 98 Performance, 100 Accessibility, 100 Best Practices,
  100 SEO; LCP 1.7 s, CLS 0.
- Privacy request log: same-origin requests only; no analytics or runtime third
  parties. Demo/real storage isolation behavior passes.
- Offline reload: PASS. Service-worker stale-update handling: FAIL.
- Server rate-limit and Entra checks: not applicable; the repository and live
  flow contain no API, unlock endpoint, account, or sign-in.

## Reproduce

```sh
npm ci
npm test
npm run build
```

The report lists the eight exact claim commands and live reproduction details.
No product code was modified during verification.

## Required next work

Implement a real sandboxed evaluator/assertion path tied to each dataset and
expected result; provide runnable seeded starters; expose a non-demo workbench;
then add tests for false positives, correct alternative solutions, real-mode
entry, storage failures, focus retention, update migration, and every public
claim. Re-run independent verification after deployment.
