// @flow
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'

const Index = () => (
  <Layout>
    <Helmet>
      <title>Page not found</title>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    <H1>Page not found</H1>
    <P>
      The requested page could not be found. Please contact the owner of the
      site that linked you to the original URL and let them know their link is
      broken.
    </P>
  </Layout>
)

export default Index
