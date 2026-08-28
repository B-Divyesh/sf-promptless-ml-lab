import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function passFirstDrill(page: import('@playwright/test').Page) {
  await page.goto('/demo');
  await page.locator('#code').fill('import torch\nx = torch.zeros((8, 3))\nx.shape');
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText('Passed. Saved a replayable record with seed 11.')).toBeVisible();
}

async function exportedRuns(page: import('@playwright/test').Page) {
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export run records' }).click();
  const stream = await (await download).createReadStream();
  let body = ''; for await (const part of stream!) body += part.toString();
  return JSON.parse(body).runs;
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
  const runs = await exportedRuns(page);
  expect(runs[0]).toMatchObject({ drillId: 'tensor-shapes', seed: 11, pass: true, version: 1 });
  expect(runs[0].trace).toHaveLength(7);
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

test('service worker is active with no pending update after an update check', async ({ page }) => {
  await page.goto('/');
  const state = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return { active: Boolean(registration.active), waiting: Boolean(registration.waiting), installing: Boolean(registration.installing) };
  });
  expect(state).toEqual({ active: true, waiting: false, installing: false });
});

test('@claim:thirty-open-drills demo exposes all 30 drills', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('[data-drill]')).toHaveCount(30);
});

test('@claim:checker-recognizes-operation demo checks the required operation', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#code').fill('import torch\nx = torch.zeros((8, 3))\nprint(x)');
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText('Not yet. Add the operation that produces (8, 3), then run checks again.')).toBeVisible();
  await page.locator('#code').fill('import torch\nx = torch.zeros((8, 3))\nx.shape');
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText('Passed. Saved a replayable record with seed 11.')).toBeVisible();
});

test('@claim:deterministic-trace repeated checks export the same seven-point trace', async ({ page }) => {
  await passFirstDrill(page);
  await passFirstDrill(page);
  const runs = await exportedRuns(page);
  expect(runs).toHaveLength(2);
  expect(runs[0].trace).toHaveLength(7);
  expect(runs[0].trace).toEqual(runs[1].trace);
});

test('@claim:no-arbitrary-pytorch browser checks do not execute the submitted Python', async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));
  await page.goto('/demo');
  await page.locator('#code').fill('raise RuntimeError("this must not run")\nx.shape');
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText('Passed. Saved a replayable record with seed 11.')).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test('@regression:csp-trace Static Web Apps CSP permits the trace without inline styles or console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto('/demo');
  expect(response?.headers()['content-security-policy']).toContain("style-src 'self'");
  expect(response?.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(response?.headers()['x-content-type-options']).toBe('nosniff');
  await expect(page.locator('.bars span')).toHaveCount(7);
  await page.waitForTimeout(500);
  expect(await page.locator('.bars span[style]').count()).toBe(0);
  const heights = await page.locator('.bars span').evaluateAll((bars) => bars.map((bar) => Math.round(bar.getBoundingClientRect().height)));
  expect(Math.min(...heights)).toBeGreaterThan(4);
  expect(Math.max(...heights)).toBeGreaterThan(Math.min(...heights));
  expect(errors).toEqual([]);
});

test('@regression:real-404 unknown paths return the styled 404 document and status', async ({ page }) => {
  const response = await page.goto('/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle('Not found — Seeded ML Drills');
  await expect(page.getByRole('heading', { name: 'That drill does not exist.' })).toBeVisible();
  await expect(page.locator('link[href="/404.css"]')).toHaveCount(1);
});

test('@regression:touch-targets header and footer links are at least 44 pixels on desktop and mobile', async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const sizes = await page.locator('header a, footer a').evaluateAll((links) => links.map((link) => {
      const box = link.getBoundingClientRect();
      return { width: box.width, height: box.height, text: link.textContent?.trim() };
    }));
    expect(sizes).not.toHaveLength(0);
    expect(sizes.every(({ width, height }) => width >= 44 && height >= 44)).toBeTruthy();
  }
});

test('keyboard and narrow screen still expose the workbench', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/demo$/);
  await page.locator('.skip').focus();
  await expect(page.getByText('Skip to drills')).toBeFocused();
  await expect(page.getByRole('button', { name: /Read tensor shapes/ })).toBeVisible();
});

test('landing and demo have no serious accessibility violations on desktop or mobile', async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/demo']) {
      await page.goto(path);
      const violations = (await new AxeBuilder({ page }).analyze()).violations
        .filter((violation) => ['serious', 'critical'].includes(violation.impact || ''))
        .map((violation) => violation.id);
      expect(violations).toEqual([]);
    }
  }
});
