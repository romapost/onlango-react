import createSocketActions from './createSocketActions';

const {
  login,
  getTeachersList,
  getTeacherInfo,
} = createSocketActions('common')(
  'LOGIN',
  'GET_TEACHERS_LIST',
  'GET_TEACHER_INFO',
);

export {
  login,
  getTeachersList,
  getTeacherInfo,
};
