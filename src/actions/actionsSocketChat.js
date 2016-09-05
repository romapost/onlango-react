import createSocketActions from './createSocketActions';

export const {
  newMessage,
  getLastMessages,
  initChat
} = createSocketActions('chat')(
  'NEW_MESSAGE',
  'GET_LAST_MESSAGES',
  'INIT_CHAT'
);
