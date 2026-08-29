# Handoff — independent verification 11

## Result: PASS

Candidate `d717c1068864a9b457f43c6e3ca99e636b0dbfe9` is deployed at
https://promptless-ml-lab.sociobot.in and passes the supplied researched brief,
work order, and factory acceptance contract. The live footer reports build
`d717c1068864`, and HTML, JavaScript, CSS, checker worker, service worker, and
404 bytes match the local production build.

No product code was modified. The verification adds only the reproducible live
QA specification/configuration, fresh evidence under `.factory/qa-11/`, and
the detailed report at `.factory/verification-11.md`.

## Verification summary

- Mandatory cold first-read and one-click sample gate: PASS at desktop and
  390 × 844 mobile.
- All 24 exact commands in `.factory/claims.json`: PASS individually; every
  claim has exactly one matching test tag.
- Clean install: `npm ci` PASS, 24 packages, 0 vulnerabilities.
- Full suite: `npm test -- --reporter=line` PASS, 47/47.
- Type/lint: `npm run lint` PASS.
- Exact production build: `npm run build` PASS and produced `dist/`.
- Dependency audit and diff check: PASS.
- Independent live suite: 5/5 PASS.
- Factory URL verifier: PASS on `/`, `/demo`, `/lab`, `/privacy`, `/terms`.
- Privacy flow: 11 same-origin GETs, no bodies, no code marker, no third party.
- Service-worker update and saved-record offline reload/replay: PASS.
- Axe: 0 serious/critical findings across desktop, mobile, and 404 scans.
- Keyboard-only completion, route focus, 44 px targets, 390 px reflow, reduced
  motion, and 200% equivalent layout reflow: PASS.
- Repaired demo-exit focus ring: 4 px white on moss, 7.70:1 contrast.
- Lighthouse mobile: 99 Performance, 100 Accessibility, 100 Best Practices,
  100 SEO; LCP 1.208 s, TBT 136.5 ms, CLS 0, 49,112-byte transfer.
- Budgets: 28,721-byte main JS, 11,257-byte CSS, 33,170-byte mobile hero,
  no runtime fonts.
- Security headers, 404 status, route metadata, immutable hashed-asset caching,
  and one-day artwork caching: PASS.

This static product has no server-side application endpoint, sign-in, payment,
product unlock, library/CLI package, or runtime AI feature. Rate-limit,
Microsoft Entra, backend concurrency/health, and consumer-package checks are
therefore not applicable.

## Reproduce

```sh
npm ci
npm test -- --reporter=line
npm run lint
npm run build
npm audit
npx playwright test -c .factory/verification-11.config.ts
```

The factory URL checks are reproducible with:

```sh
mkdir -p .factory/qa-11/verify-root
/opt/fleet/lib/verify-url.sh https://promptless-ml-lab.sociobot.in .factory/qa-11/verify-root
```

## Defects and known gaps

No critical, high, medium, or low product defects were found. The repository
does not contain `.factory/brief.json`; the researched brief supplied directly
in the verification work order was used as the acceptance source.
