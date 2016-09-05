import {handleActions} from 'redux-actions';
import {receiveUserInfo, editUserInfo, logout} from 'actions';

export default handleActions({
  [receiveUserInfo]: (state, {payload}) => {
    if ('self' in payload) {
      const info = {...payload};
      delete info.self;
      return info;
    } else return state;
  },
  [editUserInfo]: (state, {payload}) => {
    for (const field in payload) {
      if (payload[field] !== state[field]) return {...payload};
    }
    return state;
  },
  [logout]: state => ({})
}, {});
