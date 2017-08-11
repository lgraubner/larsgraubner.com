/* eslint no-alert:0 */
/**
 * Various actions
 * @module common
 */
import twemoji from 'twemoji';

const common = () => {
  const gaProperty = 'UA-44046571-2';
  const disableStr = `ga-disable-${gaProperty}`;

  const addEmojis = () => {
    twemoji.parse(document.body);
  };

  const gaOptout = () => {
    if (document.cookie.indexOf(`${disableStr}=true`) > -1) {
      window[disableStr] = true;
    }

    const gaDisableButton = document.getElementsByClassName('ga-disable');
    if (gaDisableButton.length) {
      gaDisableButton[0].addEventListener('click', e => {
        e.preventDefault();
        document.cookie = `${disableStr}=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
        window[disableStr] = true;
        alert('Google Analytics wurde deaktiviert.');
      });
    }
  };

  return {
    init: () => {
      gaOptout();
      addEmojis();
    },
  };
};

export default common;
