import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const AvatarBubble = (messagerRole) => {
  const isAssistant = messagerRole === "assistant"
  const baseClasses =
    "flex-none size-10 md:size-16 rounded-full overflow-hidden"
  const avatarClasses = `${baseClasses} ${
    isAssistant
      ? "bg-gray-low-lvl shadow-sm"
      : "grid place-content-center bg-brand-green-high-lvl text-typo-min-lvl font-semibold"
  }`

  return (
    <div className="size-fit relative">
      <StaticImage
        src="../../images/pixelcan.png"
        alt=""
        className={avatarClasses}
        objectPosition={"40%"}
      />
      <div className="absolute inset-0 rounded-full bg-brand-green-high-lvl/20 z-20" />
      <div className="absolute -bottom-px -right-px size-3 md:size-5 border-2 md:border-[3px] border-gray-subtle-lvl bg-brand-green-medium-lvl rounded-full" />
    </div>
  )
}

export default AvatarBubble
