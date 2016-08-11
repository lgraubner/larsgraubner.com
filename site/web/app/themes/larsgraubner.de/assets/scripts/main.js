// eslint-disable-next-line
import $ from 'jquery';
import 'whatwg-fetch';
import 'es6-promise';
import Loader from './Loader';

const modules = [

];

$(document).ready(() => new Loader(modules).initModules());
