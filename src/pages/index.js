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
import Newsletter from '../components/Newsletter'

const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
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
        <title>{author} - Web Developer</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content={description} />
        <meta property="og:title" content={`${author} - Web Developer`} />
        <meta property="og:type" content="website" />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={author} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@larsgraubner" />
        <meta name="twitter:domain" content="larsgraubner.com" />
        <meta name="twitter:title" content={`${author} – Web Developer`} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Hero>
        I'm building Apps with React Native at{' '}
        <Link to="https://www.checkdomain.de" rel="nofollow">
          checkdomain
        </Link>{' '}
        and{' '}
        <Link to="http://www.idearockers.com" rel="nofollow">
          idearockers
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
          The web is my playground. I love to learn new things. My goal is to
          write clean and maintainable code to create great apps and websites.
          Originally, I started my career in an advertising agency, but over
          time, I was more drawn to larger and more complex projects. That's my
          job and passion today.
        </P>

        <P>
          You can find some of my code on{' '}
          <Link to="https://github.com/lgraubner">Github</Link>, check my CV on{' '}
          <Link to="https://www.linkedin.com/in/larsgraubner/">LinkedIn</Link>{' '}
          (ugh), follow my thoughts on{' '}
          <Link to="https://twitter.com/larsgraubner">Twitter</Link> or read
          articles on my <Link to="/blog/">Blog</Link>. When I'm not coding, I
          usually spend time with my family at the sea or somewhere else
          outside.
        </P>

        <SectionTitle>What drives me</SectionTitle>
        <P bold>
          I admire good user experience and love to share what I've created.
        </P>

        <P>
          Thats why I love to work with great designers. Combined with
          well-thought-out code, this results in the best possible user
          experience. Even though I'm not a designer I think I can say that I
          have a good eye for design.
        </P>

        <P>
          Much of the internet uses open source code, which was contributed by
          all sorts of people in their spare time. That's why whenever possible
          I try to give something back. One of my more popular open source
          projects is a package called{' '}
          <Link to="https://github.com/lgraubner/sitemap-generator">
            sitemap-generator
          </Link>
          .
        </P>
        <Newsletter />
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
