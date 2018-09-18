// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import Container from '../components/Container'
import { H1 } from '../components/Heading'
import Link from '../components/Link'

const Newsletter = () => (
  <Layout minimal>
    <Helmet>
      <title>Thanks for subscribing</title>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    <Container>
      <H1>Thanks for subscribing!</H1>
      <P>
        In this newsletter I share what I learn. This does not follow a fixed
        schedule, so there will always be one if it comes to my mind, or I learn
        something interesting.
      </P>
      <P>
        The topics will mainly be JavaScript in general, React, React Native and
        Node.js. Maybe other topics that cross my path will be added.
      </P>

      <P>Additionally, I'll let you know when I've posted a new blog post.</P>

      <P>
        Stay tuned and please don't hesitate to give me feedback or suggestions
        via <Link to="mailto:news@larsgraubner.com">email</Link>.
      </P>
    </Container>
  </Layout>
)

export default Newsletter

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
  }
`
