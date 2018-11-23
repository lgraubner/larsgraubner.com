import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'

const Newsletter = () => (
  <Layout>
    <Helmet>
      <title>Lars' Newsletter</title>
      <meta name="robots" content="index,follow" />
    </Helmet>
    <H1>Newsletter</H1>
    <P>
      I'm Lars Graubner, a web developer from Germany. I'm working at
      checkdomain and idearockers creating Apps with React and React Native. I'm
      doing open source stuff which you can find on Github. I like JavaScript
      and clean code. I'm a Husband and father of a son.
    </P>
    <P>
      In this newsletter I focus on JavaScript in the front-end as well as in
      the back-end. I will keep you up to date with stuff I'm learning and new
      posts on my blog. My favorite topics are React, Node.js, functional
      programming and web performance.
    </P>
    <P>
      If you have any feedback feel free to reach out to me
      at news@larsgraubner.com.
    </P>
  </Layout>
)

export default Newsletter
