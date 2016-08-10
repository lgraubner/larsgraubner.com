export default class Loader {
  constructor(modules) {
    Object.assign(this, { modules });
  }

  initModules() {
    let m;
    this.modules.map((mod) => {
      if (typeof mod.init === 'function') {
        m = mod.init();
      }
      return m;
    });
  }
}
