/**
 * Executes init function of specified object literals
 * @param {Array} modules - Array of modules
 */
export default modules =>
  modules.filter(module => typeof module.init === 'function')
    .map(mod => mod.init());
