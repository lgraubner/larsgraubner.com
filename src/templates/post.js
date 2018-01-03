// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import get from 'lodash/get'
import Link from 'gatsby-link'

import Title from '../components/Title'

import { textStyles } from '../components/Text'

import { LIGHT_COLOR, BOLD_COLOR, PRIMARY_COLOR } from '../colors'

const Wrapper = styled.div`
  max-width: 620px;
  margin: 0 auto 8rem;
`

const BackLink = styled.div`
  margin-bottom: 3rem;

  a {
    color: #fff;
    text-decoration: none;
    background-color: ${LIGHT_COLOR};
    padding: 5px;
    border-radius: 3px;
    transition: background 150ms ease-in;

    &:hover,
    &:focus {
      background-color: ${PRIMARY_COLOR};
    }
  }
`

const PostHeader = styled.header`
  margin-bottom: 2rem;
`

const Post = styled.article`
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
  data: Object,
  location: Object
}

const BlogPostTemplate = ({ data, location }: Props) => {
  const post = data.markdownRemark
  const { description, title, date, dateRaw } = data.markdownRemark.frontmatter
  const author = get(data, 'site.siteMetadata.author')
  const siteUrl = get(data, 'site.siteMetadata.siteUrl')

  return (
    <Wrapper>
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
        <BackLink>
          <Link to="/blog/">&larr; Lars{"'"} Blog</Link>
        </BackLink>
        <PostHeader>
          <Date>{date}</Date>
          <Title>{title}</Title>
        </PostHeader>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Post>
    </Wrapper>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        author
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        dateRaw: date
      }
    }
    file(relativePath: { eq: "apple-touch-icon.png" }) {
      childImageSharp {
        resolutions(width: 40, height: 40) {
          ...GatsbyImageSharpResolutions_tracedSVG
        }
      }
    }
  }
`
