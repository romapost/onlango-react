import {login, logout, getUserInfo} from 'actions';
import {db, updateOne, createHash, getOAuthUser, verifyHash, genToken, createHandler, userInfo} from 'helpers';
import handlers from 'authorizedHandlers';
import uploadsDir from 'config';

async function authorize(socket, user, token = genToken()) {
  if (user) {
    if (!user.tokens) user.tokens = [];
    if (user.tokens.indexOf(token) == -1) user.tokens.push(token);
    if (user.tokens.length > 10) user.tokens = user.tokens.slice(-10);
    user = await updateOne('users', {email: user.email}, {$set: user}, {upsert: true});
    socket.userId = user._id;
    if (!socket.authorizedHandler) {
      socket.authorizedHandler = createHandler(socket, handlers);
      socket.disconnectHandler = () => { socket.authorizedHandler({type: 'disconnect'}) };
      socket.on('dispatch', socket.authorizedHandler);
      socket.on('disconnect', socket.disconnectHandler);
      handleFileUploaad(socket);
    }
    return [login(token), getUserInfo(userInfo(user, true))];
  } else {
    socket.userId = undefined;
    if (socket.authorizedHandler) {
      socket.removeListener('dispatch', socket.authorizedHandler);
      socket.removeListener('disconnect', socket.disconnectHandler);
      socket.authorizedHandler = undefined;
    }
    return logout();
  }
}

export default {
  async [login](
    {email, password, register, token, access_token, state},
    socket
  ) {
    let user;
    if (email && password) {
      const dbUser = await db('users').findOne({email});
      if (dbUser && await verifyHash(dbUser.hash.buffer, password)) {
        user = dbUser;
      } else if (!dbUser && register) {
        user = {email, hash: await createHash(password)};
      }
    } else if (token) {
      user = await db('users').findOne({tokens: token});
    } else if (access_token) {
      const OAuthUser = await getOAuthUser(access_token, state);
      user = await db('users').findOne({email: OAuthUser.email});
      if (!user) user = OAuthUser;
    }
    return await authorize(socket, user, token);
  }
};

function handleFileUploaad(socket) {
  const uploader = new SocketIOFileUpload();
  uploader.listen(socket);
  uploader.dir = uploadsDir;

}
