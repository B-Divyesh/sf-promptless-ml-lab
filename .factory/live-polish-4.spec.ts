import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

const origin = 'https://promptless-ml-lab.sociobot.in';
const evidence = '.factory/qa-evidence/polish4-live';
mkdirSync(evidence, { recursive: true });

const imported = (id: string) => ({
  name: 'seeded-ml-drills-records.json', mimeType: 'application/json',
  buffer: Buffer.from(JSON.stringify({
    format: 'seeded-ml-drills/run-records', version: 1, mode: 'real', runs: [{
      id, drillId: 'tensor-shapes', at: '2026-08-29T10:00:00.000Z', seed: 11, pass: true,
      code: '# Seeded ML Drills — edit only the TODO line\nimport torch\nSEED = 11\ntorch.manual_seed(SEED)\n\nx = torch.tensor([[0.1, 0.2, 0.3]] * 8)\n# TODO: write one line below\nx.shape',
      trace: [0.9, 0.7, 0.55, 0.4, 0.3, 0.2, 0.1], version: 1
    }]
  }))
});

async function chooseImport(page: import('@playwright/test').Page, id: string) {
  const chooser = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Import run records' }).click();
  await (await chooser).setFiles(imported(id));
}

async function passDrill(page: import('@playwright/test').Page, id: string, answer: string) {
  await page.locator(`[data-drill="${id}"]`).click();
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\n${answer}`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
}

test('F-4-1 live privacy wording keeps code, records, and identity off the network', async ({ page }) => {
  const marker = 'live-private-marker-51ba';
  const requests: import('@playwright/test').Request[] = [];
  page.on('request', (request) => requests.push(request));
  await page.goto('/privacy', { waitUntil: 'networkidle' });
  await expect(page.getByText('It does not send your code, run records, or identity to a server.')).toBeVisible();
  await page.goto('/terms');
  await expect(page.getByText('You keep your code. Nothing in this version uploads it.')).toBeVisible();
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Demo mode')).toContainText('Demo — sample data, nothing is saved.');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\n# ${marker}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export run records' }).click();
  await download;
  await chooseImport(page, 'polish4-private-import');
  await page.getByRole('button', { name: 'Import 1 record' }).click();
  const inspected = await Promise.all(requests.map(async (request) => ({
    url: request.url(), method: request.method(), headers: await request.allHeaders(), body: request.postData() || ''
  })));
  expect(inspected.every((request) => request.method === 'GET' && new URL(request.url).origin === origin)).toBeTruthy();
  expect(inspected.every((request) => !`${request.url}\n${JSON.stringify(request.headers)}\n${request.body}`.includes(marker))).toBeTruthy();
  await expect(page.locator('input:not(#import-records), input[type="email"], input[type="password"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /sign in|log in|create account|register|profile/i })).toHaveCount(0);
  await page.screenshot({ path: `${evidence}/f4-1-privacy-demo.png`, fullPage: true });
});

test('F-4-2 live five-drill counter counts distinct drills, persists, and resets', async ({ page }) => {
  const drills = [
    ['tensor-shapes', 'x.shape'], ['broadcast-bias', 'x + bias'], ['seeded-shuffle', 'torch.randperm(12)'],
    ['split-indices', 'perm[:16]'], ['standardize', '(x - x.mean()) / x.std()']
  ];
  await page.goto('/demo');
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await expect(page.locator('.lab-top strong')).toHaveText('0 / 5 passed');
  for (const [index, [id, answer]] of drills.entries()) {
    await passDrill(page, id, answer);
    await expect(page.locator('.lab-top strong')).toHaveText(`${index + 1} / 5 passed`);
  }
  await passDrill(page, drills[0][0], drills[0][1]);
  await expect(page.locator('.lab-top strong')).toHaveText('5 / 5 passed');
  await page.reload();
  await expect(page.locator('.lab-top strong')).toHaveText('5 / 5 passed');
  await page.screenshot({ path: `${evidence}/f4-2-five-drills.png`, fullPage: true });
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('.lab-top strong')).toHaveText('0 / 5 passed');
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
});

test('F-4-3 live offline reload preserves and replays a saved record from the service-worker cache', async ({ page, context }) => {
  const offlineRequests: import('@playwright/test').Request[] = [];
  const offlineResponses: import('@playwright/test').Response[] = [];
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.goto('/demo');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.getByText(/Read tensor shapes · seed 11 · passed/)).toBeVisible();
  await context.setOffline(true);
  page.on('request', (request) => offlineRequests.push(request));
  page.on('response', (response) => offlineResponses.push(response));
  await page.reload();
  await expect(page.getByText(/Read tensor shapes · seed 11 · passed/)).toBeVisible();
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(page.getByText('Replay checked the saved source: passed with seed 11.')).toBeVisible();
  expect(await page.evaluate(() => navigator.onLine)).toBeFalsy();
  expect(offlineRequests).not.toHaveLength(0);
  expect(offlineResponses).toHaveLength(offlineRequests.length);
  expect(offlineResponses.every((response) => response.fromServiceWorker())).toBeTruthy();
  await page.screenshot({ path: `${evidence}/f4-3-offline-replay.png`, fullPage: true });
  await context.setOffline(false);
});

test('F-4-4 live imports write only to the active demo or real workbench', async ({ page, browser }) => {
  await page.goto('/?demo=1');
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await chooseImport(page, 'polish4-demo-only');
  await page.getByRole('button', { name: 'Import 1 record' }).click();
  const demoStorage = await page.evaluate(() => ({ demo: localStorage.getItem('demo:seeded-ml-runs'), real: localStorage.getItem('real:seeded-ml-runs') }));
  expect(JSON.parse(demoStorage.demo!)[0].id).toBe('polish4-demo-only');
  expect(demoStorage.real).toBe('real-sentinel');
  await page.screenshot({ path: `${evidence}/f4-4-demo-import.png`, fullPage: true });

  const realContext = await browser.newContext();
  const realPage = await realContext.newPage();
  try {
    await realPage.goto(`${origin}/lab`);
    await realPage.evaluate(() => localStorage.setItem('demo:seeded-ml-runs', 'demo-sentinel'));
    await chooseImport(realPage, 'polish4-real-only');
    await realPage.getByRole('button', { name: 'Import 1 record' }).click();
    const realStorage = await realPage.evaluate(() => ({ demo: localStorage.getItem('demo:seeded-ml-runs'), real: localStorage.getItem('real:seeded-ml-runs') }));
    expect(realStorage.demo).toBe('demo-sentinel');
    expect(JSON.parse(realStorage.real!)[0].id).toBe('polish4-real-only');
  } finally {
    await realContext.close();
  }
});

test('cumulative live first screen, routes, focus, 404, and accessibility remain complete', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  if (process.env.EXPECTED_BUILD_ID) await expect(page.locator('footer')).toContainText(`build ${process.env.EXPECTED_BUILD_ID}`);
  await expect(page.getByRole('heading', { name: 'Practice reproducible ML models.' })).toBeVisible();
  await expect(page.getByText('For self-taught learners who need one short ML drill and a check now.')).toBeVisible();
  const primary = await page.getByRole('link', { name: 'Try it with sample data' }).boundingBox();
  expect(primary!.y + primary!.height).toBeLessThanOrEqual(844);
  const facts = await page.locator('.facts li').evaluateAll((items) => items.map((item) => item.getBoundingClientRect().bottom));
  expect(facts).toHaveLength(3);
  expect(facts.every((bottom) => bottom <= 844)).toBeTruthy();
  await page.screenshot({ path: `${evidence}/cumulative-landing-mobile.png` });
  for (const [path, title, canonical] of [
    ['/', 'Seeded ML Drills — Practice reproducible models', '/'], ['/demo', 'Demo — Seeded ML Drills', '/demo'],
    ['/?demo=1', 'Demo — Seeded ML Drills', '/demo'], ['/lab', 'Workbench — Seeded ML Drills', '/lab'],
    ['/privacy', 'Privacy — Seeded ML Drills', '/privacy'], ['/terms', 'Terms — Seeded ML Drills', '/terms']
  ] as const) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${canonical}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    const serious = (await new AxeBuilder({ page }).analyze()).violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
    expect(serious).toEqual([]);
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Your practice stays in this browser.' })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Practice reproducible ML models.' })).toBeFocused();
  const missing = await page.goto('/not-a-real-polish-4-route');
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle('Not found — Seeded ML Drills');
  await expect(page.getByRole('heading', { name: 'That drill does not exist.' })).toBeVisible();
  const headers = (await page.request.get('/demo')).headers();
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
});
