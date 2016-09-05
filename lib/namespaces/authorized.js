import dbConnection from '../db';
import socketioJwt from 'socketio-jwt';
import {publicKey} from '../../config/keys';
import {receiveUserInfo} from '../../src/actions';
import {ObjectId} from 'mongodb';
import lwip from 'lwip';
import fse from 'fs-extra';
import crypto from 'crypto';

const db = collection => dbConnection.db.collection(collection);

const unknownUser = {
  name: 'Unknown',
  image: '/userpic.jpg'
};

export default {
  connection: socketioJwt.authorize({secret: publicKey}),
  authenticated: {
    async getUserInfo(data, socket) {
      console.log('receive getUserInfo request');
      const _id = ObjectId(data || socket.decoded_token.id);
      const users = db('users');
      const user = await users.findOne({_id});
      if (!user) return receiveUserInfo(Object.assign({id: _id}, unknownUser));

      const {_id: id, name, image, email} = user;
      const userInfo = {id, name, image};
      if (!name && email) userInfo.name = email.replace(/@.*/, '');
      if (!data || data == socket.decoded_token.id) userInfo.self = true;
      return receiveUserInfo(userInfo);
    },
    async editUserInfo(data, socket) {
      console.log('receive editUserInfo', data);
      const _id = ObjectId(data || socket.decoded_token.id);
      const users = db('users');

    },
    async uploadUserImage(data, socket) {
      console.log('receive uploadUserImage', data);
      const {value: {_id: id, name, email, image}} = await db('users').findAndModify(
        {_id: ObjectId(socket.decoded_token.id)},
        [['_id', 1]],
        {$set: {image: await processUserImage(data)}},
        {new: true}
      );
      return receiveUserInfo({id, name, email, image, self: true});
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
        const path = `/userpics/${crypto
          .createHash('sha1')
          .update(buf)
          .digest('hex')}`;
        fse.stat(`public${path}`, (err, stats) => {
          if (!stats) fse.outputFile(path, buf, err => {
            if (err) reject(err);
            else resolve(path);
          });
          else resolve(path);
        });
      });
  });
});
