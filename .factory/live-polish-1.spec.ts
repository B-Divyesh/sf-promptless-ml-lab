import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const origin = 'https://promptless-ml-lab.sociobot.in';

test('review copy and one-click sample are correct on the live release', async ({ page }) => {
  const requests: import('@playwright/test').Request[] = [];
  const errors: string[] = [];
  page.on('request', (request) => requests.push(request));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Practice reproducible ML models.');
  await expect(page.getByText('For self-taught learners who need one small model task and a check now.')).toBeVisible();
  await expect(page.getByText('Opens a seeded drill and local run record.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Choose a short ML drill.' })).toBeVisible();
  await expect(page.getByText('Each drill checks its stated operation against fixed exercise data.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How the drills work' })).toBeVisible();
  await expect(page.getByText(/concept-sized|Build the habit|One small trace|generated original artwork/i)).toHaveCount(0);
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(`${origin}/demo`);
  await expect(page.getByLabel('Demo mode')).toContainText('Demo — sample data, nothing is saved.');
  await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open your real workbench' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Read tensor shapes' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeVisible();
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
});

test('query demo, real exit, and historic failure boundaries work live', async ({ page, context }) => {
  await page.goto('/?demo=1');
  await expect(page).toHaveTitle('Demo — Seeded ML Drills');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/demo`);
  await expect(page.getByLabel('Demo mode')).toBeVisible();
  await page.evaluate(() => {
    localStorage.setItem('demo:seeded-ml-runs', '[{"id":"demo"}]');
    localStorage.setItem('real:seeded-ml-runs', 'real-sentinel');
  });
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');

  await page.locator('#code').evaluate((node) => { (node as HTMLTextAreaElement).value = 'x'.repeat(100001); });
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Code is too long to save.');
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Check my answer' })).toBeFocused();

  const original = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${original.slice(0, 200)}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');

  await page.locator('[data-drill="overfit-gap"]').click();
  await expect(page.locator('.instruction-grid section').nth(0)).toContainText('Two fixed loss values');
  await expect(page.locator('.instruction-grid section').nth(1)).toContainText('Subtract train loss from validation loss.');
  await expect(page.locator('.instruction-grid section').nth(2)).toContainText('gap = 0.31');
  const overfitStarter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${overfitStarter}\nval_loss - train_loss`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  await page.locator('#code').fill(`${overfitStarter}\ntrain_loss - val_loss`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');

  await page.getByRole('link', { name: 'Open your real workbench' }).click();
  await expect(page).toHaveURL(`${origin}/lab`);
  await expect(page.getByText('YOUR WORKBENCH')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();

  await page.goto('/demo');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await context.setOffline(false);
});

test('live routes have exact metadata, legal links, focus, status, and accessibility', async ({ page }) => {
  const routes = [
    ['/', 'Seeded ML Drills — Practice reproducible models', '/'],
    ['/demo', 'Demo — Seeded ML Drills', '/demo'],
    ['/lab', 'Workbench — Seeded ML Drills', '/lab'],
    ['/privacy', 'Privacy — Seeded ML Drills', '/privacy'],
    ['/terms', 'Terms — Seeded ML Drills', '/terms']
  ] as const;
  for (const [path, title, canonical] of routes) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${canonical}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.getByRole('link', { name: 'Privacy', exact: true }).last()).toHaveAttribute('href', '/privacy');
    await expect(page.getByRole('link', { name: 'Terms', exact: true })).toHaveAttribute('href', '/terms');
    const serious = (await new AxeBuilder({ page }).analyze()).violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
    expect(serious).toEqual([]);
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Your practice stays in this browser.' })).toBeFocused();
  await expect(page.locator('[role="status"][aria-live="polite"]').first()).toContainText('Privacy — Seeded ML Drills');
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Practice reproducible ML models.' })).toBeFocused();

  const missing = await page.goto('/not-a-real-drill-polish-1');
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle('Not found — Seeded ML Drills');
  await expect(page.getByRole('heading', { name: 'That drill does not exist.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Privacy', exact: true }).last()).toHaveAttribute('href', '/privacy');
  await expect(page.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms');
});

test('live mobile first screen and workbench fit at 390px with 44px targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const action = await page.getByRole('link', { name: 'Try it with sample data' }).boundingBox();
  expect(action).not.toBeNull();
  expect(action!.y + action!.height).toBeLessThanOrEqual(844);
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const undersized = await page.locator('a:visible,button:visible,select:visible').evaluateAll((nodes) => nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    return { label: (node.textContent || '').trim(), width: rect.width, height: rect.height };
  }).filter(({ width, height }) => width < 44 || height < 44));
  expect(undersized).toEqual([]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const moving = await page.locator('body *').evaluateAll((nodes) => nodes.filter((node) => {
    const style = getComputedStyle(node);
    return `${style.animationDuration},${style.transitionDuration}`.split(',').some((value) => (parseFloat(value) || 0) > 0);
  }).length);
  expect(moving).toBe(0);
});

test('live response policy and strict CSP remain active', async ({ request, page }) => {
  const root = await request.get('/');
  expect(root.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(root.headers()['x-frame-options']).toBe('DENY');
  expect(root.headers()['x-content-type-options']).toBe('nosniff');
  expect(root.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
  await page.goto('/demo');
  await expect(page.locator('.bars span')).toHaveCount(7);
  expect(await page.locator('.bars span[style]').count()).toBe(0);
});
