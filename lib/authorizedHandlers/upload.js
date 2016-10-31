import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {tmpDir, publicPath} from 'config';
import {uploadFile, uploadFileChunk, uploadFileComplete, newMessage} from 'actions';
import {ObjectId} from 'mongodb';
import {db} from 'helpers';
import mime from 'mime';

export default {
  async [uploadFile]({name, type, size}, socket, cb) {
    if (!socket.uploadingFile) {
      console.log(name, type, size)
      const stream = fs.createWriteStream(path.resolve(tmpDir, `${name}.${String(Date.now())}`));
      const hash = crypto.createHash('sha1');
      socket.uploadingFile = {name, type, size, stream, hash};
      cb(0);
      return uploadFileChunk(0);
    }
  },
  async [uploadFileChunk](data, socket, cb) {
    if (socket.uploadingFile) {
      const {stream, hash, size} = socket.uploadingFile;
      await new Promise(resolve => {
        hash.update(data);
        stream.write(data, resolve);
      });
      cb(stream.bytesWritten);
      return uploadFileChunk(stream.bytesWritten/size);
    }
  },
  async [uploadFileComplete](data, socket) {
    if (socket.uploadingFile) {
      const {stream, hash, name, type} = socket.uploadingFile;
      stream.end();
      const dir = publicPath;
      const base = path.format({
        dir: '/u',
        name: hash.digest('hex'),
        ext: '.' + (mime.extension(type) || name.replace(/^.*\.(.+)$/, '$1'))
      });
      fs.rename(stream.path, path.format({dir, base}), err => {
        if (err) console.log('mv error', err);
      });
      const body = /^image\//.test(type)
        ? `[url=${base}][img]${base}[/img][/url]`
        : `[url=${base}]${name}[/url]`;
      const {userId, roomId} = socket;
      const {ops: [{_id: id}]} = await db('messages').insert({userId, roomId, body});
      const timestamp = +ObjectId(id).getTimestamp();
      socket.server.to(roomId).emit('dispatch', newMessage({id, userId, body, timestamp}));
      socket.uploadingFile = null;
      return uploadFileComplete();
    }
  }
};
