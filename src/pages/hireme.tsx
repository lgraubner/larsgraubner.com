import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'
import { Ul, Li } from '../components/List'
import Link from '../components/Link'

const Strong = styled.strong`
  font-weight: bold;
`

const HireMe = () => (
  <Layout>
    <Helmet>
      <title>Hire me - Lars Graubner</title>
      <meta name="robots" content="index,follow" />
      <meta
        name="description"
        content="I'm offering teaching, consulting and contract work. Contact me and we work something out."
      />
    </Helmet>
    <H1>Hire me</H1>
    <P>
      Next to my regular job I'm self-employed and offer the following services:
    </P>
    <Ul>
      <Li>
        <Strong>Teaching.</Strong> Your company wants to adopt React and needs a
        head start? I'm offering onsite workshops (limited to Germany for now)
        to bring you the concepts of React closer.
      </Li>
      <Li>
        <Strong>Consulting.</Strong> You have an existing React project and need
        advice? I can help choosing the right software solutions and build a
        scalable architecture.
      </Li>
      <Li>
        <Strong>Contract work.</Strong> Your project needs a developer with
        experience in creating React and React Native apps? I'm available to
        commit a few weeks or months solving your problems.
      </Li>
    </Ul>
    <P>
      My experiences include React, React Native, Typescript, Flow, Node.js,
      GraphQL, Webpack and many more. Interested? Send me an{' '}
      <Link to="mailto:hi@larsgraubner.com">email</Link> and we work something
      out.
    </P>
  </Layout>
)

export default HireMe
