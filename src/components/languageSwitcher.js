import React from "react"
import { navigate } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

const LanguageSwitcher = ({ onDark }) => {
  const intl = useIntl()
  const currentLocale = intl.locale

  const switchLanguage = (language) => {
    const currentPath = window.location.pathname
    const newPath = `/${language}${currentPath.replace(/^\/(en|de)/, "")}`
    navigate(newPath)
  }

  return (
    <div className={`flex flex-row gap-2 ${onDark ? 'text-brand-sand' : 'text-typo-high-lvl'}`}>
      <button className={`${currentLocale === 'en' ? 'text-brand-green-medium-lvl' : ''}`} onClick={() => switchLanguage("en")}>EN</button>
      <span>/</span>
      <button className={`${currentLocale === 'de' ? 'text-brand-green-medium-lvl' : ''}`} onClick={() => switchLanguage("de")}>DE</button>
    </div>
  )
}

export default LanguageSwitcher
