import React from 'react'
import idx from 'idx'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Link from '../components/Link'
import NewsletterBox from '../components/NewsletterBox'

const Heading = styled.h2({
  fontSize: '38px',
  margin: '1.5em 0 1.25em',
  fontWeight: '600',
  lineHeight: 1.3
})

const About = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: -10,
  marginBottom: 40,
  borderRadius: 5,
  '@media(min-width: 768px)': {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -30,
    marginBottom: 70
  }
})

const Head = styled.img({
  borderRadius: '50%',
  height: 70,
  width: '100%',
  maxWidth: 70,
  display: 'block',
  marginBottom: 20,
  flexGrow: 0,
  border: '4px solid hsla(0, 0%, 0%, 0.1)',
  boxSizing: 'content-box',
  '@media(min-width: 768px)': {
    marginBottom: 0,
    maxWidth: 100,
    height: 100
  }
})

const Slogan = styled.p({
  fontSize: '24px',
  lineHeight: '32px',
  color: '#000',
  margin: 0,
  fontStyle: 'italic',
  '@media(min-width: 768px)': {
    marginLeft: 25,
    fontSize: '28px',
    lineHeight: '44px'
  }
})

const PostList = styled.div``

const Post = styled.div`
  margin-bottom: 40px;
  padding-bottom: ${props => (props.isLast ? '0' : '40px')};
  border-bottom: ${props => (props.isLast ? '0' : '2px')} solid
    hsla(0, 0%, 0%, 0.1);

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`

const Title = styled.h3`
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

const StyledLink = styled(Link)({
  fontSize: '20px',
  marginTop: 10,
  marginBottom: 80,
  color: '#d22d64',
  display: 'inline-block',
  fontWeight: '400',
  textDecoration: 'none',
  borderBottom: '2px solid transparent',
  '&:hover': {
    borderBottomColor: 'currentColor'
  }
})

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
      <About>
        <Head src="/images/lars-200x200.jpg" alt="Lars Graubner" />
        <Slogan>
          Hi! I'm Lars Graubner, a software engineer creating apps with React
          and React Native.
        </Slogan>
      </About>
      <Heading>Recent articles</Heading>
      <PostList>
        {posts.map<JSX.Element>((post, index) => (
          <Post key={post.node.fields.slug} isLast={index === posts.length - 1}>
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
      <StyledLink to="/blog">View all articles</StyledLink>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
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
