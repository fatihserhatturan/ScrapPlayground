const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

(async () => {
  // Tarayıcıyı başlat
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // İlgili web sayfasına git
  await page.goto('https://vue-indol-two.vercel.app/');

  // Dinamik olarak yüklenmesi gereken her türden öğe için genel bir koşul belirleyelim
  // Belirli öğelerin yüklendiğinden emin olmak için aşağıdaki selector'ları kullanabilirsiniz:
  const selectors = [
    'table',       // Tablolar için
    'button',      // Butonlar için
    'label',       // Label elemanları için
    'div',         // Genel div elemanları için
    'span',        // Span elemanları için
    'input',       // Input alanları için
    // Listeye ihtiyaç duyduğunuz diğer elementleri ekleyebilirsiniz
  ];

  // Her bir selector için sayfa yüklendiğinde belirli öğelerin görünmesini bekleyin
  for (const selector of selectors) {
    await page.waitForSelector(selector, { state: 'visible', timeout: 2000 }).catch(() => {
      console.log(`${selector} görünür hale gelmedi.`);
    });
  }

  // Sayfa üzerindeki tüm elementleri ve stillerini kazıma işlemi
  const fullContent = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    return elements.map(el => {
      const computedStyle = window.getComputedStyle(el);
      return {
        tagName: el.tagName.toLowerCase(),
        textContent: el.textContent.trim(),
        styles: {
          color: computedStyle.color,
          backgroundColor: computedStyle.backgroundColor,
          fontSize: computedStyle.fontSize,
          margin: computedStyle.margin,
          padding: computedStyle.padding,
          display: computedStyle.display,
        }
      };
    });
  });

  // txts klasörünün var olup olmadığını kontrol et, yoksa oluştur
  const directory = path.join(__dirname, 'txts');
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  // Benzersiz bir dosya ismi oluştur
  const uniqueId = uuidv4();
  const filePath = path.join(directory, `${uniqueId}.json`);

  // Elde edilen verileri JSON formatında dosyaya kaydedin
  fs.writeFileSync(filePath, JSON.stringify(fullContent, null, 2));

  // Tarayıcıyı kapat
  await browser.close();

  // Dosya adını konsola yazdır
  console.log(`Kazınan veriler şu dosyaya kaydedildi: ${filePath}`);
})();
