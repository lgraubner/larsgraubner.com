import $ from 'jquery';
import Headroom from 'headroom.js';
import twemoji from 'twemoji';

/**
 * Various actions
 * @module common
 */
export default {
  /**
   * Init function
   * @function
   */
  init() {
    this.addEmojis();
    this.initHeadroom();
  },

  /**
   * Enable emoji replacement with twemoji
   * @function
   */
  addEmojis() {
    const postContent = document.getElementsByClassName('content');
    if (postContent.length) {
      twemoji.parse(postContent[0]);
    }
  },

  /**
   * Init headroom
   * @function
   */
  initHeadroom() {
    const headroom = new Headroom(document.querySelector('.header'), {
      offset: 200,
      tolerance: {
        down: 20,
        up: 20,
      },
      onUnpin() {
        $('.menu__more').removeClass('menu__more--visible');
      },
    });
    headroom.init();
  },
};
