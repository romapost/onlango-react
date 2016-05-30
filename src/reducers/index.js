import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {browserHistory} from 'react-router';
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../constants';
import {REGISTER, REGISTER_SUCCESS, REGISTER_FAIL} from '../constants';

const saveUsertoStorage = ({userinfo, accessToken, refreshToken}) => {
  localStorage.setItem('userinfo', JSON.stringify(userinfo));
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
const removeUserFromStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userinfo');
};

const user = handleActions({
  [LOGIN]: (state = {}, action) => {
    console.log(LOGIN, state, action);
    return {...state, lock: true};
  },
  [LOGIN_SUCCESS]: (state = {}, action) => {
    console.log(LOGIN_SUCCESS, state, action);
    saveUsertoStorage(action.payload);
    setTimeout(() => { browserHistory.push('/') }, 100);
    return {...state, lock: false, ...action.payload};
  },
  [LOGIN_FAIL]: (state = {}, action) => {
    console.log(LOGIN_FAIL, state, action);
    removeUserFromStorage();
    return {lock: false};
  },
  [REGISTER]: (state = {}, action) => {
    console.log(REGISTER, state, action);
    return {...state, lock: true};
  },
  [REGISTER_SUCCESS]: (state = {}, action) => {
    console.log(REGISTER_SUCCESS, state, action);
    saveUsertoStorage(action.payload);
    setTimeout(() => { browserHistory.push('/') }, 100);
    return {...state, lock: false, ...action.payload};
  },
  [REGISTER_FAIL]: (state = {}, action) => {
    console.log(REGISTER_FAIL, state, action);
    removeUserFromStorage();
    return {lock: false};
  },
  [LOGOUT]: (state = {}, action) => {
    console.log(1);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userinfo');
    setTimeout(() => { browserHistory.push('login') }, 100);
    return {};
  }
}, {});

export default combineReducers({
  user
});
