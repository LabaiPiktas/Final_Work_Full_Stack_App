const { MongoClient } = require("mongodb");

const URI = process.env.DB_CONNECTION_STRING;
let client = null;

async function connectToDatabase() {
  try {
    client = new MongoClient(URI);
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

async function disconnectFromDatabase() {
  try {
    await client.close();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
}

function getClient() {
  if (!client) {
    throw new Error("Database connection not established");
  }
  return client;
}

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
  getClient,
};
