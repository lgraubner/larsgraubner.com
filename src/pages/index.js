// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled, { keyframes } from 'styled-components'

import { TEXT_COLOR, BOLD_COLOR } from '../colors'

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

const HireMe = styled.div`
  margin: 3rem auto 0;
`

const HireMeText = styled.div`
  line-height: 1.7em;
  color: ${TEXT_COLOR};
  font-size: 1rem;
  position: relative;
  display: inline-block;

  a {
    color: ${BOLD_COLOR};
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid currentColor;

    &:hover {
      border: 0;
    }
  }
`

const pulsate = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(2.5);
    opacity: 0;
  }
`

const Dot = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: rgba(0, 255, 0, 0.6);
  border-radius: 50%;
  margin-right: 10px;
  position: relative;

  &:after {
    content: '';
    background-color: rgba(0, 255, 0, 0.4);
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    border-radius: 50%;
    animation: ${pulsate} 1.5s ease-out infinite;
    left: 0;
    top: 0;
  }
`

type Props = {
  data: Object
}

const Index = ({ data }: Props) => {
  const author = get(data, 'site.siteMetadata.author')
  return (
    <Wrapper>
      <Helmet>
        <title>{`${author} - Front-end developer`}</title>
        <meta
          name="description"
          content="Front-end developer from germany. Passionate about React and web performance."
        />
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
        I{"'"}m a passionate front-end developer focusing on JavaScript and
        React. I created{' '}
        <a href="https://github.com/lgraubner/sitemap-generator">
          sitemap-generator
        </a>{' '}
        and more <a href="https://github.com/lgraubner">open source projects</a>.
        You can follow me on{' '}
        <a href="https://twitter.com/larsgraubner">Twitter</a> or check out my{' '}
        <Link to="/blog/">blog</Link>.
      </Text>
      <HireMe>
        <Dot />
        <HireMeText>
          I{"'"}m available for hire.{' '}
          <a href="mailto:mail@larsgraubner.de">Learn more</a>.
        </HireMeText>
      </HireMe>
    </Wrapper>
  )
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        author
      }
    }
    file(relativePath: { eq: "lars-1200x1200.jpg" }) {
      childImageSharp {
        resolutions(width: 90, height: 90) {
          ...GatsbyImageSharpResolutions_tracedSVG
        }
      }
    }
  }
`
