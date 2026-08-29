import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'live-polish-4.spec.ts',
  timeout: 60_000,
  workers: 1,
  use: {
    baseURL: 'https://promptless-ml-lab.sociobot.in',
    browserName: 'chromium',
    headless: true,
    serviceWorkers: 'allow'
  }
});
