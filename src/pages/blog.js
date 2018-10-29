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
import P from '../components/Paragraph'

const PostList = styled.div`
  margin-top: 80px;
`

const Post = styled.div`
  margin-bottom: 80px;
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
  font-size: 16px;
  margin-bottom: 0.5em;
  line-height: 1em;
  font-weight: 500;
  color: hsl(0, 0%, 60%);
`

const Excerpt = styled.div`
  margin-top: 15px;
`

type Props = {
  data: Object
}

export default ({ data }: Props) => {
  const posts = idx(data, _ => _.allMarkdownRemark.edges) || []
  const author = idx(data, _ => _.site.siteMetadata.author) || ''

  return (
    <Layout>
      <Helmet>
        <title>Blog - {author}</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <Container>
        <H1>Writing</H1>
        <PostList>
          {posts.map(post => (
            <Post key={post.node.fields.slug}>
              <Title>
                <Link to={post.node.fields.slug}>
                  {post.node.frontmatter.title}
                </Link>
              </Title>
              <Meta>{post.node.frontmatter.date}</Meta>
              <Excerpt>
                <P>{post.node.excerpt}</P>
              </Excerpt>
            </Post>
          ))}
        </PostList>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 150)
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
