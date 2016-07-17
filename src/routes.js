import * as components from './components';

const {
  App,
  Dashboard,
  Welcome,
  MainPage,
  Schedule,
  TeachersList,
  NotFound,
  Entrance,
  Login,
  Register,
  Profile,
  ProfileEdit
} = components;

const connectRequireAuth = store => (nextState, replace) => {
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
          path: 'dashboard',
          component: Dashboard,
          onEnter: requireAuth,
          indexRoute: {component: Welcome}
        },
        {
          component: Dashboard,
          onEnter: requireAuth,
          childRoutes: [
            {path: 'profile', component: Profile},
            {path: 'profile/edit', component: ProfileEdit},
            {path: 'schedule', component: Schedule},
            {path: 'teacherslist', component: TeachersList},
            {path: 'payment', component: NotFound},
            {path: 'archive', component: NotFound},
            {path: 'tests', component: NotFound},
            {path: 'help', component: NotFound},
          ]
        },
        {
          component: MainPage,
          childRoutes: [
            {path: 'login', component: Entrance, indexRoute: {component: Login}},
            {
              component: Entrance,
              childRoutes: [{path: 'register', component: Register}]
            },
            {path: '/*', component: NotFound},
          ]
        }
      ],
    }
  ];
};
