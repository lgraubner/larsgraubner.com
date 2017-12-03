// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Header = styled.header`
  margin-top: 3em;
  margin-bottom: 2.5em;

  h1 {
    margin: 0 0 0.5em;
    font-weight: 600;
  }
`

const Post = styled.article`
  max-width: 620px;
  margin: 0 auto;

  h2 {
    margin: 2em 0 1em;
    font-size: 26px;
    font-weight: 600;
  }

  h3 {
    margin: 2em 0 1em;
    font-size: 22px;
    font-weight: 600;
  }

  p {
    line-height: 1.7em;
    font-size: 18px;
    margin: 0 0 1.7em;

    a {
      color: rgb(0, 51, 206);
      text-decoration-skip: ink;
    }

    code {
      font-size: 90%;
      padding: 0.2rem 0.4rem;
      background-color: #f8f9fa;
      border-radius: 0.25rem;
      color: #bd4147;
    }
  }

  .gatsby-highlight {
    margin: 2.5em 0 2.5em -4%;
    width: 108%;

    pre {
      margin: 0;
      border-radius: 0;
      padding: 20px 4%;
      font-size: 15px;
    }
  }

  .gatsby-highlight-code-line {
  }
`

const Date = styled.div`
  font-size: 16px;
  color: rgb(124, 124, 124);
`

type Props = {
  data: Object
}

const BlogPostTemplate = ({ data }: Props) => {
  const post = data.markdownRemark

  return (
    <Post>
      <Helmet title={post.frontmatter.title} />
      <Header>
        <h1>{post.frontmatter.title}</h1>
        <Date>{post.frontmatter.date}</Date>
      </Header>
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
