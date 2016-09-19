import {createActions} from 'redux-actions';

const {
  newMessage,
  setLastReceive,
  initChat,
  changeChatStatus,
  getRoom,
  addRoom,
  editRoom,
  removeRoom,
  joinRoom,
  leaveRoom,
} = createActions(
  {
    'ADD_ROOM': [payload => payload, (payload, cb) => typeof cb == 'function' ? {cb} : undefined],
    'REMOVE_ROOM': [payload => payload, () => ({passNext: true})],
  },
  'NEW_MESSAGE',
  'SET_LAST_RECEIVE',
  'INIT_CHAT',
  'CHANGE_CHAT_STATUS',
  'GET_ROOM',
  'EDIT_ROOM',
  'JOIN_ROOM',
  'LEAVE_ROOM',
);

export {
  newMessage,
  setLastReceive,
  initChat,
  changeChatStatus,
  addRoom,
  getRoom,
  removeRoom,
  editRoom,
  joinRoom,
  leaveRoom,
};
