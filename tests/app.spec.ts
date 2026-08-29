import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { drills } from '../src/drills';
import { drillContracts } from '../src/drill-contracts';

// This visitor-facing specification is deliberately independent from
// src/drill-contracts.ts. If product copy and evaluator contracts drift, the
// claim test must fail instead of approving the contract with its own data.
const intendedDrills = [
  { id: 'tensor-shapes', task: 'Return the shape of x.', answer: 'x.shape', shortcut: '[8, 3]' },
  { id: 'broadcast-bias', task: 'Add bias to x without a loop.', answer: 'x + bias', shortcut: 'torch.tensor([[1.25, -0.5]] * 4)' },
  { id: 'seeded-shuffle', task: 'Create a seeded permutation.', answer: 'torch.randperm(12)', shortcut: 'rows' },
  { id: 'split-indices', task: 'Select the first 16 shuffled rows for training.', answer: 'perm[:16]', shortcut: 'perm' },
  { id: 'standardize', task: 'Compute z scores from x.', answer: '(x - x.mean()) / x.std()', shortcut: 'x' },
  { id: 'one-hot', task: 'One-hot encode y with 3 classes.', answer: 'torch.nn.functional.one_hot(y, num_classes=3)', shortcut: 'y' },
  { id: 'linear-forward', task: 'Compute x @ w + b.', answer: 'x @ w + b', shortcut: 'x @ w' },
  { id: 'mse-loss', task: 'Compute mean squared error.', answer: '((pred - y) ** 2).mean()', shortcut: '0.025' },
  { id: 'gradient-step', task: 'Subtract lr times w.grad.', answer: 'w -= lr * w.grad', shortcut: 'w -= lr * 0.6' },
  { id: 'logit', task: 'Compute x @ w + b.', answer: 'x @ w + b', shortcut: 'x @ w' },
  { id: 'sigmoid', task: 'Apply sigmoid to logits.', answer: 'torch.sigmoid(logits)', shortcut: 'logits' },
  { id: 'threshold', task: 'Predict 1 where p is at least 0.5.', answer: 'p >= 0.5', shortcut: 'p' },
  { id: 'bce', task: 'Use binary_cross_entropy_with_logits.', answer: 'torch.nn.functional.binary_cross_entropy_with_logits(logits, y)', shortcut: 'logits.mean()' },
  { id: 'accuracy', task: 'Take the mean of pred == y.', answer: '(pred == y).float().mean()', shortcut: '0.8' },
  { id: 'relu', task: 'Apply relu to z.', answer: 'torch.relu(z)', shortcut: 'z' },
  { id: 'two-layer', task: 'Apply ReLU between both layers.', answer: 'torch.relu(x @ w1) @ w2', shortcut: '(x @ w1) @ w2' },
  { id: 'dropout-mode', task: 'Set the model to evaluation mode.', answer: 'model.eval()', shortcut: 'model' },
  { id: 'batch-loss', task: 'Take the mean loss.', answer: 'losses.mean()', shortcut: '0.375' },
  { id: 'zero-grad', task: 'Clear gradients before backward.', answer: 'optimizer.zero_grad()', shortcut: 'optimizer' },
  { id: 'epoch-loop', task: 'Multiply three epochs by the batch count.', answer: '3 * len(batches)', shortcut: '9' },
  { id: 'early-stop', task: 'Check whether val_loss is lower than best.', answer: 'val_loss < best', shortcut: 'val_loss' },
  { id: 'confusion', task: 'Count predicted 1 when y is 0.', answer: '((pred == 1) & (y == 0)).sum()', shortcut: '2' },
  { id: 'precision', task: 'Compute TP / (TP + FP).', answer: 'tp / (tp + fp)', shortcut: '0.8' },
  { id: 'recall', task: 'Compute TP / (TP + FN).', answer: 'tp / (tp + fn)', shortcut: '0.6666666667' },
  { id: 'overfit-gap', task: 'Subtract train loss from validation loss.', answer: 'val_loss - train_loss', shortcut: 'train_loss - val_loss' },
  { id: 'knn-distance', task: 'Sum squared coordinate differences.', answer: '((x - q) ** 2).sum(dim=1).argmin()', shortcut: '2' },
  { id: 'kmeans-centroid', task: 'Take the mean over points.', answer: 'points.mean(dim=0)', shortcut: '[2.5, 2.5]' },
  { id: 'pca-center', task: 'Subtract the column mean.', answer: 'x - x.mean(dim=0)', shortcut: 'x - torch.tensor([3.5, 4.5])' },
  { id: 'replay-seed', task: 'Set the documented seed.', answer: 'torch.manual_seed(SEED)', shortcut: 'torch.rand(4)' },
  { id: 'save-config', task: 'Create a config dictionary.', answer: '{"seed": SEED, "lr": lr, "epochs": epochs}', shortcut: '{"seed": 0, "lr": 0, "epochs": 0}' }
] as const;

