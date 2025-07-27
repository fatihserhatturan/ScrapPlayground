const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('PageData'); 
  } catch (err) {
  }
}

async function insertData(data) {
  const db = await connectToMongoDB();
  const collection = db.collection('scrapOptions'); 

  try {
    const result = await collection.insertOne(data);
    return result.insertedId;
  } catch (error) {
  } finally {
    await client.close();
  }
}

async function getAllData() {
  const db = await connectToMongoDB();
  const collection = db.collection('scrapOption');

  try {
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
  } finally {
    await client.close();
  }
}

module.exports = { insertData, getAllData };
