import {dev, domain} from './server';

export const emailVerification = {
  url: `http://${domain}/email-verification/\${URL}`,
  transport: {
    host: dev ? 'onlango.com' : 'localhost',
    auth: { user: 'noreply@onlango.com', pass: 'rMpWhoTxm2' },
    tls: { rejectUnauthorized: false }
  }
};
