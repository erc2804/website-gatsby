import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import ecLogo from "../images/logo_original.png"

export const Seo = ({ title, description, pathname, children }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: ecLogo,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <html lang="en" />
      <title>{seo.title}&nbsp;&#8211;&nbsp;ercancicek.com</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={ecLogo} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={ecLogo} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <link rel="icon" href={ecLogo} />
      <link rel="canonical" href={seo.url} />
      {children}
    </>
  )
}
