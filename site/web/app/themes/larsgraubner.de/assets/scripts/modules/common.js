import Prism from 'prismjs';
import twemoji from 'twemoji';

export default {
  init() {
    // high light code snippets
    Prism.highlightAll();

    const postContent = document.getElementsByClassName('post__content');
    if (postContent) {
      twemoji.parse(postContent[0]);
    }
  },
};
