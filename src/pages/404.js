// @flow
import React from 'react'
import Helmet from 'react-helmet'

const Index = () => (
  <div>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <h1>Not found</h1>
    <h2>The requested page could not be found</h2>
    <p>
      Please contact the owner of the site that linked you to the original URL
      and let them know their link is broken.
    </p>
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
