import morgan from 'morgan';
import logger from './logger';
import { Request, Response, NextFunction } from 'express';
// app.use(morgan('tiny'));
morgan.token('returnData', (request: Request) => request.body);

const morganLogger = morgan((tokens, req: Request, res: Response) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(tokens.returnData(req, res)),
  ].join(' ')
);

const unknownEndpoint = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('---');
  console.log(process.env.NODE_ENV);
  console.log(request.header('x-forwarded-proto'));
  console.log(request.hostname);
  console.log(request.url);
  console.log('---');
  if (request.header('x-forwarded-proto') !== 'https') {
    response.redirect('/');
  } else {
    next();
  }
};

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === 'CastError') {
    logger.info(error);
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  return next(error);
};

const extractToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

const requireLogin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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
