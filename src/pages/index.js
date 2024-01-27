import React from "react";
import Layout from "../components/layout";
import bgLandscapeImg from "../images/index/bg-landscape.jpg";
import bgPortraitImg from "../images/index/bg-portrait.jpg";

export default function Home() {
  return (
    <Layout onDark>
      <main className="w-dvh h-dvh z-30 relative">
        <span className="mt-20">Ercan Cicek</span>
      </main>
      <div class="absolute inset-0 size-full bg-gray-max-lvl/75 z-20" />
      <picture>
        {/* Tailwind Breakpoint: xl */}
        <source media="(min-width: 1280px)" srcSet={bgLandscapeImg} />
        <img src={bgPortraitImg} className="absolute inset-0 size-full object-cover object-right z-10" />
      </picture>
    </Layout>
  );
}
