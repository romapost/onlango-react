import path from 'path';
import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import escapeHtml from 'escape-html';
import api from './api';
import config from '../config';

process.chdir(path.resolve(__dirname, '..'));

const app = express();

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});
logger.token('time', () => formatter.format(new Date()));
logger.format('log', function developmentFormatLine(tokens, req, res) {
  const status = res._header ? res.statusCode : undefined;
  const color = status >= 500 ? 31 // red
    : status >= 400 ? 33 // yellow
    : status >= 300 ? 36 // cyan
    : status >= 200 ? 32 // green
    : 0; // no color
  let fn = developmentFormatLine[color];
  if (!fn) fn = developmentFormatLine[color] = logger.compile(
    `\x1b[0m:time ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} \x1b[${color}m:status \x1b[0m:method :url :response-time ms - :res[content-length]\x1b[0m`
  );
  return fn(tokens, req, res);
});

app.use(logger('log'));
app.use(compression());
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
    console.error(err);
    res.status(err.status || 500);
    const e = err.stack.split(/\s*\n\s*/).map(escapeHtml);
    res.send(`<pre>\n <h3>  ${e.shift()}</h3>    ${e.join('\n    ')}</pre>`);
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send(`<b>Server error</b>: ${err.name} <i>${err.message}</i>`);
});

app.listen(config.port);
console.log(`Server started @http://localhost:${config.port}`);
