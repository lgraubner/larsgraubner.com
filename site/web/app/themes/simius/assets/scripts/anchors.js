import AnchorJS from 'anchor-js';

/**
 * Add anchor links to posts
 */
(function iife() {
  const anchors = new AnchorJS({
    icon: '#',
  });
  anchors.add('.post__content h2');
  anchors.add('.post__content h3');
  anchors.add('.post__content h4');
  anchors.add('.post__content h5');
})();
