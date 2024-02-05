import React, { useMemo } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import LinkBox from "../components/linkBox"
import PageHeadline from "../components/pageHeadline"
import { GatsbyImage } from "gatsby-plugin-image"
import allPortfolioBoxes from "../constants/portfolioBoxes"

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

export default function Portfolio({
  data: {
    allFile: { edges },
  },
}) {
  const images = useMemo(() => transformImages(edges), [edges])
  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="PORTFOLIO" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allPortfolioBoxes.map((portfolioBox) => (
            <LinkBox
              key={portfolioBox.label}
              type={portfolioBox.type}
              label={portfolioBox.label}
              url={portfolioBox.url}
              categoryDesc={portfolioBox.categoryDesc}
              descText={portfolioBox.techs?.join(", ")}
              isSmall={portfolioBox.isSmall}
            >
              {portfolioBox.image ? (
                <GatsbyImage
                  image={images[portfolioBox.image]}
                  alt={`smartphone screen of the portfolio entry: ${portfolioBox.label}`}
                  imgStyle={{ objectFit: `contain` }}
                />
              ) : portfolioBox.icon ? (
                portfolioBox.icon
              ) : null}
            </LinkBox>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
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

export const Head = () => <Seo title="Portfolio" pathname="/portfolio" />
