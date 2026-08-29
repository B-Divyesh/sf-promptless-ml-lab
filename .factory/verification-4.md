# Independent product verification 4 — FAIL

**Candidate:** `4b4e19adc2b94f878c7b63ab2b22d1411c61a5ae`
**Live URL:** https://promptless-ml-lab.sociobot.in
**Verified:** 2026-08-29 UTC

## Verdict

**FAIL.** The deployment is healthy and is the tested candidate, but the core
learning product is not reliable across its advertised catalog. Multiple
drills reject the task-aligned supported expression, while other drills accept
an unrelated shortcut. This defeats the brief's immediate, reproducible
exercise check for a material portion of the promised 30 drills.

## Mandatory first-read gate

**PASS.** A fresh cold desktop visit displayed, in its first screen:

- What it does: “Practice reproducible ML models.”
- For whom: “For self-taught learners who need one small model task and a
  check now.”
- First action: **Try it with sample data**, with “Opens a seeded drill and
  local run record.”

The link opens `/demo` in one click. The same action was visible and keyboard
operable at 390 × 844.

## Claims gate — run first from the clean checkout

`.factory/claims.json` exists and has 11 entries. After `npm ci`, I invoked
every exact command below before any other QA. Each ran one Playwright test
against the product's Static Web Apps demo entry point and passed.

| Claim id | Exact command | Result |
| --- | --- | --- |
| `local-browser-runs` | `npm test -- --grep @claim:local-browser-runs` | PASS |
| `export-record` | `npm test -- --grep @claim:export-record` | PASS |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | PASS |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `thirty-open-drills` | `npm test -- --grep @claim:thirty-open-drills` | PASS |
| `fixture-evaluator` | `npm test -- --grep @claim:fixture-evaluator` | PASS |
| `fixture-counterexamples` | `npm test -- --grep @claim:fixture-counterexamples` | PASS |
| `deterministic-trace` | `npm test -- --grep @claim:deterministic-trace` | PASS |
| `no-arbitrary-pytorch` | `npm test -- --grep @claim:no-arbitrary-pytorch` | PASS |
| `estimated-drill-duration` | `npm test -- --grep @claim:estimated-drill-duration` | PASS |
| `real-workbench` | `npm test -- --grep @claim:real-workbench` | PASS |

The tests prove the first drill and declared flows, but they do not prove that
the advertised task solution works for each of the 30 drills. That gap is
falsified below.

## Local quality gates

- `npm ci`: PASS; clean lockfile install completed.
- `npm run lint`: PASS (`tsc --noEmit`).
- `npm test -- --reporter=dot`: PASS, 26/26.
- `npm run build`: PASS; `dist/` produced.
- `npm audit --omit=dev`: PASS, 0 runtime vulnerabilities.
- Production output: main JS 22,050 bytes / 8,804 bytes gzip; checker worker
  9,076 / 3,583 bytes gzip; CSS 10,237 / 3,135 bytes gzip; hero WebP 157,900
  bytes. This is within the static budgets.

## Live deployment, privacy, and non-functional checks

- Live footer build id is `4b4e19adc2b9`. Fresh-build SHA-256 hashes matched
  live `index.html`, main JS, CSS, checker worker, service worker, and hero
  WebP byte-for-byte.
- A fresh live demo normal flow rejected invalid Python-like input, then
  accepted `tuple(x.size())`, saved the run, exported JSON with `mode: demo`,
  seed 11, pass state, and seven trace values. Reset removed only the demo key;
  **Start for real** opened `/lab`, cleared the demo key, and a passed real run
  wrote the real namespace.
- Full live request logging for landing/demo/run/export/reset saw only
  `https://promptless-ml-lab.sociobot.in`; no POST, third-party, analytics,
  remote-font, or code-upload request occurred. The privacy promise is
  supported for this flow.
