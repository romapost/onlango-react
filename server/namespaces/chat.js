import {db} from '../db';
import socketioJwt from 'socketio-jwt';
import {publicKey} from '../../config/server';
import {newMessage, changeChatStatus, initChat} from '../../src/actions';

export default {
  connection: socketioJwt.authorize({secret: publicKey}),
  authenticated: {
    async [newMessage](data, socket) {
      const chat = db('chat');
      const {ops: [message = null] = []} = await chat.insert({
        userId: socket.decoded_token.id,
        text: data,
        time: Date.now()
      });
      const {_id: id, userId, text, time} = message;
      socket.nsp.emit('action', newMessage({id, userId, text, time}));
    },
    async [initChat](data, socket, ns) {
      const selfId = socket.decoded_token.id;

      const chat = db('chat');
      let cursor = chat.find({time: {$gt: data}}).sort({time: -1});
      if (!data) cursor.limit(10);
      const lastMessages = await cursor.toArray();
      lastMessages.reverse().forEach(e => {
        e.id = e._id;
        delete e._id;
      });

      const usersOnline = [];
      for (const id of Object.keys(ns.sockets)) {
        if (id != socket.id && 'decoded_token' in ns.sockets[id]) usersOnline.push(ns.sockets[id].decoded_token.id);
      }
      socket.broadcast.emit('action', changeChatStatus({id: selfId, status: 'online'}));

      return initChat({lastMessages, usersOnline});
    },
    async disconnect(data, socket, nsp) {
      nsp.emit('action', changeChatStatus({id: socket.decoded_token.id, status: 'offline'}));
    }
  }
};
