// @flow
import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { normalize } from 'polished'
import Helmet from 'react-helmet'

// $FlowFixMe
import 'prism-themes/themes/prism-atom-dark.css'

import Link from '../components/Link'
import Hero from '../components/Hero'

// eslint-disable-next-line
injectGlobal`
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

const Content = styled.main`
  max-width: 960px;
  margin: 200px auto;
`

const Header = styled.header`
  position: fixed;
  top: 75px;
  width: 100%;
  padding: 0 70px;
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

const NameIndex = Name.withComponent('h1')

const Footer = styled.footer`
  max-width: 960px;
  margin: 60px auto 100px;
  border-top: 1px solid hsl(0, 0%, 90%);
  padding-top: 80px;
`

const FooterNav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline;
    margin-right: 60px;
  }

  a {
    font-weight: 600;
    font-size: 16px;
    color: hsl(0, 0%, 0%);
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid currentColor;
    }
  }
`

type Props = {
  children: React.Node,
  index?: boolean
}

const Layout = ({ children, index = false }: Props) => (
  <>
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
      <link
        href="https://fonts.googleapis.com/css?family=Lora"
        rel="stylesheet"
      />
    </Helmet>
    <Header>
      {index ? (
        <NameIndex>
          <Link to="/">Lars Graubner</Link>
        </NameIndex>
      ) : (
        <Name>
          <Link to="/">Lars Graubner</Link>
        </Name>
      )}
    </Header>

    <Content>{children}</Content>

    <Footer>
      <Hero>
        Work inquiry, question or something else?{' '}
        <Link to="mailto:mail@larsgraubner.de">Email me</Link>.
      </Hero>

      <FooterNav>
        <ul>
          <li>
            <Link to="https://twitter.com/larsgraubner">Twitter</Link>
          </li>
          <li>
            <Link to="https://github.com/lgraubner">Github</Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/larsgraubner/">LinkedIn</Link>
          </li>
        </ul>
      </FooterNav>
    </Footer>
  </>
)

export default Layout
