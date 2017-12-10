// @flow
import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

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

const Template = ({ children }: Props) => <Wrapper>{children()}</Wrapper>

export default Template
