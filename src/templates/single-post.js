import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Badge, Card, CardBody, CardSubtitle, Row, Col } from "reactstrap"
import { DiscussionEmbed } from "disqus-react"

import { slugify } from "../utils/utilityfunction"
import authors from "../utils/authors"
import Sidebar from "../components/Sidebar"

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter
  const author = authors.find(x => x.name === post.author)

  const baseUrl = "https://www.gatsbytutorial.co.uk"

  const DisqusShortName = "yetundetech"
  const DisqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  }

  return (
    <Layout>
      <SEO title={post.title} />
      <Row>
        <Col md="8" style={{ paddingBottom: "5%" }}>
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
          <h3 className="text-center">Share this post</h3>
          <div className="text-center social-share-links">
            <ul>
              <li>
                <a
                  href={
                    "https://www.facebook.com/sharer/sharer.php?u=" +
                    baseUrl +
                    pageContext.slug
                  }
                  className="facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f fa-2x" />
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.twitter.com/share?url=" +
                    baseUrl +
                    pageContext.slug +
                    "&text=" +
                    post.title +
                    "&via" +
                    "twiiterHandle"
                  }
                  className="twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.linkedin.com/shareArticle?url=" +
                    baseUrl +
                    pageContext.slug
                  }
                  className="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              </li>
            </ul>
          </div>
          <br />
          <br />
          <DiscussionEmbed shortname={DisqusShortName} config={DisqusConfig} />
        </Col>
        <Col md="4">
          <Sidebar
            authorImage={data.file.childImageSharp.fluid}
            author={author}
          />
        </Col>
      </Row>
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
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
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default SinglePost
