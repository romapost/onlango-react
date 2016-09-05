import createSocketActions from './createSocketActions';

export const {
  getUserInfo,
  uploadUserImage,
  submitUserInfo,
  changePassword,
} = createSocketActions('authorized')(
  'GET_USER_INFO',
  'UPLOAD_USER_IMAGE',
  'SUBMIT_USER_INFO',
  'CHANGE_PASSWORD'
);
