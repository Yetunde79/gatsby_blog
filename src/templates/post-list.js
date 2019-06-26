import React from "react"
import Layout from "../components/layout"
import Post from "../components/Post"
import { graphql } from "gatsby"
import PaginationLinks from "../components/PaginationLinks"

const postList = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = pageContext
  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      <div style={{ paddingLeft: "15%", paddingRight: "15%" }}>
        {posts.map(({ node }) => (
          <Post
            key={node.id}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            tags={node.frontmatter.tags}
            body={node.excerpt}
            fluid={node.frontmatter.image.childImageSharp.fluid}
          />
        ))}
        <PaginationLinks
          currentPage={currentPage}
          numberOfPages={numberOfPages}
        />
      </div>
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default postList
