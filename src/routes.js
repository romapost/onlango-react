import App from 'jsx/app';
import MainPage from 'jsx/mainPage';
import NotFound from 'jsx/notFound';
import Dashboard, {Profile, ProfileEdit, Schedule, ClassRoom} from 'jsx/dashboard';
import Entrance, {Login, Register} from 'jsx/entrance';
import TeachersList from 'jsx/teachersList';
import TeacherInfo from 'jsx/teacherInfo';
import Admin, {Rooms} from 'jsx/admin';

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
          {path: 'class/:id', component: ClassRoom},
        ]
      },
      {
        path: 'admin',
        component: Admin,
        indexRoute: {component: Rooms},
        childRoutes: [
          {path: 'rooms', component: Rooms},
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
