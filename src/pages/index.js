// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Image from 'gatsby-image'

import Title from '../components/Title'
import Text from '../components/Text'

const Wrapper = styled.div`
  max-width: 620px;
  padding: 0 0 40px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const Logo = styled.div`
  display: block;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 3rem;
  width: 100px;
  height: 100px;
`

type Props = {
  data: Object
}

const Index = ({ data }: Props) => {
  const author = get(data, 'site.siteMetadata.author')
  return (
    <Wrapper>
      <Helmet title={`${author} - Front-end developer`} />
      <Logo>
        <Image
          resolutions={data.file.childImageSharp.resolutions}
          alt={author}
        />
      </Logo>
      <Title marginBottom="1.5rem">Lars Graubner</Title>
      <Text>
        You can find my code on <a href="/">GitHub</a>, short thoughts on{' '}
        <a href="/">Twitter</a> and blog posts on my{' '}
        <Link to="/blog">blog</Link>. This is just a sentence to fill up some
        more space. I{"'"}m rambling around the web.
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
      }
    }
    file(relativePath: { eq: "apple-touch-icon.png" }) {
      childImageSharp {
        resolutions(width: 100, height: 100) {
          ...GatsbyImageSharpResolutions_tracedSVG
        }
      }
    }
  }
`
