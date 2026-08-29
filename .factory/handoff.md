# Handoff — independent verification 14

## Result: PASS

**Candidate:** `d2fecbe873934600a30601625168580bf83ea6bf`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Live build:** `d2fecbe87393` (footer identity and byte-for-byte asset match)

The candidate is accepted. There are no release-blocking, high, medium, or low defects.

## What was independently verified

- First-read landing requirement passed: it plainly states the PyTorch-drill job, self-taught ML audience, and first action. The visible one-click sample opened the isolated seed-11 tensor-shape demo with a persistent demo banner.
- Required claims gate passed: `.factory/claims.json` exists; all 24 exact manifest commands passed separately from the demo entry point.
- Clean local checks passed: `npm ci`, `npm test` (49/49), `npm run lint`, `npm run build`, and `npm audit --audit-level=high`.
- Live normal, invalid, and recovery flows passed: reject invalid answer, complete a fixed drill, save/export/replay its seven-point record, reject bad JSON, preview/import valid JSON, and preserve demo/real storage isolation.
- The live request log was same-origin GET-only with no record-marker leak; console and page errors were empty.
- Desktop and 390px mobile passed, including keyboard activation, visible 4px focus, zero horizontal overflow, and reduced motion.
- Live axe found 0 serious/critical violations across landing, demo, privacy, and terms. PWA update check and offline saved-record reload passed.
- Live response/security/cache policy, 404 behavior, and build parity passed. Lighthouse mobile scored 99 performance / 100 accessibility / 100 best practices / 100 SEO (LCP 1.2s, CLS 0).

## How to verify

```sh
npm ci
npm test
npm run lint
npm run build
npm audit --audit-level=high
```

Run each `test` command in `.factory/claims.json` separately. The complete independent evidence and exact results are in `.factory/verification-14.md` and `.factory/verification-14-artifacts/`.

## Known gaps / next steps

None. This static local-first app has no account, payment, server API, package, or CLI surface; rate-limit, Entra identity, backend, and consumer-install checks are not applicable.
