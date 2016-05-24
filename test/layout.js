import test from 'tape';
import spec from 'tap-spec';

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';

import Layout from '../lib/layout.jsx';
import Login from '../src/jsx/login.jsx';
import Register from '../src/jsx/register.jsx';
import Dashboard from '../src/jsx/dashboard.jsx';
import P404 from '../src/jsx/404.jsx';

test
  .createStream()
  .pipe(spec())
  .pipe(process.stdout);

test('login.jsx', t => {
  t.doesNotThrow(() => renderToStaticMarkup(<Layout html={renderToString(<Login />)} />));
  t.end();
});
test('register.jsx', t => {
  t.doesNotThrow(() => renderToStaticMarkup(<Layout html={renderToString(<Register />)} />));
  t.end();
});
test('dashboard.jsx', t => {
  t.doesNotThrow(() => renderToStaticMarkup(<Layout html={renderToString(<Dashboard />)} />));
  t.end();
});
test('404.jsx', t => {
  t.doesNotThrow(() => renderToStaticMarkup(<Layout html={renderToString(<P404 />)} />));
  t.end();
});
