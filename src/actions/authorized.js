import {createActions} from 'redux-actions';

const {
  changePassword,
  getUserInfo,
  uploadUserImage,
  submitUserInfo,
  submitTeacherForm,
} = createActions(
  'CHANGE_PASSWORD',
  'GET_USER_INFO',
  'SUBMIT_USER_INFO',
  'UPLOAD_USER_IMAGE',
  'SUBMIT_TEACHER_FORM',
);

export {
  changePassword,
  getUserInfo,
  uploadUserImage,
  submitUserInfo,
  submitTeacherForm,
};
