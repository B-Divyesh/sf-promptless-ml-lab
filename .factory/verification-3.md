# Independent product verification 3 — FAIL

**Candidate:** `bda3a6771dee8719ecf10e698ba02e7426538d74`

**Live URL:** https://promptless-ml-lab.sociobot.in

**Verified:** 2026-08-29 UTC

**Acceptance result:** **FAIL**

The live site is deployed and matches the candidate build byte-for-byte. The
previous deployment-only failure is no longer present. The release still fails
because its central learning check does not evaluate the submitted expression
against exercise data. It accepts wrong data and incomplete answers, then
exports a successful record with a trace generated only from drill metadata.

## Mandatory first-read gate

**PASS.** A cold load answers all three questions in the first viewport:

- What: “Practice reproducible ML models.”
- For whom: “For self-taught learners who need one small model task and a
  check now.”
- First click: **Try it with sample data**, with the explanation “Opens a
  seeded drill and local run record.”

The action is visible at desktop (`y=660–705` in a 1440×900 viewport) and at
390×844 (`y=650–695`). It opens `/demo` in one click. Evidence:
[desktop](qa-evidence/live-first-read-desktop.png) and
[mobile](qa-evidence/live-mobile-first-screen.png).

## Mandatory claims gate

`.factory/claims.json` exists with 10 entries. Each id appears exactly once as
an `@claim:<id>` test. The commands were invoked before other QA in the clean
checkout; without dependencies they all stopped at the expected missing
`@playwright/test` setup error. After the required clean `npm ci`, every exact
command was rerun and passed:

| Claim id | Exact command | Result after clean install |
| --- | --- | --- |
| `local-browser-runs` | `npm test -- --grep @claim:local-browser-runs` | PASS, 1 test |
| `export-record` | `npm test -- --grep @claim:export-record` | PASS, 1 test |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | PASS, 1 test |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS, 1 test |
| `thirty-open-drills` | `npm test -- --grep @claim:thirty-open-drills` | PASS, 1 test |
| `fixture-evaluator` | `npm test -- --grep @claim:fixture-evaluator` | PASS, 1 test |
| `deterministic-trace` | `npm test -- --grep @claim:deterministic-trace` | PASS, 1 test |
| `no-arbitrary-pytorch` | `npm test -- --grep @claim:no-arbitrary-pytorch` | PASS, 1 test |
| `estimated-drill-duration` | `npm test -- --grep @claim:estimated-drill-duration` | PASS, 1 test |
| `real-workbench` | `npm test -- --grep @claim:real-workbench` | PASS, 1 test |

The green commands do not make the claims gate sound. Independent testing
falsified `fixture-evaluator`, and “replayable run records” is an unlisted
visitor-reliant claim whose existing untagged test only checks a heading after
clicking Replay. Details are in the critical and high defects below.

## Clean build and repository gates

- `npm ci`: PASS, 397 packages installed from the lockfile.
- `npm run lint`: PASS (`tsc --noEmit`).
- `npm test`: PASS, 25/25 Playwright tests against the Static Web Apps
  emulator.
- `npm run build`: PASS; TypeScript and Vite produced `dist/`.
- `npm audit --omit=dev`: PASS, zero runtime vulnerabilities.
- Full `npm audit`: three high and one low development-tooling advisories under
  `@azure/static-web-apps-cli` (`adm-zip` and `tmp`).
- Production output: main JS 21,476 bytes / 8.66 KB gzip; worker 865 bytes;
  CSS 10,237 bytes / 3.13 KB gzip; no fonts; hero WebP 157,900 bytes. All
  static bundle budgets pass.

## Deployment identity

The live deployment matches the candidate rather than an older build.
SHA-256 hashes matched for `index.html`, `sw.js`, `404.html`, `404.css`,
favicon, apple-touch icon, robots, sitemap, main JS, worker JS, CSS, hero, and
social image. Representative hashes:

