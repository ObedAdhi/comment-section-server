const { MongoClient } = require('mongodb')

let database = null

async function connect() {
  try {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const db = client.db('commentSection')
    database = db

    return db
  } catch (error) {
    console.log(error);
  }
}

function getDatabase() {
  return database
}

module.exports = {
  connect,
  getDatabase
}