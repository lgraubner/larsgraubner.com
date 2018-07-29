import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: 19px;
  line-height: 1.65em;
  margin: 0 0 1.5em;
  color: #444;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  }
`

export default Paragraph
