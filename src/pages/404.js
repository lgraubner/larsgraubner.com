// @flow
import React from 'react'
import Link from 'gatsby-link'

import Title from '../components/Title'
import Text from '../components/Text'

const Index = () => (
  <div>
    <Title>Not found</Title>
    <Text>The requested page was not found.</Text>
    <Text>
      <Link to="/">Back home</Link>
    </Text>
  </div>
)

export default Index

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`
