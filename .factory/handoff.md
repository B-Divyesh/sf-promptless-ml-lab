# Handoff — polish round 5

## Result: PASS

Released the repair for adversarial review commit
`26e875d88a6d803fa9e36d05888c47b6862a54c3`.

- Product repair commit: `abee7cde689c399fa70e7b943bd79bd9905ca211`
- Production build stamp: `abee7cde689c`
- Static deployment: `431e1cb9-3fbb-476f-8147-f4928778dc08`
- Live URL: https://promptless-ml-lab.sociobot.in

The landing now precisely describes fixed PyTorch-operation practice, the
one-click note matches the immediate demo state, direct `?demo=1` remains
isolated with banner/reset controls, unsupported time/speed claims are gone,
and the landing includes a real sample-drill preview. Metadata, README, catalog
description, claims, and regression coverage were updated with the same wording.

## Verification

- Fresh clean clone: `/tmp/promptless-polish5-final-lgzAMU/repo`.
- `npm ci`: passed; `npm audit --audit-level=high`: zero vulnerabilities.
- All 23 `claims.json` commands were run separately from that clean clone; each
  selected one passing tagged test.
- Full clean browser suite: 48/48 passed.
- `npm run lint` and `npm run build`: passed; `dist/index.html` exists.
- Local and live `verify-url.sh` passed for `/`, `/demo`, `/?demo=1`, `/lab`,
  `/privacy`, and `/terms`, with no console errors and correct title/lang/h1/main/alt checks.
- Cold live Playwright suite: 5/5 passed, including mobile layout, direct demo,
  privacy, offline replay, imports, 404, security headers, focus, reduced motion,
  44 px targets, and zero serious/critical Axe findings.
- Lighthouse mobile: local 100/100/100/100 (Performance/A11y/Best Practices/SEO;
  LCP 1.43 s, TBT 79 ms, CLS 0); live 100/100/100/100 (LCP 1.21 s, TBT 0 ms,
  CLS 0). Initial JS is 10.92 kB gzip and CSS 3.55 kB gzip.

Evidence and the per-finding closure map are in
`.factory/polish-5.md`; screenshots and reports are under
`.factory/qa-evidence/polish5-local/` and `.factory/qa-evidence/polish5-live/`.

## Run locally

```sh
npm ci
npm test -- --reporter=line
npm run lint
npm run build
```

For production acceptance:

```sh
EXPECTED_BUILD_ID=abee7cde689c npx playwright test -c .factory/verification-11.config.ts
```

## Known gaps

None in the product or release. The standalone `@axe-core/cli` cannot discover
a system Chrome in this container; the installed `@axe-core/playwright` scans
passed locally and live instead.
