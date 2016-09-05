import createSocketActions from './createSocketActions';

export const {
  login,
  getTeachersList,
  getTeacherInfo,
} = createSocketActions('common')(
  'LOGIN',
  'GET_TEACHERS_LIST',
  'GET_TEACHER_INFO',
);
