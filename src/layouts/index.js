// @flow
import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { normalize } from 'polished'
import Helmet from 'react-helmet'

import 'prism-themes/themes/prism-atom-dark.css'

import { PRIMARY_COLOR_LIGHTER } from '../colors'

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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
`

const Wrapper = styled.div`
  padding: 70px 5% 30px;
  border-top: 4px solid ${PRIMARY_COLOR_LIGHTER};

  @media (min-width: 990px) {
    padding: 100px 50px 50px;
  }
`

type Props = {
  children: Function
}

const Template = ({ children }: Props) => (
  <Wrapper>
    <Helmet>
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
    {children()}
  </Wrapper>
)

export default Template
