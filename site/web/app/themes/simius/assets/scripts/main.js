// eslint-disable-next-line
import 'whatwg-fetch';
import 'es6-promise';
import load from './loader';
import common from './modules/common';

const modules = [
  common,
];

const ready = (fn) => {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

ready(() => load(modules));
