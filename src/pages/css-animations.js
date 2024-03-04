import React, { useState, useEffect } from "react"
import { useLocation } from "@reach/router"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"

const animations = [
  {
    name: "scale",
    configurable: ["delay", "duration", "timing-function", "direction"],
    keyframes: `
      0% { transform: scale(1); }
      100% { transform: scale(1.5); }
    `,
    animation: "scale 1s 1",
  },
  {
    name: "rotate",
    configurable: ["delay", "duration", "timing-function", "direction"],
    keyframes: `
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    `,
    animation: "rotate 1s 1",
  },
  {
    name: "flip",
    configurable: ["delay", "duration", "timing-function", "direction"],
    keyframes: `
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(180deg); }
    `,
    animation: "flip 1s 1 forwards",
  },
  {
    name: "bounce",
    configurable: ["delay", "duration", "timing-function", "direction"],
    keyframes: `
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    `,
    animation: "bounce 1s 1",
  },
]
export default function CssAnimations() {
  const [activeAnimation, setActiveAnimation] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const animationParam = params.get("animation")

    const animationToActivateInitially = !animationParam
      ? animations[0].name
      : animationParam
    setActiveAnimation(animationToActivateInitially)
  }, [])

  useEffect(() => {
    if (activeAnimation) {
      const pathname = location.pathname.endsWith("/")
        ? location.pathname.slice(0, -1)
        : location.pathname
      const newUrl = `${pathname}?animation=${activeAnimation}`
      window.history.pushState({ path: newUrl }, "", newUrl)
    }
  }, [activeAnimation])

  useEffect(() => {
    // Insert the keyframes into the document's stylesheet
    const styleSheet = document.styleSheets[0]
    animations.forEach((animation) => {
      styleSheet.insertRule(
        `@keyframes ${animation.name} {${animation.keyframes}}`,
        styleSheet.cssRules.length
      )
    })
  }, [])

  const playActiveAnimation = () => {
    const activeAnimationDetails = animations.find(
      (animation) => animation.name === activeAnimation
    )
    if (activeAnimationDetails) {
      console.log("Keyframes:", activeAnimationDetails.keyframes)
      console.log("Animation:", activeAnimationDetails.animation)
    }
  }

  const copyToClipboard = () => {
    const code = `
      @keyframes ${activeAnimation} {
        ${
          animations.find((animation) => animation.name === activeAnimation)
            .keyframes
        }
      }
  
      .${activeAnimation} {
        animation: ${
          animations.find((animation) => animation.name === activeAnimation)
            .animation
        };
      }
    `.trim()

    navigator.clipboard.writeText(code)
  }

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="CSS Animations" />
        <div className="flex flex-col">
          <div className="flex flex-row gap-3 w-full">
            {animations.map((animation) => (
              <button
                key={animation.name}
                className={`px-3 py-1 rounded-t-3xl ec-font-subheading transition-all ${
                  activeAnimation === animation.name
                    ? "bg-gray-low-lvl"
                    : "opacity-75 bg-gray-min-lvl"
                }`}
                onClick={() => setActiveAnimation(animation.name)}
              >
                {animation.name}
              </button>
            ))}
          </div>
          <div className="grid place-content-center w-full h-96 rounded-b-3xl rounded-tr-3xl bg-gray-low-lvl relative">
            {activeAnimation === "flip" ? (
              <div
                className="grid place-content-center size-40 rounded-3xl bg-gray-min-lvl text-6xl text-typo-medium-lvl relative"
                style={{
                  transformStyle: "preserve-3d",
                  animation: activeAnimation
                    ? `${
                        animations.find(
                          (animation) => animation.name === activeAnimation
                        ).animation
                      }`
                    : "none",
                }}
              >
                <div
                  className="absolute inset-0 grid place-content-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  A
                </div>
                <div
                  className="absolute inset-0 grid place-content-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  B
                </div>
              </div>
            ) : (
              <div
                className="grid place-content-center size-40 rounded-3xl bg-gray-min-lvl text-6xl text-typo-medium-lvl"
                style={{
                  animation: activeAnimation
                    ? `${
                        animations.find(
                          (animation) => animation.name === activeAnimation
                        ).animation
                      }`
                    : "none",
                }}
              >
                A
              </div>
            )}
            <div className="absolute bottom-3 left-0 right-0 px-4 w-full flex flex-row gap-2 justify-end">
              <button onClick={playActiveAnimation}>Play/Restart</button>
              <button>Code</button>
            </div>
          </div>
          {/* TEST */}
          <h2 className="text-2xl mb-4 mt-10">Code</h2>
          <pre className="bg-gray-200 p-4 rounded mb-4">
            <code>
              {`@keyframes ${activeAnimation} {
                ${animations
                  .find((animation) => animation.name === activeAnimation)
                  .keyframes.replace(/^\s+/gm, "")}
              }

              .${activeAnimation} {
                animation: ${
                  animations.find(
                    (animation) => animation.name === activeAnimation
                  ).animation
                };
              }`
                .replace(/^\s+/gm, "")
                .trim()}
            </code>
          </pre>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
          {/* /TEST */}
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => (
  <Seo title="CSS Animations" pathname="/css-animations" />
)
