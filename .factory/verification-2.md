# Independent product verification — FAIL

**Candidate:** `9f40f913bec42cf4ae2d60402f61bc82f5bfa38c`  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Verified:** 2026-08-29 UTC  
**Acceptance result:** **FAIL**

The live deployment is byte-for-byte consistent with the candidate build and
many mechanical quality gates pass. The product is not releasable because its
core checker does not run or assert the submitted solution, and users cannot
leave the demo for a real workbench. Invalid code can therefore be exported as
a successful learning record while the advertised real workflow is absent.

## Required first-read gate

**PASS.** On a cold load, the first viewport says:

- what it does: “Practice reproducible ML models.”
- who it is for: “For self-taught learners…”
- what to do first: **Try it with sample data**, followed by “Opens a seeded
  drill and local run record.”

The sample action is visible without scrolling at desktop and 390 × 844
(mobile bounds `y=649.66–694.66`) and opens `/demo` in one keyboard activation.
Screenshots are in
[`verification-2-evidence/landing`](verification-2-evidence/landing).

## Claims gate

Setup from the candidate checkout was `npm ci` (22 packages, zero reported
vulnerabilities). Every command listed in `.factory/claims.json` then passed
against the demo entry point:

| Claim id | Exact command | Result |
| --- | --- | --- |
| `local-browser-runs` | `npm test -- --grep @claim:local-browser-runs` | PASS, 1 test |
| `export-record` | `npm test -- --grep @claim:export-record` | PASS, 1 test |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | PASS, 1 test |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS, 1 test |
| `thirty-open-drills` | `npm test -- --grep @claim:thirty-open-drills` | PASS, 1 test |
| `checker-recognizes-operation` | `npm test -- --grep @claim:checker-recognizes-operation` | PASS, 1 test |
| `deterministic-trace` | `npm test -- --grep @claim:deterministic-trace` | PASS, 1 test |
| `no-arbitrary-pytorch` | `npm test -- --grep @claim:no-arbitrary-pytorch` | PASS, 1 test |

The claim inventory is still incomplete. The landing page's quantitative
“6–10 minutes each” statement has no claim entry or tagged test. In addition,
`.factory/demo.md` says `?demo=1` opens the sample and describes a real mode;
the former only renders the landing page with a demo banner, and the latter is
not reachable. The `demo-reset` claim test also starts with the real key absent,
so it does not perform its declared check that existing real data remains
untouched. Independent testing with a sentinel confirmed the implementation
does preserve the real key, but the declared test does not prove it.

## Clean build and deployment identity

- `npm test`: PASS, 15/15 Playwright tests using the Static Web Apps emulator.
- `npm run build`: PASS, including `tsc --noEmit`; `dist/` was produced.
- No separate lint script exists.
- Built output: main JS 20,229 bytes (8.31 KB gzip), checker worker 305 bytes
  (0.31 KB gzip), CSS 10,193 bytes (3.11 KB gzip), no fonts, hero WebP
  157,900 bytes. All stated static budgets pass.
- SHA-256 hashes of live and local `index.html`, main JS, CSS, and `sw.js`
  match exactly. The live deployment is the candidate under test.
- All sitemap routes and linked assets return 200. An unknown route returns the
  styled 404 document with HTTP 404.

## Independent end-to-end exercise

Working behavior:

- `/demo` opens all 30 enabled drill controls and an isolated demo namespace.
- A normal tensor-shape answer passes; five distinct representative drills
  produce `5 / 5 passed`, persist across reload, export JSON, and replay.
- Export includes the seed, result, submitted code, version, and seven trace
  values. Filtering and selecting the final drill work.
- Empty input produces an actionable “Not yet” message. Restore starter returns
  focus to the editor. Malformed stored JSON recovers to the empty state.
- Reset removes `demo:seeded-ml-runs` while preserving a pre-seeded real-data
  sentinel.

Blocking and degraded behavior is detailed below.

## Privacy, requests, headers, and identity

The full live landing/demo/run/export/reset flow made only same-origin GET
requests for the document, JS, CSS, worker, and hero. No code, run, identifier,
analytics event, third-party font, or third-party script request was observed.
The demo/real local-storage separation works when tested with existing real
data.

Live HTML responses include HSTS, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, and a same-origin CSP.
Hashed JS/CSS receive `Cache-Control: public, max-age=31536000, immutable`;
HTML and `sw.js` revalidate after 30 seconds.

This static product has no server-side API, product-unlock call, account, or
sign-in flow. API request allowances/429/`Retry-After`, persistence concurrency,
health endpoints, and Entra authority checks are therefore not applicable.

## Accessibility, mobile, and performance

- The supplied `verify-url.sh` passes for landing and demo with no console or
  page errors; evidence and full-page screenshots are in
  [`verification-2-evidence`](verification-2-evidence).
