import {connectSocket, disconnectSocket} from 'actions';
import io from 'socket.io-client';
import {login} from 'actions';

const socketPath = '/api';

const socketAction = ({type, payload: name}, socket) => ({
  type,
  payload: {name, socket}
});

const clear = action => {
  if ('meta' in action) {
    if ('meta' in action && 'socket' in action.meta) {
      if (Object.keys(action.meta).length == 1) delete action.meta;
      else delete action.meta.socket;
    }
  }
  return action;
};

export default ({dispatch, getState}) => next => action => {
  console.log(action);
  const {type, meta, payload} = action;
  if (type == connectSocket) {
    console.log(`connecting socket /${payload}`);
    const socket = io(`/${payload}`, {path: socketPath});
    socket.on('connect', () => {
      console.log('connected');
      socket.on('action', action => {
        console.log('Receiving action from server', action);
        dispatch(clear(action));
      });
      if (meta && meta.requireAuth) {
        console.log('requireAuth');
        const token = getState().authorization.accessToken;
        socket
          .emit('authenticate', {token})
          .on('authenticated', () => {
            console.log('authenticated');
            next(socketAction(action, socket));
          })
          .on('unauthorized', (...args) => {
            console.log(args);
            console.log('unauthorized');
            dispatch(clear(login(new Error('Unauthorized'))));
          });
      } else {
        console.log(action);
        next(socketAction(action, socket));
      }
    });
  } else if (type == disconnectSocket) {
    console.log('disconnecting socket');
    const {sockets} = getState();
    if (payload) {
      const socket = sockets[payload];
      if (socket) socket.disconnect();
    } else {
      Object.keys(sockets).forEach(e => { sockets[e].disconnect() });
    }
    next(action);
  } else if (meta && meta.socket) {
    console.log('want send to socket', meta.socket);
    const socket = getState().sockets[meta.socket];
    if (socket) {
      console.log(`socket found, emmiting ${type} with data: `, payload);
      socket.emit(type, payload);
    } else {
      console.log('socket not found');
      next({
        type,
        error: true,
        payload: new Error('Socket not connected'),
        meta: action
      });
    }
  } else {
    next(action);
  }
};
