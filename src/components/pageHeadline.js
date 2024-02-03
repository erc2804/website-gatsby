import React from "react"
import AdpillarText from "./adpillarText"

const PageHeadline = ({ text }) => (
  <h1 className="py-10 ec-font-heading-1">
    <AdpillarText adpillarTexts={[text]} timePerType={100} />
  </h1>
)

export default PageHeadline
