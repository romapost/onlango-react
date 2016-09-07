import domain from './server';

export const google = {
  clientID: '384916939323-4scrgbkh1usudljutocaci7c8otvglem.apps.googleusercontent.com',
  clientSecret: 'LRZN4St1wh2YDqde6oGD97PM',
  callbackURL: `http://${domain}/account/auth/google`
};
