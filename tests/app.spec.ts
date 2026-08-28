import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function passFirstDrill(page: import('@playwright/test').Page) {
  await page.goto('/demo');
  await page.locator('#code').fill('import torch\nx = torch.zeros((8, 3))\nx.shape');
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText('Passed. Saved a replayable record with seed 11.')).toBeVisible();
}

test('demo records can be passed and replayed', async ({ page }) => {
  await passFirstDrill(page);
  await expect(page.getByRole('heading', { name: 'Replayable run records' })).toBeVisible();
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Read tensor shapes' })).toBeVisible();
});

test('@claim:local-browser-runs demo sends no data away', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await passFirstDrill(page);
  expect(requests.every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBeTruthy();
});

test('@claim:export-record records export seed and trace', async ({ page }) => {
  await passFirstDrill(page);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export run records' }).click();
  const json = await (await download).createReadStream();
  let body = ''; for await (const part of json!) body += part.toString();
  expect(JSON.parse(body).runs[0]).toMatchObject({ drillId: 'tensor-shapes', seed: 11, pass: true, version: 1 });
  expect(JSON.parse(body).runs[0].trace).toHaveLength(7);
});

test('@claim:demo-reset reset only clears demo records', async ({ page }) => {
  await passFirstDrill(page);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('No records yet. Pass a check and the result will appear here.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBeNull();
});

test('@claim:offline-reload demo reloads offline after first visit', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await context.setOffline(false);
});

test('@claim:thirty-open-drills demo exposes all 30 drills', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('[data-drill]')).toHaveCount(30);
});

test('keyboard and narrow screen still expose the workbench', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  await page.locator('.skip').focus();
  await expect(page.getByText('Skip to drills')).toBeFocused();
  await expect(page.getByRole('button', { name: /Read tensor shapes/ })).toBeVisible();
});

test('landing and demo have no serious accessibility violations', async ({ page }) => {
  await page.goto('/');
  expect((await new AxeBuilder({ page }).analyze()).violations.filter((v) => ['serious', 'critical'].includes(v.impact || '')).map((v) => v.id)).toEqual([]);
  await page.goto('/demo');
  expect((await new AxeBuilder({ page }).analyze()).violations.filter((v) => ['serious', 'critical'].includes(v.impact || '')).map((v) => v.id)).toEqual([]);
});
