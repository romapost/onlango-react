import {db, findOneById, updateOneById} from '../db';
import socketioJwt from 'socketio-jwt';
import {publicKey} from 'config';
import {getUserInfo, submitUserInfo, uploadUserImage, submitTeacherForm, changePassword} from 'actions';
import {ObjectId} from 'mongodb';
import {createHash} from 'password';
import {processUserImage, userInfo, teacherInfo} from 'helpers';

const unknownUser = {
  name: 'Unknown',
  image: '/userpic.jpg'
};

export default {
  connection: socketioJwt.authorize({secret: publicKey}),
  authenticated: {
    async [getUserInfo](id, socket) {
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
