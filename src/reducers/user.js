import {handleActions} from 'redux-actions';
import {getUserInfo, editUserInfo, logout, submitTeacherForm} from 'actions';

export default handleActions({
  [getUserInfo]: (state, {payload}) => {
    if (typeof payload == 'object' && payload.self) {
      const info = {...payload};
      delete info.self;
      return {...state, ...info};
    } else return state;
  },
  [editUserInfo]: (state, {payload}) => {
    for (const field in payload) {
      if (payload[field] !== state[field]) return {...payload};
    }
    return state;
  },
  [submitTeacherForm]: (state, {payload}) => ({...state, ...payload}),
  [logout]: state => ({})
}, {});
