export default (modules) =>
  modules.filter((module) => typeof module.init === 'function')
    .map((mod) => mod.init());
