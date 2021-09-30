var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from 'passport';
import { Strategy } from 'passport-facebook';
import User from '../models/user';
export default () => {
    passport.use(new Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'https://banesajote.herokuapp.com/auth/facebook/callback',
    }, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User.findOne({ facebookID: profile.id });
        if (existingUser) {
            return cb(null, existingUser);
        }
        const user = yield new User({
            facebookID: profile.id,
            displayName: profile.displayName,
            emails: profile.emails,
            date: new Date(),
        }).save();
        return cb(null, user);
    })));
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            cb(err, user);
        });
    });
};
