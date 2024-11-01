import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { CalendarIcon } from "../components/icons/calendarIcon"
import { ChevronDownIcon } from "../components/icons/chevronDownIcon"
import ecLogoWithBg from "../images/logo_original_with_bg.png"

const transformPosts = (edges) =>
  edges.map((edge) => ({
    id: edge.node.frontmatter.id,
    date: edge.node.frontmatter.date,
    title: edge.node.frontmatter.title,
    imageUrl: edge.node.frontmatter.imageUrl,
    verticalImgPosInPercent: edge.node.frontmatter.verticalImgPosInPercent,
    htmlContent: edge.node.html,
    isOpen: false,
  }))

export default function Blog({ data }) {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    setBlogPosts(transformPosts(data.allMarkdownRemark.edges))
  }, [data])

  const toggleBlogEntry = (id) => {
    setBlogPosts((prevBlogPosts) =>
      prevBlogPosts.map((post) =>
        post.id === id ? { ...post, isOpen: !post.isOpen } : post
      )
    )
  }

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="BLOG" />
        <div className="flex flex-col gap-10">
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

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {frontmatter: {id: DESC}}) {
        edges {
          node {
            frontmatter {
              id
              date(formatString: "MMMM DD, YYYY")
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

export const Head = () => (
  <Seo 
    title="Ercan Cicek's Blog | Web Development, Design Principles, and More" 
    description="Explore Ercan Cicek's blog for insightful articles and resources on web development, design principles, and more"
    pathname="/blog"
    image={ecLogoWithBg}
  />
)