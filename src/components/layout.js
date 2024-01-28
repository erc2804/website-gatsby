import * as React from "react"
import Header from "./header"

export default function Layout({ onDark, children }) {
  return (
    <div>
      <Header onDark={onDark} />
      {children}
    </div>
  )
}
