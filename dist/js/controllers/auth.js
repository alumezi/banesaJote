"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const AuthRouter = express_1.default.Router();
AuthRouter.get('/facebook-login', passport_1.default.authenticate('facebook'));
AuthRouter.get('/auth/facebook/callback', passport_1.default.authenticate('facebook'), (req, res) => {
    res.redirect('/');
});
AuthRouter.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});
AuthRouter.get('/current_user', (req, res) => {
    res.json(req.user);
});
exports.default = AuthRouter;
