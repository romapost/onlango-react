import {ObjectId} from 'mongodb';
import {db, updateOne} from 'helpers';
import {newMessage, changeChatStatus, joinRoom, leaveRoom, setLastReceive} from 'actions';

export default {
  async [newMessage](body, socket) {
    const {userId, roomId} = socket;
    console.log(userId, roomId, body)
    const {ops: [{_id: id}]} = await db('messages').insert({userId, roomId, body});
    const timestamp = +ObjectId(id).getTimestamp();
    socket.server.to(roomId).emit('dispatch', newMessage({id, userId, body, timestamp}));
  },
  async [joinRoom](id, socket) {
    const room = await db('rooms').findOne({_id: ObjectId(id)});
    if (room) {
      const roomId = socket.roomId = room._id;
      const {userId} = socket;
      const lastMessageId = room.lastReceive[userId];
      const query = {roomId};
      if (lastMessageId) query._id = {$gt: lastMessageId};
      let messages = await db('messages')
        .find(query)
        .sort({_id: -1})
        .limit(20)
        .toArray();
      if (messages.length < 5) {
        messages = await db('messages')
        .find({roomId})
        .sort({_id: -1})
        .limit(10)
        .toArray();
      }
      const lastMessages = messages.reverse().map(({_id: id, userId, body}) => {
        const timestamp = +ObjectId(id).getTimestamp();
        return {id, timestamp, userId, body};
      });
      updateOne('rooms', {_id: ObjectId(roomId)}, {$addToSet: {usersOnline: userId}});
      socket.join(roomId);
      socket.to(roomId).emit('dispatch', changeChatStatus({id: userId, status: 'online'}));
      return joinRoom({
        lastMessages,
        usersOnline: (room.usersOnline || []).filter(e => e.toString() !== userId),
        lastReceive: lastMessageId ? +lastMessageId.getTimestamp() : null
      });
    }
  },
  async [leaveRoom](id, socket) {
    const {roomId, userId} = socket;
    updateOne('rooms', {_id: roomId}, {$pull: {usersOnline: userId}});
    socket.to(roomId).emit('dispatch', changeChatStatus({id: userId, status: 'offline'}));
    socket.leave(roomId);
    socket.roomId = undefined;
  },
  async [setLastReceive](id, socket) {
    const {roomId, userId} = socket;
    const lastMessageId = ObjectId(id);
    await updateOne('rooms', {_id: roomId}, {$set: {[`lastReceive.${userId}`]: lastMessageId}});
    return setLastReceive(+lastMessageId.getTimestamp());
  }
};
