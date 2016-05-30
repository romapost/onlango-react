import path from 'path';
import express from 'express';
import logger from 'morgan';
import escapeHtml from 'escape-html';
import api from './api';
import config from './config';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import Layout from './layout.jsx';
import P404 from '../src/components/404.jsx';
import routes from '../src/routes.js';

const app = express();
const routesList = routes();

const render = component => '<!doctype html>' + renderToStaticMarkup(
  <Layout html={renderToString(component)} />
);

process.chdir(path.resolve(__dirname, '..'));

app.use(logger('dev'));
app.use('/api', api);
app.use(express.static(`public/build`));
app.use(express.static(`public/assets`));
app.use(express.static(`public/uploads`));

app.use((req, res) => {
  match({routes: routesList, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) res.status(500).send(error.message);
    else if (redirectLocation) res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    else if (renderProps) {
      const {routes: [{statusCode = 200}]} = renderProps;
      res.status(statusCode).send(render(<RouterContext {...renderProps} />));
    } else res.status(404).send(render(<P404 />));
  });
});

if (config.dev) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const e = err.stack.split(/\s*\n\s*/).map(escapeHtml);
    res.send(`<pre>\n <h3>  ${e.shift()}</h3>    ${e.join('\n    ')}</pre>`);
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`<b>Server error</b>: ${err.name} <i>${err.message}</i>`);
});

app.listen(8080);
console.log('Server started @http://localhost:8080');
