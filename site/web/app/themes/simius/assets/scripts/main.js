/**
 * Entry file
 */
import 'es6-promise';

import ready from 'helpers/ready';
import load from 'helpers/loader';
import common from 'modules/common';
import syntaxHighlighting from 'modules/syntax-highlighting';
import navigation from 'modules/navigation';

const modules = [common, syntaxHighlighting, navigation];

ready(() => load(modules));