async function passFirstDrill(page: import('@playwright/test').Page) {
  await page.goto('/demo');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nx.shape`);
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
  await expect(page.locator('#code')).toHaveValue(/x\.shape$/);
  await expect(page.getByText('Replay checked the saved source: passed with seed 11.')).toBeVisible();
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
  await page.goto('/demo');
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));
  await passFirstDrill(page);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('No records yet. Pass a check and the result will appear here.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).toBe('real-sentinel');
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

test('@claim:catalog-evaluator every drill accepts its intended operation and rejects an unrelated shortcut', async ({ page }) => {
  test.setTimeout(120_000);
  expect(drills).toHaveLength(30);
  expect(intendedDrills).toHaveLength(30);
  expect(intendedDrills.map(({ id }) => id)).toEqual(drills.map(({ id }) => id));
  await page.goto('/demo');

  for (const intended of intendedDrills) {
    const drill = drills.find(({ id }) => id === intended.id)!;
    await page.locator(`[data-drill="${intended.id}"]`).click();
    await expect(page.locator('.instruction-grid section').nth(1).locator('p'), `${intended.id} should state its tested operation`).toHaveText(intended.task);
    await page.locator('#code').fill(`${drill.starter}\n${intended.answer}`);
    await page.getByRole('button', { name: 'Run hidden checks' }).click();
    await expect(page.locator('#result'), `${intended.id} should accept ${intended.answer}`).toContainText('Passed.');

    await page.locator('#code').fill(`${drill.starter}\n${intended.shortcut}`);
    await page.getByRole('button', { name: 'Run hidden checks' }).click();
    await expect(page.locator('#result'), `${intended.id} should reject ${intended.shortcut}`).toContainText('Not yet.');
  }
});

test('@regression:overfit-gap drill 25 states and accepts validation minus train', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-drill="overfit-gap"]').click();
  await expect(page.locator('.instruction-grid section').nth(0).locator('p')).toHaveText('Two fixed loss values');
  await expect(page.locator('.instruction-grid section').nth(1).locator('p')).toHaveText('Subtract train loss from validation loss.');
  await expect(page.locator('.instruction-grid section').nth(2).locator('p')).toHaveText('gap = 0.31');
  const starter = await page.locator('#code').inputValue();

  await page.locator('#code').fill(`${starter}\nval_loss - train_loss`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');

  await page.locator('#code').fill(`${starter}\ntrain_loss - val_loss`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
});

test('@regression:standardize-dimension zero-argument tensor reductions do not receive a phantom dimension', async ({ page }) => {
  await page.goto('/demo');
  const drill = drills.find(({ id }) => id === 'standardize')!;
  await page.locator('[data-drill="standardize"]').click();
  await page.locator('#code').fill(`${drill.starter}\n(x - x.mean()) / x.std()`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Passed.');
  await expect(page.locator('#result')).not.toContainText('dimension unsupported');
});

test('@regression:stateful-contract gradient, validation, and replay drills reject the verifier shortcuts', async ({ page }) => {
  await page.goto('/demo');
  for (const id of ['gradient-step', 'early-stop', 'replay-seed']) {
    const drill = drills.find((candidate) => candidate.id === id)!;
    const contract = drillContracts[id];
    await page.locator(`[data-drill="${id}"]`).click();
    await page.locator('#code').fill(`${drill.starter}\n${contract.answers[0]}`);
    await page.getByRole('button', { name: 'Run hidden checks' }).click();
    await expect(page.locator('#result')).toContainText('Passed.');
    await page.locator('#code').fill(`${drill.starter}\n${contract.shortcut}`);
    await page.getByRole('button', { name: 'Run hidden checks' }).click();
    await expect(page.locator('#result')).toContainText('Not yet.');
  }
});

test('@claim:free-access every drill is available without a paywall', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('[data-drill]')).toHaveCount(30);
  expect(await page.locator('[data-drill]:disabled').count()).toBe(0);
  await expect(page.getByText(/checkout|subscribe|payment required/i)).toHaveCount(0);
});

test('@claim:no-chat-required a drill completes without chat, an account, or a remote request', async ({ page }) => {
  const requests: import('@playwright/test').Request[] = [];
  page.on('request', (request) => requests.push(request));
  await passFirstDrill(page);
  await expect(page.getByRole('button', { name: /chat|sign in|create account/i })).toHaveCount(0);
  expect(requests.every((request) => request.method() === 'GET' && new URL(request.url()).origin === 'http://127.0.0.1:4173')).toBeTruthy();
});

test('@claim:scope-limits the lab has no hosting, ranking, or generated-solution flow', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /host|deploy|rank|leaderboard|generate|show solution/i })).toHaveCount(0);
  const drill = drills[0];
  await page.locator('#code').fill(`${drill.starter}\n[8, 3]`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.locator('#result')).toContainText('Not yet.');
  await expect(page.locator('#result')).not.toContainText(/solution is|try x\.shape/i);
});

test('@claim:estimated-drill-duration every listed drill has a 6–10 minute estimate', async ({ page }) => {
  await page.goto('/demo');
  const minutes = await page.locator('[data-drill] small').evaluateAll((labels) => labels.map((label) => Number(label.textContent?.match(/(\d+) min/)?.[1])));
  expect(minutes).toHaveLength(30);
  expect(minutes.every((minute) => minute >= 6 && minute <= 10)).toBeTruthy();
});

test('@claim:real-workbench Start for real opens the isolated real workbench', async ({ page }) => {
  await page.goto('/demo');
  await page.evaluate(() => localStorage.setItem('demo:seeded-ml-runs', 'demo-record'));
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/lab$/);
  await expect(page.getByText('YOUR WORKBENCH')).toBeVisible();
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText('Passed. Saved a replayable record with seed 11.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('real:seeded-ml-runs'))).not.toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
});

test('@regression:demo-query direct demo query opens the sample workbench', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await expect(page.getByText('DEMO WORKBENCH')).toBeVisible();
});

test('@regression:starter-seed supplied starter defines its seed before it is used', async ({ page }) => {
  await page.goto('/demo');
  const starter = await page.locator('#code').inputValue();
  expect(starter.indexOf('SEED = 11')).toBeLessThan(starter.indexOf('torch.manual_seed(SEED)'));
});

test('@regression:storage-errors an oversized or unsaveable run keeps the control usable', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#code').evaluate((node) => { (node as HTMLTextAreaElement).value = 'x'.repeat(100001); });
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText(/Code is too long to save/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Run hidden checks' })).toBeEnabled();

  await page.locator('#code').fill('import torch\nSEED = 11\ntorch.manual_seed(SEED)\nx = torch.zeros((8, 3))\nx.shape');
  await page.evaluate(() => { const original = Storage.prototype.setItem; Storage.prototype.setItem = function() { throw new DOMException('quota', 'QuotaExceededError'); }; window.setTimeout(() => { Storage.prototype.setItem = original; }, 1000); });
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText(/could not save the run/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Run hidden checks' })).toBeEnabled();
});

test('@regression:focus core rerenders retain keyboard focus', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#code').fill('import torch\nSEED = 11\ntorch.manual_seed(SEED)\nx = torch.zeros((8, 3))\nx.shape');
  await page.getByRole('button', { name: 'Run hidden checks' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Run hidden checks' })).toBeFocused();
  await page.locator('#track').selectOption({ label: 'Classification' });
  await expect(page.locator('#track')).toBeFocused();
});

test('@regression:navigation Drills points to the landing catalog and framing is denied', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Drills', exact: true }).click();
  await expect(page).toHaveURL(/\/#catalog$/);
  await expect(page.locator('#catalog')).toBeVisible();
  const response = await page.goto('/demo');
  expect(response?.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(response?.headers()['x-frame-options']).toBe('DENY');
});

test('@regression:metadata route canonicals and mutable artwork cache correctly', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/demo$/);
  const artwork = await page.request.get('/assets/concrete-moss-lab.webp');
  expect(artwork.headers()['cache-control']).toContain('max-age=86400');
  expect(artwork.headers()['cache-control']).not.toContain('immutable');
});

test('@regression:mobile-overflow the 390px landing has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('@regression:sw-navigation a stale cached demo document is refreshed online', async ({ page }) => {
  await page.goto('/demo');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    const cache = await caches.open('seeded-ml-drills-v5');
    await cache.put('/demo', new Response('<title>stale demo</title><p>stale</p>', { headers: { 'content-type': 'text/html' } }));
  });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await page.context().setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Run one seeded drill.' })).toBeVisible();
  await page.context().setOffline(false);
});

test('@claim:fixture-evaluator demo evaluates an executable answer line against fixed data', async ({ page }) => {
  await page.goto('/demo');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nthis is not valid Python`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText(/Not yet\. Use a valid answer line/)).toBeVisible();
  await page.locator('#code').fill(`${starter}\ntuple(x.size())`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText('Passed. Saved a replayable record with seed 11.')).toBeVisible();
});

