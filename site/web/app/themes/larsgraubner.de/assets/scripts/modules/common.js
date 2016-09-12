import Prism from 'prismjs';
import twemoji from 'twemoji';
// eslint-disable-next-line
import $ from 'jquery';
import Headroom from 'headroom.js';

export default {
  init() {
    // high light code snippets
    Prism.highlightAll();

    this.addEmojis();
    this.initMobileNav();
    this.initHeadroom();
    this.initImageLazyload();
  },

  addEmojis() {
    const postContent = document.getElementsByClassName('content');
    if (postContent.length) {
      twemoji.parse(postContent[0]);
    }
  },

  initMobileNav() {
    const $menu = $('.menu');
    $('.menu-button').on('click', () => {
      $menu.toggleClass('menu--visible');
    });
  },

  initHeadroom() {
    const headroom = new Headroom(document.querySelector('.header'), {
      offset: 200,
      tolerance: {
        down: 20,
        up: 20,
      },
    });
    headroom.init();
  },

  initImageLazyload() {
    $('.image').each(function () {
      const $img = $(this).find('img');
      const imgSrc = $img.attr('data-orig');
      // eslint-disable-next-line
      const replace = new Image();
      replace.onload = () => {
        $img.attr('src', imgSrc);
        $(this).addClass('image--loaded');
      };
      replace.src = imgSrc;
    });
  },
};
