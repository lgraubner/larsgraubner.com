declare module 'rehype-react' {
  interface RehypeOptions {
    createElement: any
    components: any
  }
  class RehypeReact {
    Compiler: any
    constructor(options: RehypeOptions)
  }
  export default RehypeReact
}
