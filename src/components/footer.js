import React from "react"
import { injectIntl } from "gatsby-plugin-intl"
import NavLink from "./navLink"

const navElements = [
  {
    label: "Imprint",
    labelDe: "Impressum",
    to: "/imprint",
  },
  {
    label: "Privacy Policy",
    labelDe: "Datenschutzerklärung",
    to: "/privacy"
  }
]

const Footer = ({ onDark, intl }) => {
  return (
    <footer className="hidden md:block z-50 w-full h-14 relative">
      <nav className="flex flex-row gap-5 justify-start items-center h-14 px-5 relative" aria-label={intl.formatMessage({ id: 'footer.nav.aria-label' })}>
        {navElements.map((navElement) => (
          <NavLink key={navElement.to} to={navElement.to} onDark={onDark} smallVersion={true} attrDataChat={intl.formatMessage({ id: 'chat-bubble.legal-links' })}>
            {intl.locale === 'de' && navElement.labelDe ? navElement.labelDe : navElement.label}
          </NavLink>
        ))}
      </nav>
    </footer>
  )
}

export default injectIntl(Footer)
