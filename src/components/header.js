import React, { useRef, useEffect, useState } from "react";
import { Link } from "gatsby";
import NavLink from "./navLink";

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (prevWindowWidth.current < 768 && window.innerWidth >= 768) {
        setIsOpen(false);
      }
      prevWindowWidth.current = window.innerWidth;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const burgerMenuLineClasses = `absolute w-full h-[7px] rounded-full transform origin-right ${
    onDark ? "bg-gray-subtle-lvl" : "bg-gray-high-lvl"
  } transition-all`;

  return (
    <header
      className={`fixed top-0 left-0 w-full flex flex-col ${
        isOpen ? "h-dvh bg-gray-subtle-lvl" : ""
      }`}
    >
      <nav className="flex-none px-6 py-5 flex flex-row items-center justify-between md:justify-start md:gap-12 h-24">
        <Link to="/" aria-label="Home">
          <svg
            width="53"
            height="53"
            viewBox="0 0 53 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_16_65)">
              <path
                d="M3.61719 26.4668H14.2639"
                stroke="#5CDB95"
                strokeWidth="5.08156"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5783 37.7814L2.56562 26.526L15.5783 37.7814ZM2.46704 26.4407L15.4797 15.1853L2.46704 26.4407Z"
                fill="white"
                stroke="#5CDB95"
                strokeWidth="4.96481"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M31.1869 2.67969L21.7231 50.3201"
                stroke="#46237A"
                strokeWidth="5.35644"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M37.4216 15.1599L50.4343 26.4153L37.4216 15.1599ZM50.5329 26.5006L37.5202 37.756L50.5329 26.5006Z"
                fill="white"
                stroke="#5CDB95"
                strokeWidth="4.96481"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_16_65">
                <rect width="53" height="53" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <div className="hidden md:flex flex-row gap-6">
          {navElements.map((navElement, index) => (
            <NavLink key={navElement.to} to={navElement.to}>
              {navElement.label}
            </NavLink>
          ))}
        </div>
        <button
          className="flex md:hidden justify-center items-center size-10"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <div className="size-8 relative">
            <div
              className={`${burgerMenuLineClasses} ${
                isOpen ? "top-0.5 right-1 -rotate-[42deg]" : "top-0 right-0"
              } duration-300`}
            />
            <div
              className={`${burgerMenuLineClasses} top-[38%] ${
                isOpen ? "opacity-0" : "opacity-1"
              } duration-150`}
            />
            <div
              className={`${burgerMenuLineClasses} ${
                isOpen ? "top-3/4 right-1 rotate-[42deg]" : "top-3/4 right-0"
              } duration-300`}
            />
          </div>
        </button>
      </nav>
      <div
        className={`offcanvas pt-20 flex-1 flex flex-col ${
          isOpen ? "opacity-1" : "pointer-events-none opacity-0"
        } transition-opacity duration-300`}
      >
        {navElements.map((navElement, index) => (
          <NavLink key={navElement.to} to={navElement.to}>
            {navElement.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
