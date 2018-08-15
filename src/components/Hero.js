import styled from 'styled-components'

const Hero = styled.p`
  font-size: 74px;
  font-weight: bold;
  margin: 0 0 100px;
  line-height: 1.2em;

  a {
    text-decoration: underline;
    color: hsl(0, 0%, 0%);

    &:hover {
      border: 0;
      color: hsla(0, 0%, 0%, 0.75);
    }
  }
`

export default Hero
