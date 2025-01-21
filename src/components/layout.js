import React, { useState } from "react"
import Header from "./header"
import Footer from "./footer"
import { Seo } from "../components/seo"

export default function Layout({
  onDark,
  seo = {},
  currentLocale,
  children,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { title, description, pathname, image, noindex } = seo

  const handleMobileMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen)
  }

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
      <Header onDark={onDark} onMobileMenuToggle={handleMobileMenuToggle} />
      <div inert={isMobileMenuOpen ? 'true' : undefined}>
        {children}
        {!onDark && 
          <Footer />
        }
      </div>
    </div>
  )
}
