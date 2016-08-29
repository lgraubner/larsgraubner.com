// eslint-disable-next-line
import $ from 'jquery';
import 'whatwg-fetch';
import 'es6-promise';
import Loader from './Loader';
import common from './modules/common';
import twitter from './modules/twitter';

const modules = [
  common,
  twitter,
];

$(document).ready(() => new Loader(modules).initModules());
