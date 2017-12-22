// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { TEXT_COLOR, BOLD_COLOR } from '../colors'

import Title from '../components/Title'
import Text from '../components/Text'
import Logo from '../components/Logo'

const Wrapper = styled.div`
  max-width: 620px;
  padding: 0 0 40px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const IndexTitle = Title.extend`
  margin: 1rem auto 1.5rem;
`

const HireMe = styled.p`
  background: rgba(0, 0, 0, 0.05);
  margin: 3rem auto 0;
  padding: 0.7rem;
  color: ${TEXT_COLOR};
  font-size: 1rem;
  line-height: 1.7em;
  position: relative;
  font-style: italic;
  border-radius: 2px;

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
      </Helmet>
      <Logo resolutions={data.file.childImageSharp.resolutions} />
      <IndexTitle>Lars Graubner</IndexTitle>
      <Text>
        I{"'"}m a passionate front-end developer focusing on JavaScript and
        React. You can follow me on{' '}
        <a href="https://twitter.com/larsgraubner">Twitter</a> or{' '}
        <Link to="/blog">read my posts</Link>. Check out my open source projects
        on <a href="https://github.com/lgraubner">GitHub</a>.
      </Text>
      <HireMe>
        Need help building your next React project?{' '}
        <a href="mailto:mail@larsgraubner.de">Hire me</a>.
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
    file(relativePath: { eq: "apple-touch-icon.png" }) {
      childImageSharp {
        resolutions(width: 90, height: 90) {
          ...GatsbyImageSharpResolutions_tracedSVG
        }
      }
    }
  }
`
