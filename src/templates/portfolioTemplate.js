import React, { useEffect, useMemo } from "react"
import { injectIntl } from "gatsby-plugin-intl"
import slugify from "slugify"
import { graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import PageHeadline from "../components/pageHeadline"
import { GatsbyImage } from "gatsby-plugin-image"
import { ExternalLinkIcon } from "../components/icons/externalLinkIcon"
import { ArrowLeftIcon } from "../components/icons/arrowLeftIcon"

const Chip = ({ children }) => (
  <div className="px-1.5 pt-0.5 grid place-content-center rounded-[4px] bg-gray-low-lvl">
    {children}
  </div>
)

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

const PortfolioTemplate = ({ data, intl, pageContext }) => {
  const {
    label,
    url,
    urlDesc,
    image,
    imageIsPurelyDecorative,
    content,
    techs,
  } = pageContext
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const slug = slugify(label, { lower: true, strict: true })
  const images = useMemo(
    () => transformImages(data.allFile.edges),
    [data.allFile.edges]
  )
  const seoInfo = {
    title: label + intl.formatMessage({ id: "portfolio-template.meta.title" }),
    description:
      intl.formatMessage({
        id: "portfolio-template.meta.description.part-before-label",
      }) +
      label +
      intl.formatMessage({
        id: "portfolio-template.meta.description.part-after-label",
      }),
    pathname: `/portfolio/${slug}`,
    image: image ? images[image].images.fallback.src : "",
  }

  const respDescText =
    intl.locale === "de" && content.descriptionDe
      ? content.descriptionDe
      : content.description
  const splitDescTexts = respDescText.split("\n")

  return (
    <Layout seo={seoInfo} currentLocale={intl.locale}>
      <main className="ec-layout-visual-content py-24 min-h-dvh-minus-footer">
        <div className="flex flex-row items-center gap-6">
          <Link
            to="/portfolio"
            className="w-fit flex-none flex flex-row gap-2 py-3 items-center group"
          >
            <div className="flex justify-center items-center size-6 [&>svg]:size-full [&>svg]:fill-typo-medium-lvl/70 [&>svg]:transform group-hover:[&>svg]:fill-brand-green-medium-lvl group-hover:[&>svg]:-translate-x-1 [&>svg]:transition-all">
              <ArrowLeftIcon />
            </div>
            <span className="ec-font-base font-bold transform translate-y-px text-typo-medium-lvl/70 group-hover:text-brand-green-medium-lvl transition-colors">
              {intl.formatMessage({ id: "portfolio-template.back" })}
            </span>
          </Link>
          <PageHeadline text={label} />
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="ec-font-heading-2 leading-[1.2] font-bold text-4xl text-brand-green-medium-lvl">
              {intl.locale === "de" && content.titleDe
                ? content.titleDe
                : content.title}
            </h2>
            {respDescText && (
              <div className="flex flex-col gap-4 ec-font-subheading">
                {splitDescTexts.map((descTextPart, idx) => (
                  <p key={idx}>{descTextPart}</p>
                ))}
              </div>
            )}
            {techs && (
              <ul className="flex flex-wrap gap-2" aria-label={intl.formatMessage({ id: 'portfolio-template.techs.list.aria-label' })}>
                {techs.map((tech) => {
                  if (tech.mainListing) {
                    const respLabel =
                      intl.locale === "de" && tech.labelDe
                        ? tech.labelDe
                        : tech.label
                    return <Chip key={respLabel}>{respLabel}</Chip>
                  }
                  return <></>
                })}
              </ul>
            )}
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
                <span className="ec-font-base" aria-hidden="true">{urlDesc ?? url}</span>
                <span className="ec-font-subheading font-bold">
                  {intl.formatMessage({
                    id: "portfolio-template.main-button.part-before-label",
                  })}{" "}
                  {label}{" "}
                  {intl.formatMessage({
                    id: "portfolio-template.main-button.part-after-label",
                  })}
                </span>
                <span className="sr-only">{`, ${intl.formatMessage({ id: 'portfolio-template.opens-in-new-tab' })}`}</span>
              </div>
            </a>
          </div>
          {image && !imageIsPurelyDecorative && (
            <div className="max-w-40 md:max-w-64 lg:max-w-none lg:basis-80 size-fit overflow-hidden relative">
              <GatsbyImage
                image={images[image]}
                alt=""
                imgStyle={{ objectFit: `contain` }}
              />
            </div>
          )}
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

export default injectIntl(PortfolioTemplate)
