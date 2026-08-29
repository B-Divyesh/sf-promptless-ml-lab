import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'live-polish-6.spec.ts',
  timeout: 90_000,
  fullyParallel: false,
  workers: 1,
  outputDir: 'qa-evidence/polish6-live/results',
  use: {
    baseURL: 'https://promptless-ml-lab.sociobot.in',
    browserName: 'chromium',
    headless: true,
    trace: 'retain-on-failure'
  },
  reporter: [['list']]
});