test('@claim:fixture-counterexamples rejects wrong fixtures and incomplete expressions', async ({ page }) => {
  await page.goto('/demo');
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter.replace('[[0.1, 0.2, 0.3]] * 8', '[[0.1]]')}\nx.shape`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText(/Not yet\. Use a valid answer line/)).toBeVisible();
  await page.getByRole('button', { name: 'Shuffle with a seed' }).click();
  const shuffleStarter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${shuffleStarter}\ntorch.randperm`);
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText(/Not yet\. Use a valid answer line/)).toBeVisible();
});

test('@claim:deterministic-trace repeated checks export the same seven-point trace', async ({ page }) => {
  await passFirstDrill(page);
  await passFirstDrill(page);
  const runs = await exportedRuns(page);
  expect(runs).toHaveLength(2);
  expect(runs[0].trace).toHaveLength(7);
  expect(runs[0].trace).toEqual(runs[1].trace);
});

test('@claim:no-arbitrary-pytorch browser checks reject unsupported Python without executing it', async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));
  await page.goto('/demo');
  await page.locator('#code').fill('raise RuntimeError("this must not run")\nx.shape');
  await page.getByRole('button', { name: 'Run hidden checks' }).click();
  await expect(page.getByText(/Not yet\. Use a valid answer line/)).toBeVisible();
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
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/404$/);
  const recovery = await page.getByRole('link', { name: 'Open the drill catalog' }).boundingBox();
  expect(recovery?.height).toBeGreaterThanOrEqual(44);
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

test('all public routes have no serious accessibility violations on desktop or mobile', async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/demo', '/lab', '/privacy', '/terms', '/does-not-exist']) {
      await page.goto(path);
      const violations = (await new AxeBuilder({ page }).analyze()).violations
        .filter((violation) => ['serious', 'critical'].includes(violation.impact || ''))
        .map((violation) => violation.id);
      expect(violations).toEqual([]);
    }
  }
});
