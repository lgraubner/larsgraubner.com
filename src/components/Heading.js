import styled from 'styled-components'

export const H1 = styled.h1`
  font-size: 36px;
  margin: 0 0 1em;
  line-height: 1.1em;
  letter-spacing: 1px;

  @media (min-width: 768px) {
    font-size: 50px;
  }
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

export default styled.h3`
  color: hsl(0, 0%, 60%);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 20px;
`
