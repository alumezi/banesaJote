"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log((0, chalk_1.blue)(...params));
    }
};
const error = (...params) => {
    console.error((0, chalk_1.red)(...params));
};
exports.default = {
    info,
    error,
};
