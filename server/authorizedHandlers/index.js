import {leaveRoom} from 'actions';
import chat from './chat';
import user from './user';
import rooms from './rooms';
import upload from './upload';

export default Object.assign(
  {
    async disconnect(data, socket) {
      chat[leaveRoom](data, socket);
    }
  },
  chat,
  user,
  rooms,
  upload,
);
