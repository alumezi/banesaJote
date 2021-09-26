import Express from 'express';
import passport from 'passport';

const AuthRouter = Express.Router();

AuthRouter.get('/facebook-login', passport.authenticate('facebook'));

AuthRouter.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    res.redirect('/');
  }
);

AuthRouter.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

AuthRouter.get('/current_user', (req, res) => {
  res.json(req.user);
});

export default AuthRouter;
