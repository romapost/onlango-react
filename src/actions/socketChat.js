import createSocketActions from './createSocketActions';

const {
  newMessage,
  initChat
} = createSocketActions('chat')(
  'NEW_MESSAGE',
  'INIT_CHAT'
);

export {
  newMessage,
  initChat
};
