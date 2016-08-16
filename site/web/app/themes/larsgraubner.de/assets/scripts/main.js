// eslint-disable-next-line
import $ from 'jquery';
import 'whatwg-fetch';
import 'es6-promise';
import Loader from './Loader';
import common from './modules/common';

const modules = [
  common,
];

$(document).ready(() => new Loader(modules).initModules());
