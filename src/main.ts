import './style.css';
import { drills, tracks, type Drill } from './drills';

type Run = { id: string; drillId: string; at: string; seed: number; pass: boolean; code: string; trace: number[]; version: 1 };
declare const __BUILD_ID__: string;
const root = document.querySelector<HTMLDivElement>('#app')!;
const isDemo = () => location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1';
const key = () => `${isDemo() ? 'demo:' : 'real:'}seeded-ml-runs`;
const getRuns = (): Run[] => { try { return JSON.parse(localStorage.getItem(key()) || '[]'); } catch { return []; } };
const saveRuns = (runs: Run[]) => { try { localStorage.setItem(key(), JSON.stringify(runs)); return true; } catch { return false; } };
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]!));
let active = drills[0]; let selectedTrack = 'All'; let lastRun: Run | null = null;

function currentTitle(path = location.pathname) {
  if (path === '/privacy') return 'Privacy — Seeded ML Drills';
  if (path === '/terms') return 'Terms — Seeded ML Drills';
  if (path === '/demo' || new URLSearchParams(location.search).get('demo') === '1') return 'Demo — Seeded ML Drills';
  if (path === '/lab') return 'Workbench — Seeded ML Drills';
  return 'Seeded ML Drills — Practice reproducible models';
}
function setMetadata() { document.title = currentTitle(); const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]'); if (canonical) canonical.href = new URL(location.pathname + location.search, location.origin).href; }
function header() { return `<a class="skip" href="#main">Skip to drills</a><header><a class="wordmark" href="/" data-route>SEED<br><i>ML drills</i></a><nav aria-label="Main navigation"><a href="/demo" data-route>Demo</a><a href="/#catalog" data-route>Drills</a><a href="/privacy" data-route>Privacy</a></nav></header>`; }
function footer() { return `<footer><p>Short ML practice with fixed inputs.</p><p><a href="/privacy" data-route>Privacy</a> · <a href="/terms" data-route>Terms</a> · Built by Param Factory · v1.0.0 · build ${escape(__BUILD_ID__.slice(0, 12))}</p><p class="generated">Hero art is generated original artwork.</p></footer>`; }
function demoBanner() { return isDemo() ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved.</strong><button class="text-button" id="reset-demo">Reset demo</button><a href="/lab" data-route data-exit-demo>Start for real</a></aside>` : ''; }
function renderLanding() {
  setMetadata();
  root.innerHTML = `${header()}${demoBanner()}<main id="main" tabindex="-1">
    <section class="hero"><div class="hero-copy"><p class="eyebrow">FIXED SEEDS / NO CHAT REQUIRED</p><h1>Practice reproducible ML models.</h1><p class="lede">For self-taught learners who need one small model task and a check now.</p><p><a class="button primary" href="/demo" data-route>Try it with sample data</a> <span class="action-note">Opens a seeded drill and local run record.</span></p><ul class="facts"><li>Free. All 30 drills are open.</li><li>Runs stay in this browser.</li><li>Works offline after your first visit.</li></ul></div><figure class="hero-art"><img src="/assets/concrete-moss-lab.webp" width="1280" height="853" fetchpriority="high" decoding="async" alt="A concrete workbench with moss growing along a plotted learning curve."><figcaption>One small trace at a time.</figcaption></figure></section>
    <section class="field-section" id="catalog" aria-labelledby="catalog-heading"><div><p class="eyebrow">THE WORKBENCH</p><h2 id="catalog-heading">Choose a concept-sized drill.</h2><p>Each drill uses a fixed seed, a toy dataset, and a small expected result.</p></div><div class="catalog-cta"><a class="button" href="/demo" data-route>Open the 30 drills</a><span>Estimated 6–10 minutes each</span></div></section>
    <section class="steps" aria-labelledby="steps-heading"><h2 id="steps-heading">Build the habit in three steps.</h2><ol><li><strong>Pick a drill.</strong> Start with tensors, losses, or evaluation.</li><li><strong>Write one line.</strong> Use the supplied tiny dataset and seed.</li><li><strong>Save the record.</strong> Export the run when the check passes.</li></ol></section>
    <section class="limits" aria-labelledby="limits-heading"><h2 id="limits-heading">What this lab does not do.</h2><p>It does not host models, rank people, or give generated solutions. Checks evaluate a supported answer line against fixed exercise data and replay a deterministic trace. It does not execute arbitrary Python or PyTorch.</p></section>
  </main>${footer()}`;
}
function trace(drill: Drill) { return Array.from({ length: 7 }, (_, i) => Number((drill.start + (drill.end - drill.start) * (i / 6) ** 0.72).toFixed(3))); }
function traceBarClass(traceData: number[], index: number) {
  // Predeclared classes keep the bars compatible with the strict style CSP.
  return `trace-bar--${traceData.at(-1)! >= traceData[0] ? 'up' : 'down'}-${index + 1}`;
}
function progress(runs: Run[]) { return new Set(runs.filter((r) => r.pass).map((r) => r.drillId)).size; }
function drillList() { const shown = selectedTrack === 'All' ? drills : drills.filter((d) => d.track === selectedTrack); return shown.map((d) => `<button class="drill ${d.id === active.id ? 'selected' : ''}" data-drill="${d.id}" aria-pressed="${d.id === active.id}"><span>${escape(d.track)}</span><strong>${escape(d.title)}</strong><small>${d.minutes} min · seed ${d.seed}</small></button>`).join(''); }
function renderLab(focusId?: string) {
  const runs = getRuns(); const traceData = lastRun?.drillId === active.id ? lastRun.trace : trace(active);
  setMetadata();
  root.innerHTML = `${header()}${demoBanner()}<main id="main" tabindex="-1" class="lab-main"><section class="lab-top"><div><p class="eyebrow">${isDemo() ? 'DEMO WORKBENCH' : 'YOUR WORKBENCH'}</p><h1>Run one seeded drill.</h1><p>Complete five distinct drills to make a focused practice set. <strong>${progress(runs)} / 5 passed</strong></p></div><button class="button" id="export-records" ${runs.length ? '' : 'disabled'}>Export run records</button></section><p class="offline" id="offline-status" role="status">${navigator.onLine ? 'Online. This lab can be replayed offline after this visit.' : 'Offline. Your saved lab and seeded drills are still available.'}</p>
  <section class="workbench"><aside class="catalog" aria-label="Drill catalog"><label for="track">Filter drills</label><select id="track"><option>All</option>${tracks.map((t) => `<option ${t === selectedTrack ? 'selected' : ''}>${escape(t)}</option>`).join('')}</select><div class="drill-list">${drillList()}</div></aside>
  <article class="exercise" aria-labelledby="drill-title"><div class="exercise-head"><div><p class="eyebrow">${escape(active.track)} · DRILL ${drills.indexOf(active)+1} OF 30</p><h2 id="drill-title">${escape(active.title)}</h2><p>${escape(active.goal)}</p></div><span class="seed">SEED<br><b>${active.seed}</b></span></div><div class="instruction-grid"><section><h3>Dataset</h3><p>${escape(active.dataset)}</p></section><section><h3>Task</h3><p>${escape(active.task)}</p></section><section><h3>Expected result</h3><p>${escape(active.expected)}</p></section></div>
  <label class="code-label" for="code">Your PyTorch line</label><textarea id="code" maxlength="100000" spellcheck="false" aria-describedby="code-help">${escape(lastRun?.drillId === active.id ? lastRun.code : active.starter)}</textarea><p id="code-help" class="hint">Edit the TODO line. The browser evaluates that expression against this drill’s fixed fixture; it does not execute arbitrary Python or PyTorch.</p><div class="run-row"><button class="button primary" id="run">Run hidden checks</button><button class="text-button" id="restore">Restore starter</button><span id="result" role="status" aria-live="polite"></span></div>
  <section class="trace" aria-labelledby="trace-heading"><div><h3 id="trace-heading">Deterministic trace</h3><p>Metric: ${escape(active.metric)} · seed ${active.seed}</p></div><div class="bars" aria-label="Trace from ${traceData[0]} to ${traceData[traceData.length - 1]}">${traceData.map((n, i) => `<span class="${traceBarClass(traceData, i)}" title="step ${i+1}: ${n}"></span>`).join('')}</div><div class="trace-values"><span>start ${traceData[0]}</span><span>end ${traceData.at(-1)}</span></div></section>
  <section class="records" aria-labelledby="record-heading"><h3 id="record-heading">Replayable run records</h3>${runs.length ? `<ol>${runs.slice(0,5).map((r) => `<li><strong>${escape(drills.find((d) => d.id === r.drillId)?.title || r.drillId)}</strong> · seed ${r.seed} · ${r.pass ? 'passed' : 'needs work'} <button class="text-button replay" data-replay="${r.id}">Replay</button></li>`).join('')}</ol>` : '<p>No records yet. Pass a check and the result will appear here.</p>'}</section>
  </article></section></main>${footer()}`;
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
      const updated = document.querySelector<HTMLElement>('#result')!; updated.className = data.pass ? 'pass' : 'fail'; updated.textContent = data.pass ? `Replay checked the saved source: passed with seed ${active.seed}.` : `Replay found that the saved source no longer passes this fixture.`;
      return;
    }
    if (!saveRuns([run, ...getRuns()].slice(0, 100))) {
      button.disabled = false; button.textContent = 'Run hidden checks'; result.className = 'fail'; result.textContent = 'This browser could not save the run. Free some browser storage, then try again.'; button.focus(); return;
    }
    lastRun = run; renderLab('run');
    const updated = document.querySelector<HTMLElement>('#result')!; updated.className = data.pass ? 'pass' : 'fail'; updated.textContent = data.pass ? `Passed. Saved a replayable record with seed ${active.seed}.` : `Not yet. Use a valid answer line that produces ${active.expected}, then run checks again.${data.reason ? ` (${data.reason})` : ''}`;
  };
  worker.onerror = () => { worker.terminate(); button.disabled = false; button.textContent = 'Run hidden checks'; result.className = 'fail'; result.textContent = 'The check could not finish. Try again.'; button.focus(); };
  worker.postMessage({ code: source, drillId: active.id, starter: active.starter, seed: active.seed, start: active.start, end: active.end });
}
function download() { const blob = new Blob([JSON.stringify({ format: 'seeded-ml-drills/run-records', version: 1, mode: isDemo() ? 'demo' : 'real', runs: getRuns() }, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `seeded-ml-drills-${isDemo() ? 'demo-' : ''}records.json`; a.click(); URL.revokeObjectURL(a.href); }
function renderStatic(page: 'privacy'|'terms') { const content = page === 'privacy' ? `<h1>Your practice stays in this browser.</h1><p>Seeded ML Drills stores run records in your browser’s local storage. It does not send your code, runs, or identity to a server.</p><h2>Demo mode</h2><p>Demo records use a separate <code>demo:</code> storage key. Reset demo removes those records. Starting for real never reads demo records.</p><h2>Offline files</h2><p>A service worker stores the app shell after your first visit so the lab can open without a network connection.</p>` : `<h1>Use the drills freely.</h1><p>Seeded ML Drills is a free practice tool. The exercises and local records are provided as-is for learning.</p><h2>Your code</h2><p>You keep your code. Nothing in this version uploads it.</p><h2>Exercise limitations</h2><p>The browser evaluates a supported answer line against fixed exercise data. It does not execute arbitrary Python or PyTorch. Verify production work in your own Python environment.</p>`;
  setMetadata(); root.innerHTML = `${header()}<main id="main" tabindex="-1" class="legal"><p class="eyebrow">SEED / ML DRILLS</p>${content}<p><a class="button" href="/demo" data-route>Try a sample drill</a></p></main>${footer()}`;
}
function route(path = location.pathname, moveFocus = false) { if (path === '/privacy') renderStatic('privacy'); else if (path === '/terms') renderStatic('terms'); else if (path === '/demo' || path === '/lab' || isDemo()) renderLab(); else renderLanding(); requestAnimationFrame(() => { if (location.hash) document.querySelector(location.hash)?.scrollIntoView(); if (moveFocus) { const heading = document.querySelector<HTMLElement>('h1'); heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true }); } }); }
function navigate(href: string) { history.pushState({}, '', href); route(location.pathname, true); }
document.addEventListener('click', (event) => { const target = event.target as HTMLElement; const anchor = target.closest<HTMLAnchorElement>('a[data-route]'); if (anchor) { event.preventDefault(); if (anchor.hasAttribute('data-exit-demo')) localStorage.removeItem('demo:seeded-ml-runs'); navigate(anchor.href); return; } const button = target.closest<HTMLButtonElement>('button'); if (!button) return; if (button.dataset.drill) { active = drills.find((d) => d.id === button.dataset.drill)!; lastRun = null; renderLab('drill'); } if (button.id === 'run') check(); if (button.id === 'restore') { lastRun = null; const code = document.querySelector<HTMLTextAreaElement>('#code')!; code.value = active.starter; code.focus(); } if (button.id === 'export-records') download(); if (button.id === 'reset-demo') { localStorage.removeItem('demo:seeded-ml-runs'); lastRun = null; renderLab('reset-demo'); } if (button.dataset.replay) { const run = getRuns().find((r) => r.id === button.dataset.replay); if (run) { active = drills.find((d) => d.id === run.drillId)!; lastRun = run; renderLab('run'); requestAnimationFrame(() => check(run.code, true)); } } });
document.addEventListener('change', (event) => { const select = event.target as HTMLSelectElement; if (select.id === 'track') { selectedTrack = select.value; renderLab('track'); } });
window.addEventListener('popstate', () => route(location.pathname, true)); window.addEventListener('online', () => route()); window.addEventListener('offline', () => route());
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined);
route();
