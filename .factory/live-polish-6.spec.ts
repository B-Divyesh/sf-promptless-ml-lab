import { expect, test, type Page } from '@playwright/test';

const origin = 'https://promptless-ml-lab.sociobot.in';
const evidence = '.factory/qa-evidence/polish6-live';
const expectedBuildId = process.env.EXPECTED_BUILD_ID;

async function passSample(page: Page) {
  await page.goto('/demo', { waitUntil: 'networkidle' });
  const starter = await page.locator('#code').inputValue();
  await page.locator('#code').fill(`${starter}\nx.shape`);
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.getByText('Passed. Saved a replayable record with seed 11.')).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem('demo:seeded-ml-runs'))).not.toBeNull();
}

async function expectDiscarded(page: Page) {
  const storage = await page.evaluate(() => ({
    sessionDemo: sessionStorage.getItem('demo:seeded-ml-runs'),
    legacyDemo: localStorage.getItem('demo:seeded-ml-runs'),
    real: localStorage.getItem('real:seeded-ml-runs')
  }));
  expect(storage).toEqual({ sessionDemo: null, legacyDemo: null, real: 'real-sentinel' });
  await page.goto('/demo', { waitUntil: 'networkidle' });
  await expect(page.getByText('No records yet. Pass a check or import records to add one here.')).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem('demo:seeded-ml-runs'))).toBeNull();
}

test('F-6-1 live demo records are discarded on Home, Privacy, Back, real-workbench exit, and Reset', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('footer')).toContainText(expectedBuildId ? `build ${expectedBuildId}` : /build [0-9a-f]{12}/);
  await page.evaluate(() => localStorage.setItem('real:seeded-ml-runs', 'real-sentinel'));

  await passSample(page);
  await page.getByRole('link', { name: 'SEED ML drills' }).click();
  await expect(page).toHaveURL(`${origin}/`);
  await expectDiscarded(page);
  await page.screenshot({ path: `${evidence}/demo-home-exit.png`, fullPage: true });

  await passSample(page);
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page).toHaveURL(`${origin}/privacy`);
  await expectDiscarded(page);

  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await passSample(page);
  await page.goBack();
  await expect(page).toHaveURL(`${origin}/`);
  await expectDiscarded(page);

  await passSample(page);
  await page.getByRole('link', { name: 'Open your real workbench' }).click();
  await expect(page).toHaveURL(`${origin}/lab`);
  await expectDiscarded(page);

  await passSample(page);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('No records yet. Pass a check or import records to add one here.')).toBeVisible();
  await expectDiscarded(page);
  await page.screenshot({ path: `${evidence}/demo-reset-empty.png`, fullPage: true });
});
