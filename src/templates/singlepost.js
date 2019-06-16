import React from 'react'
import Layout from '../components/layout'
import {graphql} from 'gatsby'

const SinglePost = ({data}) => {
    return (
        <div>
            
        </div>
    )
}

export const postQuery = graphql`
query blogPostbySlug($slug: String){
    markdownRemark(fields: {path: {eq: $slug}}){
        id
        html
        frontmatter{
            title
            date(formatString: "MM Do YYYY")
            author
            path
            tags
            image {
                childImageSharp {
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
        }
    }
}
`

export default SinglePost;