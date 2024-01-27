import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "gatsby";
import NavLink from "./navLink";
import EcLogo from "./ecLogo";
import BurgerMenu from "./burgerMenu";

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
    to: "/about-me",
  },
];

const Header = ({ onDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const prevWindowWidth = useRef(windowWidth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    if (prevWindowWidth.current < 768 && window.innerWidth >= 768) {
      setIsOpen(false);
    }
    prevWindowWidth.current = window.innerWidth;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex flex-col ${
        isOpen ? "h-dvh bg-gray-min-lvl" : ""
      } z-50`}
    >
      <nav className="flex-none px-6 py-5 flex flex-row items-center justify-between md:justify-start md:gap-12 h-24">
        <Link to="/" aria-label="Home">
          <EcLogo onDark={onDark} isOpen={isOpen} />
        </Link>
        <div className="hidden md:flex flex-row gap-6">
          {navElements.map(navElement => (
            <NavLink key={navElement.to} to={navElement.to} onDark={onDark}>
              {navElement.label}
            </NavLink>
          ))}
        </div>
        <button
          className="flex md:hidden justify-center items-center size-10"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <BurgerMenu onDark={onDark} isOpen={isOpen} />
        </button>
      </nav>
      <div
        className={`pt-20 flex-1 flex flex-col ${
          isOpen ? "opacity-1" : "pointer-events-none opacity-0"
        } transition-opacity duration-300`}
      >
        {navElements.map(navElement => (
          <NavLink key={navElement.to} to={navElement.to}>
            {navElement.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
