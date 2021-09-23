const passport = require('passport');
const Strategy = require('passport-facebook');
const User = require('../models/user');

module.exports = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'https://banesajote.herokuapp.com/auth/facebook/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        const existingUser = await User.findOne({ facebookID: profile.id });
        if (existingUser) {
          return cb(null, existingUser);
        }

        const user = await new User({
          facebookID: profile.id,
          displayName: profile.displayName,
          emails: profile.emails,
          user_link: profile.user_link,
          date: new Date(),
        }).save();
        return cb(null, user);
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });
};
