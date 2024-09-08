const path = require('path')
const slugify = require('slugify')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allPortfolioDataJson {
        nodes {
          type
          label
          url
          categoryDesc
          image
          techs
          content {
            title
            description
          }
          icon
        }
      }
    }
  `)

  result.data.allPortfolioDataJson.nodes.forEach(node => {
    if(node.content) {
        const slug = slugify(node.label, { lower: true, strict: true })
    
        createPage({
          path: `/portfolio/${slug}`,
          component: path.resolve('./src/templates/portfolioTemplate.js'),
          context: {
            type: node.type,
            label: node.label,
            url: node.url,
            urlDesc: node.urlDesc,
            categoryDesc: node.categoryDesc,
            image: node.image,
            techs: node.techs,
            content: node.content,
            icon: node.icon,
          },
        })
    }
  })
}
