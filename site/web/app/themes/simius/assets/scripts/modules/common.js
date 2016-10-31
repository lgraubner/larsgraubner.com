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
    this.initMobileNav();
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
   * Init mobile navigation
   * @function
   */
  initMobileNav() {
    const $menu = $('.menu');
    $('.menu-button').on('click', () => {
      $menu.toggleClass('menu--visible');
    });
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
        $('.menu').removeClass('menu--visible');
      },
    });
    headroom.init();
  },
};
