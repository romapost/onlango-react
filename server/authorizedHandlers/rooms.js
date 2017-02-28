import {ObjectId} from 'mongodb';
import {db, updateOne} from 'helpers';
import {getRoom, addRoom, editRoom, removeRoom} from 'actions';

export default {
  async [getRoom](id) {
    if (!id) {
      const list = await db('rooms').find().toArray();
      return getRoom(list.map(e => {
        const {_id: id, ...rest} = e;
        return {id, createdAt: +ObjectId(id).getTimestamp(), ...rest};
      }));
    }
  },
  async [addRoom](data, socket, cb) {
    const {ops: [{_id: id}]} = await db('rooms').insert({lastReceive: {}, usersOnline: []});
    if (typeof cb == 'function') cb(id);
    return addRoom({id, createdAt: +ObjectId(id).getTimestamp()});
  },
  async [editRoom](data) {
    const {id, ...rest} = data;
    const _id = ObjectId(id);
    await updateOne('rooms', {_id}, {$set: rest});
    return editRoom({id, createdAt: +_id.getTimestamp(), ...rest});
  },
  async [removeRoom](id) {
    db('rooms').remove({_id: ObjectId(id)});
  }
};
