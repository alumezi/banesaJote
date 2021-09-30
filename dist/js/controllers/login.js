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
/* eslint-disable no-underscore-dangle */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const loginRouter = express_1.default.Router();
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    const user = yield user_1.default.findOne({ username: body.username });
    if (!user) {
        return response.status(404).json({
            error: 'Perdoruesi nuk egziston',
        });
    }
    const passwordCorrect = user === null
        ? false
        : yield bcrypt_1.default.compare(body.password, user.passwordHash);
    if (!passwordCorrect) {
        return response.status(404).json({
            error: 'invalid username or password',
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, process.env.SECRET);
    return response.status(200).send({
        token,
        username: user.username,
        id: user._id,
    });
}));
exports.default = loginRouter;
