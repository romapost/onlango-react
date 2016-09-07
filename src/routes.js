import App from 'app';
import MainPage from 'mainPage';
import NotFound from 'notFound';
import Dashboard, {Profile, ProfileEdit, Schedule, Chat} from 'dashboard';
import Entrance, {Login, Register} from 'entrance';
import TeachersList from 'teachersList';
import TeacherInfo from 'teacherInfo';

export default [
  {
    path: '/',
    component: App,
    indexRoute: {component: MainPage},
    childRoutes: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        component: Dashboard,
        childRoutes: [
          {path: 'profile', component: Profile},
          {path: 'profile/edit', component: ProfileEdit},
          {path: 'schedule', component: Schedule},
          {path: 'payment', component: NotFound},
          {path: 'archive', component: NotFound},
          {path: 'tests', component: NotFound},
          {path: 'help', component: NotFound},
          {path: 'chat', component: Chat},
        ]
      },
      {
        component: MainPage,
        childRoutes: [
          {path: 'login', component: Entrance, indexRoute: {component: Login}},
          {path: 'teacherslist', component: TeachersList, blocksOnPage: 12},
          {path: 'teacherinfo/:id', component: TeacherInfo},
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
