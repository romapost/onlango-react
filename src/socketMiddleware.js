import {connectSocket, disconnectSocket} from 'actions';

export default ({dispatch, getState}) => next => action => {
  console.log(action);
  if (action.type == connectSocket) {
    const {socket} = action.payload;
    console.log('connecting socket');
    if (action.meta && action.meta.requireAuth) {
      console.log('requireAuth', action.meta);
      const token = getState().authorization.accessToken;
      socket
        .emit('authenticate', {token})
        .on('authenticated', () => {
          console.log('authenticated');
          socket.on('action', data => { dispatch(data) });
          next(action);
        })
        .on('unauthorized', msg => {
          console.log('unauthorized');
          dispatch({
            type: 'UNAUTHORIZED',
            error: true,
            payload: new Error(msg),
            meta: {...action.payload}
          });
        });
    } else {
      socket.on('action', data => {
        console.log('Receiving action from server', data);
        if ('meta' in data && 'socket' in data.meta) {
          if (Object.keys(data.meta).length == 1) delete data.meta;
          else delete data.meta.socket;
        }
        dispatch(data);
      });
      next(action);
    }
  } else if (action.type == disconnectSocket) {
    console.log('disconnecting socket');
    const socket = getState().sockets[action.payload];
    if (socket) socket.disconnect();
    next(action);
  } else if (action.meta && action.meta.socket) {
    console.log('want send to socket', action.meta.socket);
    const socket = getState().sockets[action.meta.socket];
    if (socket) {
      console.log('socket found, sending', ...action.payload);
      socket.emit(...action.payload);
      // next(action);
    } else {
      console.log('socket not found');
      const {type, payload, meta} = action;
      next({
        type,
        error: true,
        payload: new Error('Socket not connected'),
        meta: {...meta, data: payload}
      });
    }
  } else {
    next(action);
  }
};
