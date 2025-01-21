import React from "react"
import { navigate } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

const LangButton = ({ isActive = false, ariaLabel, onDark, onClick, children }) => {
    const textColorClasses = onDark ? 'text-brand-sand hover:text-typo-min-lvl' : 'text-typo-high-lvl hover:text-brand-green-high-lvl'
    const activeClasses = `before:content-[''] before:block before:size-8 before:absolute before:inset-0 before:m-auto before:transform before:-translate-y-0.5 before:rounded-full ${onDark ? 'before:bg-brand-green-high-lvl' : 'before:bg-brand-green-low-lvl'}`
  return (
    <button
      className={`size-11 transition-colors relative ${textColorClasses} ${isActive ? activeClasses : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isActive ? "true" : undefined}
    >
      <span className="relative">{children}</span>
    </button>
  )
}

const LanguageSwitcher = ({ onDark }) => {
  const intl = useIntl()
  const currentLocale = intl.locale

  const switchLanguage = (language) => {
    const currentPath = window.location.pathname
    const newPath = `/${language}${currentPath.replace(/^\/(en|de)/, "")}`
    navigate(newPath)
  }

  return (
    <div className="flex flex-row items-center" data-chat={intl.formatMessage({ id: 'chat-bubble.language-switcher' })}>
      <LangButton
        isActive={currentLocale === "en"}
        onDark={onDark}
        onClick={() => switchLanguage("en")}
        ariaLabel={intl.formatMessage({ id: 'header.switch-lang-to-english' })}
      >
        EN
      </LangButton>
      <span className={onDark ? "text-brand-sand" : "text-typo-high-lvl"} aria-hidden="true">
        /
      </span>
      <LangButton
        isActive={currentLocale === "de"}
        onDark={onDark}
        onClick={() => switchLanguage("de")}
        ariaLabel={intl.formatMessage({ id: 'header.switch-lang-to-german' })}
      >
        DE
      </LangButton>
    </div>
  )
}

export default LanguageSwitcher
