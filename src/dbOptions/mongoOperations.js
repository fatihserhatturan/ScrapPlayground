const { MongoClient } = require('mongodb');

// MongoDB Atlas bağlantı URI'si
const uri = "mongodb+srv://motorfatih4:qwh185Q7nMQo4Dz0@cluster0.mongodb.net/PageData?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// MongoDB'ye bağlanma fonksiyonu
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("MongoDB'ye başarıyla bağlanıldı.");
    return client.db('PageData'); // 'myDatabase' yerine veritabanı adınızı yazın
  } catch (err) {
    console.error("MongoDB bağlantı hatası:", err);
  }
}

// Veri ekleme fonksiyonu
async function insertData(data) {
  const db = await connectToMongoDB();
  const collection = db.collection('scrapOptions'); // 'myCollection' yerine koleksiyon adınızı yazın

  try {
    const result = await collection.insertOne(data);
    console.log(`Veri MongoDB'ye eklendi: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error("Veri ekleme hatası:", error);
  } finally {
    await client.close();
  }
}

// Veritabanından tüm verileri alma fonksiyonu
async function getAllData() {
  const db = await connectToMongoDB();
  const collection = db.collection('scrapOption');

  try {
    const result = await collection.find({}).toArray();
    console.log("Tüm veriler alındı:", result);
    return result;
  } catch (error) {
    console.error("Veri alma hatası:", error);
  } finally {
    await client.close();
  }
}

module.exports = { insertData, getAllData };