- `index.html`: `96808a4d122a8e6ca12b6353bec39fb2a4d594701791e42a8a327f7d5e9980e8`
- main JS: `235c0b732e0dd546067c2d30923bf5a840ee3dd5e1f49382c5511725645271af`
- CSS: `38b950a814c954c41ee182309b63f2233c40c049b9e1ac47ca34a44a0b99e20f`
- worker: `c6362fcd86c7a229bbc0f0d569b230993bc1f1bc9233cf0e2bd9eb9268ae92c6`
- `sw.js`: `fbcbcb9b720746fd954bea7674f278d98836247888fe6c842cde52d7f4f63f3e`

## End-to-end product exercise

Working behavior:

- `/demo` and `/?demo=1` open the sample workbench with 30 drill controls.
- Empty and comment-only input produce an actionable “Not yet” result; a
  subsequent accepted line passes.
- Five distinct drill controls can be completed and the counter reaches
  `5 / 5 passed`.
- Export downloads JSON containing mode, drill id, seed, source, pass state,
  version, timestamp, and seven trace points.
- Reset removes `demo:seeded-ml-runs` while preserving a pre-seeded real-data
  sentinel. **Start for real** opens `/lab` and reads the separate real key.
- Malformed demo storage renders an empty state; a value over 100,000
  characters gets an actionable error and leaves the run button enabled and
  focused.

The core correctness counterexample is repeatable on both the local production
build and live site:

```python
import torch
SEED = 11
torch.manual_seed(SEED)
x = torch.zeros((1, 1))
x.shape
```

The drill fixture and expected result are 8×3 / `(8, 3)`, but this submission
is marked **Passed** and exported with `pass: true`. The exported trace is
`[0, 0.275, 0.453, 0.607, 0.747, 0.877, 1]`. Evidence:
[submission](qa-evidence/live-wrong-shape-before.png) and
[false pass](qa-evidence/live-wrong-shape-after.png).

## Privacy, network, and headers

A fresh live demo load, run, export, and reset issued only four same-origin GET
requests: `/demo`, main JS, CSS, and the checker worker. No code, run,
identifier, analytics event, remote font, or third-party script left the
origin. There were no POSTs. The privacy claim is supported.

