import dbConnection from '../db';
import socketioJwt from 'socketio-jwt';
import {publicKey} from '../../config/keys';
import {receiveNewChatMessage, changeChatStatus} from '../../src/actions';

export default {
  connection: socketioJwt.authorize({secret: publicKey}),
  authenticated: {
    async newMessage(data, socket) {
      const chat = dbConnection.db.collection('chat');
      const {ops: [message = null] = []} = await chat.insert({
        userId: socket.decoded_token.id,
        text: data,
        time: Date.now()
      });
      const {_id: id, userId, text, time} = message;
      socket.nsp.emit('action', receiveNewChatMessage({id, userId, text, time}));
    },
    async initChat(data, socket, ns) {
      console.log('receive initChat');
      console.log(ns.sockets);
      const selfId = socket.decoded_token.id;
      const chat = dbConnection.db.collection('chat');
      const lastMessages = await chat
        .find()
        .sort({time: -1})
        .limit(10)
        .toArray();
      lastMessages.reverse().forEach(e => {
        e.id = e._id;
        delete e._id;
      });
      const usersOnline = [];
      for (const id of Object.keys(ns.sockets)) {
        if ('decoded_token' in ns.sockets[id]) usersOnline.push(ns.sockets[id].decoded_token.id);
      }
      const selfIndex = usersOnline.indexOf(selfId);
      if (selfIndex) usersOnline.splice(selfIndex, 1);
      console.log({lastMessages, usersOnline});
      socket.broadcast.emit('action', changeChatStatus({id: selfId, status: 'online'}));
      return {
        type: 'RECEIVE_INIT_CHAT',
        payload: {lastMessages, usersOnline}
      };
    },
    async disconnect(data, socket, nsp) {
      console.log(socket.decoded_token.id, 'disconnect');
      nsp.emit('action', changeChatStatus({id: socket.decoded_token.id, status: 'offline'}));
    }
  }
};
