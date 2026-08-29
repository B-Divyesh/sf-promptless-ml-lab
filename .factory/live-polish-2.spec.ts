import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const imported = {
  name: 'seeded-ml-drills-records.json', mimeType: 'application/json',
  buffer: Buffer.from(JSON.stringify({
    format: 'seeded-ml-drills/run-records', version: 1, mode: 'real', runs: [{
      id: 'live-import', drillId: 'tensor-shapes', at: '2026-08-29T10:00:00.000Z', seed: 11, pass: true,
      code: '# Seeded ML Drills — edit only the TODO line\nimport torch\nSEED = 11\ntorch.manual_seed(SEED)\n\nx = torch.tensor([[0.1, 0.2, 0.3]] * 8)\n# TODO: write one line below\nx.shape',
      trace: [0, 0.24, 0.4, 0.55, 0.7, 0.84, 1], version: 1
    }]
  }))
};

test('cold first screen and isolated mobile demo close F-1 and F-2-1', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  const requests: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Practice reproducible ML models.' })).toBeVisible();
  await expect(page.getByText('For self-taught learners who need one short ML drill and a check now.')).toBeVisible();
  const action = await page.getByRole('link', { name: 'Try it with sample data' }).boundingBox();
  expect(action!.y + action!.height).toBeLessThanOrEqual(844);
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByLabel('Demo mode')).toContainText('Demo — sample data, nothing is saved.');
  for (const locator of [page.getByRole('heading', { name: 'Read tensor shapes' }), page.getByText('8 samples × 3 features'), page.getByText('(8, 3)', { exact: true }), page.locator('#code')]) {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + Math.min(box!.height, 1)).toBeLessThanOrEqual(844);
  }
  await page.screenshot({ path: '.factory/qa-evidence/polish2-live-demo-first-screen.png' });
  expect(requests.every((url) => new URL(url).origin === 'https://promptless-ml-lab.sociobot.in')).toBeTruthy();
  expect(errors).toEqual([]);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await context.setOffline(false);
});

test('live import validates, isolates, confirms, and replays F-2-10', async ({ page }) => {
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
  await expect(page.getByText('Replay checked the saved source: passed with seed 11.')).toBeVisible();
  await page.screenshot({ path: '.factory/qa-evidence/polish2-live-import.png', fullPage: true });
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
  await page.getByRole('link', { name: 'Open your real workbench' }).click();
  await expect(page).toHaveURL(/\/lab$/);
  await expect(page.getByText('YOUR DRILLS')).toBeVisible();
});

test('live routes, metadata, focus, links, 404, and response policy are complete', async ({ page }) => {
  const routes = [
    ['/', 'Seeded ML Drills — Practice reproducible models'], ['/demo', 'Demo — Seeded ML Drills'],
    ['/lab', 'Workbench — Seeded ML Drills'], ['/privacy', 'Privacy — Seeded ML Drills'], ['/terms', 'Terms — Seeded ML Drills']
  ] as const;
  for (const [path, title] of routes) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/promptless-ml-lab\.sociobot\.in\//);
    await expect(page.getByRole('link', { name: 'Privacy', exact: true }).last()).toHaveAttribute('href', '/privacy');
    await expect(page.getByRole('link', { name: 'Terms', exact: true })).toHaveAttribute('href', '/terms');
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Your practice stays in this browser.' })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Practice reproducible ML models.' })).toBeFocused();
  const missing = await page.goto('/not-a-real-polish-route');
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle('Not found — Seeded ML Drills');
  const response = await page.request.get('/demo');
  expect(response.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  const asset = await page.request.get('/assets/concrete-moss-lab.webp');
  expect(asset.headers()['cache-control']).toContain('max-age=86400');
});

test('live copy is plain and every public route passes serious accessibility checks', async ({ page }) => {
  for (const path of ['/', '/demo', '/lab', '/privacy', '/terms']) {
    await page.goto(path);
    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/THE WORKBENCH|supported expression|application shell|fixed exercise|concept-sized|Build the habit|One small trace|Run hidden checks|Start for real/i);
    const violations = (await new AxeBuilder({ page }).analyze()).violations
      .filter((violation) => ['serious', 'critical'].includes(violation.impact || ''))
      .map((violation) => violation.id);
    expect(violations).toEqual([]);
  }
});
