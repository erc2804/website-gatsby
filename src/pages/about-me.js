import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"
import allSocialMediaBoxes from "../constants/socialMediaBoxes"

const SocialMediaLink = ({ label, url, icon, address }) => (
  <a
    href={url}
    className="rounded-3xl shadow-sm lg:hover:shadow-lg bg-gray-min-lvl px-6 py-4 flex-none flex flex-row gap-4 items-center text-typo-medium-lvl/70 transition-all"
  >
    <div className="flex justify-center items-center size-10 [&>svg]:size-full [&>svg]:fill-brand-green-medium-lvl">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="ec-font-base">{label}</span>
      <span className="ec-font-subheading font-bold">{address}</span>
    </div>
  </a>
)

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
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {allSocialMediaBoxes.map((socialMediaBox) => (
            <SocialMediaLink key={socialMediaBox.label} {...socialMediaBox} />
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="About Me" pathname="/about-me" />
