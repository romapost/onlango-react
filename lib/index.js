import {connect} from 'db';
import Server from 'socket.io';
import namespaces from 'namespaces';

Error.prototype.toJSON = function() { return this.message };

(async () => {
  try {
    await connect();
    const io = new Server(3000, {serveClient: false, path: '/api'});
    io.origins('*:*');
    setNamespaces(io, namespaces);
    console.log('Server started');
  } catch (e) {
    console.error(e);
  }
})();

function setNamespaces(io, namespaces) {
  for (const name of Object.keys(namespaces)) {
    try {
      setNamespaceHandlers(io.of(name), namespaces[name], name);
    } catch (e) {
      console.error(`Setting namespace ${name}:`, e);
    }
  }
}

function setNamespaceHandlers(ns, handlers, name) {
  for (const event of Object.keys(handlers)) {
    try {
      let handler = handlers[event];
      if (typeof handler == 'function') {
        ns.on(event, handler);
      } else {
        ns.on(event, setSocketHandlers(handler, ns));
      }
    } catch (e) {
      console.error(`Setting namespace ${name} event ${event}:`, e);
    }
  }
}

function setSocketHandlers(handler, ns) {
  return function(socket) {
    for (const event of Object.keys(handler)) {
      socket.on(event, async (data, fn) => {
        let res;
        try {
          res = await handler[event](data, socket, ns);
          if (typeof fn == 'function') fn(null, res);
        } catch(e) {
          res = e;
          if (typeof fn == 'function') fn(e.toString());
        } finally {
          if (typeof res == 'object') {
            if (Array.isArray(res)) res.forEach(e => { dispatch(socket, e) });
            else dispatch(socket, res);
          }
        }
      });
    }
  };
}

function dispatch(socket, action) {
  // console.log(1, action)
  if ('type' in action) socket.emit('action', action);
}
