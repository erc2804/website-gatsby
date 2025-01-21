import React from "react"
import { injectIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import Footer from "../components/footer"
import MouseChatBubble from "../components/mouseChatBubble"
import bgLandscapeImg from "../images/index/bg-landscape.jpg"
import bgPortraitImg from "../images/index/bg-portrait.jpg"
import AdpillarText from "../components/adpillarText"
import allSkills from "../data/skillsData.json"
import ecPhoto from "../images/index/bg-portrait.jpg"

const adpillarTexts = ["Designer", "Developer"]

const HomePage = ({ intl }) => {
  const seoInfo = {
    title: intl.formatMessage({ id: "index.meta.title" }),
    description: intl.formatMessage({ id: "index.meta.description" }),
    pathname: "/",
    image: ecPhoto,
  }
  return (
    <Layout seo={seoInfo} currentLocale={intl.locale} onDark>
      <div className="min-h-dvh relative">
        <main className="z-30 relative pt-24 pl-8 md:pl-14 xl:pl-32 2xl:pl-52 min-h-dvh-minus-footer">
          <h1 className="pt-36 md:pt-36 2xl:pt-52 flex flex-col gap-2 text-4xl md:text-7xl xl:text-8xl tracking-[0.125rem] uppercase overflow-hidden" aria-label={intl.formatMessage({ id: 'index.main-content.aria-label' })}>
            <span aria-hidden="true">
              <span className="text-brand-green-medium-lvl" data-chat={intl.formatMessage({ id: 'chat-bubble.first-name' })}>Ercan</span>
              &nbsp;
              <span className="text-brand-sand">Cicek</span>
            </span>
            <span aria-hidden="true">
              <span className="text-brand-sand">UX</span>
              &nbsp;
              <AdpillarText
                adpillarTexts={adpillarTexts}
                textClasses="text-brand-green-medium-lvl"
              />
            </span>
          </h1>
          <ul className="pt-40 md:pt-20 2xl:pt-52 pb-8 flex flex-col md:flex-row ec-font-subheading" aria-label={intl.formatMessage({ id: 'index.skills.list.aria-label' })}>
            {allSkills.map((skill, idx) => {
              const chatMessage = skill["chat-message-intl-id"]
                ? intl.formatMessage({
                    id: `chat-bubble.${skill["chat-message-intl-id"]}`,
                  })
                : null
              const chatProps = chatMessage ? { "data-chat": chatMessage } : {}

              return (
                <li key={skill.id} {...chatProps}>
                  <a
                    href={skill.url}
                    className="text-brand-sand hover:text-gray-min-lvl"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {intl.locale === "de" && skill.labelDe
                      ? skill.labelDe
                      : skill.label}
                  </a>
                  {idx < allSkills.length - 1 && (
                    <span className="text-brand-green-medium-lvl" aria-hidden="true">
                      &nbsp;&#47;&nbsp;
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </main>
        <Footer onDark={true} />
        <div className="absolute top-0 left-0 size-full bg-gray-max-lvl/75 z-20" />
        <picture>
          {/* Tailwind Breakpoint: xl */}
          <source media="(min-width: 1280px)" srcSet={bgLandscapeImg} />
          <img
            src={bgPortraitImg}
            alt=""
            className="absolute inset-0 size-full object-cover object-right z-10"
          />
        </picture>
      </div>
      <MouseChatBubble />
    </Layout>
  )
}

export default injectIntl(HomePage)
