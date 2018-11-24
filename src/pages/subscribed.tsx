import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'
import Link from '../components/Link'

const Newsletter = () => (
  <Layout>
    <Helmet>
      <title>Thanks for subscribing</title>
      <meta name="robots" content="noindex,follow" />
    </Helmet>
    <H1>Subscribed</H1>
    <P>
      Thanks for subscribing! Stay tuned and please don't hesitate to give me
      feedback or suggestions via{' '}
      <Link to="mailto:news@larsgraubner.com">email</Link>.
    </P>
  </Layout>
)

export default Newsletter
