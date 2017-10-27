import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash.get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 620px;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 22px;
  margin: 0 0 2.5vh;
  color: #222;
  text-decoration: none;
`

const Subtitle = styled.h2`
  font-size: 18px;
  color: #222;
  margin: 0 0 10vh;
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
    border-bottom: 3px solid #ddd;
    text-decoration: none;
    font-size: 18px;

    &:hover {
      border-bottom: 0;
    }
  }
`

const Index = ({ data }) => {
  const author = get(data, 'site.siteMetadata.author')
  return (
    <Wrapper>
      <Helmet title={`Hi, I'm ${author}`} />
      <Title>Hi, I{"'"}m Lars Graubner</Title>
      <Subtitle>
        I{"'"}ve been addicted to the web since my childhood. At the moment I{"'"}m
        working as a front-end developer.
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
