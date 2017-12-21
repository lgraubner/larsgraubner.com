// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { BOLD_COLOR, TEXT_COLOR, LIGHT_COLOR, PRIMARY_COLOR } from '../colors'

const Wrapper = styled.div`
  max-width: 620px;
  margin: 0 auto 8rem;
`

const BlogHeader = styled.div`
  margin-bottom: 4rem;

  a {
    color: ${BOLD_COLOR};
    font-weight: 700;
    font-size: 1.7rem;
    text-decoration: none;
    border-bottom: 3px solid ${PRIMARY_COLOR};
  }
`

const Year = styled.div`
  color: ${LIGHT_COLOR};
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
`

const PostList = styled.ul`
  list-style: none;
  margin: 2rem 0 4rem;
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

  const yearPosts = posts.reduce((obj, p) => {
    if (obj[p.node.frontmatter.year]) {
      obj[p.node.frontmatter.year].push(p)
    } else {
      // eslint-disable-next-line
      obj[p.node.frontmatter.year] = [p]
    }
    return obj
  }, {})

  return (
    <Wrapper>
      <Helmet title={`Blog${siteTitle}`} />
      <BlogHeader>
        <Link to="blog">Lars{"'"} Blog</Link>
      </BlogHeader>
      {Object.values(yearPosts)
        .reverse()
        .map(year => (
          <PostList key={year[0].node.frontmatter.year}>
            <Year>{year[0].node.frontmatter.year}</Year>
            {year.map(post => {
              const title =
                get(post, 'node.frontmatter.title') || post.node.path
              return (
                <PostTitle key={post.node.frontmatter.path}>
                  <Link to={post.node.frontmatter.path}>{title}</Link>
                  <PostDate>{post.node.frontmatter.date}</PostDate>
                </PostTitle>
              )
            })}
          </PostList>
        ))}
    </Wrapper>
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
            year: date(formatString: "YYYY")
            title
          }
        }
      }
    }
  }
`
