import React from "react"
import { JsFiddleIcon } from "../components/icons/jsFiddleIcon"
import { CodepenIcon } from "../components/icons/codepenIcon"
import { LottieIcon } from "../components/icons/lottieIcon"
import { GithubIcon } from "../components/icons/githubIcon"

const PortfolioCategories = {
  WEB: "WEB",
  APP: "APP",
  SHOP: "SHOP",
  OTHER: "OTHER",
}

const allPortfolioBoxes = [
  {
    type: PortfolioCategories.APP,
    label: "CasualVocab",
    url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
    categoryDesc: "iOS app",
    image: "casualvocab",
    techs: ["Swift", "SwiftUI"],
  },
  {
    type: PortfolioCategories.APP,
    label: "Welliba",
    url: "https://apps.apple.com/de/app/welliba-companion/id1597739395",
    categoryDesc: "flutter app",
    image: "welliba_app",
    techs: ["Flutter", "Figma"],
  },
  {
    type: PortfolioCategories.SHOP,
    label: "kindeskinder",
    url: "https://kindeskinder.biz/",
    categoryDesc: "Webshop",
    image: "kindeskinder",
    techs: ["Shopify", "Liquid", "JavaScript"],
  },
  {
    type: PortfolioCategories.SHOP,
    label: "PuraVida",
    url: "https://oswald-puravida-wein.de/",
    categoryDesc: "Webshop",
    image: "pvoswald",
    techs: ["Shopify", "Liquid", "JavaScript"],
  },
  {
    type: PortfolioCategories.WEB,
    label: "HIT",
    url: "https://www.hit.de/",
    categoryDesc: "Website",
    image: "hit",
    techs: ["Vue.js", "Pimcore", "Figma"],
  },
  {
    type: PortfolioCategories.WEB,
    label: "Curanto",
    url: "https://www.curanto.de/",
    categoryDesc: "Website",
    image: "curanto",
    techs: ["Vue.js", "Statamic", "Figma"],
  },
  {
    type: PortfolioCategories.WEB,
    label: "tech demo",
    url: "https://ercancicek.com/mel-menu.html",
    categoryDesc: "Website",
    image: "melmenu",
    techs: ["jQuery", "JavaScript", "Figma"],
  },
  {
    type: PortfolioCategories.OTHER,
    label: "Fiddles",
    url: "https://jsfiddle.net/user/erc2804/",
    icon: <JsFiddleIcon />,
    techs: ["JavaScript", "S/CSS", "HTML"],
  },
  {
    type: PortfolioCategories.OTHER,
    label: "Codepens",
    url: "https://codepen.io/erc2804",
    icon: <CodepenIcon />,
    techs: ["JavaScript", "S/CSS", "HTML"],
  },
  {
    type: PortfolioCategories.OTHER,
    label: "Lottiefiles",
    url: "https://lottiefiles.com/erc2804",
    icon: <LottieIcon />,
    techs: ["After Effects", "Figma"],
  },
  {
    type: PortfolioCategories.OTHER,
    label: "Website source code",
    url: "https://github.com/erc2804/website-gatsby",
    icon: <GithubIcon />,
    techs: ["React", "Gatsby", "PWA", "Figma"],
  },
]

export default allPortfolioBoxes
