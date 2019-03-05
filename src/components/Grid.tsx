import styled from 'styled-components'

export const Row = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 -20px',
  '@media(min-width: 768px)': {
    flexDirection: 'row'
  }
})

export const Col = styled.div({
  width: '100%',
  padding: '0 20px',
  '@media(min-width: 768px)': {
    width: '50%'
  }
})
