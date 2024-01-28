import React from "react";

const LinkBox = ({ label, url, bgColorClass, isSmall, children }) => {
  return (
    <a href={url} className={`flex justify-center ${isSmall ? '' : 'aspect-square w-96 rounded-md'} ${bgColorClass} overflow-hidden relative group`} rel="noopener noreferrer">
        {children}
        <div className="absolute left-0 bottom-0 flex justify-center p-2 w-full transform translate-y-full bg-transparency-low-lvl ec-font-subheading text-brand-sand transition-all group-hover:translate-y-0">
            {label}
        </div>
    </a>
  );
};

export default LinkBox;
