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

const Footer = ({ onDark, isFixed, intl }) => {
  return (
    <footer className={`hidden md:flex w-full z-50 h-14 flex-row justify-start items-center ${isFixed ? 'absolute left-0 bottom-0' : ''}`}>
      {navElements.map((navElement) => (
        <NavLink key={navElement.to} to={navElement.to} onDark={onDark}>
          {intl.locale === 'de' && navElement.labelDe ? navElement.labelDe : navElement.label}
        </NavLink>
      ))}
    </footer>
  )
}

export default injectIntl(Footer)
