// @flow
import React from 'react'
import Helmet from 'react-helmet'
import idx from 'idx'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Link from '../components/Link'
import { H1 } from '../components/Heading'
import Container from '../components/Container'

const PostList = styled.div`
  margin-top: 80px;
`

const Post = styled.div`
  margin-bottom: 50px;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px;
  line-height: 1.3em;

  a {
    text-decoration: none;
    color: hsl(0, 0%, 0%);

    &:hover {
      text-decoration: underline;
      color: #000;
    }
  }
`

const Meta = styled.div`
  font-size: 15px;
  margin-bottom: 0.5em;
  line-height: 1em;
  font-weight: 500;
  color: hsl(0, 0%, 60%);
`

type Props = {
  data: Object
}

export default ({ data }: Props) => {
  const posts = idx(data, _ => _.allMarkdownRemark.edges) || []

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Writing</title>
      </Helmet>
      <Container>
        <H1>Writing</H1>
        <PostList>
          {posts.map(post => (
            <Post key={post.node.fields.slug}>
              <Meta>{post.node.frontmatter.date}</Meta>
              <Title>
                <Link to={post.node.fields.slug}>
                  {post.node.frontmatter.title}
                </Link>
              </Title>
            </Post>
          ))}
        </PostList>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY ")
          }
        }
      }
    }
  }
`
