const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('express-async-errors');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const config = require('./utils/config');
const logger = require('./utils/logger');
const UserRouter = require('./controllers/users');
const LoginRouter = require('./controllers/login');
const PropertyRouter = require('./controllers/properties');
const FilterRouter = require('./controllers/filters');
const AuthRouter = require('./controllers/auth');

const app = express();
const middleware = require('./utils/middleware');
require('./boot/auth')();

logger.info('connecting to', config.DB_URL);

mongoose.set('useFindAndModify', false);
mongoose
  .connect(config.DB_URL, {
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
app.use(express.static(path.join(__dirname, 'build')));
app.use(middleware.extractToken);
app.use(middleware.morganLogger);
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
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

module.exports = app;
