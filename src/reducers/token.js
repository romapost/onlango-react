import {handleActions} from 'redux-actions';
import {login, logout} from 'actions';

const token = localStorage.getItem('t');

export default handleActions({
  [login]: {
    next: (state, {payload, meta: {fromServer} = {}}) => {
      if (fromServer) {
        localStorage.setItem('t', payload);
        return payload;
      } else return state;
    },
    throw: (state, {payload}) => {
      console.error(payload.toString());
      localStorage.removeItem('t');
      return null;
    }
  },
  [logout]: state => {
    localStorage.removeItem('t');
    return null;
  }
}, token);
