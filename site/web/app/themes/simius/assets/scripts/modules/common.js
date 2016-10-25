import $ from 'jquery';
import Headroom from 'headroom.js';
import twemoji from 'twemoji';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

import loadImage from 'helpers/load-image';

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
    this.enableSyntaxHighlighting();
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

  /**
   * Init image lazy loading
   * @function
   * @deprecated
   */
  initImageLazyload() {
    const images = [...document.querySelectorAll('.image img')];
    if (images.length) {
      images.map((image) => {
        const url = image.getAttribute('data-orig');
        return loadImage(url).then((i) => {
          image.setAttribute('src', i.src);
          image.classList.add('loaded');
        }).catch(() => image.classList.add('error'));
      });
    }
  },

  /**
   * Enable syntax highlighting with prismjs
   * @function
   */
  enableSyntaxHighlighting() {
    Prism.highlightAll();
    Prism.hooks.add('after-highlight', (env) => {
      // eslint-disable-next-line
      env.element.innerHTML = '<div class="line">' + env.highlightedCode.replace(/\r\n?|\n/g, '</div><div class="line">') + '</div>';
    });
  },
};
