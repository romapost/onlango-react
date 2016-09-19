import {getUserInfo, submitUserInfo, uploadUserImage, submitTeacherForm, changePassword} from 'actions';
import {ObjectId} from 'mongodb';
import {db, updateOne, createHash, processUserImage, userInfo, teacherFormInfo} from 'helpers';

export default {
  async [getUserInfo](id, socket) {
    const self = !id || id == socket.userId;
    const _id = self ? socket.userId : ObjectId(id);
    const user = await db('users').findOne({_id});
    if (!user) return getUserInfo(new Error('user not found'));
    if (!('name' in user) && 'email' in user) user.name = user.email.replace(/@.*/, '');
    const info = userInfo(user, self);
    console.log('got info', info)
    console.log('self', !id)
    if (self) info.self = true;
    return getUserInfo(info);
  },
  async [submitUserInfo](data, socket) {
    const {userId: _id} = socket;
    const info = userInfo(data, true);
    const user = updateOne('users', {_id}, {$set: info});
    user.self = true;
    return submitUserInfo(userInfo(user, true));
  },
  async [submitTeacherForm](data, socket) {
    const {userId: _id} = socket;
    let res;
    if (data) {
      res = teacherFormInfo(data, false);
      res = await updateOne('users', {_id}, {$set: res});
    } else {
      res = await db('users').findOne({_id});
    }
    res = teacherFormInfo(res, true);
    return submitTeacherForm(res);
  },
  async [uploadUserImage](data, socket) {
    const {userId: _id} = socket;
    const {value: {image}} = await updateOne('users', {_id}, {$set: {image: await processUserImage(data)}});
    return getUserInfo({self: true, image});
  },
  async [changePassword](password, socket) {
    const {userId: _id} = socket;
    const hash = await createHash(password);
    await updateOne('users', {_id}, {$set: {hash}});
  }
};
