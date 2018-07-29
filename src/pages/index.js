// @flow
import React from 'react'
import idx from 'idx'
import Helmet from 'react-helmet'

import Link from '../components/Link'
import P from '../components/Paragraph'

type Props = {
  data: Object
}

const Index = ({ data }: Props) => {
  const author = idx(data, _ => _.site.siteMetadata.author) || ''
  const siteUrl = idx(data, _ => _.site.siteMetadata.siteUrl) || ''
  const latestPost =
    idx(data, _ => _.allMarkdownRemark.edges[0].node.frontmatter) || {}

  const description =
    'Front-end developer from germany. Passionate about React and web performance.'
  return (
    <div>
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
      <P>
        At the moment I'm building Apps with React Native for{' '}
        <Link href="https://www.checkdomain.de">checkdomain</Link> and{' '}
        <Link href="http://www.idearockers.com/">Idearockers</Link>.
      </P>

      <P>
        I created{' '}
        <Link href="https://github.com/lgraubner/sitemap-generator">
          sitemap-generator
        </Link>{' '}
        and a bunch of{' '}
        <Link href="https://github.com/lgraubner">open source projects</Link>.
      </P>

      <P>
        You can find me on{' '}
        <Link href="https://twitter.com/larsgraubner">Twitter</Link> and{' '}
        <Link href="https://www.linkedin.com/in/larsgraubner/">LinkedIn</Link>.
      </P>

      <P>
        Occasionally I write down <Link href="blog">my thoughts</Link>. My
        latest writing is: <Link href={latestPost.url}>{latestPost.title}</Link>
      </P>

      <P>
        Any questions left?{' '}
        <Link href="mailto:hello@larsgraubner.com">
          Drop me a line via email
        </Link>
        , but please don
        {"'"}t take an answer for granted.
      </P>
    </div>
  )
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
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
