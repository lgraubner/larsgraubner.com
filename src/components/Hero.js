import styled from 'styled-components'

const Hero = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 60px;
  line-height: 1.2em;

  @media screen and (min-width: 768px) {
    font-size: 74px;
    margin-bottom: 100px;
  }

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
