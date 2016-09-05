import {combineReducers} from 'redux';
import sockets from './sockets';
import authorization from './authorization';
import user from './user';
import chat from './chat';
import teachers from './teachers';

export default combineReducers({
  sockets,
  authorization,
  user,
  chat,
  teachers
});
