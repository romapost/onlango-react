import {createActions} from 'redux-actions';

const {
  logout,
  editUserInfo,
  filterTeachers,
  setTeachersListPage,
  socketConnected,
  socketDisconnected,
} = createActions(
  {
    'LOGOUT': [undefined, () => ({passNext: true})]
  },
  'EDIT_USER_INFO',
  'FILTER_TEACHERS',
  'SET_TEACHERS_LIST_PAGE',
  'SOCKET_CONNECTED',
  'SOCKET_DISCONNECTED'
);

export {
  logout,
  editUserInfo,
  filterTeachers,
  setTeachersListPage,
  socketConnected,
  socketDisconnected,
};
