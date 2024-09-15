(async () => {
  try {
    // Dinamik import ile Lighthouse ve Chrome Launcher'ı yükleyin
    const lighthouse = await import('lighthouse');
    const chromeLauncher = await import('chrome-launcher');

    // Chrome tarayıcısını başlat
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--remote-debugging-port=9222'],  // Lighthouse için gerekli
    });

    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance'],  // Performans raporu
      port: chrome.port,  // Playwright tarayıcıyla bağlantı kurması için port
    };

    // Lighthouse'u çalıştır
    const runnerResult = await lighthouse.default('https://vue-indol-two.vercel.app/', options);

    // Raporu alın
    const reportHtml = runnerResult.report;
    console.log('Lighthouse raporu:', reportHtml);

    // Tarayıcıyı kapat
    await chrome.kill();
  } catch (error) {
    console.error('Hata oluştu:', error);
  }
})();