- Playwright axe found zero serious or critical violations on `/`, `/demo`,
  `/privacy`, `/terms`, and the 404 at 1280 × 900 and 390 × 844. It found no
  violations of any impact on those pages.
- Pages have `lang`, route-specific titles, one `h1`, a main landmark, labelled
  controls, image alt text, and 44 px interactive targets. The designed focus
  ring is visible. The single-mode palette is documented.
- Reduced-motion emulation matches and computes `animation-name: none` on trace
  bars and `scroll-behavior: auto`.
- Live offline reload of `/demo` succeeds after the first visit. The service
  worker is activated with no current waiting/installing worker.
- Lighthouse 12.8.2 mobile: Performance 98, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.0 s, LCP 1.7 s, TBT 140 ms, CLS 0. INP has no lab value.
- The 390 px layout is usable, but the rotated hero caption creates 0.52 px of
  horizontal overflow (`scrollWidth=391`, `innerWidth=390`).

## Defects

### High — the core “hidden checks” do not check the result

`checker-worker.ts` lowercases the submission, removes whitespace, and passes
when it contains one configured substring. It then generates the same trace
from drill metadata regardless of what the submitted code would do.

Fresh live evidence:

- `# x.shape\nthis is not valid Python` was marked **Passed** and exported with
  `pass: true`, seed 11, and a seven-point trace.
- The valid alternative `tuple(x.size())`, which returns the required shape,
  was marked **Not yet**.
- All 28 drills using the shared starter call `torch.manual_seed(SEED)` before
  `SEED` is defined. The UI tells the learner to edit only the TODO line, so
  these supplied programs are not runnable as shown.

This fails the researched requirement for runnable exercises with hidden
assertions and immediate checks. It also gives incorrect learning feedback and
creates false successful run records. The disclosed non-execution limitation
does not make substring matching an adequate check of model-building work.

### High — there is no reachable real workbench

**Start for real** routes from `/demo` to `/`, which is only the landing page.
The landing page has zero workbench elements and all three workbench calls to
action route back to `/demo`. `renderLab()` is only selected for `/demo`, so no
public path can create `real:seeded-ml-runs` records. This fails the real
job-to-be-done and the demo-sandbox exit contract.

### High — visitor-reliant claims are missing or false

The quantitative “6–10 minutes each” statement is absent from
`.factory/claims.json`. `.factory/demo.md` promises that `?demo=1` enters the
sample, but a direct visit shows the landing page (with a demo banner and no
workbench). The same document describes an unreachable real mode. The claims
contract makes unlisted claims a release failure.

### Medium — large input causes an unrecoverable checker state

A 6 MiB editor value containing the accepted token triggers an uncaught
`QuotaExceededError` while saving. The button remains disabled as “Checking in
sandbox…”, no result is announced, and there is no recovery guidance. The
editor has no size limit and `saveRuns` has no error handling.

### Medium — keyboard focus is lost during core actions

After keyboard activation of **Run hidden checks** and after changing the drill
filter, the full workbench rerender moves focus to `body`. A keyboard user must
start navigating again. The initial route also programmatically focuses the
`h1`, so the first Tab lands on the hero action rather than the skip link or
header navigation. Route-change heading focus otherwise works and focus rings
are visible.

### Medium — service-worker updates can retain stale demo HTML indefinitely

The service worker uses the unchanged `seeded-ml-drills-v1` cache and a
cache-first strategy, precaching only `/`. Cached `/demo` is neither refreshed
nor purged on install/activate. In a controlled update simulation, placing a
stale `/demo` response in that cache, calling `registration.update()`, and
reloading continued to serve the stale document. Offline reload works, but the
required update behavior does not.

### Medium — framing protection required by the site contract is absent

The response CSP has no `frame-ancestors` directive and there is no equivalent
frame header. A cross-origin parent successfully loaded `/demo` in an iframe.
The site-structure contract requires `frame-ancestors` as a response header.

### Medium — the Drills navigation link has no target

The header links to `/#catalog`, but no element has `id="catalog"`. From the
demo it reloads the landing page at scroll position 0 instead of moving to the
catalog section.

### Low — metadata, caching, and audit artifacts need tightening

- Canonical metadata remains the home URL on demo, privacy, and terms routes.
- The immutable `/assets/*` rule also covers un-hashed hero and social images,
  so replacing either at the same URL can remain stale for a year.
- `.factory/copy-audit.md` does not contain every landing sentence as required;
  it omits the limitations copy and other visible sentences.
- `npm test` relies on the globally installed `swa` binary, but the Static Web
  Apps CLI is not declared in `package.json` or documented as a prerequisite.

## Verdict

**FAIL.** The deployment-only defects reported for the prior candidate are
fixed, and the live build is healthy on standard performance and automated
accessibility checks. This candidate still cannot satisfy its core learning
job: it records keyword matches rather than checked solutions, and it offers no
reachable non-demo workflow. The high-severity defects and claims-contract
failures must be corrected before release.
