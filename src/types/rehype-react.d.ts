declare module 'rehype-react' {
  interface IRehypeOptions {
    createElement: any
    components: any
  }
  class RehypeReact {
    Compiler: any
    constructor(options: IRehypeOptions)
  }
  export default RehypeReact
}

declare module 'gatsby-plugin-fathom'
