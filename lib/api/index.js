import {Router} from 'express';
import expressJwt from 'express-jwt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from './passport';
import accountRoutes from './routes/account';
import config from '../../config';

const router = new Router();

mongoose.connect(config.mongoURL);

router.use(bodyParser.json());
router.use(passport.initialize());
router.use(expressJwt({secret: config.secret, credentialsRequired: false}));
router.use(accountRoutes);

router.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

export default router;
