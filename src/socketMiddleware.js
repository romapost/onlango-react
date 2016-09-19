import io from 'socket.io-client';
import * as socketActions from 'actions/socket';
import {socketConnected, socketDisconnected} from 'actions';

const socket = io({path: '/api'});

const list = Object
  .keys(socketActions)
  .reduce((s, e) => {
    if (typeof socketActions[e] == 'function') s.push(socketActions[e].toString());
    return s;
  }, []);

function assignServerMeta(action) {
  const meta = {fromServer: true};
  if (typeof action.meta == 'undefined') Object.assign(action, {meta});
  else if (typeof action.meta == 'object') Object.assign(action.meta, meta);
  return action;
}

export default ({dispatch}) => {
  socket.on('connect', () => { console.log('connect'); dispatch(socketConnected()) });
  socket.on('disconnect', () => { console.log('disconnect'); dispatch(socketDisconnected()) });
  socket.on('reconnect', () => { console.log('reconnect') });

  socket.on('dispatch', action => { dispatch(assignServerMeta(action)) });

  return next => action => {
    console.log(action)
    const {meta: {fromServer, passNext, cb} = {}} = action;
    if (!fromServer && socket.connected && list.indexOf(action.type) !== -1) {
      if (!fromServer && socket) {
        const data = ['dispatch', action];
        if (typeof cb == 'function') data.push(cb);
        socket.emit(...data);
      }
      if (passNext) next(action);
    } else {
      next(action);
    }
  };

};
