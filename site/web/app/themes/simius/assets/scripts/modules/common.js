import twemoji from 'twemoji';
import $ from 'jquery';
import Headroom from 'headroom.js';

import loadImage from '../helpers/load-image';

export default {
  init() {
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
};
