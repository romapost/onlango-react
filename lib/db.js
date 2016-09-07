import {MongoClient, ObjectId} from 'mongodb';
import {mongoUrl} from '../config/server';

let connectedDb = null;

export async function connect() {
  connectedDb = await MongoClient.connect(mongoUrl);
  return connectedDb;
}

export function disconnect() {
  if (connectedDb) {
    connectedDb.close();
    connectedDb = null;
  }
}

export function db(collection) {
  if (collection) {
    return connectedDb.collection(collection);
  } else {
    return connectedDb;
  }
}

export function findOneById(collection, id) {
  return db(collection).findOne({_id: ObjectId(id)});
}

export function updateOneById(collection, id, update) {
  return db(collection).findAndModify(
    {_id: ObjectId(id)},
    [['_id', 1]],
    {$set: update},
    {new: true}
  );
}
