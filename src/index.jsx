import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {AppContainer} from 'react-hot-loader';
import reducer from 'reducers';
import routes from 'routes';
import socketMiddleware from './socketMiddleware';

import 'main.scss';

const enhancers = [applyMiddleware(socketMiddleware)];
if (window.devToolsExtension) enhancers.push(window.devToolsExtension());

const store = createStore(reducer, compose(...enhancers));

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
      </Provider>
    </AppContainer>,
    document.querySelector('#root')
  );
});

if (module.hot) {
  module.hot.accept('./routes', () => {
    const routes = require('./routes').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <Router routes={routes} history={browserHistory} />
        </Provider>
      </AppContainer>,
      document.querySelector('#root')
    );
  });
}
