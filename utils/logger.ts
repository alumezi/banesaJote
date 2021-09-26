import { blue, red } from 'chalk';

const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(blue(...params));
  }
};

const error = (...params: any[]) => {
  console.error(red(...params));
};

export default {
  info,
  error,
};
