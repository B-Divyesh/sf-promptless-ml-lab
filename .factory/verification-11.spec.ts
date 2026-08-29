import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const origin = 'https://promptless-ml-lab.sociobot.in';
const evidence = '.factory/qa-11';
const expectedBuildId = process.env.EXPECTED_BUILD_ID;

function luminance(rgb: string) {
  const channels = rgb.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Cannot parse ${rgb}`);
  return channels.map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('cold first read and one-click sample pass at desktop and mobile', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1, name: 'Practice PyTorch operations in fixed drills.' })).toBeVisible();
    await expect(page.getByText('For self-taught ML learners who want one short drill with a browser check.')).toBeVisible();
    const sample = page.getByRole('link', { name: 'Try it with sample data' });
    await expect(sample).toBeVisible();
    await expect(page.getByText('Opens a tensor-shape drill with fixed sample inputs.')).toBeVisible();
    const firstScreen = [
      page.getByRole('heading', { level: 1 }),
      page.getByText('For self-taught ML learners who want one short drill with a browser check.'),
      sample
    ];
    for (const item of firstScreen) {
      const box = await item.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
    await sample.click();
    await expect(page).toHaveURL(`${origin}/demo`);
    await expect(page.getByLabel('Demo mode')).toContainText('Demo — sample data, nothing is saved.');
    await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open your real workbench' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Read tensor shapes' })).toBeVisible();
    await expect(page.getByText('8 samples × 3 features')).toBeVisible();
    await expect(page.getByText('(8, 3)', { exact: true })).toBeVisible();
    await expect(page.locator('[data-drill]')).toHaveCount(30);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${evidence}/mobile-one-click-demo.png`, fullPage: true });
});

