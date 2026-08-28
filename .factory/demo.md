# Demo sandbox

Open `/demo` (or `?demo=1`) for the one-click sample. It starts with the
first of 30 fixed drills: tensor shapes, seed 11, and an 8 × 3 toy tensor.

Demo run records are stored only under `demo:seeded-ml-runs` in browser local
storage. Real mode uses `real:seeded-ml-runs`; demo never reads or writes that
key. **Reset demo** removes the demo key. **Start for real** routes to `/` and
therefore changes storage namespaces. The app shell and sample metadata are
cached by its service worker after the first visit, so the demo can be reloaded
offline.
