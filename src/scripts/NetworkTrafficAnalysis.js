const { chromium } = require('playwright');
const NetworkRequest = require('../models/netwokRequest.js'); 

async function getNetworkRequests(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const networkRequests = [];

  const requestStartTimes = new Map();

  page.on('request', (request) => {
    requestStartTimes.set(request.url(), Date.now());
  });

  page.on('requestfinished', async (request) => {
    try {
      const response = await request.response();
      const startTime = requestStartTimes.get(request.url()) || Date.now(); 

      const requestData = new NetworkRequest(
        request.url(),
        request.method(),
        request.resourceType(),
        response.headers()['content-type'] || 'unknown',
        Date.now() - startTime,  
        'success',  
        null        
      );
      networkRequests.push(requestData);
    } catch (error) {
      console.error('Response hatası:', error);
    }
  });

  page.on('requestfailed', (request) => {
    const startTime = requestStartTimes.get(request.url()) || Date.now(); 

    const requestData = new NetworkRequest(
      request.url(),
      request.method(),
      request.resourceType(),
      'unknown', 
      Date.now() - startTime, 
      'error',  
      request.failure().errorText  
    );

    networkRequests.push(requestData);
    console.log(`Request failed: ${request.url()} with error: ${request.failure().errorText}`);
  });

  await page.goto(url);

  await page.waitForTimeout(2000);

  await browser.close();

  return networkRequests;
}

module.exports = { getNetworkRequests };
