import {createActions} from 'redux-actions';

const {
  receiveUserInfo,
  receiveNewChatMessage,
  receiveInitChat,
  receiveUserStatus,
  receiveAccessToken,
  loginError,
  changeChatStatus,
  receiveTeachersList,
  receiveTeacherInfo,
} = createActions(
  'RECEIVE_USER_INFO',
  'RECEIVE_NEW_CHAT_MESSAGE',
  'RECEIVE_INIT_CHAT',
  'RECEIVE_USER_STATUS',
  'RECEIVE_ACCESS_TOKEN,',
  'LOGIN_ERROR',
  'CHANGE_CHAT_STATUS',
  'RECEIVE_TEACHERS_LIST',
  'RECEIVE_TEACHER_INFO',
);

export {
  receiveUserInfo,
  receiveNewChatMessage,
  receiveInitChat,
  receiveUserStatus,
  receiveAccessToken,
  loginError,
  changeChatStatus,
  receiveTeachersList,
  receiveTeacherInfo,
}
