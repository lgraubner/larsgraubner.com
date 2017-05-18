/**
 * Entry file
 */
import ready from './helpers/ready';
import load from './helpers/loader';

import common from './modules/common';
import syntaxHighlighting from './modules/syntaxHighlighting';
import anchors from './modules/anchors';

ready(() => load([common, syntaxHighlighting, anchors]));
