import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PageHeadline from "../components/pageHeadline"
import { CalendarIcon } from "../components/icons/calendarIcon"
import { ChevronDownIcon } from "../components/icons/chevronDownIcon"
import ecLogoWithBg from "../images/logo_original_with_bg.png"
import { injectIntl } from "gatsby-plugin-intl"

const formatDate = (dateString, currentLocale) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(currentLocale, options)
}

const transformPosts = (edges, currentLocale) =>
  edges.map((edge) => ({
    id: edge.node.frontmatter.id,
    date: formatDate(edge.node.frontmatter.date, currentLocale),
    title: edge.node.frontmatter.title,
    imageUrl: edge.node.frontmatter.imageUrl,
    verticalImgPosInPercent: edge.node.frontmatter.verticalImgPosInPercent,
    htmlContent: edge.node.html,
    isOpen: false,
  }))

const BlogPage = ({ data, intl }) => {
  const [blogPosts, setBlogPosts] = useState([])

  const seoInfo = {
    title: intl.formatMessage({ id: 'blog.meta.title' }),
    description: intl.formatMessage({ id: 'blog.meta.description' }),
    pathname: `/blog`,
    image: ecLogoWithBg
  }

  useEffect(() => {
    setBlogPosts(transformPosts(data.allMarkdownRemark.edges, intl.locale))
  }, [data, intl.locale])

  const toggleBlogEntry = (id) => {
    setBlogPosts((prevBlogPosts) =>
      prevBlogPosts.map((post) =>
        post.id === id ? { ...post, isOpen: !post.isOpen } : post
      )
    )
  }

  return (
    <Layout seo={seoInfo} currentLocale={intl.locale}>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="BLOG" />
        <div className="flex flex-col gap-10">
          {intl.locale === 'de' &&
            <p>Der Blog ist zurzeit leider nur auf Englisch verfügbar. Zukünftige Posts werde ich zusätzlich auf Deutsch schreiben. Bitte gedulde Dich diesbezüglich etwas.</p>
          }
          {blogPosts.map((blogPost, idx) => (
            <article key={idx} className="w-full">
              <button
                className="w-full h-52 rounded-3xl overflow-hidden relative group"
                onClick={() => toggleBlogEntry(blogPost.id)}
              >
                <div
                  className="size-full bg-no-repeat bg-[length:100%_auto] transform duration-[10000ms] xl:group-hover:scale-125"
                  style={{
                    backgroundImage: "url(" + blogPost.imageUrl + ")",
                    backgroundPositionY: blogPost.verticalImgPosInPercent + "%",
                  }}
                ></div>
                <div
                  className={`absolute inset-0 duration-500 z-10 ${
                    blogPost.isOpen
                      ? "bg-transparency-low-lvl"
                      : "bg-transparency-medium-lvl xl:group-hover:bg-transparency-low-lvl"
                  }`}
                />
                <div className="p-4 flex flex-row gap-6 items-end absolute inset-0 z-20">
                  <div
                    className={`flex-1 flex flex-col gap-3 ${
                      blogPost.isOpen ? "translate-y-[calc(100%+1rem)]" : ""
                    } transition-transform`}
                  >
                    <div className="px-0.5 ec-font-heading-2 text-brand-green-medium-lvl text-left">
                      {blogPost.title}
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <CalendarIcon iconClasses="size-6 fill-brand-sand" />
                      <span className="text-brand-sand">{blogPost.date}</span>
                    </div>
                  </div>
                  <ChevronDownIcon
                    iconClasses={`flex-none size-6 fill-brand-sand ${
                      blogPost.isOpen
                        ? "rotate-180 xl:group-hover:rotate-[168deg]"
                        : "xl:group-hover:rotate-12"
                    } transition-transform `}
                  />
                </div>
              </button>
              <div
                className={`flex flex-col ec-layout-text-content px-0 ${
                  blogPost.isOpen ? "" : "hidden"
                }`}
              >
                <h2 className="flex flex-row gap-6 justify-between mt-7 text-left">
                  <span className="flex-1 ec-font-heading-2">
                    {blogPost.title}
                  </span>
                  <span className="mt-1.5">{blogPost.date}</span>
                </h2>
                <div
                  className="prose mb-24"
                  dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
                ></div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export default injectIntl(BlogPage)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {frontmatter: {id: DESC}}) {
        edges {
          node {
            frontmatter {
              id
              date
              title
              imageUrl
              verticalImgPosInPercent
            }
            html
          }
        }
      }
  }
`