// @flow
import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { normalize } from 'polished'
import Helmet from 'react-helmet'

// $FlowFixMe
import 'prism-themes/themes/prism-atom-dark.css'

import Link from '../components/Link'

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
    color: #000;
    margin: 0;
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
`

const NameIndex = Name.withComponent('h1')

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
    </Helmet>
    <Header>
      {index ? (
        <NameIndex>
          <Link href="/">Lars Graubner</Link>
        </NameIndex>
      ) : (
        <Name>
          <Link href="/">Lars Graubner</Link>
        </Name>
      )}
    </Header>

    <Content>{children}</Content>
  </>
)

export default Layout
