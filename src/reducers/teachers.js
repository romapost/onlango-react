import {combineReducers} from 'redux';
import {handleAction} from 'redux-actions';
import {receiveTeachersList, receiveTeacherInfo, filterTeachers, setTeachersLispPage} from 'actions';

const list = handleAction(receiveTeachersList, state => state, []);

const info = handleAction(receiveTeacherInfo, state => state, {});

const page = handleAction(setTeachersLispPage, state => state, 1);

const filter = handleAction(filterTeachers, (state, {payload}) => {
  if (payload) return {...state, ...payload};
  else if (payload === null) return {};
  else return state;
}, {});

export default combineReducers({
  list,
  info,
  page,
  filter,
});
