// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash.get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 620px;
  padding: 100px 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 22px;
  margin: 0 0 1em;
  color: #222;
  text-decoration: none;
`

const Subtitle = styled.h2`
  font-size: 18px;
  color: #222;
  margin: 0 0 3em;
  font-weight: 400;
  line-height: 1.7em;
`

const Nav = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline;
    margin: 0 30px;
  }

  a {
    color: #222;
    border-bottom: 1px solid currentColor;
    text-decoration: none;
    font-size: 18px;

    &:hover {
      border-bottom: 0;
    }
  }
`

const Logo = styled.img`
  display: block;
  border-radius: 50%;
  margin: 0 auto 3em;
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
      <Logo src="/apple-touch-icon.png" alt="Lars Graubner" />
      <Title>Hi, I{"'"}m Lars Graubner</Title>
      <Subtitle>
        I{"'"}ve been addicted to the web since my childhood. At the moment I{
          "'"
        }m working as a front-end developer.
      </Subtitle>
      <Nav>
        <ul>
          <li>
            <Link to="/blog/">Blog</Link>
          </li>
          <li>
            <a href="https://twitter.com/larsgraubner">Code</a>
          </li>
          <li>
            <a href="https://twitter.com/larsgraubner">Twitter</a>
          </li>
        </ul>
      </Nav>
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
  }
`
