//import React from 'react';

import Login from './containers/login.jsx';
import Register from './containers/register.jsx';
import Dashboard from './containers/dashboard.jsx';
import Profile from './containers/profile.jsx';
import ProfileView from './components/profileView.jsx';
import ProfileEdit from './components/profileEdit.jsx';
import NotFound from './components/404.jsx';

const connectRequireAuth = store => (nextState, replace) => {
  console.log('checkAuth');
  if (store) {
    const state = store.getState();
    console.log(state);
    if (!state.user || !state.user.accessToken) replace('/login');
  }
};

export default store => {
  const requireAuth = connectRequireAuth(store);
  return [{
    path: '/',
    onEnter() { console.log('enter to /') },
    indexRoute: {component: Dashboard, onEnter: requireAuth},
    childRoutes: [
      {path: 'login', component: Login},
      {path: 'register', component: Register},
      {
        path: 'profile',
        component: Profile,
        onEnter: requireAuth,
        indexRoute: {component: ProfileView},
        childRoutes: [{path: 'edit', component: ProfileEdit}]
      },
    ]
  }, {
    path: '*',
    statusCode: 404,
    component: NotFound
  }];
};