test('keyboard flow handles invalid boundaries, recovers, exports, replays and resets locally', async ({ page }) => {
  const requests: { method: string; url: string; headers: Record<string, string>; body: string | null }[] = [];
  const errors: string[] = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url(), headers: request.headers(), body: request.postData() }));
  page.on('pageerror', error => errors.push(`page: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to drills' })).toBeFocused();
  for (let i = 0; i < 10 && !(await page.getByRole('link', { name: 'Try it with sample data' }).evaluate(node => node === document.activeElement)); i++) {
    await page.keyboard.press('Tab');
  }
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: 'Run one seeded drill.' })).toBeFocused();

  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\n# only a comment`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
  await page.locator('#code').fill(`${starter.replace('[[0.1, 0.2, 0.3]] * 8', '[[0.1]]')}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
  await page.locator('#code').evaluate(node => { (node as HTMLTextAreaElement).value = 'x'.repeat(100001); });
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Code is too long to save.');
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeFocused();
  await page.getByRole('button', { name: 'Restore starter' }).click();
  await expect(page.locator('#code')).toBeFocused();
  await page.locator('#code').fill(`${starter}\nUNIQUE_PRIVACY_MARKER_11 = 1\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed. Saved a replayable record with seed 11.');
  const record = await page.evaluate(() => JSON.parse(localStorage.getItem('demo:seeded-ml-runs') || '[]')[0]);
  expect(record).toMatchObject({ drillId: 'tensor-shapes', seed: 11, pass: true, version: 1 });
  expect(record.trace).toHaveLength(7);
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');

  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export run records' }).click();
  const stream = await (await downloading).createReadStream();
  let body = ''; for await (const chunk of stream!) body += chunk.toString();
  const exported = JSON.parse(body);
  expect(exported).toMatchObject({ format: 'seeded-ml-drills/run-records', version: 1, mode: 'demo' });
  expect(exported.runs[0]).toMatchObject({ seed: 11, pass: true, version: 1 });
  expect(exported.runs[0].trace).toHaveLength(7);
  await page.getByRole('button', { name: 'Replay', exact: true }).first().click();
  await expect(page.locator('#result')).toContainText('Replay checked the saved source: passed with seed 11.');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  expect(requests.every(request => request.method === 'GET' && new URL(request.url).origin === origin)).toBeTruthy();
  expect(requests.some(request => JSON.stringify(request).includes('UNIQUE_PRIVACY_MARKER_11'))).toBeFalsy();
  expect(errors).toEqual([]);
});

test('import rejects malformed, oversized and duplicate records with recovery and isolation', async ({ page }) => {
  const choose = async (buffer: Buffer) => {
    const chooser = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Import run records' }).click();
    await (await chooser).setFiles({ name: 'records.json', mimeType: 'application/json', buffer });
  };
  await page.goto('/demo');
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await choose(Buffer.from('{broken'));
  await expect(page.getByText('Nothing was imported. Choose an exported Seeded ML Drills JSON file.')).toBeVisible();
  await choose(Buffer.alloc(2 * 1024 * 1024 + 1, 32));
  await expect(page.getByText('Nothing was imported. Choose a JSON file smaller than 2 MB.')).toBeVisible();
  const starter = await page.locator('#code').inputValue();
  const record = {
    id: 'verification-11-import', drillId: 'tensor-shapes', at: '2026-08-29T10:00:00.000Z', seed: 11,
    pass: true, code: `${starter}\nx.shape`, trace: [0, 0.24, 0.4, 0.55, 0.7, 0.84, 1], version: 1
  };
  const valid = Buffer.from(JSON.stringify({ format: 'seeded-ml-drills/run-records', version: 1, mode: 'real', runs: [record] }));
  await choose(valid);
  await expect(page.getByText('1 record is ready to import.')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel import' }).click();
  await expect(page.getByText('Import canceled. No records changed.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  await choose(valid);
  await page.getByRole('button', { name: 'Import 1 record' }).click();
  await expect(page.getByText('Imported 1 run record into this demo workbench.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.locator('#result')).toContainText('Replay checked the saved source: passed with seed 11.');
  await choose(valid);
  await expect(page.getByText('Nothing was imported. Remove duplicate run records and choose the file again.')).toBeVisible();
  await page.getByRole('link', { name: 'Open your real workbench' }).click();
  await expect(page).toHaveURL(`${origin}/lab`);
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).not.toBe('real-sentinel');
});

test('routes pass semantics, axe, reflow, touch, metadata, focus and reduced motion', async ({ page }) => {
  const routes = [
    ['/', 'Seeded ML Drills — Practice PyTorch operations', '/'],
    ['/demo', 'Demo — Seeded ML Drills', '/demo'],
    ['/lab', 'Workbench — Seeded ML Drills', '/lab'],
    ['/privacy', 'Privacy — Seeded ML Drills', '/privacy'],
    ['/terms', 'Terms — Seeded ML Drills', '/terms']
  ] as const;
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
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
      const serious = (await new AxeBuilder({ page }).analyze()).violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
      expect(serious).toEqual([]);
      const undersized = await page.locator('a:visible,button:visible,select:visible').evaluateAll(nodes => nodes.map(node => {
        const box = node.getBoundingClientRect();
        return { text: node.textContent?.trim(), width: box.width, height: box.height };
      }).filter(box => box.width < 44 || box.height < 44));
      expect(undersized).toEqual([]);
      expect(errors).toEqual([]);
      page.off('pageerror', onPageError); page.off('console', onConsole);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  for (let i = 0; i < 10 && !(await page.getByRole('link', { name: 'Open your real workbench' }).evaluate(node => node === document.activeElement)); i++) await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Open your real workbench' })).toBeFocused();
  const focus = await page.getByRole('link', { name: 'Open your real workbench' }).evaluate(node => {
    const nodeStyle = getComputedStyle(node);
    const parentStyle = getComputedStyle(node.parentElement!);
    return { width: parseFloat(nodeStyle.outlineWidth), style: nodeStyle.outlineStyle, color: nodeStyle.outlineColor, background: parentStyle.backgroundColor };
  });
  expect(focus.style).toBe('solid');
  expect(focus.width).toBeGreaterThanOrEqual(3);
  expect(contrast(focus.color, focus.background)).toBeGreaterThanOrEqual(3);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const moving = await page.locator('body *').evaluateAll(nodes => nodes.filter(node => {
    const style = getComputedStyle(node);
    return [...style.animationDuration.split(','), ...style.transitionDuration.split(',')].some(value => (parseFloat(value) || 0) > 0);
  }).length);
  expect(moving).toBe(0);

  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Practice PyTorch operations in fixed drills.' })).toBeFocused();
  const missing = await page.goto('/verification-11-not-found');
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle('Not found — Seeded ML Drills');
  expect((await new AxeBuilder({ page }).analyze()).violations.filter(v => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
});

test('headers, cache policy, build identity, service-worker update and offline reload pass', async ({ page, context, request }) => {
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
  const art = await request.get('/assets/concrete-moss-lab.webp');
  expect(art.headers()['cache-control']).toContain('max-age=86400');
  expect(art.headers()['cache-control']).not.toContain('immutable');
  expect((await request.get('/sw.js')).headers()['cache-control']).toContain('max-age=30');
  await page.goto('/');
  await expect(page.locator('footer')).toContainText(expectedBuildId ? `build ${expectedBuildId}` : /build [0-9a-f]{12}/);
  const state = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return { active: registration.active?.state, waiting: Boolean(registration.waiting), installing: Boolean(registration.installing), controlled: Boolean(navigator.serviceWorker.controller), caches: await caches.keys() };
  });
  expect(state).toMatchObject({ active: 'activated', waiting: false, installing: false, controlled: true });
  expect(state.caches).toContain('seeded-ml-drills-v6');
  await page.goto('/demo');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  await context.setOffline(true);
  const offline = await page.reload();
  expect(offline?.status()).toBe(200);
  await expect(page.locator('#offline-status')).toContainText('Offline.');
  await expect(page.getByText(/Read tensor shapes · seed 11 · passed/)).toBeVisible();
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.locator('#result')).toContainText('Replay checked the saved source: passed with seed 11.');
  await context.setOffline(false);
});
