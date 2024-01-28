import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
import PageHeadline from "../components/pageHeadline";
import { CalendarIcon } from "../components/icons/calendarIcon";
import { ChevronDownIcon } from "../components/icons/chevronDownIcon";

export default function Blog({ data }) {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const posts = data.allMarkdownRemark.edges.map((edge) => ({
      id: edge.node.frontmatter.id,
      date: edge.node.frontmatter.date,
      title: edge.node.frontmatter.title,
      imageUrl: edge.node.frontmatter.imageUrl,
      verticalImgPosInPercent: edge.node.frontmatter.verticalImgPosInPercent,
      htmlContent: edge.node.html,
    }));

    setBlogPosts(posts);
  }, [data]);

  return (
    <Layout>
      <main className="ec-layout-visual-content mt-24">
        <PageHeadline>Blog</PageHeadline>
        <div className="flex flex-col gap-10">
          {blogPosts.map((blogPost, idx) => (
            <article key={idx} className="w-full">
              <button className="w-full h-52 rounded-md overflow-hidden relative group">
                <div
                  className="size-full bg-no-repeat bg-[length:100%_auto] transform duration-[10000ms] xl:group-hover:scale-125"
                  style={{ backgroundImage: "url(" + blogPost.imageUrl + ")", backgroundPositionY: blogPost.verticalImgPosInPercent + "%" }}
                ></div>
                <div className="absolute inset-0 bg-transparency-medium-lvl duration-500 xl:group-hover:bg-transparency-low-lvl z-10" />
                <div className="p-2 flex flex-row gap-6 items-end absolute inset-0 z-20">
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="px-0.5 ec-font-heading-1 text-brand-green-medium-lvl text-left">{blogPost.title}</div>
                    <div className="flex flex-row gap-2 items-center">
                      <CalendarIcon iconClasses="size-6 fill-brand-sand" />
                      <span className="text-brand-sand">{blogPost.date}</span>
                    </div>
                  </div>
                  <ChevronDownIcon iconClasses="flex-none size-6 fill-brand-sand transition-transform xl:group-hover:rotate-12" />
                </div>
              </button>
              <div className="flex flex-col ec-layout-text-content">
                <div className="flex flex-row mt-7 text-left">
                  <span className="ec-font-heading-1 first:pr-4">{blogPost.title}</span>
                  <span>{blogPost.date}</span>
                </div>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
                ></div>
                <hr className="border-gray-low-lvl" />
              </div>
            </article>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___id] }) {
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
`;

export const Head = () => <SEO title="Blog" />;
