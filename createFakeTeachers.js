import {connect, disconnect, db} from './server/helpers/db';
import {languages} from './config/common';
import fs from 'fs';
import path from 'path';

const pics = fs.readdirSync(path.resolve(__dirname, 'public/userpics'));

function random(n = 1) {
  return Math.floor(Math.random() * n);
}

function createLanguages() {
  const res = languages.filter(e => Math.random() > 0.7);
  if (!res.length) res.push(languages[random(languages.length)]);
  return res;
}

function createTeacher({
  name = `Name${random(20)}`,
  experience = random(10),
  country = `Country${random(10)}`,
  image = 'userpic.jpg',
  languages = createLanguages(),
  aboutSelf = 'text about self'
} = {}) {
  return {
    email: `${random(Date.now())}@${Date.now()}`,
    name,
    image,
    country,
    teacherForm: {experience, languages, aboutSelf},
    status: ['teacher']
  };
}

async function proceed() {
  await connect();
  const users = db('users');
  const stack = [];
  for (let i = 0; i < 10; i++) {
    const image = `/userpics/${pics[random(pics.length)]}`;
    stack.push(users.insert(createTeacher({image})));
  }
  return Promise.all(stack);
}

proceed()
  .then(res => { res.forEach(({ops: [e]}) => { console.log(e) }) })
  .catch(err => { console.error(1, err) })
  .then(() => { disconnect() });
