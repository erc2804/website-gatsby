import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
import LinkBox from "../components/linkBox";
import PageHeadline from "../components/pageHeadline";
import { GatsbyImage } from "gatsby-plugin-image";
import { JsFiddleIcon } from "../components/icons/jsFiddleIcon";
import { CodepenIcon } from "../components/icons/codepenIcon";
import { LottieIcon } from "../components/icons/lottieIcon";

const linkboxAnimClasses =
  "my-6 scale-[0.80] xl:scale-100 xl:group-hover:scale-[0.80] transition-transform duration-200";

const allPortfolioBoxes = [
  {
    label: "my fiddles",
    url: "https://jsfiddle.net/user/erc2804/",
    icon: (
      <JsFiddleIcon
        iconClasses={`fill-gray-min-lvl h-full ${linkboxAnimClasses}`}
      />
    ),
    bgColorClass: "bg-brand-blue",
    isSmall: true,
  },
  {
    label: "my codepens",
    url: "https://codepen.io/erc2804",
    icon: (
      <CodepenIcon
        iconClasses={`fill-gray-min-lvl h-full ${linkboxAnimClasses}`}
      />
    ),
    bgColorClass: "bg-brand-blue",
    isSmall: true,
  },
  {
    label: "my lottiefiles",
    url: "https://lottiefiles.com/erc2804",
    icon: (
      <LottieIcon
        iconClasses={`fill-gray-min-lvl h-full ${linkboxAnimClasses}`}
      />
    ),
    bgColorClass: "bg-brand-blue",
    isSmall: true,
  },
  {
    label: "Website, HIT",
    url: "https://www.hit.de/",
    image: "hit",
    bgColorClass: "bg-brand-green-high-lvl",
  },
  {
    label: "CasualVocab, iOS app",
    url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
    image: "casualvocab",
    bgColorClass: "bg-brand-green-medium-lvl",
  },
  {
    label: "Shopify-Webshop, kindeskinder",
    url: "https://kindeskinder.biz/",
    image: "kindeskinder",
    bgColorClass: "bg-brand-sand",
  },
  {
    label: "Shopify-Webshop, PuraVida & Oswald",
    url: "https://oswald-puravida-wein.de/",
    image: "pvoswald",
    bgColorClass: "bg-brand-green-low-lvl",
  },
  {
    label: "custom mobile menu, tech demo",
    url: "https://ercancicek.com/mel-menu.html",
    image: "melmenu",
    bgColorClass: "bg-brand-green-high-lvl",
  },
];

export default function Portfolio({ data }) {
  const images = data.allFile.edges.reduce((acc, edge) => {
    acc[edge.node.name] = edge.node.childImageSharp.gatsbyImageData;
    return acc;
  }, {});
  return (
    <Layout>
      <main className="ec-layout-visual-content mt-24">
        <PageHeadline>Portfolio</PageHeadline>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allPortfolioBoxes.map((portfolioBox, idx) => (
            <LinkBox
              key={idx}
              label={portfolioBox.label}
              url={portfolioBox.url}
              bgColorClass={portfolioBox.bgColorClass}
              isSmall={portfolioBox.isSmall ?? false}
            >
              {portfolioBox.image ? (
                <GatsbyImage
                  image={images[portfolioBox.image]}
                  alt={portfolioBox.label}
                  imgStyle={{ objectFit: `contain` }}
                  className={linkboxAnimClasses}
                />
              ) : portfolioBox.icon ? (
                <div className="flex justify-center items-center">
                  {portfolioBox.icon}
                </div>
              ) : null}
            </LinkBox>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "portfolio" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

export const Head = () => <SEO title="Portfolio" pathname="/portfolio" />;
