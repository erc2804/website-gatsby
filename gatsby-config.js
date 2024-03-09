/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: '.env',
})
module.exports = {
  siteMetadata: {
    title: `Welcome`,
    description: `Ercan Cicek is a UX Designer and UX Developer based in Dusseldorf with more than eight years of work experience in conceptualizing and implementing web applications in the frontend.`,
    siteUrl: `https://www.ercancicek.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            return { ...page }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            changefreq: "monthly",
          }
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogposts`,
        path: `${__dirname}/src/blogposts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ercancicek`,
        short_name: `ercancicek`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#5cdb95`,
        display: `standalone`,
        icon: `src/images/logo_original.png`,
      },
    },
  ],
}
