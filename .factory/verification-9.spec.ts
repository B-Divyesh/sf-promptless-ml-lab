import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const origin = 'https://promptless-ml-lab.sociobot.in';
const evidence = '.factory/verification-9-evidence';

test('cold first read and one-click sample are complete', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setViewportSize({ width: 1440, height: 900 });
  const response = await page.goto('/', { waitUntil: 'networkidle' });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1, name: 'Practice reproducible ML models.' })).toBeVisible();
  await expect(page.getByText('For self-taught learners who need one short ML drill and a check now.')).toBeVisible();
  const sample = page.getByRole('link', { name: 'Try it with sample data' });
  await expect(sample).toBeVisible();
  await expect(page.getByText('Opens a seeded drill and local run record.')).toBeVisible();
  await expect(page.locator('footer')).toContainText('build ded9fe4f7603');
  await page.screenshot({ path: `${evidence}/live-first-read-desktop.png`, fullPage: true });
  await sample.click();
  await expect(page).toHaveURL(`${origin}/demo`);
  await expect(page.getByLabel('Demo mode')).toContainText('Demo — sample data, nothing is saved.');
  await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open your real workbench' })).toBeVisible();
  await expect(page.locator('[data-drill]')).toHaveCount(30);
  await expect(page.getByRole('heading', { name: 'Read tensor shapes' })).toBeVisible();
  await expect(page.getByText('8 samples × 3 features')).toBeVisible();
  await expect(page.getByText('(8, 3)', { exact: true })).toBeVisible();
  await page.screenshot({ path: `${evidence}/live-demo-after-one-click.png`, fullPage: true });
  expect(errors).toEqual([]);
});

