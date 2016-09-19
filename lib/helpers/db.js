import {MongoClient, ObjectId} from 'mongodb';
import {mongoUrl} from 'config';

let connectedDb = null;

export async function connect() {
  connectedDb = await MongoClient.connect(mongoUrl);
  connectedDb.collection('users').ensureIndex({email: 1}, {unique: true, sparse: true });
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

export async function updateOne(collection, query, update, options = {}) {
  const {lastErrorObject, value, ok} = await db(collection).findAndModify(
    query,
    [['_id', 1]],
    update,
    Object.assign({new: true}, options)
  );
  if (value && ok) return value;
  else throw lastErrorObject;
}
