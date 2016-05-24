import crypto    from 'crypto';
import jwt       from 'jsonwebtoken';
import {Router}  from 'express';
import passport  from '../passport';
import Account   from '../models/account';
import config    from '../../config';

const router = new Router();

//const nodemailer = require('nodemailer');
//const transporter = nodemailer.createTransport(config.emailVerification.transport);

router.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});

router.post('/register',
  register,
  passport.authenticate('local', {session: false}),
  generateRefreshToken,
  generateAccessToken,
  respond
);

router.post('/login',
  passport.authenticate('local', {session: false}),
  generateRefreshToken,
  generateAccessToken,
  respond
);

/*
router.get('/confirmEmail', function(req, res) {
  var token = req.query.t;
  Account.findOne({ token: token }, function(err, account) {
    if (err) res.json({ error: 'Unknown error' });
    else if (!account) res.json({ error: 'Account not found' });
    else {
      req.login(account, function(err) {
        if (err) {
          res.status = 500;
        } else {
          account.token = undefined;
          account.expires = null;
          account.save();
        }
        return res.redirect('/');
      });
    }
  });
});
*/

router.use('/refresh', validateRefreshToken, generateAccessToken, (req, res) => {
  res.json({accessToken: req.accessToken});
});

router.use('/protected', function(req, res, next) {
  if (!req.user) res.status(401).end();
  else res.status(200).end();
});

/*
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/auth/google', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

*/
/*
function verify(req, res, next) {
  passport.authenticate('local', function(err, account, info) {
    if (err) {
      return next(err);
    } else if (!account) {
      return res.json({ error: 'Authentication error' });
    } else if (account.token) {
      res.json({ error: 'Need confirm email' });
    } else {
      req.login(account, function(err) {
        if (err) {
          return next(err);
        }
        res.locals.account = account;
        return res.render('header', res.locals);
      });
    }
  })(req, res, next);
}
*/

function register(req, res, next) {
  Account.register(new Account({
    email: req.body.email,
    image: 'http://www.gravatar.com/avatar/' + crypto.createHash('md5').update(req.body.email.trim().toLocaleLowerCase()).digest('hex'),
    name: req.body.email.replace(/@.*/, ''),
    token: crypto.randomBytes(32).toString('hex')
  }), req.body.password, function(err, account) {
    if (err) return res.status(500).json({error: 'Registration error'});
    var url = 'http://' + config.domain + '/account/confirmEmail?t=' + account.token;
    // TODO: email verification
    //transporter.sendMail({
    //from: 'noreply@onlango.com',
    //to: account.email,
    //subject: 'confirm email',
    //html: '<a href="' + url + '">' + url + '</a>'
    //}, function(error, info) {
    //if (error) {
    //return console.log(error);
    //}
    //console.log('Message sent: ' + info.response);
    //});
    next();
  });
}

function generateAccessToken(req, res, next) {
  req.accessToken = jwt.sign({id: req.user.email}, config.secret, {expiresIn: '2d'});
  next();
}

function generateRefreshToken(req, res, next) {
  req.refreshToken = crypto.randomBytes(40).toString('hex');
  Account.findOneAndUpdate({email: req.user.email}, {$addToSet: {refreshTokens: req.refreshToken}}, (err, user) => {
    // TODO: clear old tokens
  });
  next();
}

function validateRefreshToken(req, res, next) {
  const token = req.body.refreshToken;
  console.log('validate refresh token', token);
  Account.find({refreshTokens: token}, function(err, user) {
    if (err) res.status(500).end();
    if (user.length === 0) res.status(401).end();
    req.user = user;
    next();
  });
}

function respond(req, res) {
  const user = {
    name: req.user.name,
    email: req.user.email,
    image: req.user.image
  }
  res.status(200).json({
    accessToken: req.accessToken,
    refreshToken: req.refreshToken,
    user,
  });
}

export default router;
