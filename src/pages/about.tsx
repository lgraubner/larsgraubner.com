import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1 } from '../components/Heading'
import Link from '../components/Link'

const Image = styled(Img)`
  max-width: 100% !important;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    float: right;
    margin: 0 0 10px 40px;
  }
`

type Props = {
  data: any
}

const About = ({ data }: Props) => (
  <Layout>
    <Helmet>
      <title>About - Lars Graubner</title>
      <meta name="robots" content="index,follow" />
      <meta
        name="description"
        content="I'm Lars Graubner, a web developer creating Apps with React and React Native. I like JavaScript and clean code. I'm a Husband and father."
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
      <Link to="http://idearockers.com" nofollow>
        idearockers
      </Link>{' '}
      creating apps with React and React Native. From 2016 to 2017 I worked at a
      startup dealing with soccer bets and handling a lot of data. Prior to
      that, I worked at an advertising agency. This is where I learned the
      basics of web programming and got to know a lot of different types of
      clients and technologies.
    </P>
    <P>
      I'm involved in several open source projects. Check out my profile on{' '}
      <Link to="https://github.com/lgraubner">Github</Link> to learn more.
    </P>
    <P>
      Beside that I'm working as self-employed developer. I'm realizing small
      projects, ranging from simple websites to JavaScript apps and
      customizations. If you are looking for someone to implement your idea,{' '}
      <Link to="/hireme">reach out to me</Link>!
    </P>
    <P>
      When I'm doing none of those things I enjoy reading a good book and
      spending time with my family.
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
