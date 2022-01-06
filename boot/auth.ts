import passport from 'passport';
import { Strategy } from 'passport-facebook';
import User from '../models/user';
import logger from '../utils/logger';

export default () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        callbackURL: 'https://banesajote.herokuapp.com/auth/facebook/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        const existingUser = await User.findOne({ facebookID: profile.id });
        logger.info('existing user found', existingUser);
        if (existingUser) {
          return cb(null, existingUser);
        }
        logger.info('no existing user found creating a new one');
        const user = await new User({
          facebookID: profile.id,
          displayName: profile.displayName,
          emails: profile.emails,
          date: new Date(),
        }).save();
        logger.info('🚀 ~ User just created', user);
        return cb(null, user);
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });
};
