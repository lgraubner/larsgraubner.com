// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Title from '../components/Title'

import { BOLD_COLOR, TEXT_COLOR, LIGHT_COLOR } from '../colors'

const PostList = styled.ul`
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
`

const PostTitle = styled.li`
  line-height: 25px;
  margin-bottom: 1.5em;

  a {
    color: ${BOLD_COLOR};
    text-decoration: none;
    font-size: 18px;

    @media (min-width: 990px) {
      color: ${TEXT_COLOR};

      &:focus,
      &:hover {
        color: ${BOLD_COLOR};

        + span {
          display: inline;
        }
      }
    }
  }
`

const PostDate = styled.span`
  color: ${LIGHT_COLOR};
  display: block;
  font-size: 14px;

  @media (min-width: 768px) {
    display: inline;
    margin-left: 25px;
  }

  @media (min-width: 990px) {
    display: none;
  }
`

type Props = {
  data: Object
}

const Blog = ({ data }: Props) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allMarkdownRemark.edges')

  return (
    <div>
      <Helmet title={`Blog${siteTitle}`} />
      <Title marginBottom="3rem">Lars{"'"} Blog</Title>
      <PostList>
        {posts.map(post => {
          const title = get(post, 'node.frontmatter.title') || post.node.path
          return (
            <PostTitle key={post.node.frontmatter.path}>
              <Link to={post.node.frontmatter.path}>{title}</Link>
              <PostDate>{post.node.frontmatter.date}</PostDate>
            </PostTitle>
          )
        })}
      </PostList>
    </div>
  )
}

export default Blog

export const pageQuery = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
