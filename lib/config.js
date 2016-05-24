const dev = process.env.NODE_ENV != 'production';
const domain = dev ? 'localhost' : 'onlango.com';

export default {
  dev,
  domain,
  mongoURL: 'mongodb://localhost/app',
  keys: ['key1', 'key2', 'key3'],
  secret: 'someSecter' + domain,
  OAuth: {
    google: {
      clientID: '384916939323-4scrgbkh1usudljutocaci7c8otvglem.apps.googleusercontent.com',
      clientSecret: 'LRZN4St1wh2YDqde6oGD97PM',
      callbackURL: 'http://' + domain + '/account/auth/google'
    }
  },
  emailVerification: {
    url: 'http://' + domain + '/email-verification/${URL}',
    transport: {
      host: dev ? 'onlango.com' : 'localhost',
      auth: { user: 'noreply@onlango.com', pass: 'rMpWhoTxm2' },
      tls: { rejectUnauthorized: false }
    }
  }
};
