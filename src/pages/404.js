// @flow
import React from 'react'
import Helmet from 'react-helmet'

import Title from '../components/Title'
import SubTitle from '../components/SubTitle'
import Text from '../components/Text'

const LimitedText = Text.extend`
  max-width: 540px;
`

const Index = () => (
  <div>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <Title>Not found</Title>
    <SubTitle>The requested page could not be found</SubTitle>
    <LimitedText>
      Please contact the owner of the site that linked you to the original URL
      and let them know their link is broken.
    </LimitedText>
  </div>
)

export default Index

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`
