import styled from 'styled-components'

export const H1 = styled.h1`
  font-family: Consolas, Monaco, sans-serif;
  font-weight: normal;
  font-size: 28px;
  margin: 0 0 2.5rem;
`

export const H2 = H1.withComponent('h2').extend`
  margin: 3rem 0 1.5rem;
  font-size: 22px;
`

export const H3 = H1.withComponent('h3').extend`
  font-size: 22px;
  font-family: Times, serif;
  font-weight: bold;
  margin: 2rem 0 1rem;
`
