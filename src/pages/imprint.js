import React from "react"
import Layout from "../components/layout"
import PageHeadline from "../components/pageHeadline"
import { injectIntl } from "gatsby-plugin-intl"

const ImprintPage = ({ intl }) => {
  return (
    <Layout seo={{ noindex: true }}>
      <main className="ec-layout-text-content py-24 min-h-dvh-minus-footer">
        <PageHeadline text={ intl.formatMessage({ id: 'legal-texts.imprint.headline' }) } />
        <div className="legal-text">
          <p className="italic">{ intl.formatMessage({ id: 'legal-texts.imprint.tmg-reference' }) }</p>
          <h2>{ intl.formatMessage({ id: 'legal-texts.imprint.contact' }) }</h2>
          <address className="not-italic">
            <ul className="list-none">
              <li>{ intl.formatMessage({ id: 'legal-texts.imprint.address.first-line' }) }</li>
              <li>{ intl.formatMessage({ id: 'legal-texts.imprint.address.second-line' }) }</li>
              <li>{ intl.formatMessage({ id: 'legal-texts.imprint.address.third-line' }) }</li>
              <li>
              { intl.formatMessage({ id: 'legal-texts.imprint.address.email' }) }<a href="mailto:erc2804@outlook.de">erc2804@outlook.de</a>
              </li>
              <li>
              { intl.formatMessage({ id: 'legal-texts.imprint.address.phone' }) }<a href="tel:+4915203684025">+49 1520 3684025</a>
              </li>
              <li>{ intl.formatMessage({ id: 'legal-texts.imprint.address.vat-id' }) }DE329893573</li>
            </ul>
          </address>

          <h2>{ intl.formatMessage({ id: 'legal-texts.imprint.content-liability.headline' }) }</h2>
          <p>
            { intl.formatMessage({ id: 'legal-texts.imprint.content-liability.desc' }) }
          </p>

          <h2>{ intl.formatMessage({ id: 'legal-texts.imprint.links-liability.headline' }) }</h2>
          <p>
          { intl.formatMessage({ id: 'legal-texts.imprint.links-liability.desc' }) }
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default injectIntl(ImprintPage)
