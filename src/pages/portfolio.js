import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import LinkBox from "../components/linkBox"
import PageHeadline from "../components/pageHeadline"
import { GatsbyImage } from "gatsby-plugin-image"
import { PortfolioCategories } from "../constants/portfolioCategories"
import { JsFiddleIcon } from "../components/icons/jsFiddleIcon"
import { CodepenIcon } from "../components/icons/codepenIcon"
import { LottieIcon } from "../components/icons/lottieIcon"
import { GithubIcon } from "../components/icons/githubIcon"

const allPortfolioBoxes = [
  {
    type: PortfolioCategories.APP,
    label: "CasualVocab",
    url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
    categoryDesc: "iOS app",
    image: "casualvocab",
    techs: ["Swift", "SwiftUI"],
  },
  {
    type: PortfolioCategories.APP,
    label: "Welliba",
    url: "https://apps.apple.com/de/app/welliba-companion/id1597739395",
    categoryDesc: "flutter app",
    image: "welliba_app",
    techs: ["Flutter", "Figma", "UX-Design"],
  },
  {
    type: PortfolioCategories.SHOP,
    label: "kindeskinder",
    url: "https://kindeskinder.biz/",
    categoryDesc: "Webshop",
    image: "kindeskinder",
    techs: ["Shopify", "Liquid", "JavaScript", "CSS"],
  },
  {
    type: PortfolioCategories.SHOP,
    label: "PuraVida & Oswald",
    url: "https://oswald-puravida-wein.de/",
    categoryDesc: "Webshop",
    image: "pvoswald",
    techs: ["Shopify", "Liquid", "JavaScript", "CSS"],
  },
  {
    type: PortfolioCategories.WEB,
    label: "HIT",
    url: "https://www.hit.de/",
    categoryDesc: "Website",
    image: "hit",
    techs: ["Vue.js", "Nuxt.js", "TailwindCSS", "Pimcore", "Figma"],
  },
  {
    type: PortfolioCategories.WEB,
    label: "tech demo",
    url: "https://ercancicek.com/mel-menu.html",
    categoryDesc: "Website",
    image: "melmenu",
    techs: ["jQuery", "JavaScript", "CSS"],
  },
  {
    type: PortfolioCategories.OTHER,
    label: "my fiddles",
    url: "https://jsfiddle.net/user/erc2804/",
    icon: (
      <JsFiddleIcon />
    ),
  },
  {
    type: PortfolioCategories.OTHER,
    label: "my codepens",
    url: "https://codepen.io/erc2804",
    icon: (
      <CodepenIcon />
    ),
  },
  {
    type: PortfolioCategories.OTHER,
    label: "my lottiefiles",
    url: "https://lottiefiles.com/erc2804",
    icon: (
      <LottieIcon />
    ),
  },
  {
    type: PortfolioCategories.OTHER,
    label: "Website source code",
    url: "https://github.com/erc2804/website-gatsby",
    icon: (
      <GithubIcon />
    ),
    techs: ["React", "Gatsby", "TailwindCSS", "PWA", "Figma"],
  },
]

export default function Portfolio({
  data: {
    allFile: { edges },
  },
}) {
  const images = Object.fromEntries(
    edges.map(
      ({
        node: {
          name,
          childImageSharp: { gatsbyImageData },
        },
      }) => [name, gatsbyImageData]
    )
  )
  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="PORTFOLIO" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
