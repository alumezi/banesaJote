"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT } = process.env;
let { DB_URL } = process.env;
if (process.env.NODE_ENV === 'test') {
    DB_URL = process.env.TEST_MONGODB_URI;
}
exports.default = {
    DB_URL,
    PORT,
};
