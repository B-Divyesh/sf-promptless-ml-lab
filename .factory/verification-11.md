# Independent product verification 11 — PASS

**Candidate:** `d717c1068864a9b457f43c6e3ca99e636b0dbfe9`  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Verified:** 2026-08-29 UTC  
**Acceptance result:** **PASS**

The candidate is deployed, matches the exact local production build, and
passes the mandatory first-read, claims, functional, privacy, offline,
accessibility, performance, and deployment gates. No product code was changed
during verification.

## Mandatory first-read gate

**PASS.** A fresh browser profile at 1440 × 900 and 390 × 844 shows all three
required answers in the first viewport:

- What: “Practice reproducible ML models.”
- Who: “For self-taught learners who need one short ML drill and a check now.”
- First action: **Try it with sample data**, beside “Opens a seeded drill and
  local run record.”

One click opens `/demo`, with no account or setup. It immediately shows the
seed-11 tensor-shape drill, its 8 × 3 data, expected result, editor, trace,
run-record area, and all 30 drill controls. The persistent banner says
“Demo — sample data, nothing is saved” and includes **Reset demo** and
**Open your real workbench**. Evidence: `qa-11/first-read-desktop.png`,
`qa-11/verify-root/screenshot-mobile.png`, and
`qa-11/mobile-one-click-demo.png`.

## Mandatory claims gate

`.factory/claims.json` exists with 24 entries. Each manifest command was run
separately after `npm ci`; every command selected one passing test. A source
cross-check found exactly one `@claim:<id>` tag for every manifest entry.

| Claim | Result |
|---|---|
| `local-browser-runs` | PASS — one same-origin-only demo test passed |
| `export-record` | PASS — exported pass, seed, version, and seven trace points |
| `import-records` | PASS — malformed, preview, confirm, and duplicate paths passed |
| `import-namespace` | PASS — demo and real storage remained isolated |
| `import-replay` | PASS — imported passing source replayed successfully |
| `demo-reset` | PASS — demo key cleared; real sentinel remained |
| `one-click-sample` | PASS — `/demo` and `/?demo=1` loaded the isolated sample |
| `no-third-party-runtime` | PASS — scripts, styles, fonts, and navigation stayed same-origin |
| `build-output` | PASS — required `dist/` files were present |
| `deployment-config` | PASS — rewrites, 404, caching, and security headers passed |
| `offline-reload` | PASS — saved demo run reloaded and replayed offline |
| `thirty-open-drills` | PASS — exactly 30 controls were present |
| `catalog-evaluator` | PASS — all 30 intended operations passed and shortcuts failed |
| `fixture-evaluator` | PASS — invalid source failed and `tuple(x.size())` passed |
| `fixture-counterexamples` | PASS — changed input and incomplete expression failed |
| `deterministic-trace` | PASS — repeated checks exported identical seven-point traces |
| `no-arbitrary-pytorch` | PASS — unsupported Python was rejected without execution |
| `estimated-drill-duration` | PASS — all displayed estimates were 6–10 minutes |
| `real-workbench` | PASS — `/lab` used the separate real key |
| `free-access` | PASS — all 30 were enabled with no payment state |
| `no-chat-required` | PASS — a drill completed without chat or account controls |
| `scope-limits` | PASS — no hosting, ranking, upload, or generated-solution flow |
| `no-code-or-identity-upload` | PASS — marker, code, records, and identity stayed off requests |
| `five-drill-practice-set` | PASS — progress persisted, deduplicated, reset, and stayed isolated |

The rendered landing, demo, privacy, terms, README, demo guide, and copy audit
were cross-checked against the manifest. No material visitor promise lacked a
claim entry and observable test.

## Clean checkout, tests, and production build

- Initial commit and remote branch: exact candidate, clean worktree.
- `npm ci`: PASS; 24 packages, 0 vulnerabilities.
- 24 exact `.factory/claims.json` commands: PASS; 24/24.
- `npm test -- --reporter=line`: PASS; 47/47 Playwright tests in 1.1 minutes.
- `npm run lint`: PASS; `tsc --noEmit`.
- `npm run build`: PASS; TypeScript plus exact Vite production build.
- `npm audit`: PASS; 0 vulnerabilities.
- `git diff --check`: PASS.
- MIT `LICENSE`, run/test/deploy README guidance, `/privacy`, `/terms`, demo
  documentation, copy audit, and product-specific design record are present.

The user-supplied researched brief was used as the scope contract.
`.factory/brief.json` is absent from this checkout, as the existing handoff
already noted; this did not prevent direct verification against the supplied
brief.

## Independent end-to-end evidence

The verifier-only live suite in `.factory/verification-11.spec.ts` passes
5/5 and is reproducible with:

```sh
npx playwright test -c .factory/verification-11.config.ts
```

Fresh live-browser exercise covered:

- A full keyboard-only flow: skip link first, sample link activated with
  Enter, route focus moved to the demo `h1`, the editor and check control were
  reached by Tab, `x.shape` passed with Enter, and focus returned to the check.
- Comment-only input, changed 1 × 1 fixture data, an added unsupported line,
  and a 100,001-character answer all failed safely. Restore returned focus to
  the editor and a valid answer then passed.
- The saved and exported record contained `seed: 11`, `pass: true`, version 1,
  and seven trace points. Replay passed. Reset removed only demo storage.
