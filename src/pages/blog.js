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
    const posts = data.allMarkdownRemark.edges.map((edge) => {
      const post = {
        id: edge.node.frontmatter.id,
        date: edge.node.frontmatter.date,
        title: edge.node.frontmatter.title,
        imageUrl: edge.node.frontmatter.imageUrl,
        verticalImgPosInPercent: edge.node.frontmatter.verticalImgPosInPercent,
        htmlContent: edge.node.html,
        isOpen: false,
      };

      return (
        <article key={post.id} className="w-full">
          <button
            className="w-full h-52 rounded-md overflow-hidden relative group"
            onClick={() => toggleBlogEntry(post.id)}
          >
            <div
              className="size-full bg-no-repeat bg-[length:100%_auto] transform duration-[10000ms] xl:group-hover:scale-125"
              style={{
                backgroundImage: "url(" + post.imageUrl + ")",
                backgroundPositionY: post.verticalImgPosInPercent + "%",
              }}
            ></div>
            <div className="absolute inset-0 bg-transparency-medium-lvl duration-500 xl:group-hover:bg-transparency-low-lvl z-10" />
            <div className="p-2 flex flex-row gap-6 items-end absolute inset-0 z-20">
              <div
                className={`flex-1 flex flex-col gap-3 ${
                  post.isOpen ? "translate-y-full" : ""
                } transition-transform`}
              >
                <div className="px-0.5 ec-font-heading-1 text-brand-green-medium-lvl text-left">
                  {post.title}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <CalendarIcon iconClasses="size-6 fill-brand-sand" />
                  <span className="text-brand-sand">{post.date}</span>
                </div>
              </div>
              <ChevronDownIcon
                iconClasses={`flex-none size-6 fill-brand-sand ${
                  post.isOpen
                    ? "rotate-180 xl:group-hover:rotate-[168deg]"
                    : "xl:group-hover:rotate-12"
                } transition-transform `}
              />
            </div>
          </button>
          {post.isOpen && (
            <div className="flex flex-col ec-layout-text-content">
              <div className="flex flex-row gap-3 justify-between mt-7 text-left">
                <span className="flex-1 ec-font-heading-1 first:pr-4">
                  {post.title}
                </span>
                <span className="flex-none mt-1.5">{post.date}</span>
              </div>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              ></div>
              <hr className="border-gray-low-lvl" />
            </div>
          )}
        </article>
      );
    });

    setBlogPosts(posts);
  }, [data]);

  const toggleBlogEntry = (id) => {
    setBlogPosts((prevBlogPosts) =>
      prevBlogPosts.map((post) =>
        post.key === id
          ? React.cloneElement(post, { isOpen: !post.props.isOpen })
          : post
      )
    );
  };

  return (
    <Layout>
      <main className="ec-layout-visual-content mt-24">
        <PageHeadline>Blog</PageHeadline>
        <div className="flex flex-col gap-10">{blogPosts}</div>
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
