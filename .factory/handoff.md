# Handoff — polish round 1

## Result

**PASS.** All nine findings in `.factory/review-1.md` are fixed. No earlier review or polish report exists, and all earlier verification regressions summarized by the review remain fixed. The static Vite artifact is live at https://promptless-ml-lab.sociobot.in.

## What changed

- Added declared, isolated claim tests for the landing-to-demo outcome and the no-third-party-runtime statement. `.factory/claims.json` now has 17 claims, each with exactly one tagged browser test.
- Preserved `/demo` and made `/?demo=1` an equally complete isolated sample entry with the persistent banner, reset action, separate `demo:` storage, and “Open your real workbench” exit.
- Rewrote every flagged copy unit. The catalog now states the already-tested evaluator contract; the untestable artwork claim and empty slogan are gone.
- Added exact per-route titles, descriptions, social titles, canonical URLs, h1 focus, and a polite route announcement. The real 404 and legal links remain intact.
- Expanded regression coverage for 390 px reflow, above-fold primary action, route metadata, route focus, direct-query demo reset, and review wording.
- Widened the desktop hero heading after manual live inspection so “reproducible” does not split mid-word. The concrete-and-moss identity, original art, and static deployment class are unchanged.
- Added the verb-first 87-character catalog line in `.factory/catalog-description.txt` and refreshed `.factory/copy-audit.md`.

The finding-by-finding change and evidence map is in `.factory/polish-1.md`.

## Verification

Run from a clean clone with Playwright 1.58.2 pinned:

```sh
npm ci
npm run lint
npm test -- --reporter=dot
npm run build
npm audit --omit=dev
```

- Final clean clone: `/tmp/promptless-polish-final-G5yI0Z/repo` at commit `8d65f0d6f9bf49e06179c13baf8564bb96caca2d`.
- Every command in `.factory/claims.json` ran independently: 17/17 passed and each selected exactly one test.
- Full Playwright suite: 37/37 passed. It covers all 30 evaluator contracts, demo and real storage isolation, export/replay, offline refresh and reload, keyboard/focus behavior, mobile reflow, touch targets, security headers, real routing/404, privacy requests, and serious/critical axe checks.
- TypeScript lint and production build passed. `dist/index.html` is present.
- Production dependency audit: zero vulnerabilities. The four `npm ci` advisories are development-only dependencies used by the local Static Web Apps emulator.
- Build sizes: main JS 25.79 kB raw / 9.79 kB gzip; checker worker 11.76 kB; CSS 10.13 kB raw / 3.11 kB gzip; hero WebP 157.9 kB. The first-load budgets are met.
- `verify-url.sh` passed local and live `/`, `/demo`, and `/?demo=1`: HTTP 200, no console errors, one h1, `lang=en`, main landmark, and complete alt text.
- Live Playwright polish suite: 5/5 passed after the final product deployment. It rechecks all current findings and the earlier regression boundaries.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.7 s, TBT 40 ms, CLS 0, transfer 169 KiB.

Evidence:

- Landing: `.factory/qa-evidence/polish1-live/screenshot-desktop.png` and `screenshot-mobile.png`
- Demo: `.factory/qa-evidence/polish1-live-demo/screenshot-desktop.png` and `screenshot-mobile.png`
- Query demo: `.factory/qa-evidence/polish1-live-query/screenshot-desktop.png` and `screenshot-mobile.png`
- Lighthouse: `.factory/qa-evidence/polish1-live-lighthouse.json`
- Live assertions: `.factory/live-polish-1.spec.ts`

## Deployment

The final product artifact was built from commit `bc8dac980268` and deployed with:

```sh
/opt/fleet/lib/deploy-static.sh promptless-ml-lab dist
```

Azure Static Web Apps deployment `08c069c8-bd00-40bf-918c-859c7390c5d6` succeeded in `centralus`. The custom domain returned 200 over managed TLS. `/not-a-real-drill-polish-1` returned 404. The live main JS and CSS hashes matched the local `dist/` files byte-for-byte. The live footer reports build `bc8dac980268`.

## Known gaps

No unresolved review finding or known product defect remains. The browser evaluator intentionally supports the documented one-line operation set instead of arbitrary Python or PyTorch. Backend, payment, account, tenant, and rate-limit checks do not apply to this local-first static product.
