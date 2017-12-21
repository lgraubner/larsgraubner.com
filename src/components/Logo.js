// @flow
import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: ${props => (props.small ? '40px' : '90px')};
  height: ${props => (props.small ? '40px' : '90px')};
`

type Props = {
  resolutions: Object,
  // eslint-disable-next-line
  small?: boolean
}

const Logo = ({ resolutions, small = false }: Props) => (
  <Wrapper small={small}>
    <Image resolutions={resolutions} alt="Lars Graubner" />
  </Wrapper>
)

export default Logo
