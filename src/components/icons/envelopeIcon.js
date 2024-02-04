import React from "react"

export const EnvelopeIcon = ({ iconClasses }) => (
  <svg
    className={iconClasses ?? "fill-gray-max-lvl"}
    width="120"
    height="120"
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 24C16.0312 24 12 28.0312 12 33C12 35.8313 13.3313 38.4937 15.6 40.2L56.4 70.8C58.5375 72.3938 61.4625 72.3938 63.6 70.8L104.4 40.2C106.669 38.4937 108 35.8313 108 33C108 28.0312 103.969 24 99 24H21ZM12 45V84C12 90.6187 17.3813 96 24 96H96C102.619 96 108 90.6187 108 84V45L67.2 75.6C62.925 78.8063 57.075 78.8063 52.8 75.6L12 45Z" />
  </svg>
)
