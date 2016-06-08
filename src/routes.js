import App from './containers/app.jsx';
import Entrance from './containers/entrance.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Dashboard from './containers/dashboard.jsx';
import Welcome from './components/welcome.jsx';
import ProfileView from './components/profileView.jsx';
import ProfileEdit from './components/profileEdit.jsx';
import MainPage from './components/mainPage.jsx';
import NotFound from './components/404.jsx';

const connectRequireAuth = store => (nextState, replace) => {
  console.log('checkAuth', nextState);
  const state = store.getState();
  if (!state.user || !state.user.accessToken) replace('/login');
};

export default store => {
  const requireAuth = connectRequireAuth(store);
  return [
    {
      path: '/',
      component: App,
      indexRoute: {component: MainPage},
      childRoutes: [
        {
          path: 'login',
          component: Entrance,
          indexRoute: {component: Login}
        },
        {
          component: Entrance,
          childRoutes: [{path: 'register', component: Register}]
        },
        {
          path: 'dashboard',
          component: Dashboard,
          onEnter: requireAuth,
          indexRoute: {component: Welcome}
        },
        {
          component: MainPage,
          childRoutes: [
            {path: 'about', component: NotFound},
            {path: 'contact', component: NotFound},
            {path: 'privacy', component: NotFound}
          ]
        },
        {
          component: Dashboard,
          onEnter: requireAuth,
          childRoutes: [
            {path: 'profile', component: ProfileView},
            {path: 'profile/edit', component: ProfileEdit},
            {path: 'schedule', component: NotFound},
            {path: 'payment', component: NotFound},
            {path: 'archive', component: NotFound},
            {path: 'tests', component: NotFound},
            {path: 'help', component: NotFound},
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
