import ursa from 'ursa';
import fs from 'fs';
import path from 'path';

let privateKey, publicKey;

const paths = {
  publicKey: path.resolve(__dirname, 'publicKey.pem'),
  privateKey: path.resolve(__dirname, 'privateKey.pem')
};

try {
  privateKey = fs.readFileSync(paths.privateKey);
  publicKey = fs.readFileSync(paths.publicKey);
} catch (e) {
  const key = ursa.generatePrivateKey(2048, 65537);
  privateKey = key.toPrivatePem();
  publicKey = key.toPublicPem();
  fs.writeFile(paths.privateKey, privateKey);
  fs.writeFile(paths.publicKey, publicKey);
}

export {privateKey, publicKey};
