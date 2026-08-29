# Seeded ML Drills

Practice PyTorch operations in fixed drills.

Seeded ML Drills gives self-taught ML learners one short PyTorch drill with a
browser check. You do not need to choose a project or ask a chatbot.
It has 30 drills with fixed seeds, toy datasets, browser checks, and
exportable local run records.

## Try the sample

Open `/demo` after starting the app. The demo opens a tensor-shape drill with
fixed sample inputs and seed 11. Its records use the separate `demo:seeded-ml-runs` local-storage
key. **Reset demo** clears that key. **Open your real workbench** discards demo
records, then switches to the separate `real:seeded-ml-runs` key.

The browser checks one answer line against each drill's fixed inputs. An answer
must use the operation named by the drill and produce the expected value. It
rejects changed inputs, unrelated shortcuts, and incomplete expressions. The
tests cover this behavior in all 30 drills. The checker does not execute
arbitrary Python or PyTorch. Use your own Python environment for production
verification.

Run records can be exported as JSON and imported into another browser. Import
checks the file, previews the record count, and rejects malformed or duplicate
records. Imported records stay in the open demo or real workbench. Each
imported record can be replayed against its drill's fixed inputs.

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

Install dependencies with `npm ci`. `npm run build` creates `dist/index.html`
and the static deployment assets. The project uses no runtime third-party
scripts, remote fonts, or analytics. After the first visit, the service worker
saves the files needed to reopen `/demo` offline.

## Deploy

Deploy `dist/` to Azure Static Web Apps. The built config supports direct
links, the 404 page, caching, and browser security headers.

## Privacy and terms

Read [Privacy](https://promptless-ml-lab.sociobot.in/privacy) and
[Terms](https://promptless-ml-lab.sociobot.in/terms). Run records remain in the
visitor's browser unless they choose to export a JSON file.

## License

MIT. See [LICENSE](LICENSE).