test('mobile keyboard, invalid input, recovery, export, replay, reset and privacy', async ({ page, context }) => {
  const requests: { method: string; url: string; type: string }[] = [];
  const errors: string[] = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url(), type: request.resourceType() }));
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const facts = await page.locator('.facts li').evaluateAll(items => items.map(item => {
    const box = item.getBoundingClientRect();
    return { text: item.textContent?.trim(), top: box.top, bottom: box.bottom };
  }));
  expect(facts.map(fact => fact.text)).toEqual([
    'Free. All 30 drills are open.',
    'Runs stay in this browser.',
    'Works offline after your first visit.'
  ]);
  expect(facts.every(fact => fact.top >= 0 && fact.bottom <= 844)).toBeTruthy();
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to drills' });
  await expect(skip).toBeFocused();
  const focus = await skip.evaluate(node => {
    const style = getComputedStyle(node);
    return { style: style.outlineStyle, width: parseFloat(style.outlineWidth), color: style.outlineColor };
  });
  expect(focus.style).not.toBe('none');
  expect(focus.width).toBeGreaterThanOrEqual(3);
  for (let step = 0; step < 10 && !(await page.getByRole('link', { name: 'Try it with sample data' }).evaluate(node => node === document.activeElement)); step++) {
    await page.keyboard.press('Tab');
  }
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(`${origin}/demo`);
  await expect(page.getByRole('heading', { level: 1, name: 'Run one seeded drill.' })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  const undersized = await page.locator('a:visible,button:visible,select:visible').evaluateAll(nodes => nodes.map(node => {
    const box = node.getBoundingClientRect();
    return { text: node.textContent?.trim(), width: box.width, height: box.height };
  }).filter(box => box.width < 44 || box.height < 44));
  expect(undersized).toEqual([]);

  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\n[8, 3]`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
  await page.locator('#code').evaluate(node => { (node as HTMLTextAreaElement).value = 'x'.repeat(100001); });
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Code is too long to save.');
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeFocused();
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed. Saved a replayable record with seed 11.');
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  const demoRecord = await page.evaluate(() => JSON.parse(localStorage.getItem('demo:seeded-ml-runs') || '[]')[0]);
  expect(demoRecord).toMatchObject({ drillId: 'tensor-shapes', seed: 11, pass: true, version: 1 });
  expect(demoRecord.trace).toHaveLength(7);

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export run records' }).click();
  const stream = await (await downloadPromise).createReadStream();
  let body = ''; for await (const chunk of stream!) body += chunk.toString();
  const exported = JSON.parse(body);
  expect(exported).toMatchObject({ format: 'seeded-ml-drills/run-records', version: 1, mode: 'demo' });
  expect(exported.runs.some((run: { pass: boolean; seed: number; trace: number[] }) => run.pass && run.seed === 11 && run.trace.length === 7)).toBeTruthy();
  await page.getByRole('button', { name: 'Replay', exact: true }).first().click();
  await expect(page.locator('#result')).toContainText('Replay checked the saved source: passed with seed 11.');
  await page.screenshot({ path: `${evidence}/live-mobile-e2e.png`, fullPage: true });
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');

  expect(requests.length).toBeGreaterThan(0);
  expect(requests.every(request => request.method === 'GET' && new URL(request.url).origin === origin)).toBeTruthy();
  expect(requests.filter(request => ['script', 'stylesheet', 'font'].includes(request.type)).every(request => new URL(request.url).origin === origin)).toBeTruthy();
  expect(errors).toEqual([]);

  await page.evaluate(() => navigator.serviceWorker.ready);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await context.setOffline(false);
});

test('import boundaries recover and keep demo namespace isolated', async ({ page }) => {
  const choose = async (buffer: Buffer) => {
    const chooser = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Import run records' }).click();
    await (await chooser).setFiles({ name: 'records.json', mimeType: 'application/json', buffer });
  };
  await page.goto('/demo');
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await choose(Buffer.from('{broken'));
  await expect(page.getByText('Nothing was imported. Choose an exported Seeded ML Drills JSON file.')).toBeVisible();
  const starter = await page.locator('#code').inputValue();
  const record = {
    id: 'verification-9-import', drillId: 'tensor-shapes', at: '2026-08-29T10:00:00.000Z', seed: 11,
    pass: true, code: `${starter}\nx.shape`,
    trace: [0, 0.24, 0.4, 0.55, 0.7, 0.84, 1], version: 1
  };
  const valid = Buffer.from(JSON.stringify({ format: 'seeded-ml-drills/run-records', version: 1, mode: 'real', runs: [record] }));
  await choose(valid);
  await expect(page.getByText('1 record is ready to import.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  await page.getByRole('button', { name: 'Import 1 record' }).click();
  await expect(page.getByText('Imported 1 run record into this demo workbench.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.locator('#result')).toContainText('Replay checked the saved source: passed with seed 11.');
  await choose(valid);
  await expect(page.getByText('Nothing was imported. Remove duplicate run records and choose the file again.')).toBeVisible();
});

test('routes, accessibility, reflow, reduced motion, links and console are sound', async ({ page }) => {
  const routes = [
    ['/', 'Seeded ML Drills — Practice reproducible models', '/'],
    ['/demo', 'Demo — Seeded ML Drills', '/demo'],
    ['/lab', 'Workbench — Seeded ML Drills', '/lab'],
    ['/privacy', 'Privacy — Seeded ML Drills', '/privacy'],
    ['/terms', 'Terms — Seeded ML Drills', '/terms']
  ] as const;
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const [path, title, canonical] of routes) {
      const errors: string[] = [];
      const onPageError = (error: Error) => errors.push(error.message);
      const onConsole = (message: import('@playwright/test').ConsoleMessage) => { if (message.type() === 'error') errors.push(message.text()); };
      page.on('pageerror', onPageError); page.on('console', onConsole);
      const response = await page.goto(path, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${canonical}`);
      expect(await page.locator('img:not([alt])').count()).toBe(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
      const headings = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
      expect(headings.every((level, index) => index === 0 || level <= headings[index - 1] + 1)).toBeTruthy();
      const serious = (await new AxeBuilder({ page }).analyze()).violations.filter(violation => violation.impact === 'serious' || violation.impact === 'critical');
      expect(serious).toEqual([]);
      expect(errors).toEqual([]);
      page.off('pageerror', onPageError); page.off('console', onConsole);
    }
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/demo');
  const moving = await page.locator('body *').evaluateAll(nodes => nodes.filter(node => {
    const style = getComputedStyle(node);
    return [...style.animationDuration.split(','), ...style.transitionDuration.split(',')].some(value => (parseFloat(value) || 0) > 0);
  }).length);
  expect(moving).toBe(0);

  await page.goto('/');
  const links = await page.locator('a[href]').evaluateAll(nodes => [...new Set(nodes.map(node => (node as HTMLAnchorElement).href))]);
  for (const href of links) {
    if (href.includes('#')) continue;
    expect((await page.request.get(href)).status(), href).toBe(200);
  }
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Practice reproducible ML models.' })).toBeFocused();
  await page.goForward();
  await expect(page.getByRole('heading', { name: 'Your practice stays in this browser.' })).toBeFocused();

  const missing = await page.goto('/not-a-real-verification-9-route');
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle('Not found — Seeded ML Drills');
  await expect(page.getByRole('heading', { level: 1, name: 'That drill does not exist.' })).toBeVisible();
  const serious404 = (await new AxeBuilder({ page }).analyze()).violations.filter(violation => violation.impact === 'serious' || violation.impact === 'critical');
  expect(serious404).toEqual([]);
});

