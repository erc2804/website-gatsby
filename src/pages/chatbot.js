import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"

export default function Chatbot() {
  const [response, setResponse] = useState(null)
  const [messageIsLoading, setMessageIsLoading] = useState(null)

  useEffect(() => {
    setMessageIsLoading(true)
    const OPENAI_API_URL = process.env.GATSBY_OPENAI_API_URL
    const OPENAI_API_KEY = process.env.GATSBY_OPENAI_API_KEY

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    }

    const body = JSON.stringify({
      // 'model': 'Ercan Cicek',
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
      ],
    })

    fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: "POST",
      headers,
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data)
        setMessageIsLoading(false)
      })
      .catch((error) => console.error("Error:", error))
  }, [])

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="Chatbot" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 items-end">
            <StaticImage
              src="../images/about-me/ercancicek.jpg"
              alt="Ercan Cicek avatar"
              className="flex-none size-16 rounded-full bg-gray-min-lvl shadow-sm"
              objectPosition={"40%"}
            />
            <div className="flex flex-row justify-start items-center bg-brand-green-low-lvl/50 px-6 py-5 min-h-16 rounded-r-2xl rounded-tl-2xl">
              {messageIsLoading ? (
              <div className="flex flex-row gap-1 items-center">
                <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:200ms]"></div>
                <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:300ms]"></div>
                <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:400ms]"></div>
              </div>
              ) : (
                <span className="ec-font-subheading">{response?.choices[0]?.message?.content}</span>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-4 items-end">
            <input type="text" className="flex-1 px-6 py-2 min-h-16 rounded-3xl shadow-sm ec-font-subheading" placeholder="Your message" />
            <div className="flex-none grid place-content-center size-16 rounded-full bg-brand-blue text-typo-low-lvl">
              You
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="Chatbot" pathname="/chatbot" />