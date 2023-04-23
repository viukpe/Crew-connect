import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
const dbName = 'crewdb';
let  client,db

async function conne() {
    client = await MongoClient.connect(url);
     db = client.db(dbName);
    return db;
  }

export default {conne,db,client}
