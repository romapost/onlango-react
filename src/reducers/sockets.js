import {handleActions} from 'redux-actions';
import {connectSocket, disconnectSocket} from 'actions';

export default handleActions({
  [connectSocket]: (state, {payload: {name, socket}}) => {
    return {...state, [name]: socket};
  },
  [disconnectSocket]: (state, {payload: name}) => {
    if (name) {
      delete state[name];
      return {...state};
    } else return {};
  }
}, {});
