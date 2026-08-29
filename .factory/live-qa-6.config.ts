import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'live-qa-6.spec.ts',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  outputDir: 'verification-6-evidence/results',
  use: {
    baseURL: 'https://promptless-ml-lab.sociobot.in',
    browserName: 'chromium',
    headless: true,
    acceptDownloads: true,
    trace: 'retain-on-failure'
  },
  reporter: [['list']]
});
