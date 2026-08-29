# Handoff — adversarial first-read review 4

## Result: FAIL

Review 4 was completed against candidate
`06a15987b9e5f9466c4987223e46931898ceed9f` and the live deployment at
https://promptless-ml-lab.sociobot.in. No product code was changed. The complete
report is `.factory/review-4.md`.

The cold first read, one-click sample, demo isolation/reset, live import and
replay, offline behavior, routes, 404, link crawl, metadata, focus, request
privacy, and accessibility checks pass. All 22 declared claim commands pass
separately. The verdict is FAIL because four claim-coverage findings remain:

- F-4-1: privacy and terms make stronger code/identity no-upload statements
  than the manifest and test cover.
- F-4-2: the five-distinct-drill practice-set counter has no claim entry.
- F-4-3: `offline-reload` does not assert that saved records remain available.
- F-4-4: `import-namespace` tests demo-mode import isolation but not real mode.

## Verification performed

- Clean clone: `/tmp/promptless-review4-clean-rkG7k0/repo` at `06a1598`.
- `npm ci`: passed; zero audit vulnerabilities.
- Every `.factory/claims.json` command: 22/22 passed separately, one tagged test
  each.
- `npm test`: 44/44 passed.
- `npm run lint`, `npm run build`, and `npm audit`: passed.
- Build: 10.68 kB gzip initial JavaScript and 3.35 kB gzip CSS.
- Factory URL verifier: `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and
  `/terms` passed with no console errors.
- Live Axe checks: zero serious or critical violations on every valid route and
  the 404.
- Live request log: eight requests, all same-origin GETs.
- Live malformed/valid/duplicate import, count preview, namespace isolation,
  Replay, Reset, real-workbench exit, saved-record offline reload, route focus,
  Back, metadata, assets, full link crawl, and HTTP 404 checks passed.

## Next steps

Implement the four concrete claim-test changes in `.factory/review-4.md`, then
rerun each claim command, the full suite, and the live sandbox checks. Do not
mark the product PASS until all four findings are closed.
