// @flow
import styled from 'styled-components'

import { BOLD_COLOR } from '../colors'

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.5rem;
  margin: 0 0 ${props => props.marginBottom || '1.25rem'};
  color: ${BOLD_COLOR};
  line-height: 1.15em;
`

export default Title
