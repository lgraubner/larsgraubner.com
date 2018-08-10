// @flow
import React from 'react'
import Helmet from 'react-helmet'
import idx from 'idx'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import { H1 } from '../components/Heading'
import Link from '../components/Link'
import { Ul, Li } from '../components/List'

type Props = {
  data: Object
}

const PostSnippet = styled.div`
  margin-bottom: 40px;
`

const PostTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 8px;

  a {
    text-decoration: none;
    border: 0;

    &:hover {
      text-decoration: underline;
      color: #000;
    }
  }
`

const PostMeta = styled.div`
  font-size: 16px;
  line-height: 1.5em;
  font-weight: 600;
`

export default ({ data }: Props) => {
  const posts = idx(data, _ => _.allMarkdownRemark.edges) || []

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Writing</title>
      </Helmet>
      <H1>Writing</H1>
      {posts.map(post => (
        <PostSnippet key={post.node.frontmatter.url}>
          <PostTitle>
            <Link href={post.node.frontmatter.url}>
              {post.node.frontmatter.title}
            </Link>
          </PostTitle>
          <PostMeta>{post.node.frontmatter.date}</PostMeta>
        </PostSnippet>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            url
            title
            date(formatString: "MMMM DD, YYYY ")
          }
        }
      }
    }
  }
`
