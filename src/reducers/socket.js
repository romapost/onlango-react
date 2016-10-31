import {handleActions} from 'redux-actions';
import {socketConnected, socketDisconnected, login, logout} from 'actions';

export default handleActions({
  [socketConnected]: (state, {payload}) => ({...state, connected: true, socket: payload}),
  [socketDisconnected]: ({socket, ...state}) => ({...state, connected: false}),
  [login]: (state, {
    error, payload, meta: {fromServer} = {}}
  ) => fromServer && !error ? {...state, authorized: true} : state,
  [logout]: state => ({...state, authorized: false}),
}, {});
