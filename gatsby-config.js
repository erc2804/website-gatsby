/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Ercan Cicek - UX Developer & Designer`,
    description: `Ercan Cicek is a UX Developer and UX Designer based in Dusseldorf with more than 10 years of work experience in conceptualizing and implementing web applications in the frontend.`,
    siteUrl: `https://www.ercancicek.com`,    
    siteName: `Ercan Cicek's Portfolio & Blog`,
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
          return allPages
            .filter((page) => /^\/(en|de)\//.test(page.path))
            .filter((page) => !page.path.includes("/404"))
            .map((page) => ({ ...page }))
        },
        serialize: ({ path }) => {
          return {
            url: path,
            changefreq: "monthly",
            lastmod: new Date().toISOString(),
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-json',
    `gatsby-plugin-remove-serviceworker`,
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
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `de`],
        defaultLanguage: `en`,
        redirect: true,
      },
    },
    // Generates a `_headers` file in `public/` with Gatsby's recommended
    // caching policy: hashed JS/CSS/static assets -> immutable (1 year),
    // while HTML, page-data.json and sw.js -> must-revalidate. This is what
    // prevents returning visitors from getting stale pages after a deploy.
    // Keep this LAST so it can collect headers/redirects from other plugins.
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        // We define the security headers ourselves below (the plugin's
        // defaults use Referrer-Policy: same-origin and omit Permissions-Policy).
        mergeSecurityHeaders: false,
        headers: {
          "/*": [
            "X-Frame-Options: DENY",
            "X-XSS-Protection: 1; mode=block",
            "X-Content-Type-Options: nosniff",
            "Referrer-Policy: strict-origin-when-cross-origin",
            "Permissions-Policy: geolocation=(), microphone=(), camera=()",
          ],
        },
      },
    },
  ],
}
