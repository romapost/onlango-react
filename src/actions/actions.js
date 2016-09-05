import {createActions} from 'redux-actions';

export const {
  connectSocket,
  disconnectSocket,
  logout,
  editUserInfo,
  filterTeachers,
  setTeachersLispPage
} = createActions(
  {
    'CONNECT_SOCKET': [
      ({name, socket}) => ({name, socket}),
      ({name}) => ({requireAuth: name == 'common' ? false : true})
    ]
  },
  'DISCONNECT_SOCKET',
  'LOGOUT',
  'EDIT_USER_INFO',
  'FILTER_TEACHERS',
  'SET_TEACHERS_LISP_PAGE'
);
