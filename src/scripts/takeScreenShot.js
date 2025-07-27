const { chromium } = require('playwright');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const ScreenShot = require('../models/ScreenShot.js');

async function takeScreenShot(url) {
  const imagesDir = path.join(__dirname, 'images');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForTimeout(2000);

  const uniqueFileName = `screenshot-${uuidv4()}.png`;

  const filePath = path.join(imagesDir, uniqueFileName);
  await page.screenshot({ path: filePath });

  await browser.close();

  return new ScreenShot(filePath);
}

module.exports = { takeScreenShot };
