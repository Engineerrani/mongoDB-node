const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "student_info";

async function dbConnect() {
  await client.connect();
  console.log("Server connected successfully");
  const db = client.db(dbName);
  return db.collection("students");
}

module.exports = dbConnect;
