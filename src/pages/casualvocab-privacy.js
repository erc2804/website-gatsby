import React from "react"
import Layout from "../components/layout"
import PageHeadline from "../components/pageHeadline"
import { injectIntl } from "gatsby-plugin-intl"

const CvPrivacyPage = ({ intl }) => {
  return (
    <Layout seo={{ noindex: true }}>
      <main className="ec-layout-text-content py-24 min-h-dvh-minus-footer">
        <PageHeadline
          text={intl.formatMessage({ id: "legal-texts.cv-privacy.headline" })}
        />
        <div className="legal-text">
          <p>{intl.formatMessage({ id: "legal-texts.cv-privacy.intro" })}</p>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.info-coll.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.info-coll.desc",
            })}
          </p>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.third-party-services.headline",
            })}
          </h2>
          <ul>
            <li>
              {intl.formatMessage({
                id: "legal-texts.cv-privacy.third-party-services.desc",
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: "legal-texts.cv-privacy.third-party-services.firebase.desc",
              })}
              <a
                href={intl.formatMessage({
                  id: "legal-texts.cv-privacy.third-party-services.firebase.link.url",
                })}
              >
                {intl.formatMessage({
                  id: "legal-texts.cv-privacy.third-party-services.firebase.link.label",
                })}
              </a>
            </li>
            <li>
              {intl.formatMessage({
                id: "legal-texts.cv-privacy.third-party-services.admob.desc",
              })}
              <a
                href={intl.formatMessage({
                  id: "legal-texts.cv-privacy.third-party-services.admob.link.url",
                })}
              >
                {intl.formatMessage({
                  id: "legal-texts.cv-privacy.third-party-services.admob.link.label",
                })}
              </a>
            </li>
          </ul>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.log-data.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.log-data.desc",
            })}
          </p>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.cookies.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.cookies.desc",
            })}
          </p>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.security.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.security.desc",
            })}
          </p>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.other-sites.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.other-sites.desc",
            })}
          </p>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.childrens-privacy.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.childrens-privacy.desc",
            })}
          </p>
          <h2>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.contact.headline",
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: "legal-texts.cv-privacy.contact.desc",
            })}
            <a href="mailto:contact@ercancicek.com">contact@ercancicek.com</a>
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default injectIntl(CvPrivacyPage)
