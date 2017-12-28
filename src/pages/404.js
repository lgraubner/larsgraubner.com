// @flow
import React from 'react'
import styled from 'styled-components'

import Title from '../components/Title'
import Text from '../components/Text'

const LimitedText = Text.extend`
  max-width: 540px;
  margin-top: 40px;
`

const SubTitle = styled.h2`
  font-weight: normal;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.8);
`

const Index = () => (
  <div>
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
