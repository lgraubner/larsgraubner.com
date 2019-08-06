import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { Ul, Li } from '../components/List'
import Link from '../components/Link'
import Button from '../components/Button'

const Strong = styled.strong`
  font-weight: bold;
`

const Slogan = styled.h1({
  fontSize: 36,
  fontWeight: 400,
  lineHeight: 1.2,
  marginTop: 40,
  marginBottom: '1.5em'
})

const HireMe = () => (
  <Layout>
    <Helmet>
      <title>Work with me - Lars Graubner</title>
      <meta name="robots" content="index,follow" />
      <meta
        name="description"
        content="I'm offering contract work, consulting and teaching. Contact me and we work something out."
      />
    </Helmet>
    <Slogan>
      I'm a software engineer with a passion for well-crafted appli­ca­tions.
    </Slogan>
    <P>I'm offering the following services:</P>
    <Ul>
      <Li>
        <Strong>Contract work.</Strong> Your project needs a developer with
        experience in creating React and React Native apps? I'm available to
        commit a few weeks or months solving your problems.
      </Li>
      <Li>
        <Strong>Consulting.</Strong> You have an existing React project and need
        advice? I can help choosing the right software solutions and build a
        scalable architecture.
      </Li>
      <Li>
        <Strong>Teaching.</Strong> Your company wants to adopt React and needs a
        head start? I'm offering onsite workshops (limited to Germany for now)
        to bring you the concepts of React closer.
      </Li>
    </Ul>
    <P>
      My experiences include React, React Native, TypeScript, Node.js, GraphQL,
      Webpack and many more. You can check out some of my work on{' '}
      <Link to="https://github.com/lgraubner">Github</Link>. Interested?{' '}
      <Link to="/contact">Contact me</Link> or check out my profile on{' '}
      <Link to="https://www.linkedin.com/in/larsgraubner/">LinkedIn</Link>.
    </P>
    <Button to="/contact">Contact</Button>
  </Layout>
)

export default HireMe
