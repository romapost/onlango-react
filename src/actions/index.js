import {createAction} from 'redux-actions';
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../constants';
import {REGISTER, REGISTER_SUCCESS, REGISTER_FAIL} from '../constants';
import request from 'superagent';

const entranceRequest = (url, START, FAIL, SUCCESS) => {
  const start = createAction(START);
  const fail = createAction(FAIL);
  const success = createAction(SUCCESS);

  return (email, password) => dispatch => {
    dispatch(start());
    request
      .post(url)
      .send({email, password})
      .end((err, res) => {
        if (err) {
          console.log(FAIL, 'Got error', err);
          dispatch(fail(err));
        } else {
          console.log(SUCCESS, 'Got user', res);
          dispatch(success(res.body));
        }
      });
  };
};
export const login = entranceRequest('/api/login', LOGIN, LOGIN_FAIL, LOGIN_SUCCESS);
export const register = entranceRequest('/api/register', REGISTER, REGISTER_FAIL, REGISTER_SUCCESS);
export const logout = () => dispatch => { dispatch(createAction(LOGOUT)()) };
