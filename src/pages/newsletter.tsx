import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'
import Link from '../components/Link'

const Newsletter = () => (
  <Layout>
    <Helmet>
      <title>Lars' Newsletter</title>
      <meta name="robots" content="index,follow" />
    </Helmet>
    <H1>Newsletter</H1>
    <P>
      I'm Lars Graubner, a web developer from Germany. I'm working at{' '}
      <Link to="https://www.checkdomain.de" nofollow>
        checkdomain
      </Link>{' '}
      and{' '}
      <Link to="https://idearockers.com" nofollow>
        idearockers
      </Link>{' '}
      creating Apps with React and React Native. I'm involved in several open
      source projects. Check out my profile on{' '}
      <Link to="https://github.com/lgraubner">Github</Link> to learn more. I
      like JavaScript and clean code. I'm a Husband and father of a son.
    </P>
    <P>
      In this newsletter I focus on JavaScript in the front-end as well as in
      the back-end. I will keep you up to date with stuff I'm learning and new
      posts on my blog. My favorite topics are React, Node.js, functional
      programming and web performance.
    </P>
    <P>
      If you have any feedback feel free to reach out to me at 
      <Link to="mailto:news@larsgraubner.com">news@larsgraubner.com</Link>.
    </P>
  </Layout>
)

export default Newsletter
