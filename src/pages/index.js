// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Title from '../components/Title'
import Text from '../components/Text'
import Logo from '../components/Logo'

const Wrapper = styled.div`
  max-width: 620px;
  padding: 80px 0 40px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const IndexTitle = Title.extend`
  margin: 1rem auto 1.5rem;
`

type Props = {
  data: Object
}

const Index = ({ data }: Props) => {
  const author = get(data, 'site.siteMetadata.author')
  const siteUrl = get(data, 'site.siteMetadata.siteUrl')

  const description =
    'Front-end developer from germany. Passionate about React and web performance.'
  return (
    <Wrapper>
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
        <script type="application/ld+json">
          {`{
  "@context" : "http://schema.org",
  "@type" : "Person",
  "name" : "${author}",
  "image": "https://larsgraubner.com/images/lars-1200x1200.jpg",
  "jobTitle": "Front-end developer",
  "url" : "https://larsgraubner.com",
  "sameAs" : ["https://twitter.com/larsgraubner"]
}`}
        </script>
      </Helmet>
      <Logo resolutions={data.file.childImageSharp.resolutions} />
      <IndexTitle>Lars Graubner</IndexTitle>
      <Text>
        I{"'"}m a passionate front-end developer based in Lübeck, Germany
        focusing on JavaScript and React Single Page Applications. I created a
        tool called{' '}
        <a href="https://github.com/lgraubner/sitemap-generator" rel="nofollow">
          sitemap-generator
        </a>{' '}
        and more{' '}
        <a href="https://github.com/lgraubner" rel="nofollow">
          open source stuff
        </a>. You can follow and contact me on{' '}
        <a href="https://twitter.com/larsgraubner" rel="nofollow">
          Twitter
        </a>{' '}
        or check out my <Link to="/blog/">blog</Link>.
      </Text>
    </Wrapper>
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
  }
`
