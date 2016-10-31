/**
 * Entry file
 */
import 'es6-promise';

import ready from 'helpers/ready';
import load from 'helpers/loader';
import common from 'modules/common';
import syntaxHighlighting from 'modules/syntax-highlighting';

const modules = [
  common,
  syntaxHighlighting,
];

ready(() => load(modules));
