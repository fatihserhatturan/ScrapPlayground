const { chromium } = require('playwright');
const NetworkRequest = require('../models/netwokRequest.js'); // Modeli dahil et

(async () => {
  // Tarayıcıyı başlat
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Ağ trafiğini izlemek için boş bir dizi oluşturun
  const networkRequests = [];

  // İstek başlangıcını izleyin
  const requestStartTimes = new Map();

  // Ağ isteği başladığında zamanı kaydedin
  page.on('request', (request) => {
    requestStartTimes.set(request.url(), Date.now());
  });

  // Ağ isteğini yakalayın
  page.on('requestfinished', async (request) => {
    try {
      const response = await request.response();
      const startTime = requestStartTimes.get(request.url()) || Date.now(); // Başlangıç zamanı

      // NetworkRequest modelini kullanarak istek bilgilerini saklayın
      const requestData = new NetworkRequest(
        request.url(),
        request.method(),
        request.resourceType(),
        response.headers()['content-type'] || 'unknown',
        Date.now() - startTime // Süreyi hesaplayın
      );

      networkRequests.push(requestData);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  });

  // Sayfayı aç
  await page.goto('https://vue-indol-two.vercel.app/');  // Kendi URL'nizi buraya ekleyin

  // Biraz bekle, sayfanın tüm isteklerinin tamamlanması için
  await page.waitForTimeout(5000);

  // Tüm istekleri konsola yazdır
  console.log(JSON.stringify(networkRequests, null, 2));

  // Tarayıcıyı kapat
  await browser.close();
})();
