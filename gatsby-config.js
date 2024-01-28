/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Welcome`,
    description: `Ercan Cicek is a UX Designer and UX Developer based in Dusseldorf with more than eight years of work experience in conceptualizing and implementing web applications in the frontend.`,
    siteUrl: `https://www.ercancicek.com`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
  ]
};