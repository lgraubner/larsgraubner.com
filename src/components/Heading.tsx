import styled from 'styled-components'

export const H1 = styled.h1({
  fontSize: 36,
  margin: '0 0 1em',
  lineHeight: 1.1,
  letterSpacing: 1,
  '@media(min-width: 768px)': {
    fontSize: 50
  }
})

export const H2 = styled.h2({
  margin: '1.5em 0 1em',
  fontSize: 28,
  fontWeight: 600,
  lineHeight: 1.3,
  '@media(min-width:768px)': {
    fontSize: 32
  }
})

export const H3 = styled.h3({
  margin: '1.5em 0 1em',
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 1.3,
  '@media(min-width:768px)': {
    fontSize: 26
  }
})
