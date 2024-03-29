import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"
import allSocialMediaBoxes from "../constants/socialMediaBoxes"
import AiChatbot from "../components/aiChatbot"
import ecAvatar from "../images/about-me/ercancicek.jpg"

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
        <div className="flex flex-col-reverse lg:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="ec-font-heading-2 leading-[1.2] font-bold text-6xl text-brand-green-medium-lvl">
              <span className="hidden">Ercan Cicek</span>
              <span>
                Developer. Designer.&nbsp;
                <br />
                People Lead.
              </span>
            </h2>
            <p className="ec-font-subheading">
              I'm Ercan, a UX Developer & UX Designer with more than eight years
              of work experience in conceptualizing and implementing web
              applications.
              <br />
              Mainly I am working with <strong>Vue</strong>,{" "}
              <strong>React</strong>, <strong>Figma</strong> and{" "}
              <strong>Rive</strong>.<br />
              Due to my previous studies of Communication and Multimedia Design
              at Fachhochschule Aachen I have an affinity for{" "}
              <strong>Frontend design & development</strong> and getting further
              education regularly. My main goal is to{" "}
              <strong>build the bridge</strong> between design and development.
            </p>
          </div>
          <div className="max-w-40 md:max-w-64 lg:max-w-none lg:basis-80 size-fit rounded-full overflow-hidden relative">
            <StaticImage
              src="../images/about-me/ercancicek.jpg"
              alt="Ercan Cicek profile"
              className="aspect-square rounded-full z-10"
              objectPosition={"40%"}
            />
            <div className="absolute inset-0 bg-brand-green-high-lvl/20 z-20"></div>
          </div>
        </div>
        <hr className="border-gray-low-lvl my-8 md:my-12" />
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h3 className="ec-font-heading-2">Questions</h3>
            <AiChatbot />
          </div>
          <div className="md:sticky md:top-28 md:h-full flex-none flex flex-col gap-6">
            <h3 className="ec-font-heading-2">Contact</h3>
            <div className="flex flex-col gap-6 min-[500px]:items-center md:items-stretch">
              {allSocialMediaBoxes.map((socialMediaBox) => (
                <SocialMediaLink
                  key={socialMediaBox.label}
                  {...socialMediaBox}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="About Ercan Cicek | Experienced UX Developer & UX Designer in Dusseldorf"
    description="Learn more about Ercan Cicek, an experienced UX Developer and Designer based in Dusseldorf with over eight years of experience in conceptualizing and implementing web applications. Specializing in Vue, Figma and building the bridge between design and development"
    pathname="/about-me"
    image={ecAvatar}
  />
)
