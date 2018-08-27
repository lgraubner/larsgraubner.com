// @flow
import React from 'react'
import idx from 'idx'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Link from '../components/Link'
import P from '../components/Paragraph'
import Hero from '../components/Hero'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

const StyledImage = styled(Image)`
  margin-bottom: 60px;
  max-width: 100%;
  height: auto;

  @media (min-width: 768px) {
    margin-bottom: 100px;
  }
`

type Props = {
  data: Object
}

const Index = ({ data }: Props) => {
  const author = idx(data, _ => _.site.siteMetadata.author) || ''
  const description = idx(data, _ => _.site.siteMetadata.description)
  const siteUrl = idx(data, _ => _.site.siteMetadata.siteUrl)

  return (
    <Layout index>
      <Helmet>
        <title>{author} - Front-end developer</title>
        <meta name="robots" content="index,follow" />
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
      <Hero>
        I'm building Apps with React Native at{' '}
        <Link to="https://www.checkdomain.de" rel="nofollow">
          checkdomain
        </Link>{' '}
        and{' '}
        <Link to="http://www.idearockers.com/" rel="nofollow">
          Idearockers
        </Link>
        .
      </Hero>

      <StyledImage
        resolutions={data.file.childImageSharp.resolutions}
        fadeIn
        alt={author}
      />

      <Container>
        <SectionTitle>Introduction</SectionTitle>
        <P bold>
          Hi, I'm Lars. I'm a Front-end developer from Germany focusing on
          React, React Native and Node.js.
        </P>

        <P>
          I find the web fascinating as it offers so much possebilities.
          Especially JavaScript became more popular and capable of doing all
          kind of stuff in the last years. It's now possible to control IOT
          devices, build VR scenes and more with JavaScript. Therefore I became
          a passionate JavaScript Developer building apps and more. React serves
          me as tool to create this in a structured and easy to use way.
        </P>
      </Container>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        description
        siteUrl
      }
    }
    file(relativePath: { eq: "lars.jpg" }) {
      childImageSharp {
        resolutions(width: 960, height: 600) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
  }
`
