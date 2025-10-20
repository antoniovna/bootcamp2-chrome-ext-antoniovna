import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const extensionPath = path.join(__dirname, '..', 'dist');

export default defineConfig({
  testDir: './', 
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report' }]
  ],
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            `--disable-extensions-except=${extensionPath}`,
            `--load-extension=${extensionPath}`,
          ],
        },
      },
    },
  ],
});