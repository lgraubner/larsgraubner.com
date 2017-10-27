import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Post = styled.article`
  max-width: 620px;
  margin: 0 auto;
`

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Post>
      <Helmet title={post.frontmatter.title} />
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Post>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
