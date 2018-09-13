// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import idx from 'idx'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'

import Layout from '../components/Layout'
import Container from '../components/Container'
import { H1, H2, H3 } from '../components/Heading'
import P from '../components/Paragraph'
import Newsletter from '../components/Newsletter'

const Post = styled.article`
  margin-top: 4rem;

  p > code {
    font-size: 85%;
    word-break: break-word;
    padding: 0;
    background-color: transparent;
    color: hsla(332, 79%, 58%);
    border-radius: 0;
    padding: 0;
    line-height: inherit;
  }

  .gatsby-highlight {
    margin: 50px 0;

    pre {
      margin: 0;
      border-radius: 3px;
      padding: 20px 20px;
      font-size: 0.9rem;
      line-height: 1.6em;
    }

    code {
      line-height: 1.55em;
    }
  }
`

const Date = styled.div`
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1em;
  margin-bottom: 1em;
  color: hsl(0, 0%, 60%);
  font-weight: 600;
`

type Props = {
  data: Object,
  location: Object
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    p: P,
    h2: H2,
    h3: H3
  }
}).Compiler

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
        <Container>
          <Date>{date}</Date>
          <H1>{title}</H1>
          {renderAst(post.htmlAst)}

          <Newsletter />
        </Container>
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
      htmlAst
      frontmatter {
        title
        description
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`
