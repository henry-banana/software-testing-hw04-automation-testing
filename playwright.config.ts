import { join } from 'node:path';
import { defineConfig } from '@playwright/test';

const runFolder = process.env.HW04_RUN_FOLDER;
const runTitle = process.env.HW04_RUN_TITLE;

export default defineConfig({
  testDir: './tests',
  workers: 1,
  retries: 0,
  forbidOnly: true,
  reporter: runFolder
    ? [
        ['./scripts/redact-fixture-passwords.ts'],
        ['line'],
        ['html', { outputFolder: join(runFolder, 'html'), open: 'never', title: runTitle }],
        ['json', { outputFile: join(runFolder, 'results.json') }],
      ]
    : 'list',
  use: {
    baseURL: process.env.ESHOP_WEB_URL || 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: process.env.HW04_PUBLIC_RUN === '1' ? 'off' : 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
