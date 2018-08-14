const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'develop') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            enforce: 'pre'
          }
        ]
      }
    })
  }
}

exports.createPages = ({ graphql, actions }) =>
  new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  frontmatter {
                    url
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          // eslint-disable-next-line
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.map(edge =>
          actions.createPage({
            path: edge.node.frontmatter.url,
            component: blogPost,
            context: {
              url: edge.node.frontmatter.path
            }
          })
        )
      })
    )
  })

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
