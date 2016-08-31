// eslint-disable-next-line
import $ from 'jquery';
import forEach from 'lodash.foreach';
import twemoji from 'twemoji';
import moment from 'moment';

export default {
  init() {
    this.getTweetData((tweet) => {
      this.renderTweet(tweet);
    });
  },

  getTweetData(cb) {
    const nonceEl = document.getElementsByName('_wpnonce');
    if (nonceEl.length) {
      const nonce = nonceEl[0].value;

      $.ajax({
        method: 'post',
        url: lg.ajaxurl,
        data: {
          action: 'twitter',
          _wpnonce: nonce,
        },
        success: (res) => {
          const json = JSON.parse(res);
          if (json.status === 200) {
            const { text, entities, created_at, user } = json.data[0];
            const tweet = {
              text,
              date: moment(created_at).format('MMMM D, YYYY [at] HH:mm'),
              author: `<a href="https://twitter.com/${user.screen_name}">
                @${user.screen_name}
              </a>`,
            };
            forEach(entities.urls, (url) => {
              const linkRepl = `<a href="${url.expanded_url}" target="_blank">
                ${url.display_url}
              </a>`;
              tweet.text = tweet.text.replace(url.url, linkRepl);
            });
            forEach(entities.user_mentions, (u) => {
              const userRepl = `<a href="https://twitter.com/${u.screen_name}" target="_blank">
                @${u.screen_name}
              </a>`;
              tweet.text = tweet.text.replace(`@${u.screen_name}`, userRepl);
            });
            forEach(entities.hashtags, (h) => {
              const hashRepl = `<a href="https://twitter.com/hashtag/${h.text}?src=hash" target="_blank">
                #${h.text}
              </a>`;
              tweet.text = tweet.text.replace(`#${h.text}`, hashRepl);
            });
            cb(tweet);
          }
        },
        error: () => {
          cb();
        },
      });
    }
  },

  renderTweet(tweetData) {
    let str = 'Could not load tweets. 🤔';
    const { author, text, date } = tweetData;
    if (tweetData) {
      str = twemoji.parse(text);
    }
    const $tweet = $(`<div class="tweet">
      <div class="tweet__content">${str}</div>
      <div class="tweet__meta">
        <span class="tweet__author">${author}</span> -
        <span class="tweet__date">${date}</span>
      </div>
    </div>`);
    $('#tweet').html($tweet);
    $tweet.fadeIn(400);
  },
};
