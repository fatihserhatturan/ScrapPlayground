const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Sayfayı yükle
  const url = 'https://vue-indol-two.vercel.app/'; // Hedef URL'nizi buraya koyun
  await page.goto(url);

  // Tarayıcı bağlamında addEventListener'ı patch'leyin
  await page.evaluate(() => {
    window.eventListeners = []; // Event dinleyicilerini saklayacak global bir dizi

    const originalAddEventListener = Element.prototype.addEventListener;

    Element.prototype.addEventListener = function (type, listener, options) {
      // Event bilgilerini kaydet
      window.eventListeners.push({
        target: this.tagName,
        id: this.id || null,
        eventType: type,
        listener: listener.toString(), // Dinleyicinin içeriği
      });

      // Orijinal addEventListener'ı çağır
      return originalAddEventListener.call(this, type, listener, options);
    };
  });

  // 5 saniye bekle (sayfadaki event dinleyicilerinin yüklenmesi için)
  await page.waitForTimeout(5000);

  // Toplanan event dinleyicilerini al
  const eventListeners = await page.evaluate(() => {
    return window.eventListeners;
  });

  // JSON formatında konsola yazdır
  console.log(JSON.stringify(eventListeners, null, 2));

  // Tarayıcıyı kapat
  await browser.close();
})();
