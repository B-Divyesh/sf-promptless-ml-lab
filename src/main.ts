import './style.css';
import { drills, tracks, type Drill } from './drills';

type Run = { id: string; drillId: string; at: string; seed: number; pass: boolean; code: string; trace: number[]; version: 1 };
declare const __BUILD_ID__: string;
const root = document.querySelector<HTMLDivElement>('#app')!;
const routeStatus = document.createElement('div');
routeStatus.className = 'sr-only';
routeStatus.setAttribute('role', 'status');
routeStatus.setAttribute('aria-live', 'polite');
routeStatus.setAttribute('aria-atomic', 'true');
document.body.insertBefore(routeStatus, root);
const DEMO_RUNS_KEY = 'demo:seeded-ml-runs';
const REAL_RUNS_KEY = 'real:seeded-ml-runs';
const isDemoRoute = (path = location.pathname, search = location.search) => path === '/demo' || new URLSearchParams(search).get('demo') === '1';
const isDemo = () => isDemoRoute();
const runStorage = () => isDemo() ? sessionStorage : localStorage;
const key = () => isDemo() ? DEMO_RUNS_KEY : REAL_RUNS_KEY;
// Demo records are intentionally session-scoped. The cleanup helper also
// removes the old local-storage key left by releases before the sandbox rule.
function discardDemoRecords() {
  try { sessionStorage.removeItem(DEMO_RUNS_KEY); } catch { /* Storage can be unavailable. */ }
  removeLegacyDemoRecords();
}
function removeLegacyDemoRecords() {
  try { localStorage.removeItem(DEMO_RUNS_KEY); } catch { /* Remove legacy demo data when possible. */ }
}
const isRun = (value: unknown): value is Run => {
  if (!value || typeof value !== 'object') return false;
  const run = value as Partial<Run>;
  const drill = drills.find(({ id }) => id === run.drillId);
  return typeof run.id === 'string' && run.id.length > 0 && run.id.length <= 100
    && Boolean(drill) && run.seed === drill?.seed && typeof run.at === 'string'
    && !Number.isNaN(Date.parse(run.at)) && typeof run.pass === 'boolean'
    && typeof run.code === 'string' && run.code.length <= 100000 && run.version === 1
    && Array.isArray(run.trace) && run.trace.length === 7
    && run.trace.every((point) => typeof point === 'number' && Number.isFinite(point));
};
const getRuns = (): Run[] => { try { const value: unknown = JSON.parse(runStorage().getItem(key()) || '[]'); return Array.isArray(value) ? value.filter(isRun) : []; } catch { return []; } };
const saveRuns = (runs: Run[]) => { try { runStorage().setItem(key(), JSON.stringify(runs)); return true; } catch { return false; } };
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]!));
let active = drills[0]; let selectedTrack = 'All'; let lastRun: Run | null = null;
let pendingImport: Run[] | null = null;
let importNotice = '';

