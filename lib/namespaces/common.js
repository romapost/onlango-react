import {db} from 'db';
import {ObjectId} from 'mongodb';
import {login, getUserInfo, getTeachersList, getTeacherInfo} from 'actions';
import crypto from 'crypto';
import {createHash, verifyHash, createToken} from 'password';
import {userInfo} from 'helpers';

export default {
  connection: {
    async [login]({email, password, register}) {
      if (!email || !password) throw new Error('email and password must be present');
      const users = db('users');
      const user = await users.findOne({email});
      if (register && user) {
        return login(new Error('user already exists'));
      } else if (!register && user) {
        if (await verifyHash(user.hash.buffer, password)) {
          return [login({accessToken: await createToken(user)}), getUserInfo(userInfo(user, true))];
        } else {
          return login(new Error('password not match'));
        }
      } else if (register && !user) {
        const hash = await createHash(password);
        const name = email.replace(/@.*/, '');
        const image = `http://www.gravatar.com/avatar/${crypto.createHash('md5').update(email.trim().toLocaleLowerCase()).digest('hex')}`;
        const {ops: [user = null] = []} = await users.insert({email, hash, image, name});
        return [login({accessToken: await createToken(user)}), getUserInfo(userInfo(user, true))];
      } else {
        return login(new Error('user not found'));
      }
    },
    async [getTeachersList]() {
      const found = await db('users').find({status: 'teacher'}).toArray();
      const payload = found.map(
        ({
          _id: id, name, image, country, teacherForm: {experience,  languages}
        }) => ({
          id, image, name, experience, country, languages
        })
      );
      return getTeachersList(payload);
    },
    async [getTeacherInfo](id) {
      const found = await db('users').findOne({_id: ObjectId(id)});
      if (found) {
        const {_id: id, teacherForm: {experience, languages, interests, aboutSelf}, name, country, image} = found;
        return getTeacherInfo({id, experience, languages, interests, aboutSelf, name, country, image});
      }
    }
  }
};
