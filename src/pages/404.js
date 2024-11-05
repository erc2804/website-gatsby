import * as React from "react"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { Seo } from "../components/seo"

const NotFoundPage = ({ intl }) => {
  return (
    <main>
      <h1>{intl.formatMessage({ id: 'error.page-not-found' })}</h1>
      <Link to="/">{intl.formatMessage({ id: 'error.main-action' })}</Link>
    </main>
  )
}

export default injectIntl(NotFoundPage)

export const Head = () => <Seo title="Page not found" />
