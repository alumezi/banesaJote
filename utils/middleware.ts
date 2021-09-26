import morgan from 'morgan';
import logger from './logger';
// app.use(morgan('tiny'));
morgan.token('returnData', (request) => request.body);

const morganLogger = morgan((tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(tokens.returnData(req)),
  ].join(' ')
);

const unknownEndpoint = (request, response) => {
  response.redirect('/');
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    logger.info(error);
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  return next(error);
};

const extractToken = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

const requireLogin = (request, response, next) => {
  if (!request.user) {
    return response.status(401).send({ error: 'You must log in!' });
  }
  return next();
};

export default {
  unknownEndpoint,
  errorHandler,
  morganLogger,
  extractToken,
  requireLogin,
};
