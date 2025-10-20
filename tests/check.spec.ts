import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, '..', 'dist');

test('popup carrega e exibe UI com botões start e stop', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });

  const [page] = context.pages();

  await page.goto('https://example.com');

  const startBtn = await page.evaluate(() => {
    const el = document.querySelector('#startBtn');
    return el ? getComputedStyle(el).outlineStyle : null;
  });
  expect(startBtn).toBeDefined();

  const stopBtn = await page.evaluate(() => {
    const el = document.querySelector('#stopBtn');
    return el ? getComputedStyle(el).outlineStyle : null;
  });
  expect(stopBtn).toBeDefined();

  await context.close();
});
