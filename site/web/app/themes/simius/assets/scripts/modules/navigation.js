import $ from 'jquery';

export default {
  init() {
    if ($('.menu__item').length > 3 && $(window).width() <= 768) {
      const $nav = $('#menu-header-nav');
      // const $orgNav = $nav.clone();

      const $moreMenuHTML = $('<div/>')
        .addClass('menu__more')
        .append($('<button/>').text('more'))
        .append('<ul/>');
      $nav.append($moreMenuHTML);
      $nav.find('.priority-2').appendTo($('.menu__more ul'));

      const $menuMore = $('.menu__more');
      $('.menu__more button').on('click', () => {
        $menuMore.toggleClass('menu__more--visible');
      });
    }
  },
};
