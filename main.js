// main.js
const { getNetworkRequests } = require('./src/scripts/NetworkTrafficAnalysis');
const { scrapElements } = require('./src/scripts/index');
const { takeScreenShot } = require('./src/scripts/takeScreenShot');


(async () => {

    const url = 'https://vue-indol-two.vercel.app/';

    //netwok analizi

    try {
      const networkData = await getNetworkRequests(url);
      console.log('Ağ İstekleri:', JSON.stringify(networkData, null, 2));
    }
     catch (error) {
      console.error('Ağ isteklerini alma hatası:', error);
    }

    //element kazıma

    try {
        const elementData = await scrapElements(url);
        console.log('Sayfa Elementleri:', JSON.stringify(elementData, null, 2));
      }
       catch (error) {
        console.error('Sayfa Kazıma Hatası:', error);
      }

    //screenshot alma

    try {
        const ssData = await takeScreenShot(url);
        console.log('Ekran Görüntüsü:', JSON.stringify(ssData, null, 2));
      }
       catch (error) {
        console.error('Ekran Görüntüsü Alma Hatası:', error);
      }




})();
