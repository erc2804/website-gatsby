import React from "react"
import TypingAnimation from "./typingAnimation"
import AvatarBubble from "./avatarBubble"

const ChatEntry = ({ role, message, messageLoading, additionalClasses = "" }) => {
  const isAssistant = role === "assistant"
  const baseClasses = "flex flex-row items-center px-6 py-4 min-h-16 relative"
  const triangleBaseClasses =
    "after:content-[''] after:block after:absolute after:top-0 after:size-0 after:border after:border-r-[15px] after:border-transparent"
  const messageClasses = `${baseClasses} ${triangleBaseClasses} ${
    isAssistant
      ? "bg-gray-low-lvl after:border-r-gray-low-lvl after:rounded-l-lg justify-start rounded-r-2xl rounded-bl-2xl after:right-full after:border-b-[15px]"
      : "bg-brand-green-high-lvl after:border-t-brand-green-high-lvl after:rounded-r-lg justify-end rounded-l-2xl rounded-br-2xl after:left-full after:transform after:-translate-x-px after:border-t-[15px]"
  } ${additionalClasses}`
  const textClasses = `sm:ec-font-subheading ${
    isAssistant ? "" : "text-typo-min-lvl"
  }`

  return (
    <div
      className={`flex flex-row gap-6 ${isAssistant ? "" : "pr-4 justify-end"}`}
    >
      {isAssistant && <AvatarBubble role={role} />}
      <div className={messageClasses}>
        {messageLoading ? (
          <TypingAnimation />
        ) : (
          <span className={textClasses}>{message}</span>
        )}
      </div>
      {/* {!isAssistant && <AvatarBubble role={role} />} */}
    </div>
  )
}

export default ChatEntry
