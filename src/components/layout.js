import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import { Seo } from "../components/seo"

export default function Layout({
  onDark,
  seo = {},
  currentLocale,
  footerIsFixed = false,
  children,
}) {
  const { title, description, pathname, image, noindex } = seo

  return (
    <div className="min-h-dvh">
      <Seo
        noindex={noindex}
        title={title}
        description={description}
        pathname={pathname}
        image={image}
        currentLocale={currentLocale}
      />
      <Header onDark={onDark} />
      {children}
      <Footer onDark={onDark} isFixed={footerIsFixed} />
    </div>
  )
}
