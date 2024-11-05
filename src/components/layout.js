import * as React from "react"
import Header from "./header"
import { Seo } from "../components/seo"

export default function Layout({ onDark, seo = {}, currentLocale, children }) {
  const { title, description, pathname, image } = seo

  return (
    <div>
      {title && description && pathname &&
        <Seo
          title={title}
          description={description}
          pathname={pathname}
          image={image}
          currentLocale={currentLocale}
        />
      }
      <Header onDark={onDark} />
      {children}
    </div>
  )
}
