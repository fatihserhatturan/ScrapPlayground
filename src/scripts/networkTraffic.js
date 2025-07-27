const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('request', request => {
    console.log(`Request: ${request.method()} ${request.url()}`);
  });

  page.on('response', response => {
    console.log(`Response: ${response.status()} ${response.url()}`);
  });

  await page.goto('https://vue-indol-two.vercel.app/');

  await page.waitForTimeout(2000); 

  await browser.close();
})();
