//import React from 'react';

import Login from './containers/login.jsx';
import Register from './containers/register.jsx';
import Dashboard from './containers/dashboard.jsx';
import Welcome from './components/welcome.jsx';
import ProfileView from './components/profileView.jsx';
import ProfileEdit from './components/profileEdit.jsx';
import NotFound from './components/404.jsx';

const connectRequireAuth = store => store
  ? (nextState, replace) => {
      const state = store.getState();
      if (!state.user || !state.user.accessToken) replace('/login');
    }
  : () => {};

export default store => {
  const requireAuth = connectRequireAuth(store);
  return [
    {
      path: '/',
      component: Dashboard,
      onEnter: requireAuth,
      indexRoute: {component: Welcome},
      childRoutes: [
        {path: 'profile', component: ProfileView},
        {path: 'profile/edit', component: ProfileEdit}
      ]
    },
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {
      path: '*',
      statusCode: 404,
      component: NotFound
    }
  ];
};
