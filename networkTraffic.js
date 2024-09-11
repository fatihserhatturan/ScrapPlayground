const { chromium } = require('playwright');

(async () => {
  // Tarayıcıyı başlat
  const browser = await chromium.launch({ headless: true }); // Headless: false ile tarayıcı arka planda değil, görünür çalışır
  const page = await browser.newPage();

  // Network trafiğini dinle
  page.on('request', request => {
    console.log(`Request: ${request.method()} ${request.url()}`);
  });

  // Gelen yanıtları dinle
  page.on('response', response => {
    console.log(`Response: ${response.status()} ${response.url()}`);
  });

  // İlgili sayfaya git
  await page.goto('https://vue-indol-two.vercel.app/');

  // API çağrılarını izleyin ve istediğiniz şekilde işlemler yapın
  await page.waitForTimeout(5000); // Sayfanın tamamen yüklenmesi için biraz bekle

  // Tarayıcıyı kapat
  await browser.close();
})();
