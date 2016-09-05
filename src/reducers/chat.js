import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {
  receiveNewChatMessage,
  receiveInitChat,
  receiveUserStatus,
  receiveUserInfo,
  changeChatStatus
} from 'actions';

const messages = handleActions({
  [receiveNewChatMessage]: (state, {payload}) => [...state, payload],
  [receiveInitChat]: (state, {payload: {lastMessages = []}}) => {
    console.log(lastMessages);
    return [...state, ...lastMessages];
  }
}, []);

const users = handleActions({
  [receiveUserInfo]: (state, {payload}) => payload.self ? state : {...state, [payload.id]: payload},
  [receiveUserStatus]: (state, {payload}) => state
}, {});

const usersOnline = handleActions({
  [changeChatStatus]: (state, {payload: {id, status}}) => {
    switch (status) {
      case 'online': return [...state, id];
      case 'offline': return state.filter(e => e != id);
      default: return state;
    }
  },
  [receiveInitChat]: (state, {payload: {usersOnline}}) => usersOnline
}, []);

export default combineReducers({
  users,
  usersOnline,
  messages
});
