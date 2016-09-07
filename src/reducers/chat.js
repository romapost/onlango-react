import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {
  newMessage,
  getUserInfo,
  changeChatStatus,
  initChat,
} from 'actions';

const messages = handleActions({
  [newMessage]: (state, {payload}) => [...state, payload],
  [initChat]: (state, {payload: {lastMessages = []}}) => {
    console.log(lastMessages);
    return [...state, ...lastMessages];
  }
}, []);

const users = handleActions({
  [getUserInfo]: (state, {payload}) => payload.self ? state : {...state, [payload.id]: payload}
}, {});

const usersOnline = handleActions({
  [changeChatStatus]: (state, {payload: {id, status}}) => {
    switch (status) {
      case 'online': return [...state, id];
      case 'offline': return state.filter(e => e != id);
      default: return state;
    }
  },
  [initChat]: (state, {payload: {usersOnline}}) => usersOnline
}, []);

export default combineReducers({
  users,
  usersOnline,
  messages
});
