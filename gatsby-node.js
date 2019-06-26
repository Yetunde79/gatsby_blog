const { slugify } = require("./src/utils/utilityfunction")
const path = require("path")
const authors = require("./src/utils/authors")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPage: path.resolve("src/templates/tags-page.js"),
    tagsPost: path.resolve("src/templates/tags-post.js"),
    postList: path.resolve("src/templates/post-list.js"),
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          //passing slug for template to use to get post
          slug: node.fields.slug,
          //find author url from authors and pass it to the post template
          imageUrl: authors.find(x => x.name === node.frontmatter.author)
            .imageUrl,
        },
      })
    })

    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    let tagsPostCount = {}
    tags.forEach(tag => {
      tagsPostCount[tag] = (tagsPostCount[tag] || 0) + 1
    })

    tags = _.uniq(tags)

    createPage({
      path: `/tags`,
      component: templates.tagsPage,
      context: {
        tags,
        tagsPostCount,
      },
    })
    //Create tags post page

    tags.forEach(tag => {
      createPage({
        path: `/tags/${slugify(tag)}`,
        component: templates.tagsPost,
        context: {
          tag,
        },
      })
    })

    const postsPerPage = 2
    const numberOfPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1

      if (isFirstPage) return

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage,
        },
      })
    })
  })
}
