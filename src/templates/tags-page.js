import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Badge, Button } from "reactstrap"
import { slugify } from "../utils/utilityfunction"

const tagsPage = ({ pageContext }) => {
  const { tags, tagsPostCount } = pageContext //pageContext is what is passed from gatsby-node when creating page in context

  return (
    <Layout pageTitle="All tags">
      <SEO title="All tags" keywords={["tags", "topics"]} />
      <ul>
        {tags.map(tag => (
          <li key={tag} style={{ marginBottom: "10px" }}>
            <Button color="primary" href={`tags/${slugify(tag)}`}>
              {tag} <Badge color="light">{tagsPostCount[tag]}</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default tagsPage
