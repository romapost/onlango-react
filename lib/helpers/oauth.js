import request from 'request';
import {OAuthData} from 'config';
import {format} from 'url';

export function getOAuthUser(access_token, state) {
  return new Promise((resolve, reject) => {
    if (state in OAuthData) {
      request(
        format(Object.assign({query: {access_token}}, OAuthData[state].userInfoURL)),
        {json:true},
        (err, res, body) => {
          if (err || body.error) reject(err || body);
          else resolve(OAuthData[state].getUserData(body));
        }
      );
    } else {
      reject(new Error('OAuth provider undefined'));
    }
  });
}
