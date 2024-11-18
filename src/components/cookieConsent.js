import React, { useState, useRef, useEffect } from "react"
import { useLocation } from "@reach/router"
import { initializeAndTrack } from "gatsby-plugin-gdpr-cookies"
import FocusTrap from "focus-trap-react"
import Button from "./button"
import { injectIntl, Link } from "gatsby-plugin-intl"
import EcLogo from "./ecLogo"

const legalNavElements = [
  {
    label: "Imprint",
    labelDe: "Impressum",
    to: "/imprint",
  },
  {
    label: "Privacy Policy",
    labelDe: "Datenschutzerklärung",
    to: "/privacy",
  },
]

const isBrowser = () => typeof window !== "undefined"

const useStickyState = (defaultValue, key) => {
  const [value, setter] = useState(() => {
    return isBrowser()
      ? JSON.parse(window.localStorage.getItem(key))
      : defaultValue
  })

  useEffect(() => {
    if (isBrowser()) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setter]
}

const CookieConsent = ({ intl }) => {
  const location = useLocation()
  const cookieDialogRef = useRef(null)

  useEffect(() => {
    if (isBrowser()) {
      initializeAndTrack(location)
    }
  }, [location])

  const [bannerHidden, setBannerHidden] = useStickyState(
    false,
    "consentCookieHidden"
  )

  const disableAnalytics = () => {
    document.cookie = "gatsby-gdpr-google-analytics=false"
    window[`ga-disable-{GA_ID}`] = true
    setBannerHidden(true)
    if (cookieDialogRef.current) cookieDialogRef.current.close()
  }

  const enableAnalytics = () => {
    document.cookie = "gatsby-gdpr-google-analytics=true"
    window[`ga-disable-{GA_ID}`] = false
    setBannerHidden(true)
    if (cookieDialogRef.current) cookieDialogRef.current.close()
  }

  if(location.pathname.includes('imprint') || location.pathname.includes('privacy')) return

  return (
    <>
      {!bannerHidden && (
        <FocusTrap focusTrapOptions={{ initialFocus: false }}>
          <div className="fixed inset-0 size-full backdrop-blur-sm z-[99]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 rounded-3xl border border-gray-low-lvl shadow-sm bg-gray-min-lvl w-[calc(100%-2rem)] max-w-[450px] overflow-hidden">
              <div className="px-6 pt-6 flex flex-col gap-3">
                <p>
                  I use cookies to improve your experience and track how you use
                  the site.
                </p>
                <p>
                  If you're okay with that and comfortable with me collecting
                  anonymized data, just accept! If not, feel free to reject.
                </p>
              </div>
              <div className="px-6 flex flex-row gap-4 justify-end">
                <Button variant="secondary" onClick={disableAnalytics}>
                  Reject
                </Button>
                <Button variant="primary" onClick={enableAnalytics}>
                  Accept
                </Button>
              </div>
              <div className="pb-2 flex flex-col bg-gray-subtle-lvl/80">
                <hr />
                <div className="px-6 pt-1 flex flex-row justify-between items-center gap-6">
                  <nav className="flex flex-row items-center gap-3">
                    {legalNavElements.map((navElement) => (
                      <Link
                        key={navElement.to}
                        to={navElement.to}
                        className="ec-font-caption h-8 flex items-center transform translate-y-px"
                      >
                        {intl.locale === "de" && navElement.labelDe
                          ? navElement.labelDe
                          : navElement.label}
                      </Link>
                    ))}
                  </nav>
                  <EcLogo additionalClasses="size-6" />
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  )
}

export default injectIntl(CookieConsent)
