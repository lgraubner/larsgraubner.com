// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { H1 } from '../components/Heading'
import P from '../components/Paragraph'

const Index = () => (
  <Layout>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <H1>Not found</H1>
    <P>
      The requested page could not be found. Please contact the owner of the
      site that linked you to the original URL and let them know their link is
      broken.
    </P>
  </Layout>
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
