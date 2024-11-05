import React, { useRef, useEffect, useState, useCallback } from "react"
import { Link } from "gatsby-plugin-intl"
import NavLink from "./navLink"
import EcLogo from "./ecLogo"
import BurgerMenu from "./burgerMenu"
import LanguageSwitcher from "./languageSwitcher"
import { injectIntl } from "gatsby-plugin-intl"

const navElements = [
  {
    label: "Portfolio",
    to: "/portfolio",
  },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "About Me",
    labelDe: "Über Mich",
    to: "/about-me",
  },
]

const Header = ({ onDark, intl }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )
  const [isScrolled, setIsScrolled] = useState(false)
  const prevWindowWidth = useRef(windowWidth)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)
      if (prevWindowWidth.current < 768 && window.innerWidth >= 768) {
        setIsOpen(false)
      }
      prevWindowWidth.current = window.innerWidth
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsScrolled(window.scrollY > 40)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [handleResize])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  return (
    <header
      className={`fixed top-0 left-0 w-full flex flex-col ${
        isOpen ? "h-dvh bg-gray-subtle-lvl" : ""
      } ${!onDark ? "bg-gray-subtle-lvl" : ""} ${
        isScrolled && !onDark ? "shadow-md" : ""
      } transition-all z-50`}
    >
      <nav className="flex-none px-6 py-5 flex flex-row items-center justify-between md:justify-start md:gap-12 h-24">
        <Link to="/" aria-label={ intl.formatMessage({ id: 'header.to-home' }) }>
          <EcLogo onDark={onDark} isOpen={isOpen} />
        </Link>
        <div className="hidden md:flex flex-row gap-6">
          {navElements.map((navElement) => (
            <NavLink key={navElement.to} to={navElement.to} onDark={onDark}>
              {intl.locale === 'de' && navElement.labelDe ? navElement.labelDe : navElement.label}
            </NavLink>
          ))}
        </div>
        <div className="flex-1 hidden md:flex flex-row justify-end">
          <LanguageSwitcher onDark={onDark} />
        </div>
        <button
          className="flex md:hidden justify-center items-center size-10"
          aria-label={ intl.formatMessage({ id: 'header.toggle-menu' }) }
          onClick={toggleMenu}
        >
          <BurgerMenu onDark={onDark} isOpen={isOpen} />
        </button>
      </nav>
      {isOpen && (
        <div className="pt-20 pb-6 flex-1 flex flex-col">
          {navElements.map((navElement) => (
            <NavLink key={navElement.to} to={navElement.to}>
              {navElement.label}
            </NavLink>
          ))}
          <div className="px-6 flex-1 flex flex-col justify-end">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}

export default injectIntl(Header)
