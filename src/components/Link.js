import React from 'react'
import isAbsolute from 'is-absolute-url'
import Link from 'gatsby-link'

export default ({ href, children, nofollow = false }) => (
  <span>
    {isAbsolute(href) ? (
      <a href={href} rel={`noopener noreferrer${nofollow ? ' nofollow' : ''}`}>
        {children}
      </a>
    ) : (
      <Link to={href}>{children}</Link>
    )}
  </span>
)
