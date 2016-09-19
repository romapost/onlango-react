export const OAuthData = {
  google: {
    userInfoURL: {
      protocol: 'https:',
      host: 'www.googleapis.com',
      pathname: '/oauth2/v2/userinfo'
    },
    getUserData: ({
    email, gender, given_name: name, family_name: surname, picture: image
    }) => ({
      email, gender, name, surname, image
    })
  }
};
