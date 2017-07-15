/* eslint-disable */
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';

/**
 * Enables syntax highlighting with prismjs. Adds line highlighting
 * @module common
 */
export default {
  init() {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('css', css);
    hljs.initHighlightingOnLoad();
  },
};
