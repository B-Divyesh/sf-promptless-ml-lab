# Independent product verification 10 — FAIL

**Candidate:** `29d8f3c4f04a0bb2fc86d661e2055848f7456c3b`  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Verified:** 2026-08-29 UTC  
**Acceptance result:** **FAIL**

The candidate is deployed, matches the local production build byte for byte,
and passes its functional, privacy, offline, performance, and automated
accessibility gates. It is not releasable because one keyboard focus indicator
has only `1.25:1` contrast against its background. The attached accessibility
contract requires at least `3:1`.

## Mandatory first-read gate

**PASS.** A cold 1440 × 900 visit states all three required facts in the first
viewport:

- What: “Practice reproducible ML models.”
- Who: “For self-taught learners who need one short ML drill and a check now.”
- First action: **Try it with sample data**, beside “Opens a seeded drill and
  local run record.”

The same content, action, and all three fact lines fit at 390 × 844 with no
horizontal overflow. One click opens `/demo`, shows “Demo — sample data,
nothing is saved,” and loads the seed-11 tensor-shape drill, editor, run-record
area, reset control, real-workbench exit, and 30-drill catalog. Evidence:
`verification-10-evidence/root/screenshot-mobile.png` and
`verification-10-evidence/demo/screenshot-desktop.png`.

## Required claims gate

`.factory/claims.json` exists with 24 entries, and each ID occurs exactly once
as an `@claim:<id>` test. The untouched checkout initially had no installed
local Playwright dependency; after the required clean `npm ci`, every exact
manifest command was run separately against the shipped demo and selected one
passing test.

| Claim | Exact command | Result |
|---|---|---|
| `local-browser-runs` | `npm test -- --grep @claim:local-browser-runs` | PASS |
| `export-record` | `npm test -- --grep @claim:export-record` | PASS |
| `import-records` | `npm test -- --grep @claim:import-records` | PASS |
| `import-namespace` | `npm test -- --grep @claim:import-namespace` | PASS |
| `import-replay` | `npm test -- --grep @claim:import-replay` | PASS |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | PASS |
| `one-click-sample` | `npm test -- --grep @claim:one-click-sample` | PASS |
| `no-third-party-runtime` | `npm test -- --grep @claim:no-third-party-runtime` | PASS |
| `build-output` | `npm test -- --grep @claim:build-output` | PASS |
| `deployment-config` | `npm test -- --grep @claim:deployment-config` | PASS |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `thirty-open-drills` | `npm test -- --grep @claim:thirty-open-drills` | PASS |
| `catalog-evaluator` | `npm test -- --grep @claim:catalog-evaluator` | PASS |
| `fixture-evaluator` | `npm test -- --grep @claim:fixture-evaluator` | PASS |
| `fixture-counterexamples` | `npm test -- --grep @claim:fixture-counterexamples` | PASS |
| `deterministic-trace` | `npm test -- --grep @claim:deterministic-trace` | PASS |
| `no-arbitrary-pytorch` | `npm test -- --grep @claim:no-arbitrary-pytorch` | PASS |
| `estimated-drill-duration` | `npm test -- --grep @claim:estimated-drill-duration` | PASS |
| `real-workbench` | `npm test -- --grep @claim:real-workbench` | PASS |
| `free-access` | `npm test -- --grep @claim:free-access` | PASS |
| `no-chat-required` | `npm test -- --grep @claim:no-chat-required` | PASS |
| `scope-limits` | `npm test -- --grep @claim:scope-limits` | PASS |
| `no-code-or-identity-upload` | `npm test -- --grep @claim:no-code-or-identity-upload` | PASS |
| `five-drill-practice-set` | `npm test -- --grep @claim:five-drill-practice-set` | PASS |

Cross-checking the rendered landing, demo, privacy, terms, README, demo guide,
and copy audit found no unlisted material product promise.

## Clean local gates and build budgets

- `npm ci`: PASS; 24 packages, 0 vulnerabilities.
- `npm test`: PASS; 46/46 Playwright tests.
- `npm run lint`: PASS; `tsc --noEmit`.
- `npm run build`: PASS; exact Vite production build produced `dist/`.
- `npm audit`: PASS; 0 vulnerabilities.
- `git diff --check`: PASS.
- Main JS: 28,721 bytes raw / 10,720 bytes gzip.
- Checker worker: 11,756 bytes raw / 4,474 bytes gzip.
- CSS: 11,231 bytes raw / 3,362 bytes gzip.
- Initial HTML + CSS + JS: 14,662 bytes gzip.
- Mobile hero: 33,170 bytes; desktop hero: 157,900 bytes.

