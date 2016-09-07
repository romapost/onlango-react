import ursa from 'ursa';
import fs from 'fs';

let privateKey, publicKey;

try {
  privateKey = fs.readFileSync('./config/privateKey.pem');
  publicKey = fs.readFileSync('./config/publicKey.pem');
} catch (e) {
  const key = ursa.generatePrivateKey(2048, 65537);
  privateKey = key.toPrivatePem();
  publicKey = key.toPublicPem();
  fs.writeFile('./config/privateKey.pem', privateKey);
  fs.writeFile('./config/publicKey.pem', publicKey);
}

export {privateKey, publicKey};
