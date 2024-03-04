import React from "react"
import { LinkedInIcon } from "../components/icons/linkedInIcon"
import { XingIcon } from "../components/icons/xingIcon"
import { EnvelopeIcon } from "../components/icons/envelopeIcon"

const allSocialMediaBoxes = [
  {
    label: "Email",
    address: "erc2804@outlook.de",
    url: "mailto:erc2804@outlook.de",
    icon: <EnvelopeIcon />,
  },
  {
    label: "LinkedIn",
    address: "ercancicek",
    url: "https://www.linkedin.com/in/ercancicek",
    icon: <LinkedInIcon />,
  },
  {
    label: "Xing",
    address: "ercan.cicek",
    url: "https://www.xing.com/profile/Ercan_Cicek10?sc_o=mxb_p",
    icon: <XingIcon />,
  },
]

export default allSocialMediaBoxes
