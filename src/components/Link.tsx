import { Link } from 'gatsby'
import isAbsolute from 'is-absolute-url'
import React from 'react'

type Props = {
  to: string
  children: React.ReactNode
  nofollow?: boolean
  title?: string
  rel?: string
}

export default ({ to, children, nofollow = false, ...props }: Props) =>
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
