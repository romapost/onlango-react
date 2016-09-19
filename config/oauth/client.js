import {dev} from '../common';
import {format} from 'url';

export const OAuthData = {
  google: format({
    protocol: 'https',
    host: 'accounts.google.com',
    pathname: '/o/oauth2/v2/auth',
    query: {
      scope: 'email',
      response_type: 'token',
      client_id: '384916939323-4scrgbkh1usudljutocaci7c8otvglem.apps.googleusercontent.com',
      redirect_uri: dev ? 'http://localhost:8080' : 'https://onlango.com',
      state: 'google'
    }
  })
};
