import React from "react"

const LinkBox = ({ label, url, descText, bgColorClass = "", customCompClasses = "", isSmall = false, children }) => {
  return (
    <div className={`flex flex-col gap-2 ${customCompClasses}`}>
      <span className="flex-1 ec-font-subheading">{label}</span>
      <a
        href={url}
        className={`flex justify-center ${
          isSmall ? "aspect-[2.5/1]" : "aspect-square w-full"
        } ${bgColorClass} rounded-md overflow-hidden relative group`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {descText && (
          <div className="absolute left-0 bottom-0 flex justify-center p-2 w-full text-center transform translate-y-0 xl:translate-y-full bg-transparency-low-lvl ec-font-subheading text-brand-sand transition-all xl:group-hover:translate-y-0">
            {descText}
          </div>
        )}
      </a>
    </div>
  )
}

export default LinkBox
