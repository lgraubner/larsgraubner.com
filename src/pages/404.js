// @flow
import React from 'react'
import Helmet from 'react-helmet'

import Title from '../components/Title'
import Text from '../components/Text'

const Index = () => (
  <div>
    <Title>Page Not found</Title>
    <Text>The requested page was not found.</Text>
    <Text>
      Please contact the owner of the site that linked you to the original URL
      and let them know their link is broken.
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
