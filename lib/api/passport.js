import passport from 'passport';
import googleOAuth from 'passport-google-oauth20';
import Account from './models/account';
import config from '../../config';

const GoogleStrategy = googleOAuth.Strategy;

passport.use(Account.createStrategy());
passport.use(new GoogleStrategy(config.OAuth.google, (accessToken, refreshToken, profile, done) => {
    Account.findOrCreate(profile, (err, account) => err ? done(err) : done(null, account));
}));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

module.exports = passport;
