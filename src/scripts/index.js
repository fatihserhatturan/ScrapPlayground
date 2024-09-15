const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

async function scrapElements(url)  {

  const browser = await chromium.launch();
  const page = await browser.newPage();


  await page.goto(url);

  await page.waitForTimeout(4000);

  const selectors = ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'a', 'button', 'form', 'input', 'select', 'textarea'];

  const fullContent = await page.evaluate(() => {
    const selectors = ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'a', 'button', 'form', 'input', 'select', 'textarea'];
    const elements = selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));

    return elements.map(el => {

      const eventListeners = [];
      const possibleEvents = ['onclick', 'onchange', 'onmouseover', 'onmouseout', 'onkeydown', 'onkeyup'];

      possibleEvents.forEach(event => {
        if (el[event]) {
          eventListeners.push({
            event: event,
            functionName: el[event].name || 'Anonymous',
            functionBody: el[event].toString()
          });
        }
      });

      return {
        tagName: el.tagName.toLowerCase(),
        textContent: el.textContent.trim(),
        attributes: {
          id: el.id,
          class: el.className,
          href: el.href || '',
          src: el.src || ''
        },
        styles: {
          display: window.getComputedStyle(el).display,
        },
        events: eventListeners
      };
    });
  });

  const directory = path.join(__dirname, 'txts');
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const uniqueId = uuidv4();
  const filePath = path.join(directory, `${uniqueId}.json`);

  fs.writeFileSync(filePath, JSON.stringify(fullContent, null, 2));

  await browser.close();

  console.log(`Kazınan veriler şu dosyaya kaydedildi: ${filePath}`);

  return fullContent;
}

module.exports = { scrapElements };