test('security headers, caching, service-worker update and response budget pass', async ({ page, context, request }) => {
  const root = await request.get('/');
  const headers = root.headers();
  expect(headers['strict-transport-security']).toContain('includeSubDomains');
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['content-security-policy']).toContain("default-src 'self'");
  expect(headers['content-security-policy']).toContain("connect-src 'self'");
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['cache-control']).toContain('max-age=30');
  const html = await root.text();
  const jsPath = html.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1];
  const cssPath = html.match(/href="(\/assets\/index-[^"]+\.css)"/)?.[1];
  expect(jsPath).toBeTruthy(); expect(cssPath).toBeTruthy();
  for (const path of [jsPath!, cssPath!]) {
    const response = await request.get(path);
    expect(response.headers()['cache-control']).toContain('max-age=31536000');
    expect(response.headers()['cache-control']).toContain('immutable');
  }
  const artwork = await request.get('/assets/concrete-moss-lab.webp');
  expect(artwork.headers()['cache-control']).toContain('max-age=86400');
  expect(artwork.headers()['cache-control']).not.toContain('immutable');
  const sw = await request.get('/sw.js');
  expect(sw.headers()['cache-control']).toContain('max-age=30');

  await page.goto('/');
  const worker = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return { active: registration.active?.state, waiting: Boolean(registration.waiting), installing: Boolean(registration.installing), controlled: Boolean(navigator.serviceWorker.controller), caches: await caches.keys() };
  });
  expect(worker).toMatchObject({ active: 'activated', waiting: false, installing: false, controlled: true });
  expect(worker.caches).toContain('seeded-ml-drills-v6');

  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto('/demo');
  await page.evaluate(() => {
    (window as unknown as { verificationEvents: number[] }).verificationEvents = [];
    new PerformanceObserver(list => (window as unknown as { verificationEvents: number[] }).verificationEvents.push(...list.getEntries().map(entry => entry.duration)))
      .observe({ type: 'event', buffered: true, durationThreshold: 16 });
  });
  await page.getByRole('button', { name: 'Add a broadcast bias' }).click();
  await page.waitForTimeout(500);
  const durations = await page.evaluate(() => (window as unknown as { verificationEvents: number[] }).verificationEvents);
  expect(durations.length ? Math.max(...durations) : 0).toBeLessThan(200);
});
