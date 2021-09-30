"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const UserRouter = express_1.default.Router();
UserRouter.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    if (!body.password) {
        response.status(401).json({ error: 'Please give a password!' });
    }
    if (body.password && body.password.length < 3) {
        response.status(401).json({ error: 'password to short' });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(body.password, saltRounds);
    const user = new user_1.default({
        username: body.username,
        name: body.name,
        passwordHash,
    });
    try {
        const savedUser = yield user.save();
        response.json(savedUser);
    }
    catch (error) {
        next(error);
    }
}));
UserRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({}).populate('properties');
    response.json(users.map((user) => user.toJSON()));
}));
UserRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const users = yield user_1.default.findById(id);
    response.json(users);
}));
exports.default = UserRouter;
