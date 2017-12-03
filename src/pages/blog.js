// @flow
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash.get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Title = styled.h1`
  font-weight: 600;
  font-size: 38px;
  margin: 0 0 1.25em;
`

const BackButton = styled.div`
  position: absolute;
  right: 50px;
  top: 50px;

  a {
    color: #222;
    text-decoration: none;
    display: block;
    width: 55px;
    height: 55px;
    line-height: 66px;
    text-align: center;
    background-color: #efefef;
    border-radius: 50%;
    font-weight: bold;
    font-family: 'Courier New', serif;
    font-size: 22px;
  }
`

const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const PostTitle = styled.li`
  line-height: 25px;
  margin-bottom: 1.5em;

  a {
    color: #222;
    text-decoration: none;
    font-size: 18px;

    @media (min-width: 990px) {
      color: #555;

      &:focus,
      &:hover {
        color: #222;

        + span {
          display: inline;
        }
      }
    }
  }
`

const PostDate = styled.span`
  color: rgba(0, 0, 0, 0.35);
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
      <Title>Blog</Title>
      <BackButton>
        <Link to="/">
          <span role="img" aria-label="back">
            ↩
          </span>
        </Link>
      </BackButton>
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
