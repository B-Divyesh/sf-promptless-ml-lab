# Independent verification — FAIL

**Candidate:** `7fa48ed67c32abc1d86527d310c5e872b5b8904b`  
**Live URL:** https://promptless-ml-lab.sociobot.in  
**Verified:** 2026-08-28

## First read

Cold-loading the landing page at desktop and 390 × 844 mobile answered the
three required questions in plain words: it is a set of reproducible ML model
practice drills, it is for self-taught learners, and the first action is
**Try it with sample data**. The action is visible in the first viewport on
both sizes (mobile button bounds: y=650–695) and opens `/demo` in one keyboard
activation.

## Required claim tests

Fresh-clone setup used `npm ci`. Every command declared in
`.factory/claims.json` was run against the product's `/demo` entry point:

| Claim | Command | Result |
| --- | --- | --- |
| Runs stay in this browser | `npm test -- --grep @claim:local-browser-runs` | PASS (1 test) |
| Export the run record | `npm test -- --grep @claim:export-record` | PASS (1 test) |
| Demo reset/isolation | `npm test -- --grep @claim:demo-reset` | PASS (1 test) |
| Offline reload | `npm test -- --grep @claim:offline-reload` | PASS (1 test) |
| All 30 drills are open | `npm test -- --grep @claim:thirty-open-drills` | PASS (1 test) |

Claim coverage is nonetheless incomplete: the landing/README make additional
visitor-reliant statements about the checker recognizing an operation,
replaying a deterministic trace, and not executing arbitrary PyTorch. Those
statements have no corresponding entries in `claims.json`, contrary to the
claims contract.

## Local build and product exercise

- `npm test`: PASS, 8/8 Playwright tests.
- `npm run build`: PASS; TypeScript check passed and `dist/` was produced.
- Built gzip sizes: main JS 8.31 KB, worker 0.31 KB, CSS 3.01 KB. The hero
  WebP is 157,900 bytes. These meet the static-product budgets.
- The live deployment's HTML asset names match the build and SHA-256 checks of
  both main JS and CSS match byte-for-byte.
- Normal case: valid tensor-shape code passed and saved a replayable record.
  Invalid code produced the actionable “Not yet” result; Restore starter moved
  focus back to the editor; a subsequent valid run passed. Reset removed demo
  records. Malformed demo local storage recovered to the empty state.
- Live service-worker check: active `/sw.js`, no waiting/installing worker
  after `registration.update()`; `/demo` reloaded offline after first visit.
- No external runtime request was observed; landing requests were only the
  live origin's document, JS, CSS, and hero image. No sign-in or API endpoint
  exists, so API rate-limit/auth checks are not applicable.

## Accessibility, responsiveness, and performance

- Playwright axe on live landing and demo at desktop and 390 px: no serious or
  critical violations. Keyboard activation of the sample action, skip link,
  route history, visible focus CSS, and reduced-motion trace behavior worked.
- Live Lighthouse mobile: Performance 93, Accessibility 100, LCP 1,755 ms,
  CLS 0.
- `title`, `lang`, one `h1`, main landmark, image alt text, same-origin CSP,
  `X-Content-Type-Options`, and `Referrer-Policy` were present. Hashed assets
  have `Cache-Control: public, max-age=31536000, immutable`.

## Release-blocking defects

### High — CSP breaks the deployed demo trace and creates console errors

The live CSP is `style-src 'self'`, but `/demo` renders each trace bar with an
inline `style="--h:…"` custom property. Chromium blocks every property. A
fresh demo load logs seven CSP errors and all seven bars measure 4 px high
instead of their intended 12–100% heights. This violates the no-console-errors
gate and makes the deterministic training trace visually nonfunctional. Local
Vite-preview tests do not reproduce the deployed Static Web Apps headers.

### High — unlisted product claims

The checker/trace implementation and its limitation are stated on the landing
page and README but lack required `claims.json` entries and sandbox tests. The
claims contract explicitly makes this a review failure.

### Medium — no actual 404 response

`https://promptless-ml-lab.sociobot.in/does-not-exist` returns HTTP 200 and the
SPA landing document, rather than the supplied styled `404.html` with an HTTP
404 response. This does not meet the required real 404 route.

### Medium — several interactive targets are below 44 px

Measured at 390 px, header links are 21 px high (wordmark 30 px) and footer
Privacy/Terms links are 15 px high. Desktop header links are 26 px high. These
are their actual clickable rectangles, below the 44 × 44 CSS-pixel contract.

## Verdict

**FAIL.** The candidate is deployed and most core flows work, but it cannot be
accepted until the production CSP/trace console error is fixed and the stated
claims are covered by declared sandbox tests. The 404 and target-size defects
also require correction.