- `/`, `/demo`, `/lab`, `/privacy`, and `/terms` return 200; an unknown path
  returns the styled document with HTTP 404. HTML has a 30-second revalidation
  cache; hashed JS/CSS are one-year immutable; the mutable hero is one day.
  HSTS, `nosniff`, `strict-origin-when-cross-origin`, CSP with
  `frame-ancestors 'none'`, and `X-Frame-Options: DENY` are live.
- Live Playwright axe found zero serious/critical findings on all six routes at
  1280 × 900 and 390 × 844. Each has one h1 and a main landmark. At 390 px,
  `scrollWidth === clientWidth === 390`; header/footer targets were at least
  44 px high. The focused skip link had a 4 px `#143e99` outline. Reduced
  motion computes to no trace animation or transition.
- Live service worker was active, had no waiting/installing update, and `/demo`
  reloaded offline after a first visit. No console or page errors occurred in
  the tested flow.
- Lighthouse 13.4.1 mobile landing: Performance 100, Accessibility 100, Best
  Practices 100, SEO 100; FCP 0.8 s, LCP 1.7 s, TBT 0 ms, CLS 0.

This is a static product with no server endpoint, product-unlock call,
account, payment flow, or sign-in. Rate-limit/429, backend concurrency, and
Entra-tenant checks are not applicable.

## Defects by severity

### Critical — advertised drills reject their own task-aligned solutions

The brief's smallest useful product is 30 short seeded exercises with immediate
checks. The live evaluator accepts only a narrow expression runtime, but that
runtime is incompatible with the expressions required by a material part of
the displayed catalog.

Fresh live evidence:

- The documented expressions for **Standardize one feature**
  (`(x - x.mean()) / x.std()`), **Measure squared error**
  (`((pred - y) ** 2).mean()`), **Compute accuracy**,
  **Average a batch loss**, **Read a confusion matrix**, **Measure squared
  distance**, **Update a centroid**, and **Center data before PCA** all return
  **Not yet** with `dimension unsupported`. The parser always supplies an
  options object to zero-argument tensor methods and does not map named
  `dim=` arguments to the tensor method parameter.
- **Take one gradient step** rejects its required `w -= lr * w.grad` with
  `property unsupported`, because the fixture supplies no gradient. The
  unrelated `w -= lr * 0.6` passes.
- **Repeat a training pass** rejects its displayed loop
  `for epoch in range(3):` as `statement unsupported`; `epoch-loop` also has
  no accepting branch in the worker's checker, so no normal submitted result
  can pass.
- **Track improving validation loss** rejects `val_loss < best`, the displayed
  update condition, but the unrelated expression `val_loss` passes.
- **Replay a run from its seed** rejects `torch.manual_seed(SEED)`, the stated
  task, but `torch.rand(4)` passes because the checker only asks for an array
  of length four.

These are not boundary inputs: they are the visible task instructions or
direct task-aligned expressions entered in a clean live demo. The check can
therefore block a learner who follows the drill and can certify a different
answer. This is release-blocking for the brief's core job.

### High — visitor-reliant landing claims are not fully declared in claims.json

The claims manifest omits several concrete landing promises, including
“Free.”, “NO CHAT REQUIRED”, and “It does not host models, rank people, or
give generated solutions.” None has an `@claim:` sandbox test. The claims
contract requires every visitor-reliant statement to be declared and tested
or removed. The existing 11 claim tests pass but do not cover these promises.

## Required repair and re-verification

1. Make the evaluator accept and validate the task-aligned solution for every
   drill, or remove/rewrite drills outside the supported expression subset.
   Add a test that exercises each displayed drill's intended answer in the
   demo, not merely that 30 controls render.
2. For stateful tasks (gradient, epoch, early stop, replay), either provide a
   safe fixture/runtime that can model the stated operation or change the
   exercise and expected result so the checked one-line expression is honest.
3. Add claim entries and observable demo tests for the remaining landing
   promises, or remove the promises.

No product code was modified during verification.
