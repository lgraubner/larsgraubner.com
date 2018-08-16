import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: ${props => (props.bold ? '28px' : '19px')};
  line-height: 1.65em;
  margin: 0 auto 1.5em;
  color: ${props => (props.bold ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 33%)')};
  font-weight: ${props => (props.bold ? '600' : '400')};
  line-height: ${props => (props.bold ? '1.4em' : '1.65em')};

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
