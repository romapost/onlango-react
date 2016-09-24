export function createHandler(socket, handlers) {
  return async ({type, payload}, cb) => {
    if (type in handlers) {
      const args = [payload, socket];
      if (typeof fn == 'function') args.push(cb);
      let res;
      try {
        res = await handlers[type](...args);
      } catch(e) {
        res = e;
      }
      if (res instanceof Error) {
        socket.emit('dispatch', {type, error: true, payload: res.message});
        console.error(res.message);
        throw new Error('qwe')
      } else if (Array.isArray(res)) {
        res.forEach(action => {
          if ('type' in action) socket.emit('dispatch', action);
          else socket.emit('dispatch', {type, error: true, payload: 'Unknown type'});
        });
      } else if (typeof res == 'object') {
        if ('type' in res) socket.emit('dispatch', res);
        else socket.emit('dispath', {type, error: true, payload: 'Unknown type'});
      }

    } else {
      socket.emit('dispath', {type, error: true, payload: 'Unknown type'});
    }
  };
}
