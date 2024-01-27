import * as React from "react"
import Header from "./header"

export default function Layout({ children }) {
  return (
    <div>
        <Header />
        <main className="mt-24">
          {children}
        </main>
        {/* <Header mode={props.darkHeader ? "dark" : ""} /> */}
        {/* <img src={ecLogo} alt="logo" />
        {children} */}
    </div>
  )
}