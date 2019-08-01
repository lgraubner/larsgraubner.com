import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1, H3 } from '../components/Heading'
import Link from '../components/Link'
import NewsletterBox from '../components/NewsletterBox'

const StyledNewsletterBox = styled(NewsletterBox)({
  marginTop: 60
})

const Newsletter = () => (
  <Layout>
    <Helmet>
      <title>Subscribe to Lars' Newsletter</title>
      <meta name="robots" content="index,follow" />
    </Helmet>
    <H1>Newsletter</H1>
    <P>
      I'm Lars Graubner, a JavaScript developer creating apps with React and
      React Native. I'm doing open source which you can find on{' '}
      <Link to="https://github.com/lgraubner">Github</Link>. I have a passion
      for well-crafted applications and clean code. I live in Germany with my
      wife and son.
    </P>
    <H3>What you get</H3>
    <P>
      I focus on JavaScript for the browser and Node. I will keep you up to date
      with interesting links, daily learnings and new posts on{' '}
      <Link to="/">my blog</Link>. My favorite topics are JavaScript,
      productivity and personal growth.
    </P>
    <StyledNewsletterBox />
  </Layout>
)

export default Newsletter
