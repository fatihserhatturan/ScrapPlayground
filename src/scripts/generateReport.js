import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

async function generateReport(url) {
  const chrome = await launch({ chromeFlags: ['--headless'] });

  // Lighthouse'u çalıştır
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'], // Performans kategorisine odaklanmak için
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);

  // Lighthouse raporunu JSON dosyasına yaz
  const reportJson = JSON.stringify(runnerResult.lhr, null, 2);  // JSON formatına çeviriyoruz


  await chrome.kill();

  return reportJson;
}

module.exports = { generateReport };
