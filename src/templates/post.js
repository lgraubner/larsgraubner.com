// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import idx from 'idx'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'

import Layout from '../components/Layout'
import { H1, H2, H3 } from '../components/Heading'
import P from '../components/Paragraph'
import Newsletter from '../components/Newsletter'
import Link from '../components/Link'

const Post = styled.article`
  margin-top: 4rem;

  p > code {
    font-family: Menlo, Monaco, 'Courier New', Courier, monospace;
    background: hsla(0, 0%, 0%, 0.05);
    padding: 3px 4px;
    margin: 0 2px;
    font-size: 16px;
    color: hsla(0, 0%, 0%, 0.84);
    border-radius: 0;
  }

  .gatsby-highlight {
    margin: 30px 0;

    pre {
      background: hsla(0, 0%, 0%, 0.05);
      margin: 0;
      padding: 20px 20px;
      font-size: 0.9rem;
      line-height: 1.6em;
    }

    code {
      background: transparent;
      line-height: 1.55em;
      color: hsla(0, 0%, 0%, 0.84);
    }
  }

  .twitter-tweet {
    margin: 50px auto !important;
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

const Twitter = styled.div`
  margin-top: 50px;
  font-size: 18px;
  font-weight: 500;
  color: hsla(0, 0%, 0%, 0.84);
  line-height: 1.4em;
  border-top: 1px solid hsla(0, 0%, 0%, 0.65);
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.65);
  padding: 15px 10px;
  text-align: center;

  @media (min-width: 768px) {
    margin-top: 70px;
    font-size: 20px;
    padding: 20px 30px;
  }
`

const TwitterLink = styled(Link)`
  color: #00aced;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const NewsletterWrapper = styled.div`
  margin-top: 50px;

  @media (min-width: 768px) {
    margin-top: 90px;
  }
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
  const siteUrl = idx(data, _ => _.site.siteMetadata.siteUrl) || ''

  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />

        <meta property="og:url" content={siteUrl + location.pathname} />
        <meta property="og:site_name" content="Lars Graubner's Blog" />
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
    "name": "Lars Graubner"
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
        <Date>{date}</Date>
        <H1>{title}</H1>
        {renderAst(post.htmlAst)}
      </Post>
      <Twitter>
        Like this post? I'm{' '}
        <TwitterLink to="https://twitter.com/larsgraubner">
          @larsgraubner
        </TwitterLink>{' '}
        on Twitter. Follow me!
      </Twitter>
      <NewsletterWrapper>
        <Newsletter />
      </NewsletterWrapper>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
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
