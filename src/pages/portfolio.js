import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import LinkBox from "../components/linkBox"
import PageHeadline from "../components/pageHeadline"
import { GatsbyImage } from "gatsby-plugin-image"
import { JsFiddleIcon } from "../components/icons/jsFiddleIcon"
import { CodepenIcon } from "../components/icons/codepenIcon"
import { LottieIcon } from "../components/icons/lottieIcon"
import { GithubIcon } from "../components/icons/githubIcon"

const Types = {
  WEB: "WEB",
  APP: "APP",
  SHOP: "SHOP",
  OTHER: "OTHER",
}

const ColorClassesPerType = {
  OTHER: "bg-brand-blue",
  APP: "bg-brand-green-low-lvl",
  SHOP: "bg-brand-green-high-lvl",
  WEB: "bg-brand-green-medium-lvl",
}

const linkboxAnimClasses =
  "my-6 scale-[0.80] xl:scale-100 xl:group-hover:scale-[0.80] transition-transform duration-200"
const IconDefClasses = "fill-brand-sand size-full max-h-[66%]"

const allPortfolioBoxes = [
  {
    type: Types.APP,
    label: "iOS app, CasualVocab",
    url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
    image: "casualvocab",
    techs: ["Swift", "SwiftUI"],
  },
  {
    type: Types.APP,
    label: "Flutter app, Welliba",
    url: "https://apps.apple.com/de/app/welliba-companion/id1597739395",
    image: "welliba_app",
    techs: ["Flutter", "Figma", "UX-Design"],
  },
  {
    type: Types.SHOP,
    label: "Webshop, kindeskinder",
    url: "https://kindeskinder.biz/",
    image: "kindeskinder",
    techs: ["Shopify", "Liquid", "JavaScript", "CSS"],
  },
  {
    type: Types.SHOP,
    label: "Webshop, PuraVida & Oswald",
    url: "https://oswald-puravida-wein.de/",
    image: "pvoswald",
    techs: ["Shopify", "Liquid", "JavaScript", "CSS"],
  },
  {
    type: Types.WEB,
    label: "Website, HIT",
    url: "https://www.hit.de/",
    image: "hit",
    techs: ["Vue.js", "Nuxt.js", "TailwindCSS", "Pimcore", "Figma"],
  },
  {
    type: Types.WEB,
    label: "Website, tech demo",
    url: "https://ercancicek.com/mel-menu.html",
    image: "melmenu",
    techs: ["jQuery", "JavaScript", "CSS"],
  },
  {
    type: Types.OTHER,
    label: "my fiddles",
    url: "https://jsfiddle.net/user/erc2804/",
    icon: (
      <JsFiddleIcon iconClasses={`${IconDefClasses} ${linkboxAnimClasses}`} />
    ),
  },
  {
    type: Types.OTHER,
    label: "my codepens",
    url: "https://codepen.io/erc2804",
    icon: (
      <CodepenIcon iconClasses={`${IconDefClasses} ${linkboxAnimClasses}`} />
    ),
  },
  {
    type: Types.OTHER,
    label: "my lottiefiles",
    url: "https://lottiefiles.com/erc2804",
    icon: (
      <LottieIcon iconClasses={`${IconDefClasses} ${linkboxAnimClasses}`} />
    ),
  },
  {
    type: Types.OTHER,
    label: "Website source code",
    url: "https://github.com/erc2804/website-gatsby",
    icon: (
      <GithubIcon iconClasses={`${IconDefClasses} ${linkboxAnimClasses}`} />
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
        <PageHeadline>PORTFOLIO</PageHeadline>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allPortfolioBoxes.map((portfolioBox) => (
            <LinkBox
              key={portfolioBox.label}
              label={portfolioBox.label}
              url={portfolioBox.url}
              descText={portfolioBox.techs?.join(", ")}
              bgColorClass={ColorClassesPerType[portfolioBox.type]}
              isSmall={portfolioBox.isSmall}
            >
              {portfolioBox.image ? (
                <GatsbyImage
                  image={images[portfolioBox.image]}
                  alt={`smartphone screen of the portfolio entry: ${portfolioBox.label}`}
                  imgStyle={{ objectFit: `contain` }}
                  className={linkboxAnimClasses}
                />
              ) : portfolioBox.icon ? (
                <div className="flex justify-center items-center">
                  {portfolioBox.icon}
                </div>
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
