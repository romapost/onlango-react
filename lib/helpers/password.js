import scrypt from 'scrypt';
import {randomBytes} from 'crypto';

const params = scrypt.paramsSync(0.2);

export function createHash(password) {
  return scrypt.kdf(password, params);
}

export function verifyHash(hash, password) {
  return scrypt.verifyKdf(hash, password);
}

export function genToken() {
  return randomBytes(64).toString('base64').slice(0, -2);
}