All static budgets pass: initial JS is below 200 KB, CSS below 50 KB, and the
mobile hero below 300 KB. No remote font is used.

## Independent end-to-end exercise

Fresh live-browser checks covered the representative and failure paths:

- Keyboard-only entry reaches the skip link first, then activates the sample
  action with Enter. Route navigation moves focus to the new `h1`.
- All 30 drills are enabled. A comment-only answer is rejected, a 100,001
  character answer receives a recoverable size error, Restore starter returns
  focus to the editor, and `x.shape` passes against the fixed seed-11 data.
- The saved record contains the pass state, seed, source, version, and seven
  trace points. JSON export, replay, and reset work. Reset preserves a real-mode
  sentinel.
- Malformed and larger-than-2-MB import files are rejected with next steps. A
  valid record is previewed before import; cancel changes nothing; a duplicate
  is rejected. Demo and real imports stay in separate storage namespaces.
- Five distinct drills advance the practice set from 0/5 through 5/5, persist
  on reload, deduplicate repeated drills, and reset cleanly.
- A controlled stale `/demo` cache entry is replaced online; the refreshed
  demo and its saved record then reload and replay offline.
- At 390 px there is no horizontal overflow and every visible link, button,
  and select measures at least 44 × 44 CSS pixels. Key workbench content remains
  present at 200% browser zoom. Reduced-motion emulation leaves no non-zero
  animation or transition duration.

## Privacy, routes, headers, and deployment identity

The complete landing/privacy/demo/check/export/reset/offline flow made 18
requests. Every request was a same-origin GET. A separate live import flow had
the same result. A unique code marker appeared in no URL, header, or body. No
analytics, remote font, third-party script, API, account, identity, payment, or
product-unlock request was observed.

This is a static product with no server-side endpoint or sign-in. Rate-limit,
429/`Retry-After`, backend concurrency, health, consumer-package, and Microsoft
Entra authority checks are therefore not applicable.

`/`, `/demo`, `/?demo=1`, `/lab`, `/privacy`, and `/terms` return 200. The
designed unknown route returns its 404 document with HTTP 404. Every crawled
site link resolves. The factory `verify-url.sh` passed all six public entry
routes with one `h1`, one `main`, `lang=en`, labelled images and controls, and
no console/page errors.

The live footer reports build `29d8f3c4f04a`. Local and live bytes match for
`index.html`, main JS, CSS, checker worker, service worker, and 404 page. Live
headers include HSTS with `includeSubDomains`, `nosniff`, strict referrer
policy, `X-Frame-Options: DENY`, and a self-only CSP with
`frame-ancestors 'none'`. HTML and `sw.js` revalidate after 30 seconds, hashed
JS/CSS are immutable for one year, and mutable artwork caches for one day.

## Accessibility and performance

Ten axe scans across `/`, `/demo`, `/lab`, `/privacy`, and `/terms` at desktop
and 390px mobile found **0 serious, 0 critical, and 0 total violations**. The
mobile 404 also had zero serious/critical violations. Heading order, labels,
landmarks, alt text, route focus, history focus, skip navigation, touch sizes,
reflow, and reduced motion otherwise passed.

Fresh live mobile Lighthouse evidence is
`verification-10-evidence/lighthouse-live.json`:

- Performance 97; Accessibility 100; Best Practices 100; SEO 100.
- FCP 0.96 s; LCP 1.19 s; TBT 195 ms; CLS 0.
- Total transfer 49,093 bytes.
- A drill selection at 4× CPU throttle had a maximum observed event duration
  of 104 ms, below the 200 ms interaction budget.

## Defects by severity

### Medium, release-blocking — demo exit link focus ring is below 3:1

Keyboard focus on **Open your real workbench** computes to a 4px solid
`rgb(20, 62, 153)` outline against the demo banner's
`rgb(49, 92, 60)` background. The measured contrast is **1.25:1**. The link is
already white and underlined when unfocused, so the low-contrast outline is the
only focus-state change. This fails the attached accessibility baseline's
explicit `≥ 3:1` focus-ring requirement.

Reproduce from a fresh `/demo` visit by pressing Tab eight times. Evidence:
`verification-10-evidence/demo-banner-link-focus.png`.

- Critical: none.
- High: none.
- Low: none.

## Verdict

**FAIL.** The core product, deployment, claims, privacy, offline behavior, and
performance are sound, but the keyboard focus contrast defect violates a
non-negotiable acceptance requirement. No product code was modified during
verification.
