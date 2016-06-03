import {createAction} from 'redux-actions';
import {LOGIN, REGISTER, LOGOUT, UPLOAD_IMAGE, UPLOAD_USERINFO} from '../constants';
import {GET_USERINFO} from '../constants';
import request from 'superagent';

const entranceRequest = (url, type) => {
  const action = createAction(type);

  return (email, password) => dispatch => {
    request
      .post(url)
      .send({email, password})
      .end((err, res) => {
        if (err) dispatch(action(err));
        else dispatch(action(res.body));
      });
  };
};
export const login = entranceRequest('/api/login', LOGIN);
export const register = entranceRequest('/api/register', REGISTER);
export const logout = () => dispatch => { dispatch(createAction(LOGOUT)()) };

export const uploadImage = (file, token) => dispatch => {
  const action = createAction(UPLOAD_IMAGE);
  request
    .post('/api/setuserpic')
    .set('Authorization', `Bearer ${token}`)
    .attach('image', file)
    .end((err, res) => {
      if (err) dispatch(action(err));
      else dispatch(action(res.headers.location));
    });
};
export const uploadUserinfo = (data, token) => dispatch => {
  const action = createAction(UPLOAD_USERINFO);
  request
    .post('/api/userinfo')
    .set('Authorization', `Bearer ${token}`)
    .send(data)
    .end((err, res) => {
      if (err) dispatch(action(err));
      else dispatch(action(res.body));
    });
};
export const getUserinfo = (token) => dispatch => {
  const action = createAction(GET_USERINFO);
  request
    .get('/api/userinfo')
    .set('Authorization', `Bearer ${token}`)
    .end((err, res) => {
      if (err) dispatch(action(err));
      else dispatch(action(res.body));
    });
};
