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
          {/* --- Allgemeine Informationen --- */}
          <h2>
            {intl.formatMessage({
              id: "legal-texts.privacy.general-info.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.privacy.general-info.desc",
            })}
          </p>
          {/* --- Nutzung von Google Analytics --- */}
          <h2>
            {intl.formatMessage({
              id: "legal-texts.privacy.ga-usage.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.privacy.ga-usage.desc",
            })}
          </p>
          {/* --- Google Analytics Cookies --- */}
          <h2>
            {intl.formatMessage({
              id: "legal-texts.privacy.ga-cookies.headline",
            })}
          </h2>
          <ul>
            <li>
              {intl.formatMessage({
                id: "legal-texts.privacy.ga-cookies.list-intro",
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: "legal-texts.privacy.ga-cookies.list-first-entry",
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: "legal-texts.privacy.ga-cookies.list-second-entry",
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: "legal-texts.privacy.ga-cookies.list-third-entry",
              })}
            </li>
          </ul>
          {/* --- Wie du Cookies ablehnen kannst --- */}
          <h2>
            {intl.formatMessage({
              id: "legal-texts.privacy.decline-cookies.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.privacy.decline-cookies.desc",
            })}
          </p>
          {/* --- IP-Anonymisierung --- */}
          <h2>
            {intl.formatMessage({
              id: "legal-texts.privacy.ip-anon.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.privacy.ip-anon.desc",
            })}
          </p>
          {/* --- Keine Speicherung personenbezogener Daten --- */}
          <h2>
            {intl.formatMessage({
              id: "legal-texts.privacy.no-personal-data.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.privacy.no-personal-data.desc",
            })}
          </p>
          {/* --- Externe Inhalte --- */}
          <h2>
            {intl.formatMessage({
              id: "legal-texts.privacy.external-content.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.privacy.external-content.desc",
            })}
          </p>
          {/* --- Kontakt --- */}
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
