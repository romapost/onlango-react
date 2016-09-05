import {handleActions} from 'redux-actions';
import {receiveAccessToken, logout} from 'actions';

const token = {accessToken: localStorage.getItem('accessToken')};

export default handleActions({
  [receiveAccessToken]: (state, {payload}) => {
    const {accessToken} = payload;
    localStorage.setItem('accessToken', accessToken);
    return {...state, ...payload};
  },
  [logout]: state => {
    delete state.accessToken;
    localStorage.removeItem('accessToken');
    return {...state};
  },
  UNAUTHORIZED: state => {
    delete state.accessToken;
    localStorage.removeItem('accessToken');
    return {...state};
  }
}, {...token});
