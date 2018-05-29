import styled from 'styled-components'

export const Ul = styled.ul`
  padding: 0 0 0 2rem;
  margin: 2rem 0;
  list-style-type: lower-latin;

  &:last-of-type {
    list-style-type: lower-roman;
  }
`

export const Li = styled.li`
  font-size: 20px;
  &:not(:last-child) {
    margin-bottom: 1em;
  }
`
