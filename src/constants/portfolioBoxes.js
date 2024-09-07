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

// --- gatsby automatically creates a page for entries that have a content prop
const allPortfolioBoxes = [
  {
    type: PortfolioCategories.WEB,
    label: "Curanto",
    url: "https://www.curanto.de/",
    categoryDesc: "Website",
    image: "curanto",
    techs: [
      "Vue",
      "Nuxt",
      "Tailwind",
      "Figma",
      "Lottie",
      "HTML",
      "S/CSS",
      "JavaScript",
    ],
    content: {
      title: "Custom E-Commerce Development and UI/UX",
      description:
        "For the Curanto project, I worked while employed full-time at ORT Interactive. As the Head of UI/UX and Frontend, I was responsible for the comprehensive development in these areas. This included creating a scalable design system that featured both static components based on Tailwind and flexible CMS modules for the client. I actively contributed to both UI/UX design and frontend development. The client was very pleased with the outcome. I focused particularly on performance, SEO, and scalability. The project involved not only the e-commerce site but also a white-label solution and a self-service terminal, making the Statamic CMS-based system highly complex.",
    },
  },
  {
    type: PortfolioCategories.WEB,
    label: "HIT",
    url: "https://www.hit.de/",
    categoryDesc: "Website",
    image: "hit",
    techs: [
      "Vue",
      "Twig",
      "Tailwind",
      "Figma",
      "Lottie",
      "HTML",
      "S/CSS",
      "JavaScript",
    ],
    content: {
      title: "UI/UX and Frontend for Hit: Design System and CMS Integration",
      description:
        "For the Hit project, I worked while employed full-time at ORT Interactive. As a UI/UX Designer and Frontend Developer, I was responsible for guiding team members and overseeing the comprehensive development in these areas. This included creating a design system in Figma based on Hit's CI/CD. In collaboration with the client, we developed flexible CMS components that could be freely utilized and placed within the Pimcore backend. The client was extremely satisfied with the outcome. I paid particular attention to performance, responsiveness, and scalability.",
    },
  },
  {
    type: PortfolioCategories.SHOP,
    label: "Müller Oswald",
    url: "https://mueller-oswald.shop/",
    categoryDesc: "Webshop",
    image: "pvoswald",
    techs: ["Liquid", "JavaScript", "Figma", "HTML", "CSS"],
    content: {
      title: "Building a Shared Shopify Store for Two Wineries",
      description:
        "I acquired the Müller Oswald project while working full-time at infraView GmbH, a subsidiary of Deutsche Bahn. The project involved consulting, designing, and implementing an online store to offer wines from two different wineries. Throughout the project, I placed a strong emphasis on advising and training the clients so they could handle recurring changes independently. In addition to ensuring high-quality frontend work regarding accessibility and SEO, I also maintained a keen focus on cost-effectiveness.",
    },
  },
  {
    type: PortfolioCategories.SHOP,
    label: "kindeskinder",
    url: "https://kindeskinder.biz/",
    categoryDesc: "Webshop",
    image: "kindeskinder",
    techs: ["Liquid", "JavaScript", "Figma", "HTML", "CSS"],
    content: {
      title: "Migration of an Outdated E-Commerce System to Shopify",
      description:
        "I acquired the Kindeskinder project while working full-time at infraView GmbH, a subsidiary of Deutsche Bahn. The project involved migrating an existing, outdated e-commerce system to Shopify. I focused on optimizing responsiveness, user flow, and making enhancements to improve both performance and accessibility. I paid special attention to providing the client with a strong cost-benefit ratio. Instead of relying on paid plugins, I implemented workarounds and custom solutions where appropriate. This approach was highly appreciated by the client.",
    },
  },
  {
    type: PortfolioCategories.APP,
    label: "Welliba",
    url: "https://www.welliba.com/",
    categoryDesc: "flutter app",
    image: "welliba_app",
    techs: [
      "Figma",
      "Lottie",
      "React",
      "JavaScript",
      "Flutter",
      "storyblok",
      "HTML",
      "S/CSS",
    ],
    content: {
      title:
        "Building Welliba's Product Platform: UI/UX Design and Developer Guidance",
      description:
        "Welliba was a startup founded by executives from my former employer, AON Assessment Solutions in Hamburg. As a UI/UX Engineer, I was hired to design and build a complete product platform from scratch, including a Flutter app and several web apps. My responsibilities included designing user interfaces, establishing UX understanding, implementing CI/CD, and creating responsive designs in Figma. I guided the developers through the implementation process as they brought the designs to life. All products were scalable and based on a design system I developed. My focus was on creating a flexible and highly scalable foundation. Welliba has since established itself in the market, and the products are actively in use.",
    },
  },
  {
    type: PortfolioCategories.APP,
    label: "CasualVocab",
    url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
    urlDescription: "Apple App Store",
    categoryDesc: "iOS app",
    image: "casualvocab",
    techs: ["Swift", "SwiftUI", "Xcode", "Figma", "Lottie"],
    content: {
      title:
        "CasualVocab Widget - Japanese: iOS App for Vocabulary Training with Swift and Firebase",
      description:
        "CasualVocab Widget - Japanese is a native iOS app that I designed and developed using Swift and SwiftUI during my early days of learning Japanese. The concept was to create an app that displays relevant vocabulary, including translations, as a widget on the smartphone's home screen, allowing learners to constantly engage with the words they need to study. I created all the content for the app, including the vocabulary sets, which was time-consuming but also served as a useful part of my Japanese learning process. The app was developed using Firebase, allowing for flexible content updates and adjustments in the backend. It has been available on the App Store for some time now.",
    },
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
    url: "https://jsfiddle.net/u/erc2804/fiddles/",
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
