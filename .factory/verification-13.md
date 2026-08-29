# Independent product verification 13 — FAIL

**Candidate:** `7202a87b5c22e6159064436a005734223ce86353`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verified:** 2026-08-29 UTC
**Result:** **FAIL**

The product works end to end and every listed claim test passes. The release
still fails the supplied claims contract because the landing page contains one
specific result claim that is not listed and proved as a claim in
`.factory/claims.json`. No product code was modified during verification.

## Release-blocking finding

### F-13-1 — Unlisted numeric result claim

**Severity:** Blocker
**Contract:** claims

The live landing preview labels a result **“Sample passed record”** and states
**“Seven repeated results: 0 → 1.”** This is a result a visitor can rely on, but
no entry in `.factory/claims.json` names that claim or the landing preview as
its location.

There is a regression test named
`@regression:landing-preview shows a read-only sample drill before the catalog`,
but it only asserts that the two strings render. The nearest tagged claim,
`@claim:deterministic-trace`, asserts that two exported traces each have seven
points and are equal. It does not assert that a passing seed-11 run starts at
0 and ends at 1, nor does its manifest entry identify the sample preview.

This is not evidence that the displayed result is false: an independent live
pass produced a seven-point trace with visible endpoints 0 and 1. It is a
release blocker because the supplied acceptance rule requires every claim to
be in the manifest and proved by exactly one tagged claim test.

**Required repair:** either remove the passed-record/endpoints statement, or
add one manifest claim and one `@claim:<id>` test that completes the seed-11
sample, asserts pass, and verifies seven exported points with endpoints 0 and
1. Include the landing preview in the manifest `where` field.

## Mandatory first-read gate — PASS

A fresh live Chromium context at 1440 × 900 showed, before interaction:

- What: “Practice PyTorch operations in fixed drills.”
- Who: “For self-taught ML learners who want one short drill with a browser
  check.”
- First click: **Try it with sample data**, next to “Opens a tensor-shape drill
  with fixed sample inputs.”

The one-click action opened `/demo` with the persistent sample-data banner,
Reset demo, Open your real workbench, seed 11, an 8 × 3 tensor, expected result
`(8, 3)`, an editable starter, and no saved demo run. The same first-screen
information fit at 390 × 844. Evidence:
`verification-13-artifacts/first-read-desktop.png`,
`verification-13-artifacts/first-read-mobile.png`, and
`verification-13-artifacts/demo-mobile.png`.

## Clean checkout and listed claims — PASS

The checkout began clean at exactly the candidate SHA. The first pre-install
probe found the expected missing `node_modules` dependency. After the required
locked install, every command from `.factory/claims.json` was run separately
and passed its selected test.

- `npm ci`: passed; 25 packages audited; 0 vulnerabilities.
- Claims manifest: present; 23 unique entries.
- Exact claim commands: **23/23 passed**.
- `npm test`: **48/48 passed**.
- `npm run lint`: passed (`tsc --noEmit`).
- `npm run build`: passed and produced `dist/`.
- `npm audit --audit-level=high`: passed; 0 vulnerabilities.
- `git diff --check`: passed.

Passing claim ids: `local-browser-runs`, `export-record`, `import-records`,
`import-namespace`, `import-replay`, `demo-reset`, `one-click-sample`,
`no-third-party-runtime`, `build-output`, `deployment-config`,
`offline-reload`, `thirty-open-drills`, `catalog-evaluator`,
`fixture-evaluator`, `fixture-counterexamples`, `deterministic-trace`,
`no-arbitrary-pytorch`, `real-workbench`, `free-access`, `no-chat-required`,
`scope-limits`, `no-code-or-identity-upload`, and
`five-drill-practice-set`.

## End-to-end and recovery checks — PASS

The fresh live verification suite passed **5/5** with:

```sh
EXPECTED_BUILD_ID=7202a87b5c22 npx playwright test -c .factory/verification-11.config.ts
```

Observed behavior included:

- Correct `x.shape` passed, wrote a seed-11 record with seven trace points,
  exported valid JSON, replayed, and reset without changing the real-workbench
  sentinel.
- Comment-only input, a changed 1 × 1 fixture, arbitrary Python, and an
  incomplete expression returned “Not yet” without executing code.
