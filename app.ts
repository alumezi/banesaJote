import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import cors from 'cors';
import cookieSession from 'cookie-session';
import config from './utils/config';
import logger from './utils/logger';
import UserRouter from './controllers/users';
import LoginRouter from './controllers/login';
import PropertyRouter from './controllers/properties';
import FilterRouter from './controllers/filters';
import AuthRouter from './controllers/auth';
import boot from './boot/auth';
import 'express-async-errors';

const app = express();
import middleware from './utils/middleware';
boot();

logger.info('connecting to', config.DB_URL);

mongoose.set('useFindAndModify', false);
mongoose
  .connect(config.DB_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'build')));
app.use(middleware.extractToken);
app.use(middleware.morganLogger);
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY as string],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', AuthRouter);
app.use('/api/login', LoginRouter);
app.use('/api/users', UserRouter);
app.use('/api/properties', PropertyRouter);
app.use('/api/filters', FilterRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
