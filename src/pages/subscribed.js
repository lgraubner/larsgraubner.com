// @flow
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
    <H1>Thanks for subscribing!</H1>
    <P>
      I will email you when I post new blog posts or whenever I have interesting
      thoughts that are worth sharing.
    </P>
    <P>
      The topics are mainly (but not exclusively) JavaScript, React, React
      Native and Node.js.
    </P>

    <P>
      Stay tuned and please don't hesitate to give me feedback or suggestions
      via <Link to="mailto:news@larsgraubner.com">email</Link>.
    </P>
  </Layout>
)

export default Newsletter
