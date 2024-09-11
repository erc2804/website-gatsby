import React from "react"

const TextLink = ({ href, target = '_blank', children }) => {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="underline hover:text-brand-green-high-lvl transition-colors"
      aria-label={children}
    >
      {children}
    </a>
  )
}

export default TextLink
