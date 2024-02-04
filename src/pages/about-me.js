import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { PortfolioCategories } from "../constants/portfolioCategories"
import { LinkedInIcon } from "../components/icons/linkedinIcon"
import { XingIcon } from "../components/icons/xingIcon"
import { EnvelopeIcon } from "../components/icons/envelopeIcon"
import { StaticImage } from "gatsby-plugin-image"

const allSocialMediaBoxes = [
  {
    type: PortfolioCategories.SHOP,
    label: "Email",
    address: "erc2804@outlook.de",
    url: "mailto:erc2804@outlook.de",
    icon: <EnvelopeIcon />,
  },
  {
    type: PortfolioCategories.APP,
    label: "LinkedIn",
    address: "ercancicek",
    url: "https://www.linkedin.com/in/ercancicek",
    icon: <LinkedInIcon />,
  },
  {
    type: PortfolioCategories.WEB,
    label: "Xing",
    address: "ercan.cicek",
    url: "https://www.xing.com/profile/Ercan_Cicek10?sc_o=mxb_p",
    icon: <XingIcon />,
  },
]

export default function Aboutme() {
  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="ABOUT ME" />
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="max-w-40 md:max-w-64 lg:max-w-none lg:basis-96 size-fit rounded-full overflow-hidden relative">
            <StaticImage
              src="../images/about-me/ercancicek.jpg"
              alt="Ercan Cicek profile"
              className="aspect-square rounded-full z-10"
              objectPosition={"40%"}
            />
            <div className="absolute inset-0 bg-brand-green-high-lvl/20 z-20"></div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <h2 className="ec-font-heading-2 leading-[1.2] font-bold text-6xl text-brand-green-medium-lvl">
              <span className="hidden">Ercan Cicek</span>
              <span>
                Developer. Designer.&nbsp;
                <br />
                Animation expert.
              </span>
            </h2>
            <p className="ec-font-subheading">
              I am a UX Developer with more than seven years of work experience
              in conceptualizing and implementing web applications.
              <br />
              Mainly I am working with <strong>Angular</strong>,{" "}
              <strong>Figma</strong> and <strong>Adobe CC</strong>.<br />
              Due to my previous studies of Communication and Multimedia Design
              at Fachhochschule Aachen I have an affinity for{" "}
              <strong>Frontend design & development</strong> and getting further
              education regularly.
            </p>
          </div>
        </div>
        <hr className="border-gray-low-lvl my-8 md:my-12" />
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {allSocialMediaBoxes.map((socialMediaBox) => (
            <a
              href={socialMediaBox.url}
              className="rounded-3xl shadow-sm lg:hover:shadow-lg bg-gray-min-lvl px-6 py-4 flex-none flex flex-row gap-4 items-center text-typo-medium-lvl/70 transition-all"
            >
              <div className="flex justify-center items-center size-10 [&>svg]:size-full [&>svg]:fill-brand-green-medium-lvl">
                {socialMediaBox.icon}
              </div>
              <div class="flex flex-col">
                <span className="ec-font-base">{socialMediaBox.label}</span>
                <span className="ec-font-subheading font-bold">
                  {socialMediaBox.address}
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="About Me" pathname="/about-me" />
