require('dotenv').config({ silent: true });
const MongoClient = require('mongodb').MongoClient;

function getDB() {
  return MongoClient.connect(process.env.DB_CONNECTION);
}

function main() {

}

function getAllDocumentsInCollection (collection, next) {
  getDB().then(db => {
    db.collection(collection)
    .find({}, { _id: 0 })
    .toArray()
    .then(next)
    .catch(findErr => console.error(findErr));
  })
  .catch(dbErr => console.error(dbErr));
}

function uploadToDynamoDB (documents) {

}
