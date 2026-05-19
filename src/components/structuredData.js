const SITE_URL = "https://www.ercancicek.com"

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Bechemer Straße 47",
  postalCode: "40878",
  addressLocality: "Ratingen",
  addressRegion: "NRW",
  addressCountry: "DE",
}

const sameAs = [
  "https://www.linkedin.com/in/ercancicek",
  "https://www.xing.com/profile/Ercan_Cicek10",
]

const resolveImage = (image) => {
  if (!image) return undefined
  if (typeof image !== "string") return undefined
  return image.startsWith("http") ? image : `${SITE_URL}${image}`
}

const buildPersonSchema = ({ image, locale }) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ercan Cicek",
  url: `${SITE_URL}/${locale}/about-me`,
  image: resolveImage(image),
  jobTitle:
    locale === "de"
      ? "Frontend-Entwickler & UX-Designer"
      : "Frontend Developer & UX Designer",
  worksFor: { "@type": "Organization", name: "nextstepweb" },
  address: postalAddress,
  email: "contact@ercancicek.com",
  telephone: "+4915203684025",
  sameAs,
})

const buildProfessionalServiceSchema = ({ image, locale }) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ercan Cicek - UX Developer & Designer",
  description:
    locale === "de"
      ? "Frontend-Entwicklung und UX-Design im Großraum Düsseldorf."
      : "Frontend development and UX design in the greater Düsseldorf area.",
  url: `${SITE_URL}/${locale}/`,
  image: resolveImage(image),
  telephone: "+4915203684025",
  email: "contact@ercancicek.com",
  address: postalAddress,
  areaServed: [
    { "@type": "City", name: "Düsseldorf" },
    { "@type": "City", name: "Ratingen" },
    { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
  ],
  founder: { "@type": "Person", name: "Ercan Cicek" },
  sameAs,
})

const builders = {
  person: buildPersonSchema,
  service: buildProfessionalServiceSchema,
}

export const buildStructuredData = ({ types = [], image, locale = "en" }) =>
  types
    .map((type) => builders[type])
    .filter(Boolean)
    .map((build) => build({ image, locale }))
