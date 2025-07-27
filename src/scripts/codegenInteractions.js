const { chromium } = require('playwright');

async function generateCode() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://vue-indol-two.vercel.app/');

  await page.click('text=More information...'); 

  const generatedCode = {
    url: page.url(),
    interactions: [
      { action: 'click', selector: 'text=More information...' },
    ]
  };


  await browser.close();
}

generateCode();
