import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from 'reducers';
import routes from 'routes';
import socketMiddleware from './socketMiddleware';

import 'main.scss';

const store = createStore(reducer, compose(
  applyMiddleware(socketMiddleware),
  window.devToolsExtension && window.devToolsExtension()
));

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}><Router routes={routes} history={browserHistory} /></Provider>,
    document.querySelector('#root')
  );
});
