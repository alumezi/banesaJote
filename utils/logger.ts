import { blue, red } from 'chalk';

const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    // @ts-ignore
    console.log(blue(...params));
  }
};

const error = (...params: any[]) => {
  // @ts-ignore
  console.error(red(...params));
};

export default {
  info,
  error,
};
