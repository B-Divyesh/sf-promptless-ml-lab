import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'verification-9.spec.ts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  workers: 1,
  use: {
    baseURL: 'https://promptless-ml-lab.sociobot.in',
    browserName: 'chromium',
    headless: true,
    serviceWorkers: 'allow'
  }
});
