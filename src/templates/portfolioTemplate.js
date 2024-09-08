import React, { useMemo } from "react"
import slugify from "slugify"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { GatsbyImage } from "gatsby-plugin-image"
import { ExternalLinkIcon } from "../components/icons/externalLinkIcon"
import { ArrowLeftIcon } from "../components/icons/arrowLeftIcon"

const transformImages = (edges) =>
  Object.fromEntries(
    edges.map(
      ({
        node: {
          name,
          childImageSharp: { gatsbyImageData },
        },
      }) => [name, gatsbyImageData]
    )
  )

const PortfolioTemplate = ({ data, pageContext }) => {
  const { label, url, urlDesc, image, content } = pageContext
  const images = useMemo(
    () => transformImages(data.allFile.edges),
    [data.allFile.edges]
  )

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <div className="flex flex-row items-center gap-6">
          <Link
            to="/portfolio"
            className="w-fit flex-none flex flex-row gap-2 py-3 items-center group"
          >
            <div className="flex justify-center items-center size-6 [&>svg]:size-full [&>svg]:fill-typo-medium-lvl/70 [&>svg]:transform group-hover:[&>svg]:fill-brand-green-medium-lvl group-hover:[&>svg]:-translate-x-1 [&>svg]:transition-all">
              <ArrowLeftIcon />
            </div>
            <span className="ec-font-base font-bold transform translate-y-px text-typo-medium-lvl/70 group-hover:text-brand-green-medium-lvl transition-colors">
              Back
            </span>
          </Link>
          <PageHeadline text={label} />
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="ec-font-heading-2 leading-[1.2] font-bold text-4xl text-brand-green-medium-lvl">
              {content.title}
            </h2>
            <p className="ec-font-subheading">{content.description}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl shadow-sm lg:hover:shadow-lg bg-gray-min-lvl px-6 py-4 w-fit flex-none flex flex-row gap-4 items-center text-typo-medium-lvl/70 transition-all"
            >
              <div className="flex justify-center items-center size-10 [&>svg]:size-full [&>svg]:fill-brand-green-medium-lvl">
                <ExternalLinkIcon />
              </div>
              <div className="flex flex-col">
                <span className="ec-font-base">{urlDesc ?? url}</span>
                <span className="ec-font-subheading font-bold">{`See ${label} in action`}</span>
              </div>
            </a>
          </div>
          <div className="max-w-40 md:max-w-64 lg:max-w-none lg:basis-80 size-fit overflow-hidden relative">
            <GatsbyImage
              image={images[image]}
              alt={`smartphone screen of the portfolio entry: ${label}`}
              imgStyle={{ objectFit: `contain` }}
            />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "portfolio" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: NONE
              quality: 100
            )
          }
        }
      }
    }
  }
`

export const Head = ({ data, pageContext }) => {
    const { label, image } = pageContext
    const slug = slugify(label, { lower: true, strict: true })
    const images = useMemo(
        () => transformImages(data.allFile.edges),
        [data.allFile.edges]
      )
  
    return (
      <Seo
        title={`${label} | Ercan Cicek's Portfolio`}
        description={`Discover the ${label} project in Ercan Cicek's portfolio. Learn about the technologies used, challenges faced, and the solutions implemented.`}
        pathname={`/portfolio/${slug}`}
        image={images[image]}
      />
    )
  }

export default PortfolioTemplate
