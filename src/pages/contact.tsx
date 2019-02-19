import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'
import Link from '../components/Link'

const About = () => (
  <Layout>
    <Helmet>
      <title>Contact - Lars Graubner</title>
      <meta name="robots" content="index,nofollow" />
      <meta
        name="description"
        content="If you'd like to say hi, I'm @larsgraubner on Twitter. You can also shoot me an email at hi@larsgraubner.com. I look forward to hearing from you!"
      />
    </Helmet>
    <H1>Contact</H1>
    <P>
      If you'd like to say hi, I'm{' '}
      <Link to="https://twitter.com/larsgraubner">@larsgraubner</Link> on
      Twitter. Of course, you can also shoot me an email at{' '}
      <Link to="mailto:hello@larsgraubner.com">hello@larsgraubner.com</Link>. I
      look forward to hearing from you!
    </P>
  </Layout>
)

export default About
