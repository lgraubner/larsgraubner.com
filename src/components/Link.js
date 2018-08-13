import React from 'react'
import isAbsolute from 'is-absolute-url'
import { Link } from 'gatsby'
import styled from 'styled-components'

const LinkWrapper = styled.span`
  a {
    color: #000;
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid currentColor;
    }
  }
`

export default ({ href, children, nofollow = false, ...props }) => (
  <LinkWrapper>
    {isAbsolute(href) ? (
      <a
        href={href}
        rel={`noopener noreferrer${nofollow ? ' nofollow' : ''}`}
        {...props}
      >
        {children}
      </a>
    ) : (
      <Link to={href} {...props}>
        {children}
      </Link>
    )}
  </LinkWrapper>
)
