"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const users_1 = __importDefault(require("./controllers/users"));
const login_1 = __importDefault(require("./controllers/login"));
const properties_1 = __importDefault(require("./controllers/properties"));
const filters_1 = __importDefault(require("./controllers/filters"));
const auth_1 = __importDefault(require("./controllers/auth"));
const auth_2 = __importDefault(require("./boot/auth"));
require("express-async-errors");
const app = (0, express_1.default)();
const middleware_1 = __importDefault(require("./utils/middleware"));
(0, auth_2.default)();
logger_1.default.info('connecting to', config_1.default.DB_URL);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default
    .connect(config_1.default.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connecting to MongoDB:', error.message);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
logger_1.default.info();
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use(middleware_1.default.extractToken);
app.use(middleware_1.default.morganLogger);
app.use((0, cookie_session_1.default)({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', auth_1.default);
app.use('/api/login', login_1.default);
app.use('/api/users', users_1.default);
app.use('/api/properties', properties_1.default);
app.use('/api/filters', filters_1.default);
function defaultRoute(req, res) {
    res.sendFile(path_1.default.join(__dirname, 'build/index.html'));
}
app.get('*', (req, res) => {
    defaultRoute(req, res);
});
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
