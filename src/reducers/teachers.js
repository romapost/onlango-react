import {combineReducers} from 'redux';
import {handleAction, handleActions} from 'redux-actions';
import {getTeachersList, getTeacherInfo, filterTeachers, setTeachersListPage} from 'actions';

const list = handleActions({
  [getTeachersList]: (state, {payload}) => [...payload],
  [getTeacherInfo]: (state, {payload}) => state.filter(e => e.id == payload.id).concat(payload)
}, []);

const page = handleAction(setTeachersListPage, (state, {payload}) => payload, 1);

const filter = handleAction(filterTeachers, (state, {payload}) => {
  if (payload) {
    const {id, value} = payload;
    if (value) {
      return {...state, [id]: value};
    } else {
      delete state[id];
      return {...state};
    }
  } else if (payload === null) {
    return {};
  } else {
    return state;
  }
}, {});

export default combineReducers({
  list,
  page,
  filter,
});
