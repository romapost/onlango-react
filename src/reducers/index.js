import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {browserHistory} from 'react-router';
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../constants';
import {REGISTER, REGISTER_SUCCESS, REGISTER_FAIL} from '../constants';
import {UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL} from '../constants';

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

const userReducers = {
  start: (state = {}, action) => {
    console.log(action);
    return {...state, lock: true};
  },
  success: (state = {}, action) => {
    console.log(action);
    saveUsertoStorage(action.payload);
    setTimeout(() => { browserHistory.push('/') }, 100);
    return {...state, lock: false, ...action.payload};
  },
  fail: (state = {}, action) => {
    console.log(action);
    removeUserFromStorage();
    return {lock: false};
  },
  logout: (state = {}, action) => {
    console.log('do logout', action);
    removeUserFromStorage();
    browserHistory.push('/login');
    return {};
  }
};

const user = handleActions({
  [LOGIN]: userReducers.start,
  [LOGIN_SUCCESS]: userReducers.success,
  [LOGIN_FAIL]: userReducers.fail,
  [REGISTER]: userReducers.start,
  [REGISTER_SUCCESS]: userReducers.success,
  [REGISTER_FAIL]: userReducers.fail,
  [LOGOUT]: userReducers.logout,
  [UPLOAD_IMAGE]: (state = {}, action) => ({...state}),
  [UPLOAD_IMAGE_SUCCESS]: (state = {}, action) => ({
    ...state,
      userinfo: {
        ...state.userinfo,
        image: action.payload
      }
  }),
  [UPLOAD_IMAGE_FAIL]: (state = {}, action) => ({...state})
}, {});

export default combineReducers({
  user
});
