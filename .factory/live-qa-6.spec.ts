import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const evidence = '.factory/verification-6-evidence';

test('cold first read and one-click populated demo', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Practice reproducible ML models.' })).toBeVisible();
  await expect(page.getByText('For self-taught learners who need one small model task and a check now.')).toBeVisible();
  const sample = page.getByRole('link', { name: 'Try it with sample data' });
  await expect(sample).toBeVisible();
  await page.screenshot({ path: `${evidence}/cold-desktop.png`, fullPage: true });
  await sample.click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByText('Demo — sample data, nothing is saved.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start for real' })).toBeVisible();
  await expect(page.locator('[data-drill]')).toHaveCount(30);
  await expect(page.getByRole('heading', { level: 2, name: 'Read tensor shapes' })).toBeVisible();
  await page.screenshot({ path: `${evidence}/demo-desktop.png`, fullPage: true });
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test('normal invalid boundary recovery export replay reset stays local', async ({ page }) => {
  const requests: { method: string; url: string }[] = [];
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on('request', (request) => requests.push({ method: request.method(), url: request.url() }));
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/demo');
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  const starter = await page.locator('#code').inputValue();

  await page.locator('#code').fill(`${starter}\nthis is not valid Python`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');

  await page.locator('#code').evaluate((node) => { (node as HTMLTextAreaElement).value = 'x'.repeat(100001); });
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Code is too long to save.');
  await expect(page.getByRole('button', { name: 'Run hidden checks' })).toBeEnabled();

  await page.locator('#code').fill(`${starter}\ntuple(x.size())`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Passed. Saved a replayable record with seed 11.');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export run records' }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  let body = '';
  for await (const chunk of stream!) body += chunk.toString();
  const payload = JSON.parse(body);
  expect(payload).toMatchObject({ format: 'seeded-ml-drills/run-records', version: 1, mode: 'demo' });
  const passed = payload.runs.find((run: { pass: boolean }) => run.pass);
  expect(passed).toMatchObject({ drillId: 'tensor-shapes', seed: 11, pass: true, version: 1 });
  expect(passed.trace).toHaveLength(7);

  await page.getByRole('button', { name: 'Replay', exact: true }).first().click();
  await expect(page.locator('#result')).toContainText('Replay checked the saved source: passed with seed 11.');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');

  expect(requests.every(({ method, url }) => method === 'GET' && new URL(url).origin === 'https://promptless-ml-lab.sociobot.in')).toBeTruthy();
  console.log('outgoing-requests', requests);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test('repaired drill 25 agrees with its operation', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-drill="overfit-gap"]').click();
  await expect(page.locator('.instruction-grid section').nth(0)).toContainText('Two fixed loss values');
  await expect(page.locator('.instruction-grid section').nth(1)).toContainText('Subtract train loss from validation loss.');
  await expect(page.locator('.instruction-grid section').nth(2)).toContainText('gap = 0.31');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nval_loss - train_loss`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  await page.locator('#code').fill(`${starter}\ntrain_loss - val_loss`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
  await page.screenshot({ path: `${evidence}/drill-25-live.png`, fullPage: true });
});

test('mobile, keyboard, focus, reflow, and reduced motion', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: `${evidence}/cold-mobile.png`, fullPage: true });
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to drills' })).toBeFocused();
  const focusStyle = await page.getByRole('link', { name: 'Skip to drills' }).evaluate((node) => {
    const style = getComputedStyle(node);
    return { width: style.outlineWidth, style: style.outlineStyle, color: style.outlineColor };
  });
  expect(focusStyle.style).not.toBe('none');
  expect(parseFloat(focusStyle.width)).toBeGreaterThanOrEqual(3);
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => location.hash)).toBe('#main');
  console.log('skip-link-focus', await page.evaluate(() => ({ hash: location.hash, active: document.activeElement?.tagName, id: document.activeElement?.id })));

  const keyboard = await context.newPage();
  await keyboard.setViewportSize({ width: 390, height: 844 });
  await keyboard.goto('/');
  await keyboard.bringToFront();
  const sequence: string[] = [];
  for (let i = 0; i < 12; i++) {
    if (await keyboard.evaluate(() => document.activeElement?.matches('a.button.primary'))) break;
    await keyboard.keyboard.press('Tab');
    sequence.push(await keyboard.evaluate(() => `${document.activeElement?.tagName}:${document.activeElement?.textContent?.trim()}`));
  }
  console.log('keyboard-sequence', sequence);
  await expect(keyboard.getByRole('link', { name: 'Try it with sample data' })).toBeFocused();
  await keyboard.keyboard.press('Enter');
  await expect(keyboard).toHaveURL(/\/demo$/);
  await expect(keyboard.getByRole('heading', { name: 'Run one seeded drill.' })).toBeFocused();
  await keyboard.screenshot({ path: `${evidence}/demo-mobile.png`, fullPage: true });

  const focusOrder = new Set<string>();
  for (let i = 0; i < 50; i++) {
    await keyboard.keyboard.press('Tab');
    focusOrder.add(await keyboard.evaluate(() => {
      const element = document.activeElement as HTMLElement | null;
      return element?.id || element?.dataset.drill || `${element?.tagName}:${element?.textContent?.trim()}`;
    }));
  }
  expect(focusOrder.size).toBeGreaterThanOrEqual(40);
  expect(focusOrder.has('track')).toBeTruthy();
  expect(focusOrder.has('code')).toBeTruthy();
  expect(focusOrder.has('run')).toBeTruthy();

  const undersized = await keyboard.locator('a:visible,button:visible,select:visible').evaluateAll((nodes) => nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    return { label: (node.textContent || '').trim(), width: rect.width, height: rect.height };
  }).filter(({ width, height }) => width < 44 || height < 44));
  expect(undersized).toEqual([]);
  expect(await keyboard.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await keyboard.emulateMedia({ reducedMotion: 'reduce' });
  const moving = await keyboard.locator('body *').evaluateAll((nodes) => nodes.filter((node) => {
    const style = getComputedStyle(node);
    const durations = `${style.animationDuration},${style.transitionDuration}`.split(',').map((value) => parseFloat(value) || 0);
    return durations.some((duration) => duration > 0);
  }).length);
  expect(moving).toBe(0);

  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto('/demo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(640);
  await expect(page.getByRole('button', { name: 'Run hidden checks' })).toBeVisible();
});

test('all live routes meet semantics, axe, console and link checks', async ({ page }) => {
  const routes = ['/', '/demo', '/lab', '/privacy', '/terms', '/missing-verification-6'];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) for (const route of routes) {
    await page.setViewportSize(viewport);
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const onConsole = (message: import('@playwright/test').ConsoleMessage) => { if (message.type() === 'error') consoleErrors.push(message.text()); };
    const onPageError = (error: Error) => pageErrors.push(error.message);
    page.on('console', onConsole);
    page.on('pageerror', onPageError);
    const response = await page.goto(route);
    if (route.startsWith('/missing')) expect(response?.status()).toBe(404); else expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    expect(await page.title()).not.toBe('');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    expect(await page.locator('img:not([alt])').count()).toBe(0);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')).toEqual([]);
    if (!route.startsWith('/missing')) expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
  }

  await page.goto('/');
  const hrefs = await page.locator('a[href]').evaluateAll((nodes) => [...new Set(nodes.map((node) => (node as HTMLAnchorElement).href))]);
  for (const href of hrefs) {
    if (href.includes('#')) continue;
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test('history navigation moves focus to the restored route heading', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goForward();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
});

test('representative interaction stays below the 200 ms response budget', async ({ page, context }) => {
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto('/demo');
  await page.evaluate(() => {
    (window as unknown as { qaEvents: number[] }).qaEvents = [];
    new PerformanceObserver((list) => {
      (window as unknown as { qaEvents: number[] }).qaEvents.push(...list.getEntries().map((entry) => entry.duration));
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
  });
  await page.getByRole('button', { name: 'Add a broadcast bias' }).click();
  await page.waitForTimeout(500);
  const durations = await page.evaluate(() => (window as unknown as { qaEvents: number[] }).qaEvents);
  const max = durations.length ? Math.max(...durations) : 0;
  console.log('event-timing-max-ms', max, 'entries', durations);
  expect(max).toBeLessThan(200);
});

test('live headers, caches, service-worker update and offline reload', async ({ page, context, request }) => {
  const root = await request.get('/');
  const headers = root.headers();
  expect(headers['strict-transport-security']).toContain('includeSubDomains');
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['cache-control']).toContain('max-age=30');
  const js = await request.get('/assets/index-CNwkXVvb.js');
  expect(js.headers()['cache-control']).toContain('max-age=31536000');
  expect(js.headers()['cache-control']).toContain('immutable');
  const artwork = await request.get('/assets/concrete-moss-lab.webp');
  expect(artwork.headers()['cache-control']).toContain('max-age=86400');
  expect(artwork.headers()['cache-control']).not.toContain('immutable');
  const sw = await request.get('/sw.js');
  expect(sw.headers()['cache-control']).toContain('max-age=30');

  await page.goto('/');
  const workerState = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return {
      active: registration.active?.state,
      waiting: Boolean(registration.waiting),
      installing: Boolean(registration.installing),
      controlled: Boolean(navigator.serviceWorker.controller),
      caches: await caches.keys()
    };
  });
  expect(workerState).toMatchObject({ active: 'activated', waiting: false, installing: false });
  expect(workerState.caches).toContain('seeded-ml-drills-v5');
  await page.goto('/demo');
  await context.setOffline(true);
  const offline = await page.reload();
  expect(offline?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await expect(page.locator('#offline-status')).toContainText('Offline.');
  await context.setOffline(false);
});
