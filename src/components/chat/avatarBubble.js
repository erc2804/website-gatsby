import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const AvatarBubble = ({ role }) => {
  const isAssistant = role === "assistant"
  const baseClasses = "flex-none size-16 rounded-full overflow-hidden"
  const avatarClasses = `${baseClasses} ${
    isAssistant
      ? "bg-gray-low-lvl shadow-sm"
      : "grid place-content-center bg-brand-green-high-lvl text-typo-min-lvl font-semibold"
  }`

  return isAssistant ? (
    <div className="size-fit relative">
      <StaticImage
        src="../../images/about-me/ercancicek.jpg"
        alt="Ercan Cicek avatar"
        className={avatarClasses}
        objectPosition={"40%"}
      />
      <div className="absolute inset-0 rounded-full bg-brand-green-high-lvl/20 z-20" />
    </div>
  ) : (
    <div className={avatarClasses}>You</div>
  )
}

export default AvatarBubble
