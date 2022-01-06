import Express from 'express';
import passport from 'passport';
import logger from '../utils/logger';

const AuthRouter = Express.Router();

AuthRouter.get('/facebook-login', passport.authenticate('facebook'));

AuthRouter.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    console.log('🚀 ~ file: auth.ts ~ line 13 ~ req', req);
    res.redirect('/');
  }
);

AuthRouter.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

AuthRouter.get('/current_user', (req, res) => {
  logger.info('🚀 ~ file: auth.ts ~ line 23 ~ AuthRouter.get ~ req', req);
  if (req.user) {
    res.json(req.user);
  }
});

export default AuthRouter;
