/**
 * Simple function to listen for DOM ready
 * @param {Function} fn - Callback to execute
 */
export default (fn) => {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};
