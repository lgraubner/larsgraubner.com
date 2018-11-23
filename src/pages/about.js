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
      I'm Lars Graubner, an aspiring web developer. I'm living in the north of
      Germany, not far away from the east sea which I enjoy a lot.
    </P>
    <P>
      Currently I work at{' '}
      <Link to="https://www.checkdomain.de" rel="nofollow">
        checkdomain
      </Link>{' '}
      and{' '}
      <Link to="http://idearockers.com" rel="nofollow">
        idearockers
      </Link>{' '}
      creating apps with React and React Native. From 2016 to 2017 I worked at a
      startup dealing with soccer bets and handling a lot of data. Prior to
      that, I worked at an advertising agency. This is where I learned the
      basics of web programming and got to know a lot of different types of
      clients and technologies.
    </P>
    <P>
      Beside that I'm working as self-employed developer. I'm realizing small
      projects, ranging from simple websites to JavaScript apps and
      customizations. If you are looking for someone to implement your idea,{' '}
      <Link to="/hireme">reach out to me</Link>!
    </P>
    <P>
      I'm involved in some open source Projects. You can check out some of my
      code on <Link to="https://github.com/lgraubner">Github</Link>.
    </P>
    <P>
      When I'm doing none of those things I enjoy reading a good book and
      spending time with my family.
    </P>
    <P>
      In case you are interested in what kind of gear and software I'm using
      make sure to check out my <Link to="/uses">uses page</Link>. If there are
      any questions left don't hesitate to{' '}
      <Link to="/contact">get in touch with me</Link>.
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
