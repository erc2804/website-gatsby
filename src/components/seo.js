import React from "react"
import { Helmet } from "react-helmet"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import ecLogo from "../images/logo_original.png"

export const Seo = ({ title, description, pathname, image, currentLocale, noindex = false, children }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    siteName
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle ,
    description: description || defaultDescription,
    image: image || ecLogo,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <Helmet>
      <html lang={currentLocale} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <link rel="icon" href={ecLogo} />
      <link rel="canonical" href={seo.url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {children}
    </Helmet>
  )
}
