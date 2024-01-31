import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import bgLandscapeImg from "../images/index/bg-landscape.jpg"
import bgPortraitImg from "../images/index/bg-portrait.jpg"

const allSkills = [
  {
    label: "Vue",
    url: "https://vuejs.org/",
  },
  {
    label: "React",
    url: "https://reactjs.org/",
  },
  {
    label: "Figma",
    url: "https://www.figma.com/",
  },
  {
    label: "Adobe CC",
    url: "https://www.adobe.com/creativecloud.html",
  },
]

const finalAdpillarTexts = ["Designer", "Developer"]

export default function Home() {
  const [currentAdpillarText, setCurrentAdpillarText] = useState("")
  let initialAdpillarTimeout = null
  let adpillarWordIdx = 0
  let adpillarIntval = null
  let clearAdpillarIntval = null
  let nextAdpillarTimeout = null
  let nextAdpillarWordTimeout = null

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialAdpillarTimeout = setTimeout(
        () => startAdpillarAnim(adpillarWordIdx),
        300
      )
    }

    return () => {
      clearInterval(adpillarIntval)
      clearInterval(clearAdpillarIntval)
      clearTimeout(initialAdpillarTimeout)
      clearTimeout(nextAdpillarTimeout)
      clearTimeout(nextAdpillarWordTimeout)
    }
  }, [])

  const startAdpillarAnim = (idx, finalAdpillarIdx = 0) => {
    if (finalAdpillarTexts[idx][finalAdpillarIdx] === undefined) {
      nextAdpillarWord()
      return
    }

    setCurrentAdpillarText(
      (currentText) => currentText + finalAdpillarTexts[idx][finalAdpillarIdx]
    )

    setTimeout(() => startAdpillarAnim(idx, finalAdpillarIdx + 1), 150)
  }

  const nextAdpillarWord = () => {
    adpillarWordIdx++
    if (finalAdpillarTexts[adpillarWordIdx]) {
      nextAdpillarWordTimeout = setTimeout(() => {
        clearAdpillar()
      }, 2000)
    }
  }

  const clearAdpillar = () => {
    setCurrentAdpillarText((currentText) => {
      if (currentText.length === 0) {
        nextAdpillarTimeout = setTimeout(() => {
          startAdpillarAnim(adpillarWordIdx)
        }, 500)
        return currentText
      }

      const newText = currentText.slice(0, -1)
      setTimeout(() => clearAdpillar(), 50)
      return newText
    })
  }

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
              <span className="text-brand-green-medium-lvl">
                {currentAdpillarText}
              </span>
              <span className="text-brand-green-medium-lvl animate-blink">_</span>
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
                  &nbsp;{skill.label}
                </a>
                {idx < allSkills.length - 1 && (
                  <span className="text-brand-green-medium-lvl">&nbsp;&#47;</span>
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

export const Head = () => <Seo title="Home" />
