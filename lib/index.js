import path from 'path';
import express from 'express';
import logger from 'morgan';
import escapeHtml from 'escape-html';
import api from './api';
import config from '../config';

process.chdir(path.resolve(__dirname, '..'));

const app = express();

app.use(logger('dev'));
app.use('/api', api);
app.use(
  '/userpic',
  express.static(`public/uploads/userpic`),
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/assets/userpic.jpg'));
  }
);
app.use(
  express.static(path.resolve(__dirname, '../public/build')),
  express.static(path.resolve(__dirname, '..public/assets')),
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/assets/index.html'));
  }
);

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

app.listen(config.port);
console.log(`Server started @http://localhost:${config.port}`);
