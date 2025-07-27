const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const url = 'https://vue-indol-two.vercel.app/'; 
  await page.goto(url);

  await page.evaluate(() => {
    window.eventListeners = []; 

    const originalAddEventListener = Element.prototype.addEventListener;

    Element.prototype.addEventListener = function (type, listener, options) {
      window.eventListeners.push({
        target: this.tagName,
        id: this.id || null,
        eventType: type,
        listener: listener.toString(),
      });

      return originalAddEventListener.call(this, type, listener, options);
    };
  });

  await page.waitForTimeout(5000);

  const eventListeners = await page.evaluate(() => {
    return window.eventListeners;
  });

  await browser.close();
})();
