// @flow
import React from 'react'
import Helmet from 'react-helmet'
import idx from 'idx'

import { H1 } from '../components/Heading'
import Link from '../components/Link'
import { Ul, Li } from '../components/List'

type Props = {
  data: Object
}

export default ({ data }: Props) => {
  const posts = idx(data, _ => _.allMarkdownRemark.edges) || []

  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Writing</title>
      </Helmet>
      <H1>Writing</H1>
      <Ul>
        {posts.map(post => (
          <Li key={post.node.frontmatter.url}>
            <Link href={post.node.frontmatter.url}>
              {post.node.frontmatter.title}
            </Link>
          </Li>
        ))}
      </Ul>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            url
            title
          }
        }
      }
    }
  }
`
