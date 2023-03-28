// global-setup.ts/js
import fs from 'fs';
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { baseURL, storageState } = config.projects[0].use;

  const stats = fs.statSync('state.json');
  const { mtime } = stats;
  const date = new Date().getTime();
  if (date - mtime.getTime() > 5000) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://localhost:8000');

    const currCookies = await page.context().cookies();
    const accessToken = currCookies.filter((v) => v.name === 'accessToken')[0].value || '';

    const content = JSON.parse(fs.readFileSync('state.json', 'utf8'));
    content.cookies[1].value = accessToken;
    fs.writeFileSync('state.json', JSON.stringify(content));

    await browser.close();
  }
}

export default globalSetup;
