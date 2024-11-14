import React from "react"
import { Link } from "gatsby-plugin-intl"

const NavLink = ({
  to,
  onDark,
  smallVersion = false,
  additionalClasses = "",
  children,
}) => {
  const baseClasses = `flex items-center w-fit transition-colors relative ${additionalClasses}`
  const fontClasses = smallVersion ? "ec-font-base" : "ec-font-subheading px-6 py-2"
  const colorClasses = onDark
    ? "text-brand-sand hover:text-gray-min-lvl"
    : "text-typo-high-lvl hover:text-gray-max-lvl"

  const navLinkClasses = `${baseClasses} ${fontClasses} ${colorClasses}`

  const activeClasses = `before:content-[''] before:block ${
    smallVersion ? "before:w-full before:bottom-0" : "before:w-[calc(100%-3rem)] before:bottom-1"
  } before:h-1 before:absolute before:left-1/2 before:transform before:-translate-x-1/2 
  before:bg-brand-green-medium-lvl before:rounded-full ${onDark ? "text-gray-min-lvl" : "text-gray-max-lvl"}`

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
