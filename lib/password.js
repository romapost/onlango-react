import scrypt from 'scrypt';
import {privateKey} from 'config';
import jwt from 'jsonwebtoken';

const params = scrypt.paramsSync(0.2);

export function createHash(password) {
  return scrypt.kdf(password, params);
}

export function verifyHash(hash, password) {
  return scrypt.verifyKdf(hash, password);
}

export function createToken({_id: id}) {
  return new Promise((resolve, reject) => {
    jwt.sign({id}, privateKey, {algorithm: 'RS256', expiresIn: '1h'}, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}
