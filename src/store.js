import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const state = {
  user: {
    userinfo: JSON.parse(localStorage.getItem('userinfo')),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
};

export default createStore(
  reducer,
  state,
  compose(
    applyMiddleware(thunk),
    typeof window != 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
