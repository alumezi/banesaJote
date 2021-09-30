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
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'https://banesajote.herokuapp.com/auth/facebook/callback',
    }, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield user_1.default.findOne({ facebookID: profile.id });
        if (existingUser) {
            return cb(null, existingUser);
        }
        const user = yield new user_1.default({
            facebookID: profile.id,
            displayName: profile.displayName,
            emails: profile.emails,
            date: new Date(),
        }).save();
        return cb(null, user);
    })));
    passport_1.default.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport_1.default.deserializeUser((id, cb) => {
        user_1.default.findById(id, (err, user) => {
            cb(err, user);
        });
    });
};
