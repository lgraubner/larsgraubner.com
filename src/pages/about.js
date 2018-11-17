// @flow
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'
import Link from '../components/Link'

const About = () => (
  <Layout>
    <Helmet>
      <title>About - Lars Graubner</title>
      <meta name="robots" content="index,follow" />
    </Helmet>
    <H1>About</H1>
    <P>
      Hi, I'm Lars.{' '}
      <span role="img" aria-label="hello">
        👋
      </span>
      I'm a Web Developer from Germany. I'm building apps with React Native at{' '}
      <Link rel="nofollow" to="https://www.checkdomain.de">
        checkdomain
      </Link>
       and{' '}
      <Link rel="nofollow" to="http://idearockers.com">
        idearockers
      </Link>
      . I'm a husband and father. I like to create nice things with JavaScript
      in the Front-end as well as in the Back-end. You can check out some of my
      code on [Github](https://github.com/lgraubner). I also tweet as{' '}
      <Link to="https://twitter.com/larsgraubner">@larsgraubner</Link>. When I'm
      doing none of those things I enjoy reading and spending time with the
      family.
    </P>
  </Layout>
)

export default About
