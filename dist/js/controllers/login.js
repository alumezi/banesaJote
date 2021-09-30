var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Express from 'express';
import User from '../models/user';
const loginRouter = Express.Router();
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    const user = yield User.findOne({ username: body.username });
    if (!user) {
        return response.status(404).json({
            error: 'Perdoruesi nuk egziston',
        });
    }
    const passwordCorrect = user === null
        ? false
        : yield bcrypt.compare(body.password, user.passwordHash);
    if (!passwordCorrect) {
        return response.status(404).json({
            error: 'invalid username or password',
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    return response.status(200).send({
        token,
        username: user.username,
        id: user._id,
    });
}));
export default loginRouter;
