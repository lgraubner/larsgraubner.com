import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import idx from 'idx'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'

import Layout from '../components/Layout'
import { H1, H2, H3 } from '../components/Heading'
import P from '../components/Paragraph'
import NewsletterBox from '../components/NewsletterBox'
import Link from '../components/Link'

const Post = styled.article`
  margin-top: 4rem;
  margin-bottom: 50px;

  p:not(pre) > code[class*='language-'] {
    font-family: Menlo, Monaco, 'Courier New', Courier, monospace;
    background: #f9f9f9;
    padding: 3px 4px;
    margin: 0 2px;
    font-size: 16px;
    color: hsla(0, 0%, 0%, 0.84);
    border-radius: 0;
    border: 0;
    text-shadow: none;
  }

  .gatsby-highlight {
    margin: 40px 0;

    pre {
      display: block;
      margin: 0;
      padding: 20px;
      font-size: 1rem;
      line-height: 1.5em;
      white-space: pre-wrap;
      word-break: break-all;
      word-wrap: break-word;
      background-color: #f9f9f9;
    }

    pre code {
      font-family: Menlo, Monaco, 'Courier New', Courier, monospace;
      padding: 0;
      font-size: 100%;
      color: inherit;
      background-color: transparent;
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

const PostFooter = styled.div({
  marginBottom: 80
})

const PostFooterLink = styled(Link)({
  color: '#d22d64',
  textDecoration: 'none',
  fontSize: 20,
  '&:hover': {
    borderBottom: '1px solid currentColor'
  }
})

const Separator = styled.span({
  margin: '0 10px',
  fontSize: 20,
  color: 'hsla(0, 0%, 0%, 0.84)'
})

type Props = {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
    markdownRemark: {
      id: string
      htmlAst: any
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        description: string
        date: string
      }
    }
  }
  location: {
    pathname: string
  }
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
  const { description, title, date, dateRaw }: any =
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
      <PostFooter>
        <PostFooterLink
          to={`https://twitter.com/intent/tweet?text=${encodeURI(
            title
          )}&url=${encodeURI(siteUrl + location.pathname)}&via=lgraubner`}
        >
          Share on Twitter
        </PostFooterLink>
        <Separator>•</Separator>
        <PostFooterLink
          to={`https://github.com/lgraubner/larsgraubner.com/edit/master/content/blog${post.fields.slug}index.md`}
        >
          Edit post on Github
        </PostFooterLink>
      </PostFooter>
      <NewsletterBox />
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
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`
