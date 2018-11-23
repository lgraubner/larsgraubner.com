import styled from 'styled-components'

export default styled.p`
  font-size: 18px;
  line-height: 1.65em;
  margin: 0 auto 1.5em;
  color: hsla(0, 0%, 0%, 0.84);
  font-weight: 400;
  line-height: 1.7em;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: #d22d64;
    text-decoration: none;

    &:hover {
      border-bottom: 1px solid currentColor;
    }
  }
`
