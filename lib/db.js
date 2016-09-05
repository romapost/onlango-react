import {MongoClient} from 'mongodb';
import {mongoUrl} from '../config';

const dbConnection = {
  connect: async function connectDb() {
    const db = await MongoClient.connect(mongoUrl);
    dbConnection.db = db;
    return db;
  }
};

export default dbConnection;
