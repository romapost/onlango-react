import ursa from 'ursa';

const key = ursa.generatePrivateKey(2048, 65537);
export const privateKey = key.toPrivatePem();
export const publicKey = key.toPublicPem();

export default {privateKey, publicKey};
