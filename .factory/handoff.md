# Handoff — perfection loop round 2

## Result

**PASS.** Every finding in `.factory/review-1.md` and
`.factory/review-2.md` is closed. The repaired static site is live at
https://promptless-ml-lab.sociobot.in from repair commit
`74e0fd0def968336e69180594007dd8e608a5d5a`.

The demo now opens with the active seed-11 drill before the catalog on mobile.
At 390×844, the drill title, dataset, expected result, task, and editable
starter all intersect the first viewport. The persistent banner supports Reset
demo and Open your real workbench on both `/demo` and `/?demo=1`.

Run-record JSON can now be imported locally. The app checks the format,
version, drill IDs, seeds, timestamps, code size, and seven numeric results. It
previews the count before confirmation, rejects malformed and duplicate
records, caps the combined history at 100, writes only to the active storage
namespace, and replays imported records.

The copy now uses “drill” consistently and removes every flagged phrase. The
README claims for build output and deployment behavior are declared and
tested. The former emulator install claim was replaced by a command-only
instruction, and its vulnerable dependency was removed. `npm audit` now
reports zero vulnerabilities.

## Verification

- Clean clone: `/tmp/promptless-polish2-Mh26uu/repo` at the repair commit.
- Claims: all 22 commands in `.factory/claims.json` ran separately; 22/22
  passed and each selected exactly one tagged test.
- Full browser suite: 43/43 passed from the clean clone.
- Static checks: `npm run lint`, `npm run build`, and `npm audit` passed.
- Build budget: initial JavaScript 10.68 kB gzip; CSS 3.34 kB gzip.
- Accessibility: Playwright axe found no serious or critical issues on every
  public route at desktop and mobile sizes. Keyboard, focus, 44 px targets,
  reduced motion, headings, landmarks, labels, and 390 px overflow tests pass.
- Privacy: complete landing, demo, check, import, reset, and offline request
  logs use only the product origin. No analytics, remote fonts, or third-party
  scripts load.
- Offline: `/demo` reloads from a cold service-worker cache after the browser
  context goes offline.
- Routing: `/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and `/terms` return
  200 with route-specific metadata. An unknown route returns the designed 404
  with HTTP 404. Client navigation and browser history restore h1 focus.
- URL verifier: all six live entries passed with zero console errors. Evidence
  is under `.factory/qa-evidence/polish2-live-*`.
- Local Lighthouse mobile: 99 performance, 100 accessibility, 100 best
  practices, 100 SEO; LCP 2.1 s, TBT 10 ms, CLS 0, transfer 198 KiB.
- Live Lighthouse mobile: 100 performance, 100 accessibility, 100 best
  practices, 100 SEO; FCP 0.9 s, LCP 1.7 s, TBT 0 ms, CLS 0, transfer 170 KiB.
- Live acceptance: 4/4 tests in `.factory/live-polish-2.spec.ts` passed.

## Deployment

- Command: `/opt/fleet/lib/deploy-static.sh promptless-ml-lab dist`
- Azure Static Web Apps deployment: `accd111e-c05e-4830-ba64-89ea036392b6`
- Region: `centralus`
- Custom domain: `https://promptless-ml-lab.sociobot.in` returned 200 with
  managed TLS after deployment.
- Cold live bundle reports build `74e0fd0def96`.

## How to verify

```sh
npm ci
npm test
npm run lint
npm run build
npm audit
npx playwright test --config .factory/live-polish-2.config.ts
```

See `.factory/polish-2.md` for the finding-by-finding evidence map.

## Known gaps and next steps

None for the reviewed scope. No finding, deferred minor item, stub, or TODO
remains.
