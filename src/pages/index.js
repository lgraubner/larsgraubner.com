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
  const siteUrl = idx(data, _ => _.site.siteMetadata.siteUrl) || ''
  console.log(data.file.childImageSharp.resolutions)

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

      <StyledImage resolutions={data.file.childImageSharp.resolutions} fadeIn />

      <Container>
        <SectionTitle>Introduction</SectionTitle>
        <P bold>
          Hi, I'm Lars. I'm a Front-end developer from Germany focusing on
          React, React Native and Node.js.
        </P>

        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
          turpis libero. Suspendisse consequat leo a nulla malesuada mollis.
          Curabitur molestie orci massa, sed cursus mi pulvinar sed. Aliquam
          lobortis fringilla tincidunt. Proin eleifend quam sit amet purus
          ultrices efficitur. Fusce felis enim, gravida ultricies ultricies
          ultrices, aliquam vel eros. Donec malesuada lorem at laoreet rutrum.
          Morbi egestas tellus ante, porttitor consequat metus pulvinar a. Proin
          faucibus ante id erat dapibus ultricies. Integer iaculis dui sed
          lacinia feugiat. Nulla facilisi.
        </P>
        <P>
          Nam enim tortor, consectetur sed nisi eu, tristique lobortis risus.
          Suspendisse potenti. Suspendisse volutpat orci quis facilisis
          consectetur. Nunc quis mi aliquam, interdum quam sit amet, ultrices
          sapien. Proin finibus pulvinar elit ut volutpat. Proin sit amet
          convallis ipsum. Sed euismod neque id nibh posuere molestie.
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
