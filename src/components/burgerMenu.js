import React from "react";

const BurgerMenu = ({ onDark, isOpen }) => {
  const burgerMenuLineClasses = `absolute w-full h-[7px] rounded-full transform origin-right ${
    onDark && !isOpen ? "bg-brand-sand" : "bg-gray-high-lvl"
  } transition-all`;

  return (
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
  );
};

export default BurgerMenu;
