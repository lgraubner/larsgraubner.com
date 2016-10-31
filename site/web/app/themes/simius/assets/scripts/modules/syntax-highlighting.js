import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import range from 'lodash.range';

/**
 * Enables syntax highlighting with prismjs. Adds line highlighting
 * @module common
 */
export default {
  init() {
    Prism.highlightAll();
    Prism.hooks.add('after-highlight', (env) => {
      // eslint-disable-next-line
      env.element.innerHTML = '<div class="line">' + env.highlightedCode.replace(/\r\n?|\n/g, '</div><div class="line">') + '</div>';

      let dataLine = env.element.getAttribute('data-line');
      // eslint-disable-next-line
      dataLine = dataLine.replace(/(\d+)-(\d+)/, (match, p1, p2) => {
        return range(parseInt(p1, 10), parseInt(p2, 10) + 1).join(',');
      });
      let lines = null;
      if (dataLine) {
        lines = dataLine.split(',');
        lines.map((line) => {
          const child = env.element.querySelector(`.line:nth-child(${line})`);
          const className = 'line--highlight';
          if (child.classList) {
            child.classList.add(className);
          } else {
            child.className += ` ${className}`;
          }

          return child;
        });
      }
    });
  },
};
