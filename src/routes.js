//import React from 'react';

import App from './containers/app.jsx';
import Entrance from './containers/entrance.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Dashboard from './containers/dashboard.jsx';
import Welcome from './components/welcome.jsx';
import ProfileView from './components/profileView.jsx';
import ProfileEdit from './components/profileEdit.jsx';
import NotFound from './components/404.jsx';

const connectRequireAuth = store => store
  ? (nextState, replace) => {
      console.log(nextState);
      const state = store.getState();
      if (!state.user || !state.user.accessToken) replace('/login');
    }
  : () => {};

export default store => {
  const requireAuth = connectRequireAuth(store);
  return [
    {
      path: '/',
      component: App,
      indexRoute: {component: Dashboard},
      childRoutes: [
        {path: 'login', component: Entrance, indexRoute: {component: Login}},
        {component: Entrance, childRoutes: [{path: 'register', component: Register}]},
        {
          component: Dashboard,
          onEnter: requireAuth,
          indexRoute: Welcome,
          childRoutes: [
            {path: 'profile', component: ProfileView},
            {path: 'profile/edit', component: ProfileEdit}
          ]
        }
      ],
    },
    {
      path: '*',
      statusCode: 404,
      component: NotFound
    }
  ];
};
