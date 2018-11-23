// @flow
import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import Helmet from 'react-helmet'

import Link from './Link'
import Icon, { icons } from './Icon'
import Nav, { HeaderNav } from './Nav'

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

const IconLink = styled(Link)`
  margin: 0 10px;
  display: inline-block;
  height: 26px;

  path {
    fill: hsl(0, 0%, 31%);
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
      <HeaderNav>
        <NavLink to="/">Blog</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/hireme">Hire me</NavLink>
      </HeaderNav>
    </Header>
    <Content>{children}</Content>
    <Footer>
      <Copyright>
        © {new Date().getFullYear()} Lars Graubner. All rights reserved.
      </Copyright>
      <FooterNav>
        <FooterLink to="/uses">Uses</FooterLink>
        <FooterLink to="/newsletter">Newsletter</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
        <FooterLink to="/legal-notice">Legal</FooterLink>
        <FooterLink to="/privacy">Privacy</FooterLink>
      </FooterNav>
      <FooterNav>
        <IconLink to="https://twitter.com/larsgraubner" title="Twitter">
          <Icon icon={icons.TWITTER} />
        </IconLink>
        <IconLink to="https://github.com/lgraubner" title="Github">
          <Icon icon={icons.GITHUB} />
        </IconLink>
        <IconLink
          to="https://www.linkedin.com/in/larsgraubner/"
          title="LinkedIn"
        >
          <Icon icon={icons.LINKEDIN} />
        </IconLink>
      </FooterNav>
    </Footer>
  </Wrapper>
)

export default Layout
