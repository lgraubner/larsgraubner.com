/**
 * Entry file
 */
import 'es6-promise';

import ready from 'helpers/ready';
import load from 'helpers/loader';
import common from 'modules/common';

const modules = [
  common,
];

ready(() => load(modules));
