import React from "react"
import { Link } from "gatsby-plugin-intl"

const NavLink = ({ to, onDark, children }) => {
  const navLinkClasses = `
  px-6 py-2 flex items-center w-fit ec-font-subheading 
  ${
    onDark
      ? "text-brand-sand hover:text-gray-min-lvl"
      : "text-typo-high-lvl hover:text-gray-max-lvl"
  } transition-colors relative`
  const activeClasses = `before:content-[''] before:block before:w-[calc(100%-3rem)] before:h-1 before:absolute before:left-1/2 before:transform before:-translate-x-1/2 before:bottom-1 before:bg-brand-green-medium-lvl before:rounded-full ${
    onDark ? "text-gray-min-lvl" : "text-gray-max-lvl"
  }`

  return (
    <Link
      to={to}
      className={navLinkClasses}
      activeClassName={activeClasses}
      partiallyActive={true}
      aria-label={children}
    >
      {children}
    </Link>
  )
}

export default NavLink
