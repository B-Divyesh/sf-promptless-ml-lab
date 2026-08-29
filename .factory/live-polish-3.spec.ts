import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const origin = 'https://promptless-ml-lab.sociobot.in';
const imported = {
  name: 'seeded-ml-drills-records.json', mimeType: 'application/json',
  buffer: Buffer.from(JSON.stringify({
    format: 'seeded-ml-drills/run-records', version: 1, mode: 'real', runs: [{
      id: 'polish-3-live-import', drillId: 'tensor-shapes', at: '2026-08-29T10:00:00.000Z', seed: 11, pass: true,
      code: '# Seeded ML Drills — edit only the TODO line\nimport torch\nSEED = 11\ntorch.manual_seed(SEED)\n\nx = torch.tensor([[0.1, 0.2, 0.3]] * 8)\n# TODO: write one line below\nx.shape',
      trace: [0, 0.24, 0.4, 0.55, 0.7, 0.84, 1], version: 1
    }]
  }))
};

test('F-3-1 cold 390px landing shows all three complete facts', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('footer')).toContainText('build 55ab660e4861');
  const facts = await page.locator('.facts li').evaluateAll((items) => items.map((item) => {
    const box = item.getBoundingClientRect();
    return { text: item.textContent?.trim(), top: box.top, bottom: box.bottom };
  }));
  expect(facts.map(({ text }) => text)).toEqual([
    'Free. All 30 drills are open.',
    'Runs stay in this browser.',
    'Works offline after your first visit.'
  ]);
  expect(facts.every(({ top, bottom }) => top >= 0 && bottom <= 844)).toBeTruthy();
  await page.screenshot({ path: '.factory/qa-evidence/polish3-live-first-screen.png' });
  expect(errors).toEqual([]);
});

test('cumulative one-click demo, privacy, reset, and offline behavior work live', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  const requests: import('@playwright/test').Request[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', (request) => requests.push(request));
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(`${origin}/demo`);
  await expect(page.getByLabel('Demo mode')).toContainText('Demo — sample data, nothing is saved.');
  for (const locator of [page.getByRole('heading', { name: 'Read tensor shapes' }), page.getByText('8 samples × 3 features'), page.getByText('(8, 3)', { exact: true }), page.locator('#code')]) {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + Math.min(box!.height, 1)).toBeLessThanOrEqual(844);
  }
  await page.screenshot({ path: '.factory/qa-evidence/polish3-live-demo-first-screen.png' });
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).not.toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  expect(requests.every((request) => request.method() === 'GET' && new URL(request.url()).origin === origin)).toBeTruthy();
  expect(errors).toEqual([]);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await context.setOffline(false);
});

test('cumulative query demo import, replay, namespace, and real exit work live', async ({ page }) => {
  await page.goto('/?demo=1');
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  const chooser = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Import run records' }).click();
  await (await chooser).setFiles(imported);
  await expect(page.getByText('1 record is ready to import.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  await page.getByRole('button', { name: 'Import 1 record' }).click();
  await expect(page.getByText('Imported 1 run record into this demo workbench.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.locator('#code')).toHaveValue(/x\.shape$/);
  await expect(page.getByText('Replay checked the saved source: passed with seed 11.')).toBeVisible();
  await page.screenshot({ path: '.factory/qa-evidence/polish3-live-import.png', fullPage: true });
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await page.getByRole('link', { name: 'Open your real workbench' }).click();
  await expect(page).toHaveURL(`${origin}/lab`);
  await expect(page.getByText('YOUR DRILLS')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
});

test('cumulative evaluator, size recovery, focus, and drill 25 boundaries work live', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#code').evaluate((node) => { (node as HTMLTextAreaElement).value = 'x'.repeat(100001); });
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Code is too long to save.');
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeFocused();
  await page.locator('[data-drill="overfit-gap"]').click();
  await expect(page.locator('.instruction-grid section').nth(1)).toContainText('Subtract train loss from validation loss.');
  await expect(page.locator('.instruction-grid section').nth(2)).toContainText('gap = 0.31');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nval_loss - train_loss`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  await page.locator('#code').fill(`${starter}\ntrain_loss - val_loss`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
});

test('cumulative live routes, copy, focus, 404, headers, and accessibility are complete', async ({ page }) => {
  const routes = [
    ['/', 'Seeded ML Drills — Practice reproducible models', '/'], ['/demo', 'Demo — Seeded ML Drills', '/demo'],
    ['/lab', 'Workbench — Seeded ML Drills', '/lab'], ['/privacy', 'Privacy — Seeded ML Drills', '/privacy'],
    ['/terms', 'Terms — Seeded ML Drills', '/terms']
  ] as const;
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const [path, title, canonical] of routes) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${canonical}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
      const body = await page.locator('body').innerText();
      expect(body).not.toMatch(/THE WORKBENCH|supported expression|application shell|fixed exercise|concept-sized|Build the habit|One small trace|Run hidden checks|Start for real/i);
      const serious = (await new AxeBuilder({ page }).analyze()).violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
      expect(serious).toEqual([]);
    }
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Your practice stays in this browser.' })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Practice reproducible ML models.' })).toBeFocused();
  const missing = await page.goto('/not-a-real-polish-3-route');
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle('Not found — Seeded ML Drills');
  await expect(page.getByRole('heading', { name: 'That drill does not exist.' })).toBeVisible();
  const response = await page.request.get('/demo');
  expect(response.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(response.headers()['x-frame-options']).toBe('DENY');
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
});
