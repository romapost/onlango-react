import crypto from 'crypto';
import fse from 'fs-extra';
import jwt from 'jsonwebtoken';
import {Router} from 'express';
import lwip from 'lwip';
import escapeHtml from 'escape-html';
import multer from 'multer';
import passport from '../passport';
import Account from '../models/account';
import config from '../../../config';

const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

//const nodemailer = require('nodemailer');
//const transporter = nodemailer.createTransport(config.emailVerification.transport);

router.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});

router.post(
  '/register',
  register,
  passport.authenticate('local', {session: false}),
  generateRefreshToken,
  generateAccessToken,
  respond
);
router.post(
  '/login',
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

router.post(
  '/refresh',
  validateRefreshToken,
  generateAccessToken,
  (req, res) => {
    res.json({accessToken: req.accessToken});
  }
);

router.use('/protected',
  checkAuth,
  (req, res, next) => {
    res
      .status(200)
      .end();
  }
);

router.post(
  '/setuserpic',
  checkAuth,
  upload.single('image'),
  (req, res, next) => {
    lwip.open(req.file.buffer, req.file.mimetype.replace(/^.+\//, ''), (err, image) => {
      if (err) return next(err);
      const size = Math.min(image.width(), image.height());
      image
        .batch()
        .crop(size, size)
        .resize(128, 128)
        .toBuffer('jpg', (err, buf) => {
          if (err) return next(err);
          const dir = 'public/uploads/userpic/';
          const hash = req.userPicHash = crypto
            .createHash('sha1')
            .update(buf)
            .digest('hex');
          const path = `${dir}${hash}`;
          fse.stat(path, (err, stats) => {
            if (!stats) fse.outputFile(path, buf, err => {
              if (err) next(err);
              else next();
            });
            else next();
          });
        });
    });
  },
  (req, res) => {
    const url = `/userpic/${req.userPicHash}`;
    Account.findOneAndUpdate(
      {email: req.user.id},
      {image: url},
      {new: true},
      (err, account) => {
        res
          .status(201)
          .location(url)
          .end();
      }
    );
  }
);

function composeUserinfo(account) {
  const {email, name, image} = account;
  const {surname, phone, gender, country, city, day, month, year} = account.userinfo;
  const i = account.userinfo.interests;
  const interests = i && i.length > 0 ? i.join(', ') : undefined;
  const userinfo = {name, surname, gender, day, month, year, email, phone, country, city, interests, image};
  Object.keys(userinfo).forEach(e => { if (typeof userinfo[e] == 'undefined' || userinfo[e] === null) delete userinfo[e]; });
  return userinfo;
}

router
  .route('/userinfo')
  .all(checkAuth)
  .get((req, res, next) => {
    Account.findOne({email: req.user.id}, (err, account) => {
      if (err) next(err);
      else {
        res.json(composeUserinfo(account));
      }
    });
  })
  .post((req, res, next) => {
    console.log(req.url, req.body);
    const {name, surname, gender, day, month, year, email, phone, country, city, interests} = req.body;
    const data = {email, name, userinfo: {surname, phone, gender, country, city, day, month, year}};
    if (typeof interests == 'string') data.userinfo.interests = interests.split(/\s*,\s*/);
    Object.keys(data.userinfo).forEach(e => {
      if (typeof data.userinfo[e] == 'undefined') delete data.userinfo[e];
    });
    console.log(data);
    Account.findOneAndUpdate(
      {email: req.user.id},
      data,
      {new: true},
      (err, account) => {
        console.log(err, account);
        if (err) next(err);
        else res.json(composeUserinfo(account));
      }
    );
  });

router.post(
  '/teacherform',
  checkAuth,
  (req, res, next) => {
    const data = {};
    Object.keys(req.body).forEach(e => { if (req.body[e] !== null) data[e] = req.body[e]; });
    Account.findOneAndUpdate(
        {email: req.user.id},
        {teacherForm: data},
        {new: true},
        (err, account) => {
          console.log(err, account);
          if (err) next(err);
          else res.end();
        }
      );
  });

router.post(
  '/teacherform/resumeFile',
  checkAuth,
  upload.single('resumeFile'),
  (req, res, next) => {
    Account.findOneAndUpdate(
        {email: req.user.id},
        {resumeFile: req.file.buffer},
        {new: true},
        (err, account) => {
          console.log(err, account);
          if (err) next(err);
          else res.end();
        }
      );
  });

router.post(
  '/change_password',
  checkAuth,
  (req, res, next) => {
    console.log(req.user, req.body);
    Account.findOne({email: req.user.id}, (err, account) => {
      if (err) next(err);
      else account.setPassword(req.body.password, (err, account) => {
        console.log(err, account);
        if (err) next(err);
        else {
          account.save();
          res.status(501).end();
        }
      });
    });
  }
);

router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email']
}));

router.get(
  '/auth/google',
  passport.authenticate('google', {failureRedirect: '/login'}),
  checkAuth,
  generateAccessToken,
  generateRefreshToken,
  respond
);

if (config.dev) {
  router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    const e = err.stack.split(/\s*\n\s*/).map(escapeHtml);
    res.send(`<pre>\n <h3>  ${e.shift()}</h3>    ${e.join('\n    ')}</pre>`);
  });
}

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send(`<b>Server error</b>: ${err.name} <i>${err.message}</i>`);
});

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
    //const url = 'http://' + config.domain + '/account/confirmEmail?t=' + account.token;
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
  req.accessToken = jwt.sign(
    {id: req.user.email},
    config.secret,
    {expiresIn: '2d'}
  );
  next();
}

function generateRefreshToken(req, res, next) {
  req.refreshToken = crypto.randomBytes(40).toString('hex');
  Account.findOneAndUpdate(
    {email: req.user.id},
    {$addToSet: {refreshTokens: req.refreshToken}},
    (err, account) => {
    // TODO: clear old tokens
    }
  );
  next();
}

function validateRefreshToken(req, res, next) {
  const token = req.body.refreshToken;
  Account.find(
    {refreshTokens: token},
    function(err, account) {
      console.log(err, account);
      if (err) res.status(500).end();
      if (account.length === 0) res.status(401).end();
      req.user = account;
      next();
    }
  );
}

function respond(req, res) {
  const {accessToken, refreshToken} = req;
  res.status(200).json({accessToken, refreshToken});
}

function checkAuth(req, res, next) {
  if (!req.user) res.status(401).end();
  else next();
}

export default router;