function currentMetadata(path = location.pathname) {
  if (path === '/privacy') return { title: 'Privacy — Seeded ML Drills', description: 'See what Seeded ML Drills stores in your browser and how demo records stay separate.', canonical: '/privacy' };
  if (path === '/terms') return { title: 'Terms — Seeded ML Drills', description: 'Read the terms for using the free Seeded ML Drills practice tool.', canonical: '/terms' };
  if (path === '/demo' || new URLSearchParams(location.search).get('demo') === '1') return { title: 'Demo — Seeded ML Drills', description: 'Try a seeded tensor-shape drill with sample data in an isolated demo.', canonical: '/demo' };
  if (path === '/lab') return { title: 'Workbench — Seeded ML Drills', description: 'Run short, fixed machine-learning drills and save records in this browser.', canonical: '/lab' };
  return { title: 'Seeded ML Drills — Practice PyTorch operations', description: 'Practice PyTorch operations in fixed drills with browser checks.', canonical: '/' };
}
function setMetadata() {
  const metadata = currentMetadata();
  document.title = metadata.title;
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = new URL(metadata.canonical, location.origin).href;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', metadata.description);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', metadata.title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', metadata.description);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
}
function header() { return `<a class="skip" href="#main">Skip to drills</a><header><a class="wordmark" href="/" data-route>SEED<br><i>ML drills</i></a><nav aria-label="Main navigation"><a href="/demo" data-route>Demo</a><a href="/#catalog" data-route>Drills</a><a href="/privacy" data-route>Privacy</a></nav></header>`; }
function footer() { return `<footer><p>Short ML practice with fixed inputs.</p><p><a href="/privacy" data-route>Privacy</a> · <a href="/terms" data-route>Terms</a> · Built by Param Factory · v1.0.0 · build ${escape(__BUILD_ID__.slice(0, 12))}</p></footer>`; }
function demoBanner() { return isDemo() ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved.</strong><button class="text-button" id="reset-demo">Reset demo</button><a href="/lab" data-route>Open your real workbench</a></aside>` : ''; }
function renderLanding() {
  setMetadata();
  root.innerHTML = `${header()}${demoBanner()}<main id="main" tabindex="-1">
    <section class="hero"><div class="hero-copy"><p class="eyebrow">FIXED SEEDS / NO CHAT REQUIRED</p><h1>Practice PyTorch operations in fixed drills.</h1><p class="lede">For self-taught ML learners who want one short drill with a browser check.</p><p><a class="button primary" href="/demo" data-route>Try it with sample data</a> <span class="action-note">Opens a tensor-shape drill with fixed sample inputs.</span></p><ul class="facts"><li>Free. All 30 drills are open.</li><li>Runs stay in this browser.</li><li>Works offline after your first visit.</li></ul></div><figure class="hero-art"><picture><source media="(max-width: 760px)" srcset="/assets/concrete-moss-lab-640.webp" type="image/webp"><img src="/assets/concrete-moss-lab.webp" width="1280" height="853" fetchpriority="high" decoding="async" alt="A concrete workbench with moss growing along a plotted learning curve."></picture></figure></section>
    <section class="drill-preview" aria-labelledby="preview-heading"><div class="preview-copy"><p class="eyebrow">SAMPLE DRILL PREVIEW</p><h2 id="preview-heading">Read tensor shapes</h2><p>See the fixed inputs and expected result before opening the sample.</p><a class="button primary" href="/demo" data-route>Try this sample drill</a></div><div class="preview-details"><dl><div><dt>Seed</dt><dd>11</dd></div><div><dt>Dataset</dt><dd>8 samples × 3 features</dd></div><div><dt>Task</dt><dd>Return the shape of x.</dd></div><div><dt>Expected result</dt><dd>(8, 3)</dd></div></dl><section class="preview-record" aria-labelledby="preview-record-heading"><h3 id="preview-record-heading">Sample passed record</h3><p><strong>Read tensor shapes</strong> · seed 11 · passed</p><p>Seven repeated results: 0 → 1</p></section></div></section>
    <section class="field-section" id="catalog" aria-labelledby="catalog-heading"><div><h2 id="catalog-heading">Choose a short ML drill.</h2><p>Each drill checks its stated operation against fixed drill data.</p></div><div class="catalog-cta"><a class="button" href="/demo" data-route>Open the 30 drills</a></div></section>
    <section class="steps" aria-labelledby="steps-heading"><h2 id="steps-heading">How the drills work</h2><ol><li><strong>Pick a drill.</strong> Start with tensors, losses, or evaluation.</li><li><strong>Write one line.</strong> Use the supplied tiny dataset and seed.</li><li><strong>Save the record.</strong> Export the run when the check passes.</li></ol></section>
    <section class="limits" aria-labelledby="limits-heading"><h2 id="limits-heading">What this lab does not do.</h2><p>It does not host models, rank people, or give generated solutions. The checker accepts the PyTorch operation named in each drill. It reruns the same seven results from the same inputs. It does not execute arbitrary Python or PyTorch.</p></section>
  </main>${footer()}`;
}
function trace(drill: Drill) { return Array.from({ length: 7 }, (_, i) => Number((drill.start + (drill.end - drill.start) * (i / 6) ** 0.72).toFixed(3))); }
function traceBarClass(traceData: number[], index: number) {
  // Predeclared classes keep the bars compatible with the strict style CSP.
  return `trace-bar--${traceData.at(-1)! >= traceData[0] ? 'up' : 'down'}-${index + 1}`;
}
function progress(runs: Run[]) { return new Set(runs.filter((r) => r.pass).map((r) => r.drillId)).size; }
function drillList() { const shown = selectedTrack === 'All' ? drills : drills.filter((d) => d.track === selectedTrack); return shown.map((d) => `<button class="drill ${d.id === active.id ? 'selected' : ''}" data-drill="${d.id}" aria-pressed="${d.id === active.id}"><span>${escape(d.track)}</span><strong>${escape(d.title)}</strong><small>seed ${d.seed}</small></button>`).join(''); }
function importPanel() {
  const preview = pendingImport ? `<div class="import-preview"><strong>${pendingImport.length} ${pendingImport.length === 1 ? 'record is' : 'records are'} ready to import.</strong><button class="button primary" id="confirm-import">Import ${pendingImport.length} ${pendingImport.length === 1 ? 'record' : 'records'}</button><button class="text-button" id="cancel-import">Cancel import</button></div>` : '';
  return `<div class="record-tools"><button class="button" id="choose-import">Import run records</button><input class="sr-only" id="import-records" type="file" tabindex="-1" aria-label="Choose run-record JSON file" accept="application/json,.json"><button class="button" id="export-records" ${getRuns().length ? '' : 'disabled'}>Export run records</button></div>${preview}<p id="import-status" class="import-status" role="status" aria-live="polite">${escape(importNotice)}</p>`;
}
function renderLab(focusId?: string) {
  const runs = getRuns(); const traceData = lastRun?.drillId === active.id ? lastRun.trace : trace(active);
  setMetadata();
  root.innerHTML = `${header()}${demoBanner()}<main id="main" tabindex="-1" class="lab-main"><section class="lab-top"><div><p class="eyebrow">${isDemo() ? 'DEMO DRILL' : 'YOUR DRILLS'}</p><h1>Run one seeded drill.</h1><p>Complete five distinct drills for one practice set. <strong>${progress(runs)} / 5 passed</strong></p></div></section><p class="offline" id="offline-status" role="status">${navigator.onLine ? 'Online. Reopen these drills offline after this visit.' : 'Offline. Your saved run records and drills are available.'}</p>
  <section class="workbench"><article class="exercise" aria-labelledby="drill-title"><div class="exercise-head"><div><p class="eyebrow">${escape(active.track)} · DRILL ${drills.indexOf(active)+1} OF 30</p><h2 id="drill-title">${escape(active.title)}</h2><p>${escape(active.goal)}</p></div><span class="seed">SEED<br><b>${active.seed}</b></span></div><div class="instruction-grid"><section class="data-cell"><h3>Dataset</h3><p>${escape(active.dataset)}</p></section><section class="task-cell"><h3>Task</h3><p>${escape(active.task)}</p></section><section class="result-cell"><h3>Expected result</h3><p>${escape(active.expected)}</p></section></div>
  <label class="code-label" for="code">Your PyTorch line</label><textarea id="code" maxlength="100000" spellcheck="false" aria-describedby="code-help">${escape(lastRun?.drillId === active.id ? lastRun.code : active.starter)}</textarea><p id="code-help" class="hint">Edit the TODO line. The browser checks it against this drill’s fixed inputs. It does not execute arbitrary Python or PyTorch.</p><div class="run-row"><button class="button primary" id="run">Check my answer</button><button class="text-button" id="restore">Restore starter</button><span id="result" role="status" aria-live="polite"></span></div>
  <section class="trace" aria-labelledby="trace-heading"><div><h3 id="trace-heading">Seven repeated results</h3><p>Metric: ${escape(active.metric)} · seed ${active.seed}</p></div><div class="bars" aria-label="Results from ${traceData[0]} to ${traceData[traceData.length - 1]}">${traceData.map((n, i) => `<span class="${traceBarClass(traceData, i)}" title="step ${i+1}: ${n}"></span>`).join('')}</div><div class="trace-values"><span>start ${traceData[0]}</span><span>end ${traceData.at(-1)}</span></div></section>
  <section class="records" aria-labelledby="record-heading"><h3 id="record-heading">Replayable run records</h3>${importPanel()}${runs.length ? `<ol>${runs.slice(0,5).map((r) => `<li><strong>${escape(drills.find((d) => d.id === r.drillId)?.title || r.drillId)}</strong> · seed ${r.seed} · ${r.pass ? 'passed' : 'needs work'} <button class="text-button replay" data-replay="${r.id}">Replay</button></li>`).join('')}</ol>` : '<p>No records yet. Pass a check or import records to add one here.</p>'}</section>
  </article><aside class="catalog" aria-label="Drill catalog"><h2>Choose another drill</h2><label for="track">Filter drills</label><select id="track"><option>All</option>${tracks.map((t) => `<option ${t === selectedTrack ? 'selected' : ''}>${escape(t)}</option>`).join('')}</select><div class="drill-list">${drillList()}</div></aside></section></main>${footer()}`;
  if (focusId) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${focusId}`)?.focus());
}
function check(sourceOverride?: string, replay = false) {
  const source = sourceOverride ?? (document.querySelector<HTMLTextAreaElement>('#code')?.value || '');
  const button = document.querySelector<HTMLButtonElement>('#run')!;
  const result = document.querySelector<HTMLElement>('#result')!;
  if (source.length > 100000) { result.className = 'fail'; result.textContent = 'Code is too long to save. Keep the answer under 100,000 characters and try again.'; button.focus(); return; }
  button.disabled = true; button.textContent = 'Checking in sandbox…';
  const worker = new Worker(new URL('./checker-worker.ts', import.meta.url), { type: 'module' });
  worker.onmessage = ({ data }: MessageEvent<{ pass: boolean; trace: number[]; reason?: string }>) => {
    const run: Run = { id: crypto.randomUUID(), drillId: active.id, at: new Date().toISOString(), seed: active.seed, pass: data.pass, code: source, trace: data.trace, version: 1 };
    worker.terminate();
    if (replay) {
      lastRun = { ...lastRun!, trace: data.trace, pass: data.pass };
      renderLab('run');
      const updated = document.querySelector<HTMLElement>('#result')!; updated.className = data.pass ? 'pass' : 'fail'; updated.textContent = data.pass ? `Replay checked the saved source: passed with seed ${active.seed}.` : `Replay found that the saved source no longer passes this drill's fixed inputs.`;
      return;
    }
    if (!saveRuns([run, ...getRuns()].slice(0, 100))) {
      button.disabled = false; button.textContent = 'Check my answer'; result.className = 'fail'; result.textContent = 'This browser could not save the run. Free some browser storage, then try again.'; button.focus(); return;
    }
    lastRun = run; renderLab('run');
    const updated = document.querySelector<HTMLElement>('#result')!; updated.className = data.pass ? 'pass' : 'fail'; updated.textContent = data.pass ? `Passed. Saved a replayable record with seed ${active.seed}.` : `Not yet. Use a valid answer line that produces ${active.expected}, then run checks again.${data.reason ? ` (${data.reason})` : ''}`;
  };
  worker.onerror = () => { worker.terminate(); button.disabled = false; button.textContent = 'Check my answer'; result.className = 'fail'; result.textContent = 'The check could not finish. Try again.'; button.focus(); };
  worker.postMessage({ code: source, drillId: active.id, starter: active.starter, seed: active.seed, start: active.start, end: active.end });
}
function download() { const blob = new Blob([JSON.stringify({ format: 'seeded-ml-drills/run-records', version: 1, mode: isDemo() ? 'demo' : 'real', runs: getRuns() }, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `seeded-ml-drills-${isDemo() ? 'demo-' : ''}records.json`; a.click(); URL.revokeObjectURL(a.href); }
function readImport(text: string) {
  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== 'object') throw new Error();
    const file = value as { format?: unknown; version?: unknown; runs?: unknown };
    if (file.format !== 'seeded-ml-drills/run-records' || file.version !== 1 || !Array.isArray(file.runs) || file.runs.length < 1 || file.runs.length > 100 || !file.runs.every(isRun)) throw new Error();
    const records = file.runs as Run[];
    const ids = records.map(({ id }) => id);
    const existing = new Set(getRuns().map(({ id }) => id));
    if (new Set(ids).size !== ids.length || ids.some((id) => existing.has(id))) {
      pendingImport = null;
      importNotice = 'Nothing was imported. Remove duplicate run records and choose the file again.';
      return;
    }
    if (records.length + existing.size > 100) {
      pendingImport = null;
      importNotice = 'Nothing was imported. Keep the combined history at 100 run records or fewer.';
      return;
    }
    pendingImport = records;
    importNotice = `${records.length} ${records.length === 1 ? 'record is' : 'records are'} valid. Review the count, then import.`;
  } catch {
    pendingImport = null;
    importNotice = 'Nothing was imported. Choose an exported Seeded ML Drills JSON file.';
  }
}
function renderStatic(page: 'privacy'|'terms') { const content = page === 'privacy' ? `<h1>Your practice stays in this browser.</h1><p>Seeded ML Drills stores real run records in your browser’s local storage. It does not send your code, run records, or identity to a server.</p><h2>Demo mode</h2><p>Demo records use separate session storage. Leaving demo mode or selecting Reset demo removes them. Opening your real workbench never reads demo records.</p><h2>Offline files</h2><p>After the first visit, the service worker saves the files needed to reopen the drills offline.</p>` : `<h1>Use the drills freely.</h1><p>Seeded ML Drills is a free practice tool. The drills and local records are provided as-is for learning.</p><h2>Your code</h2><p>You keep your code. Nothing in this version uploads it.</p><h2>Drill limitations</h2><p>The browser checks one answer line against each drill’s fixed inputs. It does not execute arbitrary Python or PyTorch. Verify production work in your own Python environment.</p>`;
  setMetadata(); root.innerHTML = `${header()}<main id="main" tabindex="-1" class="legal"><p class="eyebrow">SEED / ML DRILLS</p>${content}<p><a class="button" href="/demo" data-route>Try a sample drill</a></p></main>${footer()}`;
}
let previousRouteWasDemo = isDemo();
// All in-product route changes flow through here, including popstate. This is
// the single exit boundary for the sample sandbox.
function reconcileDemoRoute(nextRouteIsDemo: boolean) {
  if (previousRouteWasDemo && !nextRouteIsDemo) discardDemoRecords();
  if (nextRouteIsDemo) removeLegacyDemoRecords();
  previousRouteWasDemo = nextRouteIsDemo;
}
removeLegacyDemoRecords();
function route(path = location.pathname, moveFocus = false) { const nextRouteIsDemo = isDemoRoute(path); reconcileDemoRoute(nextRouteIsDemo); if (path === '/privacy') renderStatic('privacy'); else if (path === '/terms') renderStatic('terms'); else if (path === '/demo' || path === '/lab' || nextRouteIsDemo) renderLab(); else renderLanding(); requestAnimationFrame(() => { if (location.hash) document.querySelector(location.hash)?.scrollIntoView(); if (moveFocus) { const heading = document.querySelector<HTMLElement>('h1'); heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true }); routeStatus.textContent = `${document.title}. ${heading?.textContent || ''}`; } }); }
function navigate(href: string) { history.pushState({}, '', href); route(location.pathname, true); }
document.addEventListener('click', (event) => { const target = event.target as HTMLElement; const anchor = target.closest<HTMLAnchorElement>('a[data-route]'); if (anchor) { event.preventDefault(); pendingImport = null; importNotice = ''; navigate(anchor.href); return; } const button = target.closest<HTMLButtonElement>('button'); if (!button) return; if (button.dataset.drill) { active = drills.find((d) => d.id === button.dataset.drill)!; lastRun = null; renderLab('drill'); } if (button.id === 'run') check(); if (button.id === 'restore') { lastRun = null; const code = document.querySelector<HTMLTextAreaElement>('#code')!; code.value = active.starter; code.focus(); } if (button.id === 'choose-import') document.querySelector<HTMLInputElement>('#import-records')?.click(); if (button.id === 'export-records') download(); if (button.id === 'confirm-import' && pendingImport) { const records = pendingImport; if (saveRuns([...records, ...getRuns()])) { pendingImport = null; importNotice = `Imported ${records.length} ${records.length === 1 ? 'run record' : 'run records'} into this ${isDemo() ? 'demo' : 'real'} workbench.`; lastRun = records[0]; active = drills.find(({ id }) => id === records[0].drillId)!; renderLab('record-heading'); } else { importNotice = 'The browser could not save these records. Free some browser storage, then try again.'; renderLab('confirm-import'); } } if (button.id === 'cancel-import') { pendingImport = null; importNotice = 'Import canceled. No records changed.'; renderLab('choose-import'); } if (button.id === 'reset-demo') { discardDemoRecords(); lastRun = null; pendingImport = null; importNotice = ''; renderLab('reset-demo'); } if (button.dataset.replay) { const run = getRuns().find((r) => r.id === button.dataset.replay); if (run) { active = drills.find((d) => d.id === run.drillId)!; lastRun = run; renderLab('run'); requestAnimationFrame(() => check(run.code, true)); } } });
document.addEventListener('change', async (event) => { const control = event.target as HTMLInputElement | HTMLSelectElement; if (control.id === 'track') { selectedTrack = control.value; renderLab('track'); } if (control.id === 'import-records' && control instanceof HTMLInputElement) { const file = control.files?.[0]; if (!file) return; if (file.size > 2_000_000) { pendingImport = null; importNotice = 'Nothing was imported. Choose a JSON file smaller than 2 MB.'; renderLab('choose-import'); return; } readImport(await file.text()); renderLab(pendingImport ? 'confirm-import' : 'choose-import'); } });
window.addEventListener('popstate', () => route(location.pathname, true)); window.addEventListener('online', () => route()); window.addEventListener('offline', () => route());
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined);
route();
