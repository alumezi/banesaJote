"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.Schema({
    facebookID: {
        type: String,
        unique: true,
        required: false,
    },
    username: {
        type: String,
        unique: true,
        required: false,
        minlength: 3,
    },
    displayName: String,
    emails: Array,
    date: Date,
    user_link: String,
    passwordHash: {
        type: String,
        required: false,
    },
    properties: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Property',
        },
    ],
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});
userSchema.plugin(mongoose_unique_validator_1.default);
exports.default = (0, mongoose_1.model)('User', userSchema);
