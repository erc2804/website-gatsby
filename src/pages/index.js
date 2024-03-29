import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import bgLandscapeImg from "../images/index/bg-landscape.jpg"
import bgPortraitImg from "../images/index/bg-portrait.jpg"
import AdpillarText from "../components/adpillarText"
import allSkills from "../constants/skills"
import ecPhoto from "../images/index/bg-portrait.jpg"

const adpillarTexts = ["Designer", "Developer", "Lead"]

export default function Home() {
  return (
    <Layout onDark>
      <div className="min-h-dvh relative">
        <main className="z-30 relative pt-24 ps-8 md:ps-14 xl:ps-32 2xl:ps-52">
          <h1 className="pt-36 md:pt-52 xl:pt-40 2xl:pt-52 flex flex-col gap-2 text-4xl md:text-7xl xl:text-8xl tracking-[0.125rem] uppercase overflow-hidden">
            <span>
              <span className="text-brand-green-medium-lvl">Ercan</span>
              &nbsp;
              <span className="text-brand-sand">Cicek</span>
            </span>
            <span>
              <span className="text-brand-sand">UX</span>
              &nbsp;
              <AdpillarText
                adpillarTexts={adpillarTexts}
                textClasses="text-brand-green-medium-lvl"
              />
            </span>
          </h1>
          <div className="pt-40 md:pt-52 xl:pt-40 2xl:pt-52 pb-8 flex flex-col xl:flex-row ec-font-subheading">
            {allSkills.map((skill, idx) => (
              <div key={skill.label}>
                <a
                  href={skill.url}
                  className="text-brand-sand hover:text-gray-min-lvl"
                  rel="noopener noreferrer"
                >
                  {skill.label}
                </a>
                {idx < allSkills.length - 1 && (
                  <span className="text-brand-green-medium-lvl">
                    &nbsp;&#47;&nbsp;
                  </span>
                )}
              </div>
            ))}
          </div>
        </main>
        <div className="absolute top-0 left-0 size-full bg-gray-max-lvl/75 z-20" />
        <picture>
          {/* Tailwind Breakpoint: xl */}
          <source media="(min-width: 1280px)" srcSet={bgLandscapeImg} />
          <img
            src={bgPortraitImg}
            alt="Decorative background"
            className="absolute inset-0 size-full object-cover object-right z-10"
          />
        </picture>
      </div>
    </Layout>
  )
}

<Seo 
  title="Ercan Cicek | Experienced UX Developer & Designer in Dusseldorf | Portfolio & Blog" 
  description="Welcome to the website of Ercan Cicek, a UX Developer and Designer based in Dusseldorf. Explore the portfolio showcasing innovative web applications, read insightful articles on my blog, and learn more about me and my work." 
  pathname="/" 
  image={ecPhoto}
/>