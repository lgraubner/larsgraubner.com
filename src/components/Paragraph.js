import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: 19px;
  line-height: 1.65em;
  margin: 0 auto 1.5em;
  color: hsl(0, 0%, 33%);
  max-width: 640px;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: hsl(0, 0%, 33%);

    &:hover {
      color: hsl(0, 0%, 20%);
    }
  }
`

export default Paragraph
