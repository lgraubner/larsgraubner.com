// @flow
import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import Helmet from 'react-helmet'

import Link from './Link'

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

const Wrapper = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 5%;

  @media (min-width: 768px) {
    padding: 0;
  }
`

const Header = styled.header`
  margin: 40px 0 50px;

  @media (min-width: 768px) {
    margin: 100px 0 90px;
  }
`

const Name = styled.h1`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 40px;
  width: 100px;
  line-height: 0.9em;
  margin: 0 0 40px;

  @media (min-width: 768px) {
    font-size: 60px;
  }
`

const NameLink = styled(Link)`
  text-decoration: none;
  color: hsl(0, 0%, 0%);
`

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  display: inline-block;
  line-height: 2em;

  &:last-child {
    margin-right: 0;
  }

  ${({ separator }) =>
    separator &&
    `
  &:not(:last-child) a:after {
    content: '//';
    position: absolute;
    right: -30px;
    width: 30px;
    text-align: center;
    line-height: 1em;
    top: 1px;
  }
`}
`

const NavLink = styled(Link)`
  color: hsl(0, 0%, 0%);
  text-decoration: none;
  font-weight: 600;
  font-size: 17px;
  text-transform: uppercase;
  position: relative;
  margin-right: 30px;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  &:hover {
    border-bottom: 2px solid currentColor;
  }
`

type NavProps = {
  children: React.Node,
  className?: Object,
  separator?: boolean
}

const Nav = ({ children, className, separator = true }: NavProps) => (
  <nav className={className}>
    <Ul>
      {React.Children.map(children, child => (
        <Li separator={separator}>{child}</Li>
      ))}
    </Ul>
  </nav>
)

const Content = styled.main``

const Footer = styled.footer`
  margin: 80px auto;
  text-align: left;

  @media (min-width: 768px) {
    text-align: center;
    margin: 150px auto 100px;
  }
`

const Copyright = styled.div`
  color: hsl(0, 0%, 33%);
  font-size: 16px;
`

const FooterNav = styled(Nav)`
  margin-top: 20px;
`

const FooterLink = styled(Link)`
  font-size: 16px;
  color: hsl(0, 0%, 33%);
  text-decoration: none;
  margin: 0 20px 0 0;

  @media (min-width: 768px) {
    margin: 0 10px;
  }

  &:hover {
    color: hsl(0, 0%, 0%);
  }
`

type Props = {
  children: React.Node,
  index?: boolean,
  minimal?: boolean
}

const Layout = ({ children, index = false, minimal = false, data }: Props) => (
  <Wrapper>
    <Helmet>
      <html lang="en" />
      <meta name="robots" Wrapper="index,follow" />
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
        <NameLink to="/">Lars Graubner</NameLink>
      </Name>
      <Nav>
        <NavLink to="/">Blog</NavLink>
        <NavLink to="https://twitter.com/larsgraubner">Twitter</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </Nav>
    </Header>
    <Content>{children}</Content>
    <Footer>
      <Copyright>
        © {new Date().getFullYear()} Lars Graubner. All rights reserved.
      </Copyright>
      <FooterNav separator={false}>
        <FooterLink to="/">Blog</FooterLink>
        <FooterLink to="/about">About</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
        <FooterLink to="https://twitter.com/larsgraubner">Twitter</FooterLink>
        <FooterLink to="https://github.com/lgraubner">Github</FooterLink>
        <FooterLink to="/legal-notice">Legal</FooterLink>
        <FooterLink to="/privacy">Privacy</FooterLink>
      </FooterNav>
    </Footer>
  </Wrapper>
)

export default Layout
