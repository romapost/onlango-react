import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from 'reducers';
import routes from 'routes';
import socketMiddleware from './socketMiddleware';

import 'main.scss';

const enhancers = [applyMiddleware(socketMiddleware)];
if (window.devToolsExtension) enhancers.push(window.devToolsExtension());

const store = createStore(reducer, compose(...enhancers));

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.querySelector('#root')
  );
});
