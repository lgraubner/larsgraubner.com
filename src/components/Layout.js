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
    padding: 0 40px;
  }
`

const Content = styled.main`
  max-width: 960px;
  margin: 50px auto;

  @media (min-width: 768px) {
    margin: 105px auto;
  }

  @media (min-width: 1400px) {
    margin-top: 250px;
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
    position: fixed;
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
  max-width: 960px;
  margin: 30px auto 100px;
  border-top: 1px solid hsl(0, 0%, 90%);
  padding-top: 50px;

  @media (min-width: 768px) {
    margin-top: 60px;
    padding-top: 80px;
  }
`

const Legal = styled.div`
  margin-top: 80px;
  color: hsl(0, 0%, 33%);
  line-height: 1.7em;

  @media (min-width: 768px) {
    margin-top: 120px;
  }
`

const LegalLink = styled(FooterLink)`
  color: hsl(0, 0%, 33%);
  font-weight: normal;

  &:hover {
    color: hsl(0, 0%, 0%);
    border: 0;
  }
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
        <Hero>
          Work inquiry, question or something else?{' '}
          <Link to="mailto:hello@larsgraubner.com">Email me</Link>.
        </Hero>

        <Nav>
          <FooterLink to="https://twitter.com/larsgraubner">Twitter</FooterLink>

          <FooterLink to="https://github.com/lgraubner">Github</FooterLink>

          <FooterLink to="https://www.linkedin.com/in/larsgraubner/">
            LinkedIn
          </FooterLink>
        </Nav>
        <Legal>
          <Nav>
            <span>
              Licensed under{' '}
              <LegalLink to="https://creativecommons.org/licenses/by-sa/3.0/">
                CC BY-SA 3.0
              </LegalLink>
            </span>
            <LegalLink to="/privacy/">Privacy</LegalLink>
            <LegalLink to="/legal-notice/">Legal Notice</LegalLink>
          </Nav>
        </Legal>
      </Footer>
    )}
  </Wrapper>
)

export default Layout
