/**
 * Executes init function of specified object literals
 * @param {Array} modules - Array of modules
 */
export default modules => modules.map(mod => mod().init());