- Malformed JSON and a 2,097,153-byte file were rejected with recovery copy.
  A valid file showed its count before saving; cancel changed nothing; confirm
  imported it; replay passed; a duplicate was rejected.
- Opening the real workbench discarded demo data. A real pass wrote the real
  namespace only.
- All 30 drills were independently exercised by the local catalog contract
  test with a specified valid operation and a specified invalid shortcut.

No normal, boundary, invalid-input, or recovery path produced a console or
page error.

## Privacy, routes, and deployment identity

A fresh privacy → terms → demo → invalid check → passing check → export flow
made 11 requests. Every request was a same-origin GET, none had a body, and the
unique code marker `QA_PRIVACY_MARKER_d717` appeared in no URL, header, or
body. No analytics, remote font, third-party script, API, account, identity,
payment, AI gateway, or product-unlock request was observed.

This is a static product with no application server endpoint and no sign-in.
Backend concurrency, persistence, health, 429/`Retry-After`, and Microsoft
Entra authority checks are not applicable. It is not a library or CLI, so
consumer-package checks are also not applicable. The brief explicitly makes
an AI tutor a non-goal; no missed AI leverage was found.

`/`, `/demo`, `/lab`, `/privacy`, and `/terms` return 200. A missing route
returns the designed 404 with HTTP 404. All crawled site links resolve. The
factory `verify-url.sh` passed the five public application routes with a title,
`lang=en`, one `h1`, one `main`, labelled images and controls, and no browser
errors. Evidence is under `qa-11/verify-*`.

The live footer reports build `d717c1068864`. Local and live SHA-256 hashes are
identical:

| File | SHA-256 |
|---|---|
| `index.html` | `174e1a2287adba3770d511f4c7370c06a63d392c81291b0b70f00ba217426e94` |
| main JavaScript | `79129c3ead75b27e42c8ae7391f44d8939d958c123e34c570db64f43aa957b4d` |
| main CSS | `3fadd662c718de78e3ba4c01bb26fbabba37950f342e098c10a0a975c04e9a9b` |
| checker worker | `6daeb5edeecd69d42622f2de246e9bb352fdbf0a151761f9314f2dba78238f70` |
| `sw.js` | `3e11c967959748158610f62e626c03470a1103015eda6a76d1e28a6ea2573890` |
| `404.html` | `22dba71f1660af874cf40f6ee099eae82c18c58628d02f13029ec5c5145521dd` |

Live document headers include HSTS with `includeSubDomains`, `nosniff`, strict
referrer policy, `X-Frame-Options: DENY`, and a self-only CSP with
`connect-src 'self'` and `frame-ancestors 'none'`. HTML and `sw.js` revalidate
after 30 seconds, hashed JS/CSS are immutable for one year, and WebP artwork
caches for one day.

The service worker was activated and controlling with no waiting or installing
update. Cache `seeded-ml-drills-v6` was present. A saved demo record reloaded
and replayed successfully after the browser was taken offline.

## Accessibility and responsive behavior

- 11 axe scans across the five application routes at desktop and 390 px, plus
  the 404 page, found 0 serious and 0 critical violations.
- Every route has `lang`, a title, one `h1`, one `main`, ordered headings,
  labelled images and controls, and no horizontal overflow at 390 px.
- Every visible link, button, and select measured at least 44 × 44 CSS pixels.
- A 640 CSS-pixel reflow check, equivalent to 200% layout zoom on a 1280-pixel
  viewport, retained the editor, check action, catalog, and all body text with
  no horizontal overflow.
- Reduced-motion emulation left no non-zero animation or transition duration.
- Route navigation and browser history moved focus to and announced the new
  `h1`. The skip link is first in the Tab order.
- The repaired demo-exit focus ring is white, solid, and 4 px on moss at
  **7.70:1** contrast on both desktop and 390 px mobile.
- No console or page errors were observed on any application route or flow.

The visual review found the documented concrete-and-moss system consistent,
legible, responsive, and product-specific. The generated hero asset has
documented prompt/model provenance, responsive WebP variants, explicit
dimensions, and useful alt text. The deliberate single light treatment is
recorded in `.factory/design.md`.

## Performance and bundle budgets

Fresh mobile Lighthouse evidence is `qa-11/lighthouse-live.json`:

- Performance **99**; Accessibility **100**; Best Practices **100**; SEO
  **100**.
- FCP 0.983 s; LCP 1.208 s; TBT 136.5 ms; CLS 0; Speed Index 0.983 s.
- Total transfer: 49,112 bytes.
- A drill-selection interaction under 4× CPU throttling had a maximum observed
  event duration of 56 ms, below the 200 ms interaction budget.

Production assets stay below every static budget:

- Main initial JS: 28,721 bytes raw / 10,720 bytes gzip.
- Lazy checker worker: 11,756 bytes raw / 4,474 bytes gzip.
- CSS: 11,257 bytes raw / 3,375 bytes gzip.
- Initial HTML + CSS + main JS: 14,677 bytes gzip.
- Mobile hero: 33,170 bytes; desktop hero: 157,900 bytes.
- Runtime font payload: 0 bytes.

## Defects by severity

- Critical: none.
- High: none.
- Medium: none.
- Low: none.

## Verdict

**PASS.** Candidate `d717c1068864a9b457f43c6e3ca99e636b0dbfe9` is
releasable at the tested URL. The previous deployment concern is not present:
the live build identity and all compared production bytes match the candidate.
