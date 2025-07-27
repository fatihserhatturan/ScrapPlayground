import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

async function generateReport(url) {
  const chrome = await launch({ chromeFlags: ['--headless'] });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'], 
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);

  const reportJson = JSON.stringify(runnerResult.lhr, null, 2); 

  await chrome.kill();

  return reportJson;
}

module.exports = { generateReport };
