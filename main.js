// main.js
const { getNetworkRequests } = require('./src/scripts/NetworkTrafficAnalysis');
const { scrapElements } = require('./src/scripts/index');
const { takeScreenShot } = require('./src/scripts/takeScreenShot');
//const { generateReport } = require('./src/scripts/generateReport');
const DbRequest = require('./src/models/DbRequest');
const { insertData, getAllData } = require('./src/dbOptions/mongoOperations');

(async () => {

  const url = 'https://vue-indol-two.vercel.app/';

  // Network analizi
  let networkData, elementData, screenshotData;

  try {
    networkData = await getNetworkRequests(url);
    console.log('Ağ İstekleri:', JSON.stringify(networkData, null, 2));
  } catch (error) {
    console.error('Ağ isteklerini alma hatası:', error);
    networkData = {}; // Hata durumunda boş obje döndürüyoruz
  }

  // Element kazıma
  try {
    elementData = await scrapElements(url);
    console.log('Sayfa Elementleri:', JSON.stringify(elementData, null, 2));
  } catch (error) {
    console.error('Sayfa Kazıma Hatası:', error);
    elementData = {}; // Hata durumunda boş obje döndürüyoruz
  }

  // Screenshot alma
  try {
    screenshotData = await takeScreenShot(url);
    console.log('Ekran Görüntüsü:', JSON.stringify(screenshotData, null, 2));
  } catch (error) {
    console.error('Ekran Görüntüsü Alma Hatası:', error);
    screenshotData = {}; // Hata durumunda boş obje döndürüyoruz
  }

/*
  //lighthouse raporu oluşturma
  try {
    reportData = await generateReport(url);
    console.log('Ekran Görüntüsü:', JSON.stringify(reportData, null, 2));
  } catch (error) {
    console.error('Ekran Görüntüsü Alma Hatası:', error);
    reportData = {}; // Hata durumunda boş obje döndürüyoruz
  }*/

  /*
  // Sonuçları tek bir modelde birleştiriyoruz
  const dbjson = new DbRequest(networkData, elementData, screenshotData,fetchedAt = new Date());
  const insertedId = await insertData(dbjson);
    console.log('MongoDB\'ye eklenen veri ID\'si:', insertedId);

  console.log('Birleştirilmiş Sonuç:', JSON.stringify(dbjson, null, 2));*/

})();
