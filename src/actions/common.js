import {createActions} from 'redux-actions';

const {
  login,
  getTeachersList,
  getTeacherInfo,
} = createActions(
  'LOGIN',
  'GET_TEACHERS_LIST',
  'GET_TEACHER_INFO',
);

export {
  login,
  getTeachersList,
  getTeacherInfo,
};
