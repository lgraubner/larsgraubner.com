/**
 * Entry file
 */
import ready from './helpers/ready';
import load from './helpers/loader';

import common from './modules/common';
import syntaxHighlighting from './modules/syntax-highlighting';

ready(() => load([common, syntaxHighlighting]));
