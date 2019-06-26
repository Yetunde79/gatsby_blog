import React from "react"
import { Card, CardBody, CardText, CardTitle } from "reactstrap"
import Img from "gatsby-image"

const Sidebar = ({ authorImage, author }) => {
  return (
    <Card>
      <Img className="card-image-top" fluid={authorImage} />
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">
          {author.name}
        </CardTitle>
        <CardText>{author.bio}</CardText>
        <div className="author-social-links text-center">
          <ul>
            <li>
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="twitter"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </li>
            <li>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}

export default Sidebar
