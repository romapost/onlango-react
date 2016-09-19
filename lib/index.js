import Server from 'socket.io';
import {connect, createHandler} from 'helpers';
import handlers from 'commonHandlers';

Error.prototype.toJSON = function() { return this.message };

(async () => {
  try {
    await connect();
    const io = new Server(3000, {serveClient: false, path: '/api'});
    io.origins('*:*');
    io.on('connection', socket => {
      socket.on('dispatch', createHandler(socket, handlers));

      socket.on('error', function(err) {
        console.error(err);
      });
    });
    console.log('Server started');
  } catch (e) {
    console.error(e);
  }
})();
