# Handoff — Seeded ML Drills

## Delivered

- A Vite + vanilla TypeScript static web app with 30 short, seeded ML drills
  across tensor basics, data handling, linear models, classification, networks,
  training loops, evaluation, classical ML, and reproducibility.
- A one-click `/demo` workbench with a persistent sample-data banner, a separate
  `demo:seeded-ml-runs` namespace, Reset demo, and Start for real.
- Fixed toy datasets, expected results, deterministic seven-step traces, hidden
  operation checks in a dedicated browser worker, local replay records, and JSON
  run-record export.
- Offline reload after a first visit through a small same-origin service worker.
- `/privacy`, `/terms`, and a styled static 404 page with real history routes.
- A product-specific concrete-and-moss visual system. The original hero art is
  in `assets/src/concrete-moss-lab.png`; its 155 KB production WebP is in
  `public/assets/concrete-moss-lab.webp`. Prompt and provenance are recorded in
  `.factory/design.md` and the image sidecar.

## Important grading limit

The browser checker deliberately recognizes the required PyTorch operation and
replays a fixed, visible trace. It does **not** execute arbitrary Python or
PyTorch. This is disclosed on the landing page, in the workbench, Terms, and
README so a learner can use a local Python environment for production checks.

## Verification

```sh
npm test
npm run build
```

Verified on 2026-08-28:

- `npm test`: 8 Playwright tests passed. These cover a completed and replayed
  run, all four listed claims, the 30-drill count, offline reload, mobile
  keyboard access, and axe serious/critical violations on landing and demo.
- `npm run build`: passed; `dist/index.html` is at the deploy root.
- Lighthouse against the built landing page: Performance 99, Accessibility 100,
  Best Practices 100, SEO 100; LCP 2,018 ms and CLS 0. The browser run used the
  local Chromium binary with `--disable-dev-shm-usage`.
- Initial production JS is 8.31 KB gzip plus a 0.31 KB worker, and CSS is 3.01
  KB gzip. Hero WebP is 155 KB. No remote fonts, scripts, analytics, or runtime
  network origins are used.

## Known gaps / next steps

- Replacing the transparent operation checker with a fully in-browser Python /
  PyTorch runtime would make the drills more executable, but would increase the
  first-load budget substantially. The current limitation is explicit rather
  than presenting simulated execution as Python execution.
- The app does not import exported records yet. Records can be retained locally,
  replayed in the current browser, and exported as JSON.