Browser response headers on live HTML include HSTS, `nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, a same-origin CSP with
`frame-ancestors 'none'`, and `X-Frame-Options: DENY`. HTML and `sw.js`
revalidate after 30 seconds; hashed JS/CSS use one-year immutable caching;
mutable artwork uses a one-day cache. All linked URLs return 200 and an
unknown path returns the styled page with HTTP 404.

This static product has no server endpoint, product-unlock call, account,
payment flow, or sign-in. API concurrency, persistence boundaries, health
identity, 429/`Retry-After`, and Entra authority checks are not applicable.

## Accessibility, mobile, and performance

- `/opt/fleet/lib/verify-url.sh` passes `/`, `/demo`, and `/lab`; its JSON and
  screenshots are under `qa-evidence/verify-*`.
- Live Playwright axe reports zero violations of any impact on `/`, `/demo`,
  `/lab`, `/privacy`, `/terms`, and the 404 at 1280×900 and 390×844.
- Valid routes have no console or page errors. They have `lang="en"`, one
  `h1`, a main landmark, route-specific title/canonical, labelled controls,
  and image alt text.
- Keyboard-only checks pass on application routes: first Tab reaches the skip
  link, Enter focuses the `h1`, native controls work, core rerenders retain
  focus, and back/forward focus the new route heading. The designed focus ring
  is visible.
- At 390 px, there is no horizontal overflow and all visible application-route
  links/buttons/selects are at least 44×44 CSS px. The mobile workbench is
  usable; see [mobile demo](qa-evidence/live-mobile-demo.png).
- Reduced-motion emulation matches; trace animation computes to `none` and
  scroll behavior to `auto`.
- Live service worker is activated with no waiting/installing worker. A normal
  `/demo` reload works offline. The stale-cache update defect below remains.
- Lighthouse 13.4.1 mobile landing: Performance 97, Accessibility 100, Best
  Practices 100, SEO 100; FCP 923 ms, LCP 1,818 ms, TBT 194 ms, CLS 0. The
  demo scored 95/100/100/100 with LCP 850 ms and CLS 0. Lighthouse has no lab
  INP; an instrumented filter/select/run flow measured a maximum interaction
  duration of 40 ms.

## Defects by severity

### Critical — the checker does not evaluate the fixture or hidden assertions

`checker-worker.ts` receives only source text, accepted answer strings, and
two trace endpoints. It receives no exercise dataset or expected result. It
strips comments, compares the last line to a whitelist, and calculates the
same seven numbers from metadata regardless of the submitted program.

Consequences observed live:

- A 1×1 tensor passes the 8×3 shape drill and exports as a successful record.
- The bare function object `torch.randperm` passes “Create a seeded
  permutation,” although it neither calls the function nor returns the shown
  order.
- Accepted answers in several other drills are likewise bare functions or
  incomplete operations (`torch.sigmoid`, `torch.relu`, `F.mse_loss`,
  `for epoch in range(3):`, and `((x - q) ** 2).sum`).
- The accuracy and confusion starters use `torch.tensor` without importing
  `torch`, so those supplied snippets are not runnable as shown.

This falsifies the declared `fixture-evaluator` claim and fails the researched
job: runnable, seeded exercises with hidden assertions and immediate checks.
The product can certify an incorrect solution and manufacture a passing trace.

### High — “Replay” does not replay the saved run

After a run, the workbench immediately replaces submitted source with the
starter. Clicking **Replay** selects the drill and fixed trace but still shows
the starter, not the saved source, result, or timestamp; it performs no check.
There is no record import path. The trace is already displayed before a run
and is identical for every run of that drill. Thus the repeated “replayable run
record” claim is not delivered and is absent from `claims.json`; the existing
untagged replay test only asserts the drill heading.

### Medium — stale service-worker navigation cache is not updated

After inserting a stale `/demo` response into `seeded-ml-drills-v2`, an online
reload correctly showed the network document, but the cached response remained
stale after 0, 100, and 1,000 ms. Switching offline and reloading then showed
“stale marker.” The fetch handler starts `cache.put()` without awaiting it or
extending the event lifetime. The regression test checks only the online
screen, so it misses the failed cache refresh. Future deployments that reuse
the `v2` cache can leave the offline product stale.

### Medium — leaving the demo retains demo records without consent

After completing a demo run, `demo:seeded-ml-runs` exists. Selecting **Start
for real** opens `/lab` but leaves that demo record in storage; the product
neither discards it nor offers to keep it explicitly. This fails the demo
sandbox exit rule and makes the banner's “nothing is saved” wording misleading
unless the visitor separately selects **Reset demo**.

### Medium — the 404 route does not meet the common route contract

The 404 has the correct status and a styled recovery link, but it omits the
standard header, navigation, skip link, footer, canonical, description, and
social metadata. Its only link is 184×20 px at desktop and mobile, below the
44 px target requirement. Separately, `sitemap.xml` omits the public `/lab`
route, and application footers show `v1.0.0` without a build id.

### Low — the desktop headline breaks inside a word

At 1440 px, `max-width: 9ch` plus `overflow-wrap: break-word` renders
“reproducible” as “reproducib” / “le”. The meaning remains clear, but this is
an avoidable first-screen readability defect visible in the desktop evidence.

### Low — development tooling has known high-severity advisories

The shipped static runtime has no vulnerable npm dependencies, but full
`npm audit` reports three high and one low advisory through the local Static
Web Apps CLI. This does not affect delivered browser code but should be tracked
for the development environment.

## Verdict

**FAIL.** Deployment, accessibility, privacy, mobile layout, performance, and
most mechanical gates pass. The product cannot be released while its main
feedback mechanism marks demonstrably wrong or incomplete model code as
correct. The replay and service-worker defects also contradict core product
and handoff promises.
