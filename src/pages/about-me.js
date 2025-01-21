import React, { useMemo } from "react"
import Layout from "../components/layout"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"
import allSocialMediaBoxes from "../data/socialMediaData"
import allSkills from "../data/skillsData.json"
import AiChatbot from "../components/aiChatbot"
import TextLink from "../components/textLink"
import ecAvatar from "../images/about-me/ercancicek.jpg"
import { LinkedInIcon } from "../components/icons/linkedInIcon"
import { XingIcon } from "../components/icons/xingIcon"
import { EnvelopeIcon } from "../components/icons/envelopeIcon"
import { injectIntl } from "gatsby-plugin-intl"

const mappedIcons = {
  LinkedInIcon: <LinkedInIcon />,
  XingIcon: <XingIcon />,
  EnvelopeIcon: <EnvelopeIcon />,
}

const SocialMediaLink = ({ label, labelDe, url, icon, address, intl }) => (
  <a
    href={url}
    className="rounded-3xl shadow-sm lg:hover:shadow-lg bg-gray-min-lvl px-6 py-4 flex-none flex flex-row gap-4 items-center text-typo-medium-lvl/70 transition-all"
  >
    <div className="flex justify-center items-center size-10 [&>svg]:size-full [&>svg]:fill-brand-green-medium-lvl">
      {mappedIcons[icon]}
    </div>
    <div className="flex flex-col">
      <span className="ec-font-base">{intl.locale === 'de' && labelDe ? labelDe : label}</span>
      <span className="ec-font-subheading font-bold">{address}</span>
      <span className="sr-only">{`, ${intl.formatMessage({ id: 'about-me.opens-in-new-tab' })}`}</span>
    </div>
  </a>
)

const AboutmePage = ({ intl }) => {
  const filteredSkills = useMemo(
    () => allSkills.filter((skill) => skill["show-in-aboutme"]),
    []
  )
  const seoInfo = {
    title: intl.formatMessage({ id: 'about-me.meta.title' }),
    description: intl.formatMessage({ id: 'about-me.meta.description' }),
    pathname: `/about-me`,
    image: ecAvatar
  }

  return (
    <Layout seo={seoInfo} currentLocale={intl.locale}>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text={intl.locale === 'de' ? 'ÜBER MICH' : 'ABOUT ME'} />
        <div className="flex flex-col-reverse lg:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="ec-font-heading-2 leading-[1.2] font-bold text-6xl text-brand-green-medium-lvl">
              <span className="hidden">Ercan Cicek</span>
              <span>
                {intl.formatMessage({ id: 'about-me.ec-title.part-before-linebreak' })}
                {" "}<br />
                {intl.formatMessage({ id: 'about-me.ec-title.part-after-linebreak' })}
              </span>
            </h2>
            <p className="ec-font-subheading">
              {intl.formatMessage({id: "about-me.ec-description.part-before-skills-list"})}
              {filteredSkills.map((skill, idx) => (
                <span key={skill.label}>
                  <TextLink href={skill.url}>{skill.label}</TextLink>
                  {idx < filteredSkills.length - 2 && <span>, </span>}
                  {idx === filteredSkills.length - 2 && <span> {intl.formatMessage({id: "about-me.ec-description.and"})} </span>}
                </span>
              ))}
              {intl.formatMessage({id: "about-me.ec-description.part-after-skills-list"})}
              {/* <!-- TODO --> */}
              <TextLink href={intl.formatMessage({ id: 'about-me.ec-description.a11y.url' })}>
                { intl.formatMessage({ id: 'about-me.ec-description.a11y.label' }) }
              </TextLink>
              { intl.formatMessage({ id: 'about-me.ec-description.part-after-a11y' }) }
              <TextLink href="https://ielts.org/">IELTS</TextLink>
              { intl.formatMessage({ id: 'about-me.ec-description.part-after-ielts' }) }
            </p>
          </div>
          <div className="max-w-40 md:max-w-64 lg:max-w-none lg:basis-80 size-fit rounded-full overflow-hidden relative">
            <StaticImage
              src="../images/about-me/ercancicek.jpg"
              alt={intl.formatMessage({ id: "about-me.profile-image-alt" })}
              className="aspect-square rounded-full z-10"
              objectPosition={"40%"}
            />
            <div className="absolute inset-0 bg-brand-green-high-lvl/20 z-20"></div>
          </div>
        </div>
        <hr className="border-gray-low-lvl my-8 md:my-12" aria-hidden="true" />
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="ec-font-heading-2">{intl.formatMessage({ id: "about-me.questions" })}</h2>
            <AiChatbot />
          </div>
          <div className="md:sticky md:top-28 md:h-full flex-none flex flex-col gap-6">
            <h2 className="ec-font-heading-2">{intl.formatMessage({ id: "about-me.contact" })}</h2>
            <div className="flex flex-col gap-6 min-[500px]:items-center md:items-stretch">
              {allSocialMediaBoxes.map((socialMediaBox) => (
                <SocialMediaLink
                  key={socialMediaBox.label}
                  intl={intl}
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

export default injectIntl(AboutmePage)