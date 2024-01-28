import React from "react"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import LinkBox from "../components/linkBox";
import PageHeadline from "../components/pageHeadline";
import { StaticImage } from "gatsby-plugin-image";

const allPortfolioBoxes = [
  {
    label: "CasualVocab, iOS app",
    url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
    image: "casualvocab.png",
  },
];

// const allPortfolioBoxes = [{
//   id: "casualvocab",
//   label: "CasualVocab, iOS app",
//   url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
//   thumbnail: {
//     type: "image",
//     src: "",
//     alignment: "vertical"
//   },
//   theme: "dark2"
// }, {
//   id: "infraview",
//   label: "Website, infraView",
//   url: "https://www.infraview.net",
//   thumbnail: {
//     type: "image",
//     src: "",
//     alignment: "vertical"
//   },
//   theme: "light1"
// }, {
//   id: "nextstepweb",
//   label: "Website, nextstepweb",
//   url: "https://www.nextstepweb.de",
//   thumbnail: {
//     type: "image",
//     src: "",
//     alignment: "vertical"
//   },
//   theme: "lightest"
// }, {
//   id: "kindeskinder",
//   label: "Shopify-Webshop, kindeskinder",
//   url: "https://kindeskinder.biz/",
//   thumbnail: {
//     type: "image",
//     src: "",
//     alignment: "vertical"
//   },
//   theme: "light2"
// },
// {
//   id: "pvoswald",
//   label: "Shopify-Webshop, PuraVida & Oswald",
//   url: "https://oswald-puravida-wein.de/",
//   thumbnail: {
//     type: "image",
//     src: "",
//     alignment: "vertical"
//   },
//   theme: "dark2"
// },
// {
//   id: "melmenu",
//   label: "custom mobile menu, tech demo",
//   url: "https://ercancicek.com/mel-menu.html",
//   thumbnail: {
//     type: "image",
//     src: "",
//     alignment: "vertical"
//   },
//   theme: "light1"
// }
// ];

export default function Portfolio() {
  return (
    <Layout>
      <main className="ec-layout-visual-content mt-24">
        <PageHeadline>Portfolio</PageHeadline>
        <div className="grid grid-cols-3 gap-10">
          {allPortfolioBoxes.map((portfolioBox, idx) => (
            <LinkBox key={idx} label={portfolioBox.label} url={portfolioBox.url} bgColorClass="bg-brand-blue">
              {/* TODO: GatsbyImage */}
              <StaticImage src="../images/portfolio/casualvocab.png" alt="CasualVocab" className="my-6 group-hover:my-10 transition-all" objectFit="contain" />
              {/* TODO: ICON */}
            </LinkBox>
          ))}
        </div>
      </main>
    </Layout>
  );
}


export const Head = () => (
  <SEO title="Portfolio" pathname="/portfolio" />
)