- A 100,001-character value returned the stated size error and restored focus.
- Malformed JSON, a file over 2 MB, canceled import, duplicate import, and
  demo/real namespace isolation all recovered correctly.
- All 30 independently declared intended operations passed; all 30 declared
  shortcuts failed.
- Five distinct drills advanced 0/5 through 5/5, repeated completion did not
  double-count, reload persisted progress, and Reset cleared only demo data.

## Privacy, deployment identity, and headers — PASS

A fresh 390 px live flow recorded seven requests and five unique resources:
the document, local JS, local CSS, the local mobile hero, and the local checker
worker. Every request was a same-origin GET without a request body. The unique
marker `QA_PRIVACY_MARKER_7202A87` appeared in no URL, header, or body. There
were no console or page errors. No analytics, remote fonts, remote scripts,
account, identity, payment, or AI request was observed.

The live footer reports build `7202a87b5c22`. SHA-256 comparisons matched the
fresh local build byte for byte for `/`, app JS, app CSS, checker worker,
service worker, mobile and desktop hero art, social art, and the styled 404
document. The unknown route returned the matching document with HTTP 404.

Browser response headers included:

- CSP restricted to self, with `connect-src 'self'` and
  `frame-ancestors 'none'`.
- HSTS with `includeSubDomains; preload`.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `X-Frame-Options: DENY`.

HTML, 404, and `sw.js` use `max-age=30` with revalidation. Hashed JS/CSS use
`max-age=31536000, immutable`. Mutable artwork uses `max-age=86400`.

This is a static application with no server-side API, product-unlock endpoint,
sign-in, or payment flow. Rate-limit/429/Retry-After and Microsoft Entra
authority checks are therefore not applicable. An AI tutor is an explicit
brief non-goal, so the AI-feature leverage check found no missing feature.

## Accessibility, routes, mobile, and PWA — PASS

`/opt/fleet/lib/verify-url.sh` passed `/`, `/demo`, `/?demo=1`, `/lab`,
`/privacy`, and `/terms`: HTTP 200, route title, `lang=en`, one h1, a main
landmark, complete image alt text, labeled buttons, and no console errors.

The wider live suite found zero serious or critical Axe violations on every
public route at 1440 × 900 and 390 × 844. It also verified heading order,
route-specific metadata, no horizontal overflow, at least 44 px controls,
keyboard skip/action/route focus, a 3 px high-contrast focus treatment,
announcements on navigation, and zero animation/transition duration with
reduced motion. A 640 CSS-pixel reflow check representing 200% desktop zoom
kept every route's h1 and main content visible without horizontal overflow.

All discovered links returned 200. The only 404-status href was the 404
document's own `#main` skip target, which correctly stays within that rendered
404 page. Back/forward focus and the styled recovery link worked.

The service worker updated to one activated controller with no waiting or
installing worker. After a passing demo run, offline reload retained the drill,
saved record, and Replay behavior, with resources served from the service
worker.

## Performance — PASS

Fresh mobile Lighthouse evidence is
`verification-13-artifacts/lighthouse-live.json`:

- Performance: **100**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**
- LCP: **1.13 s**
- FCP: **0.91 s**
- TBT: **51.5 ms**
- CLS: **0**
- Transfer: **49,578 bytes**

Production output is 29.61 KB raw / 11.00 KB gzip initial app JS, 12.40 KB raw
/ 3.55 KB gzip CSS, an 11.76 KB deferred checker worker, and a 33.17 KB mobile
hero. There are no runtime font downloads. All relevant budgets pass.

## Defects by severity

| Severity | Findings |
| --- | --- |
| Blocker | F-13-1: landing numeric passed-record claim is absent from `claims.json` and lacks a matching tagged outcome test |
| Critical | None |
| High | None |
| Medium | None |
| Low | None |

## Evidence index

- `verification-13-artifacts/first-read-desktop.png`
- `verification-13-artifacts/first-read-mobile.png`
- `verification-13-artifacts/demo-mobile.png`
- `verification-13-artifacts/demo-desktop.png`
- `verification-13-artifacts/lighthouse-live.json`
- `verification-13-artifacts/verify-*/verify.json`
- `verification-13-artifacts/verify-*/screenshot-desktop.png`
- `verification-13-artifacts/verify-*/screenshot-mobile.png`
