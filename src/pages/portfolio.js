import React, { useMemo } from "react"
import { graphql } from "gatsby"
import slugify from "slugify"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import LinkBox from "../components/linkBox"
import PageHeadline from "../components/pageHeadline"
import { GatsbyImage } from "gatsby-plugin-image"
import portfolioData from "../data/portfolioData.json"
import ecLogoWithBg from "../images/logo_original_with_bg.png"
import { JsFiddleIcon } from "../components/icons/jsFiddleIcon"
import { CodepenIcon } from "../components/icons/codepenIcon"
import { LottieIcon } from "../components/icons/lottieIcon"
import { GithubIcon } from "../components/icons/githubIcon"

const mappedIcons = {
  JsFiddleIcon: <JsFiddleIcon />,
  CodepenIcon: <CodepenIcon />,
  LottieIcon: <LottieIcon />,
  GithubIcon: <GithubIcon />,
}

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
          {portfolioData.map((portfolioBox) => (
            <LinkBox
              key={portfolioBox.label}
              target={portfolioBox.content ? "_self" : "_blank"}
              type={portfolioBox.type}
              label={portfolioBox.label}
              url={
                portfolioBox.content
                  ? `/portfolio/${slugify(portfolioBox.label, {
                      lower: true,
                      strict: true,
                    })}`
                  : portfolioBox.url
              }
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
                mappedIcons[portfolioBox.icon]
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

export const Head = () => (
  <Seo
    title="Ercan Cicek's Portfolio | Web & Mobile Projects"
    description="Explore Ercan Cicek's portfolio showcasing a variety of web and mobile development projects. Discover the technologies used, project details, and more"
    pathname="/portfolio"
    image={ecLogoWithBg}
  />
)
