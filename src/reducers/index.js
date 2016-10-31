import {combineReducers} from 'redux';
import socket from './socket';
import token from './token';
import user from './user';
import chat from './chat';
import teachers from './teachers';
import rooms from './rooms';
import upload from './upload';

export default combineReducers({
  socket,
  token,
  user,
  chat,
  teachers,
  rooms,
  upload,
});
