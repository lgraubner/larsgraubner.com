import React from 'react'
import isAbsolute from 'is-absolute-url'
import { Link } from 'gatsby'

export default ({ to, children, nofollow = false, ...props }) =>
  isAbsolute(to) ? (
    <a
      href={to}
      rel={`noopener noreferrer${nofollow ? ' nofollow' : ''}`}
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
