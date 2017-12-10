// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Title from '../components/Title'

import { textStyles } from '../components/Text'

import { LIGHT_COLOR, BOLD_COLOR } from '../colors'

const Header = styled.header`
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const Post = styled.article`
  max-width: 620px;
  margin: 0 auto 8rem;

  h2 {
    margin: 2rem 0 1.5rem;
    font-size: 1.85rem;
    font-weight: 600;
    line-height: 2.5rem;
    color: ${BOLD_COLOR};
  }

  h3 {
    margin: 2rem 0 1.25rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2.5rem;
    color: ${BOLD_COLOR};
  }

  p {
    ${textStyles()};

    code {
      font-size: 90%;
      padding: 0.2em 0.4em;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 0.25rem;
      color: rgba(0, 0, 0, 0.65);
    }
  }

  .gatsby-highlight {
    margin: 2rem 0 2rem -4%;
    width: 108%;

    pre {
      margin: 0;
      border-radius: 3px;
      padding: 20px 4%;
      font-size: 1rem;
    }
  }

  .gatsby-highlight-code-line {
  }
`

const Date = styled.div`
  font-size: 1.1rem;
  line-height: 1rem;
  margin-bottom: 0.75rem;
  color: ${LIGHT_COLOR};
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
        <Date>{post.frontmatter.date}</Date>
        <Title>{post.frontmatter.title}</Title>
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
