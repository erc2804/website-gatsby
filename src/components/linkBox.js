import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const ColorClassesPerCategory = {
  OTHER: {
    bg: "bg-brand-blue",
    bgAlt: "bg-brand-blue/10",
    text: "text-brand-blue",
    icon: "[&>svg]:fill-brand-sand",
  },
  APP: {
    bg: "bg-brand-green-high-lvl",
    bgAlt: "bg-brand-green-high-lvl/10",
    text: "text-brand-green-high-lvl",
    icon: "[&>svg]:fill-brand-sand",
  },
  SHOP: {
    bg: "bg-brand-green-low-lvl",
    bgAlt: "bg-brand-green-low-lvl/10",
    text: "text-brand-green-low-lvl",
    icon: "[&>svg]:fill-gray-high-lvl",
  },
  WEB: {
    bg: "bg-brand-green-medium-lvl",
    bgAlt: "bg-brand-green-medium-lvl/10",
    text: "text-brand-green-medium-lvl",
    icon: "[&>svg]:fill-gray-high-lvl",
  },
}

const LinkBox = ({ label, url, descText, type, target = '_blank', categoryDesc, children }) => {
  const childrenArray = React.Children.toArray(children)
  const firstChild = childrenArray[0]
  let boxVisualClasses = "size-full transition-transform"

  if (React.isValidElement(firstChild)) {
    if (firstChild.type === GatsbyImage) {
      boxVisualClasses +=
        " [&>div[data-gatsby-image-wrapper]]:size-full pt-6 lg:group-hover:-translate-y-3"
    } else {
      boxVisualClasses +=
        " flex items-center justify-center h-[calc(100%-98px)] [&>svg]:size-3/5 lg:group-hover:-translate-y-3 " +
        ColorClassesPerCategory[type].icon
    }
  }

  return (
    <a
      href={url}
      className={`aspect-[3/4] rounded-3xl shadow-sm lg:hover:shadow-lg overflow-hidden ${ColorClassesPerCategory[type].bg} transition-all relative group`}
      target={target}
      rel="noopener noreferrer"
    >
      <div className={boxVisualClasses}>{children}</div>
      <div className="absolute bottom-0 left-0 flex flex-col gap-2 px-4 pt-4 pb-5 w-full bg-gray-min-lvl">
        <div className="flex flex-row gap-x-4 justify-between items-center">
          <span
            className={`ec-font-subheading font-bold ${ColorClassesPerCategory[type].text}`}
          >
            {label}
          </span>
          {categoryDesc && (
            <div
              className={`flex-none px-1.5 py-0.5 rounded-full ec-font-caption font-bold ${ColorClassesPerCategory[type].bgAlt} ${ColorClassesPerCategory[type].text}`}
            >
              {categoryDesc}
            </div>
          )}
        </div>
        <span className="text-typo-medium-lvl">{descText ?? "/"}</span>
      </div>
    </a>
  )
}

export default LinkBox
