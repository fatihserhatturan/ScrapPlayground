const { chromium } = require('playwright');
const NetworkRequest = require('../models/netwokRequest.js'); // Modeli dahil et

// URL parametresini alır, ağ isteklerini yakalar ve döndürür
async function getNetworkRequests(url) {
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

  // Ağ isteğini başarılı şekilde tamamlandığında yakalayın
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
        Date.now() - startTime,  // Süreyi hesaplayın
        'success',  // Başarılı istek için status
        null        // Başarılı isteklerde hata mesajı yok
      );

      networkRequests.push(requestData);
    } catch (error) {
      console.error('Response hatası:', error);
    }
  });

  // Hatalı istekleri yakalayın ve status error olarak işaretleyin
  page.on('requestfailed', (request) => {
    const startTime = requestStartTimes.get(request.url()) || Date.now(); // Başlangıç zamanı

    const requestData = new NetworkRequest(
      request.url(),
      request.method(),
      request.resourceType(),
      'unknown', // Hatalı isteğin response type'ı bilinmiyor
      Date.now() - startTime, // Süreyi hesaplayın
      'error',  // Hatalı istek için status
      request.failure().errorText  // Hata mesajını ekleyin
    );

    networkRequests.push(requestData);
    console.log(`Request failed: ${request.url()} with error: ${request.failure().errorText}`);
  });

  // Sayfayı aç
  await page.goto(url);

  // Tüm isteklerin tamamlanması için bekle
  await page.waitForTimeout(2000);

  // Tarayıcıyı kapat
  await browser.close();

  // Ağ isteklerini döndür
  return networkRequests;
}

// Fonksiyonu dışa aktar
module.exports = { getNetworkRequests };
