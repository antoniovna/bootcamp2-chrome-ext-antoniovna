import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, '..', 'dist');


test('popup carrega e exibe UI', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });
  const [page] = context.pages();

  await page.goto('https://example.com');
  const outline = await page.evaluate(() => getComputedStyle(document.querySelector('a')).outlineStyle);
  expect(outline).toBeDefined();
  await context.close();
});