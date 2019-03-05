import React from 'react'
import idx from 'idx'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Link from '../components/Link'
import NewsletterBox from '../components/NewsletterBox'

const PostList = styled.div``

const Post = styled.div`
  margin-bottom: 50px;

  @media (min-width: 768px) {
    margin-bottom: 80px;
  }
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
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
  margin-bottom: 1em;
  line-height: 1em;
  font-weight: 500;
  color: hsl(0, 0%, 40%);
`

const Excerpt = styled.div`
  margin-top: 15px;
  font-size: 19px;
  line-height: 1.6em;
  color: #333;
`

type Props = {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
            date: string
            description: string
          }
        }
      }>
    }
    site: {
      siteMetadata: {
        siteTitle: string
        siteDescription: string
        siteUrl: string
      }
    }
  }
}

const Blog = ({ data }: Props) => {
  const posts = idx(data, _ => _.allMarkdownRemark.edges) || []

  const { siteTitle, siteDescription, siteUrl }: any =
    idx(data, _ => _.site.siteMetadata) || {}

  return (
    <Layout>
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content="Lars Graubner - Web Developer" />
        <meta property="og:type" content="website" />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Lars Graubner" />
        <meta property="og:description" content={siteDescription} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@larsgraubner" />
        <meta name="twitter:domain" content="larsgraubner.com" />
        <meta name="twitter:title" content="Lars Graubner – Web Developer" />
        <meta name="twitter:description" content={siteDescription} />
      </Helmet>
      <PostList>
        {posts.map<JSX.Element>(post => (
          <Post key={post.node.fields.slug}>
            <Title>
              <Link to={post.node.fields.slug}>
                {post.node.frontmatter.title}
              </Link>
            </Title>
            <Meta>{post.node.frontmatter.date}</Meta>
            <Excerpt>{post.node.frontmatter.description}</Excerpt>
          </Post>
        ))}
      </PostList>
      <NewsletterBox />
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
        siteDescription
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY ")
            description
          }
        }
      }
    }
  }
`
