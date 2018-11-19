// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'
import Link from '../components/Link'

type Props = {
  data: Object
}

const Image = styled(Img)`
  max-width: 100% !important;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    float: right;
    margin: 0 0 10px 40px;
  }
`

// @TODO: Bild
const About = ({ data }: Props) => (
  <Layout>
    <Helmet>
      <title>About - Lars Graubner</title>
      <meta name="robots" content="index,follow" />
      <meta
        name="description"
        content="I'm a web developer from Germany and I'm building apps with React and React Native. I'm a husband and father."
      />
    </Helmet>
    <H1>About</H1>
    <Image fixed={data.file.childImageSharp.fixed} alt="Lars Graubner" />
    <P>
      Hi, I'm Lars.{' '}
      <span role="img" aria-label="hello">
        👋
      </span>
      I'm a Web Developer from Germany. I'm building apps with React Native at{' '}
      <Link rel="nofollow" to="https://www.checkdomain.de">
        checkdomain
      </Link>{' '}
      and{' '}
      <Link rel="nofollow" to="http://idearockers.com">
        idearockers
      </Link>
      . I'm a husband and father. I like to create nice things with JavaScript
      in the Front-end as well as in the Back-end. You can check out some of my
      code on <Link to="https://github.com/lgraubner">Github</Link>. I also
      tweet as <Link to="https://twitter.com/larsgraubner">@larsgraubner</Link>.
      When I'm doing none of those things I enjoy reading and spending time with
      the family.
    </P>
    <P>
      If you want to what kind of gear and software I'm using check out my{' '}
      <Link to="/uses">uses page</Link>.
    </P>
  </Layout>
)

export default About

export const query = graphql`
  query {
    file(relativePath: { eq: "lars_slim.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
