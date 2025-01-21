import React, { useMemo } from "react"
import { graphql } from "gatsby"
import slugify from "slugify"
import Layout from "../components/layout"
import LinkBox from "../components/linkBox"
import PageHeadline from "../components/pageHeadline"
import { GatsbyImage } from "gatsby-plugin-image"
import portfolioData from "../data/portfolioData.json"
import ecLogoWithBg from "../images/logo_original_with_bg.png"
import { JsFiddleIcon } from "../components/icons/jsFiddleIcon"
import { CodepenIcon } from "../components/icons/codepenIcon"
import { LottieIcon } from "../components/icons/lottieIcon"
import { GithubIcon } from "../components/icons/githubIcon"
import { injectIntl } from "gatsby-plugin-intl"

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

const PortfolioPage = ({
  data: {
    allFile: { edges },
  },
  intl,
}) => {
  const images = useMemo(() => transformImages(edges), [edges])
  const seoInfo = {
    title: intl.formatMessage({ id: "portfolio.meta.title" }),
    description: intl.formatMessage({ id: "portfolio.meta.description" }),
    pathname: "/portfolio",
    image: ecLogoWithBg,
  }

  const transformedPortfolioData = useMemo(() => {
    return portfolioData.map((portfolioBox) => {
      const mainTechLabels = portfolioBox.techs?.reduce((acc, techObj) => {
        if (techObj.mainListing === "true") {
          acc.push(
            intl.locale === "de" && techObj.labelDe
              ? techObj.labelDe
              : techObj.label
          )
        }
        return acc
      }, [])
      const url = portfolioBox.content
        ? `/${intl.locale ?? "en"}/portfolio/${slugify(portfolioBox.label, {
            lower: true,
            strict: true,
          })}`
        : portfolioBox.url
      const label =
        intl.locale === "de" && portfolioBox.labelDe
          ? portfolioBox.labelDe
          : portfolioBox.label
      return { ...portfolioBox, mainTechLabels, url, label }
    })
  }, [intl.locale])

  const createAriaLabelForPortfolioEntry = (label, categoryDesc, descText) => {
    return intl.formatMessage({ id: "portfolio.link-box.aria-label.part-before-label" }) +
      ": " +
      label +
      (categoryDesc ? ", " + categoryDesc : "") +
      "; " +
      intl.formatMessage({ id: "portfolio.link-box.aria-label.part-before-desc" }) +
      ": " +
      descText
  }

  return (
    <Layout seo={seoInfo} currentLocale={intl.locale}>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="PORTFOLIO" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {transformedPortfolioData.map((portfolioBox) => (
            <LinkBox
              key={portfolioBox.label}
              target={portfolioBox.content ? "_self" : "_blank"}
              type={portfolioBox.type}
              label={
                intl.locale === "de" && portfolioBox.labelDe
                  ? portfolioBox.labelDe
                  : portfolioBox.label
              }
              ariaLabel={createAriaLabelForPortfolioEntry(
                portfolioBox.label,
                portfolioBox.categoryDesc,
                portfolioBox.mainTechLabels.join(", ")
              )}
              url={
                portfolioBox.content
                  ? `/${intl.locale ?? "en"}/portfolio/${slugify(
                      portfolioBox.label,
                      {
                        lower: true,
                        strict: true,
                      }
                    )}`
                  : portfolioBox.url
              }
              categoryDesc={portfolioBox.categoryDesc}
              descText={portfolioBox.mainTechLabels.join(", ")}
              isSmall={portfolioBox.isSmall}
            >
              {portfolioBox.image ? (
                <GatsbyImage
                  image={images[portfolioBox.image]}
                  alt=""
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

export default injectIntl(PortfolioPage)

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
