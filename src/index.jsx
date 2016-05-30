import React from 'react';
import {render} from 'react-dom';
import {Provider } from 'react-redux';
import {Router, browserHistory} from 'react-router';

import store from './store';
import routes from './routes';

render(
  <Provider store={store}><Router routes={routes(store)} history={browserHistory} /></Provider>,
  document.querySelector('#app')
);
