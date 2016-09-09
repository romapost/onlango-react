import {db, findOneById, updateOneById} from '../db';
import socketioJwt from 'socketio-jwt';
import {publicKey, publicPath} from '../../config/server';
import {getUserInfo, submitUserInfo, uploadUserImage, submitTeacherForm, changePassword} from '../../src/actions';
import {ObjectId} from 'mongodb';
import lwip from 'lwip';
import fse from 'fs-extra';
import crypto from 'crypto';
import {createHash} from '../password';

const unknownUser = {
  name: 'Unknown',
  image: '/userpic.jpg'
};

export default {
  connection: socketioJwt.authorize({secret: publicKey}),
  authenticated: {
    async [getUserInfo](id, socket) {
      console.log('receive getUserInfo request')
      const self = !id;
      const _id = ObjectId(self ? socket.decoded_token.id : id);
      const users = db('users');
      const user = await users.findOne({_id});
      if (!user) return getUserInfo(Object.assign({id: _id}, unknownUser));

      if (!('name' in user) && 'email' in user) user.name = user.email.replace(/@.*/, '');
      if (!id || id == socket.decoded_token.id) user.self = true;
      const info = userInfo(user, self);
      if (self) info.self = true;
      return getUserInfo(info);
    },
    async [submitUserInfo](data, socket) {
      console.log(`receive ${submitUserInfo} ${data}`)
      const _id = ObjectId(socket.decoded_token.id);
      const info = userInfo(data, true);
      const user = await db('users').findAndModify(
        {_id},
        [['_id', 1]],
        {$set: info},
        {new: true}
      );
      user.self = true;
      return submitUserInfo(userInfo(user));
    },
    async [submitTeacherForm](data, socket) {
      const {id} = socket.decoded_token;
      let res;
      if (data) {
        res = teacherInfo(data, false);
        res = (await updateOneById('users', id, res)).value;
      } else {
        res = await findOneById('users', id);
      }
      res = teacherInfo(res, true);
      return submitTeacherForm(res);
    },
    async [uploadUserImage](data, socket) {
      const {value: {image}} = await db('users').findAndModify(
        {_id: ObjectId(socket.decoded_token.id)},
        [['_id', 1]],
        {$set: {image: await processUserImage(data)}},
        {new: true}
      );
      return getUserInfo({self: true, image});
    },
    async [changePassword](password, socket) {
      await db('users').findAndModify(
        {_id: ObjectId(socket.decoded_token.id)},
        [['_id', 1]],
        {$set: {hash: await createHash(password)}}
      );
    }
  }
};

const processUserImage = ({file, type}) => new Promise((resolve, reject) => {
  lwip.open(file, type.replace(/^.+\//, ''), (err, image) => {
    if (err) reject(err);
    const size = Math.min(image.width(), image.height());
    image
      .batch()
      .crop(size, size)
      .resize(128, 128)
      .toBuffer('jpg', (err, buf) => {
        if (err) reject(err);
        const url = `/userpics/${crypto
          .createHash('sha1')
          .update(buf)
          .digest('hex')}`;
        const path = `${publicPath}/${url}`;
        fse.stat(path, (err, stats) => {
          if (!stats) fse.outputFile(path, buf, err => {
            if (err) reject(err);
            else resolve(url);
          });
          else resolve(url);
        });
      });
  });
});

function userInfo(user, self) {
  const info = {id: user._id};
  const fields = (self ?
    'image,name,surname,country,city,email,phone,gender,interests,day,month,year' :
    'image,name,gender').split(',');
  for (const key of fields) {
    const value = user[key];
    if (typeof value !== 'undefined') info[key] = value;
  }
  return info;
}

function teacherInfo(data, flat) {
  const {city, country} = data;
  const {
    languages, schedule, experience, experienceOnline, hoursCanTeach,
    aboutSelf, street, street2, zipcode, state, phone, skype, resumeFile
  } = 'teacherForm' in data ? data.teacherForm : data;

  const teacherForm = clearUndefinedProps({
    languages, schedule, experience, experienceOnline, hoursCanTeach,
    aboutSelf, street, street2, zipcode, state, phone, skype, resumeFile
  });

  const res = clearUndefinedProps({city, country});
  if (flat) {
    delete res.resumeFile;
    return {...res, ...teacherForm};
  } else {
    return {...res, teacherForm};
  }
}

function clearUndefinedProps(obj) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (typeof obj[key] == 'undefined') delete obj[key];
  }
  return obj;
}
