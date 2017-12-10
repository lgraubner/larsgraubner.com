// @flow
import styled from 'styled-components'

import { TEXT_COLOR, BOLD_COLOR, PRIMARY_COLOR } from '../colors'

export const textStyles = () => ({
  lineHeight: '2rem',
  fontSize: '1.125rem',
  margin: '0 0 2rem',
  color: TEXT_COLOR,

  a: {
    color: BOLD_COLOR,
    borderBottom: `2px solid ${PRIMARY_COLOR}`,
    textDecoration: 'none',

    '&:hover': {
      borderColor: 'transparent'
    }
  }
})

const Text = styled.p`
  ${textStyles()};
`

export default Text
