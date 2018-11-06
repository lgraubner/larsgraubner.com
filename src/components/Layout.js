// @flow
import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import Helmet from 'react-helmet'

import Link from '../components/Link'
import Hero from '../components/Hero'

// eslint-disable-next-line
const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-size: 100%;
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    -webkit-font-smoothing: antialiased;
    color: hsl(0, 0%, 0%);
  }
`

const Wrapper = styled.div`
  padding: 0 5%;

  @media (min-width: 768px) {
    padding: 0 18px;
  }
`

const Content = styled.main`
  max-width: 960px;
  margin: 50px auto;

  @media (min-width: 768px) {
    margin: 105px auto;
  }

  @media (min-width: 1400px) {
    margin-top: 180px;
  }
`

const Header = styled.header`
  max-width: 960px;
  margin: 40px auto 0;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    margin-top: 75px;
  }

  @media (min-width: 1400px) {
    max-width: none;
    width: 100%;
    padding: 0 70px;
    margin: 0;
    top: 75px;
    left: 0;
  }
`

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25em;
  margin: 0;

  a {
    color: hsl(0, 0%, 0%);
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid currentColor;
    }
  }
`

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  display: inline;
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: 768px) {
    margin-right}: 60px;
  }
`

const NavLink = styled(Link)`
  color: hsl(0, 0%, 33%);
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: hsl(0, 0%, 0%);
  }
`

type NavProps = {
  children: React.Node
}

const Nav = ({ children }: NavProps) => (
  <Ul>
    {React.Children.map(children, child => (
      <Li>{child}</Li>
    ))}
  </Ul>
)

const FooterNav = styled.div`
  margin-bottom: 30px;
`

const FooterLink = styled(Link)`
  font-weight: 600;
  font-size: 16px;
  color: hsl(0, 0%, 0%);
  text-decoration: none;

  &:hover {
    border-bottom: 2px solid currentColor;
  }
`

const Footer = styled.footer`
  max-width: 1400px;
  margin: 30px auto 0;
  padding: 50px 80px;
  background-color: hsl(200, 0%, 98%);
  text-align: center;

  @media (min-width: 768px) {
    margin-top: 60px;
    padding: 80px 100px;
  }
`

const Info = styled.div`
  font-size: 13px;
  color: hsl(0, 0%, 30%);
  margin-top: 20px;

  a {
    color: currentColor;
    text-decoration: none;
    background: linear-gradient(hsl(200, 55%, 73%), hsl(200, 55%, 73%));
    background-repeat: no-repeat;
    background-size: 100% 0.175em;
    background-position: left 0 bottom 0;

    &:hover {
      text-decoration: none;
    }

    &:focus {
      background: hsl(200, 55%, 77%);
      outline: 0;
    }
  }
`

const Copyright = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 60px;
`

type Props = {
  children: React.Node,
  index?: boolean,
  minimal?: boolean
}

const Layout = ({ children, index = false, minimal = false }: Props) => (
  <Wrapper>
    <Helmet>
      <html lang="en" />
      <meta name="robots" content="index,follow" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Helmet>
    <GlobalStyle />
    <Header>
      <Name as={index ? 'h1' : 'div'}>
        <Link to="/">Lars Graubner</Link>
      </Name>
      <Nav>
        <NavLink to="/">About</NavLink>
        <NavLink to="/blog/">Blog</NavLink>
      </Nav>
    </Header>

    <Content>{children}</Content>

    {!minimal && (
      <Footer>
        <FooterNav>
          <Nav>
            <NavLink to="/">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/privacy/">Privacy</NavLink>
            <NavLink to="/legal-notice/">Legal Notice</NavLink>
          </Nav>
        </FooterNav>
        <FooterNav>
          <Nav>
            <FooterLink to="https://twitter.com/larsgraubner">
              Twitter
            </FooterLink>

            <FooterLink to="https://github.com/lgraubner">Github</FooterLink>

            <FooterLink to="https://www.linkedin.com/in/larsgraubner/">
              LinkedIn
            </FooterLink>
          </Nav>
        </FooterNav>
        <Copyright>
          © 2018 Copyright Lars Graubner. All rights reserved.
        </Copyright>
        <Info>
          This site is built with{' '}
          <Link to="https://www.gatsbyjs.org/">GatsbyJS</Link> and hosted on{' '}
          <Link to="https://www.netlify.com/">Netlify</Link>. The source code
          can be found on{' '}
          <Link to="https://github.com/lgraubner/larsgraubner.com">Github</Link>
          .
        </Info>
      </Footer>
    )}
  </Wrapper>
)

export default Layout
