import React from "react"
import Layout from "../components/layout"
import PageHeadline from "../components/pageHeadline"
import { injectIntl } from "gatsby-plugin-intl"

const PrivacyPolicyPage = ({ intl }) => {
  return (
    <Layout seo={{ noindex: true }}>
      <main className="ec-layout-text-content py-24 min-h-dvh-minus-footer">
        <PageHeadline
          text={intl.formatMessage({ id: "legal-texts.privacy.headline" })}
        />
        <div className="legal-text">
          <p>{intl.formatMessage({ id: "legal-texts.privacy.intro" })}</p>
          <p>
            {intl.formatMessage({ id: "legal-texts.privacy.embedded-data" })}
          </p>
          <h2>
            {intl.formatMessage({ id: "legal-texts.privacy.contact.headline" })}
          </h2>
          <p>
            {intl.formatMessage({ id: "legal-texts.privacy.contact.desc" })}
            <a href="mailto:erc2804@outlook.de">erc2804@outlook.de</a>
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default injectIntl(PrivacyPolicyPage)
