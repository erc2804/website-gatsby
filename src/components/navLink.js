import React from "react"
import { Link } from "gatsby"

const NavLink = ({ to, onDark, children }) => {
  const navLinkClasses = `px-6 py-2 flex items-center w-fit ec-font-subheading ${
    onDark
      ? "text-brand-sand hover:text-gray-min-lvl"
      : "text-typo-high-lvl hover:text-gray-max-lvl"
  } transition-colors`
  const activeClasses = `underline ${
    onDark ? "text-gray-min-lvl" : "text-gray-max-lvl"
  }`

  return (
    <Link
      to={to}
      className={navLinkClasses}
      activeClassName={activeClasses}
      aria-label={children}
    >
      {children}
    </Link>
  )
}

export default NavLink
