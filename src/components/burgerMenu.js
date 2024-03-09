import React from "react"

const BurgerMenu = ({ onDark, isOpen }) => {
  const getBurgerMenuLineClasses = (additionalClasses = "") =>
    `absolute w-full h-[5px] rounded-full transform origin-right ${
      onDark && !isOpen ? "bg-brand-sand" : "bg-gray-high-lvl"
    } transition-all ${additionalClasses}`

  return (
    <div className="h-[30px] w-8 relative">
      <div
        className={getBurgerMenuLineClasses(
          `${isOpen ? "top-0.5 right-1 -rotate-45" : "top-0 right-0"} duration-300`
        )}
      />
      <div
        className={getBurgerMenuLineClasses(
          `top-1/2 transform -translate-y-1/2 ${isOpen ? "opacity-0" : "opacity-1"} duration-150`
        )}
      />
      <div
        className={getBurgerMenuLineClasses(
          `${isOpen ? "bottom-0 right-1 rotate-45" : "bottom-0 right-0"} duration-300`
        )}
      />
    </div>
  )
}

export default BurgerMenu
