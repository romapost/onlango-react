import {handleActions} from 'redux-actions';
import {getRoom, addRoom, editRoom, removeRoom} from 'actions';

export default handleActions({
  [getRoom]: (state, {payload}) => Array.isArray(payload) ? payload : state,
  [addRoom]: (state, {payload}) => [...state.filter(e => e.id !== payload.id), payload],
  [editRoom]: (state, {payload}) => [...state.filter(e => e.id !== payload.id), payload],
  [removeRoom]: (state, {payload}) => state.filter(e => e.id !== payload),
}, []);
