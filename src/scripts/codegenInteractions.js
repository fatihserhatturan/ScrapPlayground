const { chromium } = require('playwright');

async function generateCode() {
  // Playwright tarayıcıyı başlatır
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Belirtilen URL'ye gidilir
  await page.goto('https://vue-indol-two.vercel.app/');

  // Burada kullanıcı etkileşimleri olabilir (örneğin buton tıklama, form doldurma vb.)
  await page.click('text=More information...'); // Örnek bir etkileşim

  // JSON formatında içerik oluşturulur
  const generatedCode = {
    url: page.url(),
    interactions: [
      { action: 'click', selector: 'text=More information...' },
      // Daha fazla etkileşim burada yer alabilir
    ]
  };

  // JSON'u konsola yazdırma
  console.log('Etkileşimler JSON formatında:');
  console.log(JSON.stringify(generatedCode, null, 2));

  // Tarayıcıyı kapat
  await browser.close();
}

generateCode();
