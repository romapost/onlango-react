import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {
  joinRoom,
  newMessage,
  getUserInfo,
  changeChatStatus,
  setLastReceive,
} from 'actions';

const messages = handleActions({
  [newMessage]: (state, {payload}) => [...state, payload],
  [joinRoom]: (state, {payload: {lastMessages = []}}) => {
    console.log(lastMessages);
    return lastMessages;
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
  [joinRoom]: (state, {payload: {usersOnline}}) => Array.isArray(usersOnline) ? usersOnline : []
}, []);

const lastReceive = handleActions({
  [setLastReceive]: (state, {payload}) => payload,
  [joinRoom]: (state, {payload: {lastReceive}}) => lastReceive
}, null);

export default combineReducers({
  users,
  usersOnline,
  messages,
  lastReceive
});
