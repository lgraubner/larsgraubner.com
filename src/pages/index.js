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
          Early on I was interested in all kind of technical stuff. Soon I
          discovered web development and loved it which lasts till today. I
          started my career in an full service agency creating websites for
          customers using PHP. That time I was introduced to JavaScript and
          therefore jQuery which was the go to library to use back then. I
          really liked to create stuff with JavaScript and decided to focus on
          Front-end development solely.
        </P>
        <P>
          The JavaScript world started to change quickly at that time and new
          things like complex build processes and React were on the rise. I
          picked up React chose it to
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
