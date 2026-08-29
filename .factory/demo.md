# Demo sandbox

Open `/demo` (or `/?demo=1`) for the one-click sample. It starts with the
first of 30 fixed drills: tensor shapes, seed 11, and an 8 × 3 toy tensor.

The browser checker checks the named PyTorch operation and its result against
each drill's fixed inputs. The tests submit one intended answer and one
unrelated shortcut for every drill.

Demo run records are stored only under `demo:seeded-ml-runs` in browser local
storage. Real mode uses `real:seeded-ml-runs`; demo never reads or writes that
key. **Reset demo** removes the demo key. **Open your real workbench** discards
the demo key before routing to `/lab`, the real workbench, and changes storage
namespaces. After the first visit, the service worker saves the files needed to
reopen the demo offline.

Exported JSON can be imported after a format check and record-count preview.
Malformed and duplicate records are rejected. An import in demo mode writes
only to `demo:seeded-ml-runs`; an import in the real workbench writes only to
`real:seeded-ml-runs`. Imported records can be replayed.
