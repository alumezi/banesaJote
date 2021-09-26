"use strict";
const { blue, red } = require('chalk');
const info = (...params) => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line no-console
        console.log(blue(...params));
    }
};
const error = (...params) => {
    // eslint-disable-next-line no-console
    console.error(red(...params));
};
module.exports = {
    info,
    error,
};
