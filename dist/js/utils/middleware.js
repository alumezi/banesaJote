"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
// app.use(morgan('tiny'));
morgan_1.default.token('returnData', (request) => request.body);
const morganLogger = (0, morgan_1.default)((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(tokens.returnData(req, res)),
].join(' '));
const unknownEndpoint = (request, response) => {
    response.redirect('/');
};
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        logger_1.default.info(error);
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
exports.default = {
    unknownEndpoint,
    errorHandler,
    morganLogger,
    extractToken,
    requireLogin,
};
