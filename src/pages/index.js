// @flow
import React from 'react'
import idx from 'idx'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Link from '../components/Link'
import P from '../components/Paragraph'

type Props = {
  data: Object
}

const Big = styled.p`
  font-size: 74px;
  font-weight: bold;
  margin: 0 0 100px;
  line-height: 1.2em;

  a {
    text-decoration: underline;
    color: hsl(0, 0%, 0%);

    &:hover {
      border: 0;
      color: hsla(0, 0%, 0%, 0.75);
    }
  }
`

const Index = ({ data }: Props) => {
  const author = idx(data, _ => _.site.siteMetadata.author) || ''
  const siteUrl = idx(data, _ => _.site.siteMetadata.siteUrl) || ''
  const latestPost =
    idx(data, _ => _.allMarkdownRemark.edges[0].node.frontmatter) || {}

  const description =
    'Front-end developer from germany. Passionate about React and web performance.'
  return (
    <Layout index>
      <Helmet>
        <title>{`${author} - Front-end developer`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${author} - Front-end developer`} />
        <meta property="og:type" content="website" />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={author} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@larsgraubner" />
        <meta name="twitter:domain" content="larsgraubner.com" />
        <meta
          name="twitter:title"
          content={`${author} – Front-end Developer`}
        />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Big>
        I'm building Apps with React Native at{' '}
        <Link to="https://www.checkdomain.de" rel="nofollow">
          checkdomain
        </Link>{' '}
        and{' '}
        <Link to="http://www.idearockers.com/" rel="nofollow">
          Idearockers
        </Link>
        .
      </Big>

      <P>
        I created{' '}
        <Link to="https://github.com/lgraubner/sitemap-generator">
          sitemap-generator
        </Link>{' '}
        and a bunch of{' '}
        <Link to="https://github.com/lgraubner">open source projects</Link>.
      </P>

      <P>
        You can find me on{' '}
        <Link to="https://twitter.com/larsgraubner">Twitter</Link> and{' '}
        <Link to="https://www.linkedin.com/in/larsgraubner/">LinkedIn</Link>.
      </P>

      <P>
        Occasionally I write down <Link to="/blog">my thoughts</Link>. My latest
        writing is <Link to={latestPost.url}>{latestPost.title}</Link>.
      </P>

      <P>
        Any questions left?{' '}
        <Link to="mailto:hello@larsgraubner.com">Drop me a line via email</Link>
        , but please don
        {"'"}t take an answer for granted.
      </P>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        siteUrl
      }
    }
    file(relativePath: { eq: "lars-180x180.jpg" }) {
      childImageSharp {
        resolutions(width: 90, height: 90, quality: 90) {
          ...GatsbyImageSharpResolutions_tracedSVG
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            url
            title
          }
        }
      }
    }
  }
`
