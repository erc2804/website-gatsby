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
    <footer className="hidden md:flex z-50 h-14 flex-row gap-5 justify-start items-center px-5 relative">
      {navElements.map((navElement) => (
        <NavLink key={navElement.to} to={navElement.to} onDark={onDark} smallVersion={true} attrDataChat={intl.formatMessage({ id: 'chat-bubble.legal-links' })}>
          {intl.locale === 'de' && navElement.labelDe ? navElement.labelDe : navElement.label}
        </NavLink>
      ))}
    </footer>
  )
}

export default injectIntl(Footer)
