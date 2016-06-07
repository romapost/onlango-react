import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {browserHistory} from 'react-router';
import {LOGIN, LOGOUT, UPLOAD_IMAGE, UPLOAD_USERINFO} from '../constants';
import {GET_USERINFO, REFRESH_TOKEN} from '../constants';

const saveTokensToStorage = ({userinfo, accessToken, refreshToken}) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
const removeTokensFromStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const user = handleActions({
  [LOGIN]: {
    next: (state = {}, action) => {
      console.log(action);
      saveTokensToStorage(action.payload);
      setTimeout(() => { browserHistory.push('/') }, 100);
      return {...state, ...action.payload};
    },
    throw: (state = {}, action) => {
      console.log(action);
      return {error: action.payload};
    }
  },
  [LOGOUT]: (state = {}, action) => {
      console.log('do logout', action);
      removeTokensFromStorage();
      localStorage.removeItem('userinfo');
      browserHistory.push('/login');
      return {};
    },
  [UPLOAD_IMAGE]: {
    next: (state = {}, action) => {
      const userinfo = {...state.userinfo, image: action.payload};
      localStorage.setItem('userinfo', JSON.stringify(userinfo));
      return {...state, userinfo};
    },
    fail: (state = {}, action) => { console.log(action); return state }
  },
  [UPLOAD_USERINFO]: {
    next: (state = {}, action) => {
      console.log(action);
      localStorage.setItem('userinfo', JSON.stringify(action.payload));
      browserHistory.push('/profile');
      return {...state, userinfo: {...action.payload}};
    },
    fail: (state = {}, action) => {
      console.log(action);
      localStorage.removeItem('userinfo');
      return state;
    }
  },
  [GET_USERINFO]: {
    next: (state = {}, action) => {
      console.log(action);
      localStorage.setItem('userinfo', JSON.stringify(action.payload));
      return {...state, userinfo: {...action.payload}};
    },
    fail: (state = {}, action) => {
      console.log(action);
      localStorage.removeItem('userinfo');
      return state;
    }
  },
  [REFRESH_TOKEN]: {
    next: (state = {}, action) => {
      console.log(action);
      saveTokensToStorage(action.payload);
      setTimeout(() => { browserHistory.push('/') }, 100);
      return {...state, ...action.payload};
    },
    fail: (state = {}, action) => { console.log(action); return state }
  }
}, {});

export default combineReducers({
  user
});
