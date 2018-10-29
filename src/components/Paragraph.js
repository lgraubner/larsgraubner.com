import styled from 'styled-components'

export default styled.p`
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
    background: linear-gradient(hsl(200, 55%, 73%), hsl(200, 55%, 73%));
    background-repeat: no-repeat;
    background-size: 100% 0.175em;
    background-position: left 0 bottom 0;

    &:hover {
      text-decoration: none;
    }

    &:focus {
      background: hsl(200, 55%, 77%);
      outline: 0;
    }
  }
`
