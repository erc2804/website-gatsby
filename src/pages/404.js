import * as React from "react"
import { Link } from "gatsby"
import { Seo } from "../components/seo"

const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </main>
  )
}

export default NotFoundPage

export const Head = () => <Seo title="Page not found" />

