import React from 'react'
import styled from 'styled-components'

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  display: inline-block;
  line-height: 2em;

  &:last-child {
    margin-right: 0;
  }
`

const HeaderLi = styled.li`
  display: inline-block;
  line-height: 2em;

  &:last-child {
    margin-right: 0;
  }

  &:not(:last-child) a:after {
    content: '//';
    position: absolute;
    right: -30px;
    width: 30px;
    text-align: center;
    line-height: 1em;
    top: 1px;
  }
`

type Props = {
  children: React.ReactNode
  className?: string
}

const Nav = ({ children, className }: Props) => (
  <nav className={className}>
    <Ul>
      {React.Children.map(children, child => (
        <Li>{child}</Li>
      ))}
    </Ul>
  </nav>
)

export const HeaderNav = ({ children, className }: Props) => (
  <nav className={className}>
    <Ul>
      {React.Children.map(children, child => (
        <HeaderLi>{child}</HeaderLi>
      ))}
    </Ul>
  </nav>
)

export default Nav
