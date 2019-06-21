import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import {
  Badge,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
} from "reactstrap"
import { slugify } from "../utils/utilityfunction"
import authors from "../utils/authors"

const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  const author = authors.find(x => x.name === post.author)
  return (
    <Layout>
      <SEO title={post.title} />
      <Row>
        <Col md="8">
          <Card>
            <Img
              className="card-image-top"
              fluid={post.image.childImageSharp.fluid}
            />
            <CardBody>
              <CardSubtitle>
                <span className="text-info">{post.date}</span> by{" "}
                <span className="text-info">{post.author}</span>
              </CardSubtitle>
              <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              />
              <ul className="post-tags">
                {post.tags.map(tag => (
                  <li key={tag}>
                    <Link to={`/tags/${slugify(tag)}`}>
                      <Badge color="primary" className="text-uppercase">
                        {tag}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Img
              className="card-image-top"
              fluid={data.file.childImageSharp.fluid}
            />
            <CardBody>
              <CardTitle className="text-center text-uppercase mb-3">
                {author.name}
              </CardTitle>
              <CardText>{author.bio}</CardText>
              <div className="author-social-links text-center">
                <ul>
                  <li>
                    <a
                      href={author.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="facebook"
                    >
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="twitter"
                    >
                      <i className="fab fa-twitter-f fa-lg"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={author.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="instagram"
                    >
                      <i className="fab fa-instagram-f fa-lg"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={author.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="google"
                    >
                      <i className="fab fa-google-f fa-lg"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin"
                    >
                      <i className="fab fa-linkedin-f fa-lg"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostbySlug($slug: String!, $imageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MM Do YYYY")
        author
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
    file(relativePath: { eq: $imageUrl}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default SinglePost
