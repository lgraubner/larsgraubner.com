// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import Container from '../components/Container'
import { H1 } from '../components/Heading'

const Newsletter = () => (
  <Layout minimal>
    <Helmet>
      <title>Thanks for subscribing</title>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    <Container>
      <H1>Thanks for subscribing!</H1>
      <P>
        I'm currently building up the newsletter and planning to push out on a
        bi-monthly or even weekly basis. For now I'm happy you are interested in
        what I'm doing and I let you know about when and how I will start fully.
      </P>

      <P>
        Stay tuned and please don't hesitate to give me feedback or suggestions
        via email (news@larsgraubner.com).
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
