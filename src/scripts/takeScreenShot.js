const { chromium } = require('playwright');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const ScreenShot = require('../models/ScreenShot.js');

async function takeScreenShot(url) {
  // Ekran görüntüsünü kaydedeceğimiz klasör
  const imagesDir = path.join(__dirname, 'images');

  // Klasör yoksa oluştur
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  // Tarayıcıyı başlat
  const browser = await chromium.launch();

  // Yeni bir tarayıcı sekmesi aç
  const page = await browser.newPage();

  // Belirtilen URL'ye git
  await page.goto(url);

  // Sayfa yüklendikten sonra 2 saniye bekle
  await page.waitForTimeout(2000);

  // Benzersiz dosya adı oluştur (UUID kullanarak)
  const uniqueFileName = `screenshot-${uuidv4()}.png`;

  // Ekran görüntüsünü 'images' klasörüne benzersiz bir adla kaydet
  const filePath = path.join(imagesDir, uniqueFileName);
  await page.screenshot({ path: filePath });

  // Tarayıcıyı kapat
  await browser.close();

  // ScreenShot sınıfını kullanarak dosya yolunu döndür
  return new ScreenShot(filePath);
}

module.exports = { takeScreenShot };
