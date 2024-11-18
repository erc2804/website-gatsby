import React from "react"

const EcLogo = ({ onDark, isOpen, additionalClasses }) => (
  <svg
    width="53"
    height="53"
    viewBox="0 0 53 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={additionalClasses}
  >
    <g>
      <path
        d="M37.4216 15.1599L50.4343 26.4153L37.4216 15.1599ZM50.5329 26.5006L37.5202 37.756L50.5329 26.5006Z"
        strokeWidth="4.96481"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-brand-green-medium-lvl"
      />
      <path
        d="M3.61719 26.4669H14.2639"
        strokeWidth="5.08156"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-brand-green-medium-lvl"
      />
      <path
        d="M15.5783 37.7814L2.56562 26.526L15.5783 37.7814ZM2.46704 26.4407L15.4797 15.1853L2.46704 26.4407Z"
        strokeWidth="4.96481"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-brand-green-medium-lvl"
      />
      <path
        d="M31.1869 2.67969L21.7231 50.3201"
        strokeWidth="5.35644"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${
          onDark && !isOpen ? "stroke-brand-sand" : "stroke-brand-purple"
        } transition-colors`}
      />
    </g>
  </svg>
)

export default EcLogo
