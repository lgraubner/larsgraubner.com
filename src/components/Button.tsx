import styled from 'styled-components'

import Link from './Link'

const Button = styled(Link)({
  textDecoration: 'none',
  fontWeight: 500,
  textTransform: 'uppercase',
  marginTop: 25,
  marginLeft: '50%',
  transform: 'translateX(-50%)',
  letterSpacing: 0.5,
  display: 'inline-block',
  fontSize: 16,
  color: 'hsl(0, 0%, 100%)',
  border: 0,
  backgroundColor: 'hsl(0, 0%, 10%)',
  lineHeight: 1.4,
  padding: '1em 3em',
  borderRadius: 5,
  transition: 'all 150ms ease-in',
  '&:hover': {
    backgroundColor: 'hsl(0, 0%, 25%)'
  },
  '&:active': {
    transform: 'translateX(-50%) translateY(4px)'
  }
})

export default Button
