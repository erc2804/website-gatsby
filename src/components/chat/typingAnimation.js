import React from "react"

const TypingAnimation = () => (
  <div className="flex flex-row gap-1 items-center">
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-high-lvl [animation-delay:200ms]" />
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-high-lvl [animation-delay:300ms]" />
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-high-lvl [animation-delay:400ms]" />
  </div>
)

export default TypingAnimation
