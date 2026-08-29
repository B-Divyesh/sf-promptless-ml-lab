import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'verification-11.spec.ts',
  timeout: 90_000,
  fullyParallel: false,
  workers: 1,
  outputDir: 'qa-11/results',
  use: {
    baseURL: 'https://promptless-ml-lab.sociobot.in',
    browserName: 'chromium',
    headless: true,
    acceptDownloads: true,
    trace: 'retain-on-failure'
  },
  reporter: [['list']]
});
