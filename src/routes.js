import React from 'react';

import Login from './jsx/login.jsx';
import Register from './jsx/register.jsx';
import Dashboard from './jsx/dashboard.jsx';
import NotFound from './jsx/404.jsx';

const requireAuth = (nextState, replace) => {
  if (typeof localStorage == 'undefined' || !localStorage.getItem('accessToken')) replace('login');
};

export default [{
  path: '/',
  onEnter() { console.log('enter to /') },
  indexRoute: {
    component: Dashboard,
    onEnter(nextState, replace) { console.log('enter to index'); requireAuth(nextState, replace) }
  },
  childRoutes: [
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'dashboard', component: Dashboard}
  ]
},{
  path: '*',
  statusCode: 404,
  component: NotFound
}];
