/**
 * Various actions
 * @module common
 */
import twemoji from 'twemoji';

export default {
  /**
   * Init function
   * @function
   */
  init() {
    this.addEmojis();
  },

  /**
   * Enable emoji replacement with twemoji
   * @function
   */
  addEmojis() {
    const content = document.getElementById('content');
    if (content) {
      twemoji.parse(content);
    }
  },
};
