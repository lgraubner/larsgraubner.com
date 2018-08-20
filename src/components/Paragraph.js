import styled, { css } from 'styled-components'

export const ParagraphStyles = css`
  font-size: ${props => (props.bold ? '26px' : '18px')};
  line-height: 1.65em;
  margin: 0 auto 1.5em;
  color: ${props => (props.bold ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 33%)')};
  font-weight: ${props => (props.bold ? '600' : '400')};
  line-height: ${props => (props.bold ? '1.4em' : '1.7em')};

  @media (min-width: 768px) {
    font-size: ${props => (props.bold ? '28px' : '19px')};
  }

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 1px solid currentColor;

    &:hover {
      color: hsl(0, 0%, 20%);
    }
  }
`

export default styled.p`
  ${ParagraphStyles};
`
