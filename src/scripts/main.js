/**
 * Entry file
 */
import { onReady } from '@graubnla/helpers';
import load from './helpers/loader';

import common from './modules/common';
import anchors from './modules/anchors';
import syntaxHighlighting from './modules/syntaxHighlighting';

onReady(() => load([common, anchors, syntaxHighlighting]));
