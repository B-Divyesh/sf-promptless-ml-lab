# Seeded ML Drills

Practice reproducible ML models in short, fixed exercises.

Seeded ML Drills is for self-taught machine-learning practitioners who want a
small, repeatable PyTorch task without choosing a project or asking a chatbot.
It has 30 drills with fixed seeds, toy datasets, immediate browser checks, and
exportable local run records.

## Try the sample

Open `/demo` after starting the app. The demo begins on a tensor-shape drill
with seed 11. Its records use the separate `demo:seeded-ml-runs` local-storage
key. **Reset demo** clears that key. **Start for real** discards demo records,
then switches to the separate `real:seeded-ml-runs` key.

The browser check runs a supported expression against each drill’s immutable
fixed exercise fixture and replays the drill's fixed trace. An answer must use
the operation named by the drill and produce the expected value. It rejects
changed fixtures, unrelated shortcuts, and incomplete expressions. The test
suite checks this contract for all 30 drills. The evaluator does not execute
arbitrary Python or PyTorch. Use your own Python environment for production
verification.

## Develop

```sh
npm install
npm run dev
```

## Test and build

```sh
npm test
npm run build
```

`npm ci` installs the pinned Azure Static Web Apps emulator used by the browser
tests. `npm run build` writes the static deployment to `dist/`, with `index.html` at
its root. The project uses no runtime third-party scripts, remote fonts, or
analytics. The service worker caches the application shell after the first
visit, so `/demo` can reload offline.

## Deploy

Deploy `dist/` to Azure Static Web Apps. `staticwebapp.config.json` is included
in the build output with SPA fallback, 404 handling, cache rules, and security
headers.

## Privacy and terms

Read [Privacy](https://promptless-ml-lab.sociobot.in/privacy) and
[Terms](https://promptless-ml-lab.sociobot.in/terms). Run records remain in the
visitor's browser unless they choose to export a JSON file.

## License

MIT. See [LICENSE](LICENSE).
