import React from 'react'
import isAbsolute from 'is-absolute-url'
import Link from 'gatsby-link'
import styled from 'styled-components'

const LinkWrapper = styled.span`
  a {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);

    &:hover {
      color: #1d69ff;
      border-color: currentColor;
    }
  }
`

export default ({ href, children, nofollow = false }) => (
  <LinkWrapper>
    {isAbsolute(href) ? (
      <a href={href} rel={`noopener noreferrer${nofollow ? ' nofollow' : ''}`}>
        {children}
      </a>
    ) : (
      <Link to={href}>{children}</Link>
    )}
  </LinkWrapper>
)
