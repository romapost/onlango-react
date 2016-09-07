import {handleActions} from 'redux-actions';
import {login, logout} from 'actions';

const token = {accessToken: localStorage.getItem('accessToken')};

export default handleActions({
  [login]: {
    next: (state, {payload}) => {
      const {accessToken} = payload;
      localStorage.setItem('accessToken', accessToken);
      return {...state, ...payload};
    },
    throw: (state, {payload}) => {
      console.error(payload.toString());
      delete state.accessToken;
      localStorage.removeItem('accessToken');
      return {...state};
    }
  },
  [logout]: state => {
    delete state.accessToken;
    localStorage.removeItem('accessToken');
    return {...state};
  }
}, {...token});
