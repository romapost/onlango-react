import {createAction} from 'redux-actions';
import {LOGIN, LOGOUT, UPLOAD_IMAGE, UPLOAD_USERINFO} from '../constants';
import {GET_USERINFO, REFRESH_TOKEN, CHANGE_PASSWORD} from '../constants';
import request from 'superagent';

export const logout = () => dispatch => { dispatch(createAction(LOGOUT)()) };

export const login = ({email, password, register}) => dispatch => {
  const action = createAction(LOGIN);
  const url = register ? '/api/register' : '/api/login';

  return request
    .post(url)
    .send({email, password})
    .end((err, res) => {
      console.log(err, res);
      if (err) dispatch(action(err));
      else dispatch(action(res.body));
    });
};

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
export const getUserinfo = token => dispatch => {
  const action = createAction(GET_USERINFO);
  request
    .get('/api/userinfo')
    .set('Authorization', `Bearer ${token}`)
    .end((err, res) => {
      if (err) dispatch(res.statusCode == 401 ? createAction(LOGOUT)() : action(err));
      else dispatch(action(res.body));
    });
};
export const tryRefreshToken = refreshToken => dispatch => {
  const action = createAction(REFRESH_TOKEN);
  request
    .get('/api/refresh')
    .query({refreshToken})
    .end((err, res) => {
      if (err) dispatch(res.statusCode == 401 ? createAction(LOGOUT)() : action(err));
      else dispatch(action(res.body));
    });
};
export const changePassword = (password, token) => dispatch => {
  request
    .post('/api/change_password')
    .set('Authorization', `Bearer ${token}`)
    .send({password})
    .end((err, res) => { dispatch(createAction(CHANGE_PASSWORD)(err ? err : res.body)) });
};
