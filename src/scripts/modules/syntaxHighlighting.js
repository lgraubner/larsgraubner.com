import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import nginx from 'highlight.js/lib/languages/nginx';

/**
 * Enables syntax highlighting with prismjs. Adds line highlighting
 * @module common
 */
const syntaxHighlighting = () => {
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('nginx', nginx);

  const highlight = () => {
    const blocks = document.querySelectorAll('pre code[class]');
    Array.from(blocks).forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  return {
    init: () => {
      highlight();
    },
  };
};

export default syntaxHighlighting;
