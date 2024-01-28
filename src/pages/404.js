import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo"

const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </main>
  )
}

export default NotFoundPage

export const Head = () => <SEO title="Page not found" />

