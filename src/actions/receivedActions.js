import {createActions} from 'redux-actions';

const {
  changeChatStatus,
} = createActions(
  'CHANGE_CHAT_STATUS',
);

export {
  changeChatStatus,
};
