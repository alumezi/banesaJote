import { blue, red } from 'chalk';
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        // tslint:disable-next-line: no-console
        console.log(blue(...params));
    }
};
const error = (...params) => {
    // tslint:disable-next-line: no-console
    console.error(red(...params));
};
export default {
    info,
    error,
};
