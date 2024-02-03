import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import LinkBox from "../components/linkBox"
import PageHeadline from "../components/pageHeadline"
import { LinkedInIcon } from "../components/icons/linkedinIcon"
import { XingIcon } from "../components/icons/xingIcon"
import { MailSquareIcon } from "../components/icons/mailSquareIcon"
import { StaticImage } from "gatsby-plugin-image"

const linkboxAnimClasses =
  "my-6 scale-[0.80] xl:scale-100 xl:group-hover:scale-[0.80] transition-transform duration-200"

const allSocialMediaBoxes = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ercancicek",
    icon: (
      <LinkedInIcon
        iconClasses={`fill-gray-min-lvl size-3/5 ${linkboxAnimClasses}`}
      />
    ),
    bgColorClass: "bg-brand-blue",
  },
  {
    label: "Xing",
    url: "https://www.xing.com/profile/Ercan_Cicek10?sc_o=mxb_p",
    icon: (
      <XingIcon
        iconClasses={`fill-gray-min-lvl size-3/5 ${linkboxAnimClasses}`}
      />
    ),
    bgColorClass: "bg-brand-green-high-lvl",
  },
  {
    label: "Email",
    url: "mailto:erc2804@outlook.de",
    icon: (
      <MailSquareIcon
        iconClasses={`fill-gray-max-lvl size-3/5 ${linkboxAnimClasses}`}
      />
    ),
    bgColorClass: "bg-brand-green-medium-lvl",
    descText: "erc2804@outlook.de"
  },
]

export default function Aboutme() {
  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
      <PageHeadline text="ABOUT ME" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 md:gap-y-20">
          <div className="max-w-40 md:max-w-none size-fit rounded-full overflow-hidden relative">
            <StaticImage
              src="../images/about-me/ercancicek.jpg"
              alt="Ercan Cicek profile"
              className="aspect-square rounded-full z-10"
              objectPosition={"40%"}
            />
            <div className="absolute inset-0 bg-brand-green-high-lvl/20 z-20"></div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
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
          <hr className="border-gray-low-lvl md:col-span-3" />
          {allSocialMediaBoxes.map((socialMediaBox, idx) => (
            <LinkBox
              key={idx}
              label={socialMediaBox.label}
              url={socialMediaBox.url}
              descText={socialMediaBox.descText}
              bgColorClass={socialMediaBox.bgColorClass}
            >
              <div className="flex justify-center items-center size-full">
                {socialMediaBox.icon}
              </div>
            </LinkBox>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="About Me" pathname="/about-me" />
