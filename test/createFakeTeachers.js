require('babel-register');
const mongoose = require('mongoose');
const config = require('../config');
const Account = require('../lib/api/models/account');

mongoose.Promise = global.Promise;

const langs = ['English', 'German', 'Italian', 'Spanish', 'French'];
const images = []; // имена файлов изображений в public/uploads/userpic

function random(n = 1) {
  return Math.floor(Math.random() * n);
}

function addTeacher({
  name = `Name${random(20)}`,
  experience = random(10),
  country = `Country${random(10)}`,
  image = 'userpic.jpg',
  languages = [langs[random(langs.length)]],
  aboutSelf = 'text about self'
} = {}) {
  return new Promise((resolve, reject) => {
    new Account({
      email: `${Date.now()}@${random(Date.now())}`,
      name,
      image,
      teacherForm: {experience, languages, aboutSelf},
      userinfo: {country},
      status: ['teacher']
    }).save((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

mongoose.connect(config.default.mongoURL);

const stack = [];

for (let i = 0; i < 10; i++) {
  const data = {};
  if (images[i]) data.image = `public/uploads/userpic${images[i]}`;
  stack.push(addTeacher());
}

Promise
  .all(stack)
  .catch((err) => { console.log(err) })
  .then(() => { mongoose.disconnect() });
