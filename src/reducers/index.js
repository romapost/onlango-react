import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {browserHistory} from 'react-router';
import {LOGIN, REGISTER, LOGOUT, UPLOAD_IMAGE} from '../constants';

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

const entrance = {
  next: (state = {}, action) => {
    console.log(action);
    saveUsertoStorage(action.payload);
    setTimeout(() => { browserHistory.push('/') }, 100);
    return {...state, ...action.payload};
  },
  throw: (state = {}, action) => {
    console.log(action);
    removeUserFromStorage();
    return {};
  }
};

const user = handleActions({
  [LOGIN]: entrance,
  [REGISTER]: entrance,
  [LOGOUT]: (state = {}, action) => {
      console.log('do logout', action);
      removeUserFromStorage();
      browserHistory.push('/login');
      return {};
    },
  [UPLOAD_IMAGE]: {
    next: (state = {}, action) => {
      const userinfo = {...state.userinfo, image: action.payload};
      localStorage.setItem('userinfo', JSON.stringify(userinfo));
      return {...state, userinfo};
    },
    fail: (state = {}, action) => ({...state})
  }
}, {});

export default combineReducers({
  user
});
