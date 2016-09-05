import dbConnection from '../db';
import {ObjectId} from 'mongodb';
import scrypt from 'scrypt';
import {privateKey} from '../../config/keys';
import jwt from 'jsonwebtoken';
import {receiveAccessToken, loginError} from '../../src/actions';
import crypto from 'crypto';

const db = collection => dbConnection.db.collection(collection);

const params = scrypt.paramsSync(0.2);

function createHash(password) {
  return scrypt.kdf(password, params);
}

function verifyHash(hash, password) {
  return scrypt.verifyKdf(hash, password);
}

function createToken({_id: id}) {
  return new Promise((resolve, reject) => {
    jwt.sign({id}, privateKey, {algorithm: 'RS256', expiresIn: '1h'}, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

export default {
  connection: {
    async login({email, password, register}) {
      if (!email || !password) throw new Error('email and password must be present');
      const users = dbConnection.db.collection('users');
      const user = await users.findOne({email});
      if (register && user) {
        return loginError(new Error('user already exists'));
      } else if (!register && user) {
        if (await verifyHash(user.hash.buffer, password)) {
          return receiveAccessToken({accessToken: await createToken(user)});
        } else {
          return loginError(new Error('password not match'));
        }
      } else if (register && !user) {
        const hash = await createHash(password);
        const name = email.replace(/@.*/, '');
        const image = `http://www.gravatar.com/avatar/${crypto.createHash('md5').update(email.trim().toLocaleLowerCase()).digest('hex')}`;
        const {ops: [user = null] = []} = await users.insert({email, hash, image, name});
        return receiveAccessToken({accessToken: await createToken(user)});
      } else {
        return loginError(new Error('user not found'));
      }
    },
    async getTeachersList() {
      const payload = await db('users').find({status: 'teacher'}).toArray();
      return {type: 'RECEIVE_TEACHERS_LIST', payload};
    },
    async getTeacherInfo(id) {
      const found = await db('users').findOne({_id: ObjectId(id)});
      if (found) {
        const {teacherForm: {experience, languages, interests, aboutSelf}, name, country, image} = found;
        return {
          type: 'RECEIVE_TEACHER_INFO',
          payload: {experience, languages, interests, aboutSelf, name, country, image}
        };
      }
    }
  }
};
