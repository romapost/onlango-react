import {createActions} from 'redux-actions';

const {
  connectSocket,
  disconnectSocket,
  logout,
  editUserInfo,
  filterTeachers,
  setTeachersListPage,
} = createActions(
  {
    'CONNECT_SOCKET': [
      name => name,
      name => ({requireAuth: name == 'common' ? false : true})
    ]
  },
  'DISCONNECT_SOCKET',
  'LOGOUT',
  'EDIT_USER_INFO',
  'FILTER_TEACHERS',
  'SET_TEACHERS_LIST_PAGE'
);

export {
  connectSocket,
  disconnectSocket,
  logout,
  editUserInfo,
  filterTeachers,
  setTeachersListPage,
};
