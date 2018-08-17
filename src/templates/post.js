// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import idx from 'idx'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content from '../components/Content'
import MarkdownContent from '../components/MarkdownContent'

const PostHeader = styled.header`
  margin-bottom: 2rem;
`

const Post = styled.article`
  margin-top: 4rem;
`

const Date = styled.div`
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1rem;
  margin-bottom: 0.75rem;
  color: #999;
`

const Title = styled.h1`
  font-weight: 600;
  color: #222;
  font-size: 2.4rem;
  margin: 0 0 2rem;
  line-height: 1.15em;

  @media (min-width: 768px) {
    font-size: 2.8rem;
  }
`

type Props = {
  data: Object,
  location: Object
}

const PostTemplate = ({ data, location }: Props) => {
  const post = data.markdownRemark
  const { description, title, date, dateRaw } =
    idx(data, _ => _.markdownRemark.frontmatter) || {}
  const author = idx(data, _ => _.site.siteMetadata.author) || ''
  const siteUrl = idx(data, _ => _.site.siteMetadata.siteUrl) || ''

  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />

        <meta property="og:url" content={siteUrl + location.pathname} />
        <meta property="og:site_name" content={author} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@larsgraubner" />
        <meta name="twitter:domain" content="larsgraubner.com" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">
          {`{
  "@context": "http://schema.org",
  "@type": "Article",
  "headline": "${title}",
  "author": {
    "@type": "Person",
    "name": "${author}"
  },
  "datePublished": "${dateRaw}",
  "description": "${description}",
  "image": {
    "@type": "ImageObject",
    "url": "https://larsgraubner.com/images/lars-1200x1200.jpg",
    "height": 1200,
    "width": 1200
  },
  "publisher": {
  	"@type": "Organization",
    "name": "Lars Graubner",
    "logo": {
   		"@type": "ImageObject",
  		"url": "https://larsgraubner.com/images/lars-1200x1200.jpg"
  	}
  }
}`}
        </script>
      </Helmet>
      <Post>
        <PostHeader>
          <Date>{date}</Date>
          <Title>{title}</Title>
        </PostHeader>
        <Content>
          <MarkdownContent dangerouslySetInnerHTML={{ __html: post.html }} />
        </Content>
      </Post>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
