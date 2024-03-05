import React, { useEffect, useState, useCallback } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"

export default function Chatbot() {
  const [response, setResponse] = useState(null)
  const [messageIsLoading, setMessageIsLoading] = useState(null)
  const [newUserMessage, setNewUserMessage] = useState(null)
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
  ])

  const fetchMessage = useCallback(async () => {
    setMessageIsLoading(true)
    const OPENAI_API_URL = process.env.GATSBY_OPENAI_API_URL
    const OPENAI_API_KEY = process.env.GATSBY_OPENAI_API_KEY

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    }

    const body = JSON.stringify({
      model: "gpt-4",
      messages: messages,
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
        const assistantMessage = {
          role: "assistant",
          content: data.choices[0].message.content,
        }
        setMessages((prevMessages) => [...prevMessages, assistantMessage])
        setNewUserMessage(null) // Reset newUserMessage after processing
      })
      .catch((error) => {
        console.error("Error:", error)
        setError("Something went wrong!")
        setMessageIsLoading(false)
      })
  }, [messages])

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter") {
      fetchMessage()
    }
  }, [messages])

  // TODO: make this work
  // const sendMessage = useCallback(
  //   (event) => {
  //     if (inputValue && inputValue.length > 1) {
  //       const newMessage = {
  //         role: "user",
  //         content: inputValue,
  //       }
  //       setMessages([...messages, newMessage])
  //       // --- trigger fetchMessage
  //       setNewUserMessage(newMessage)
  //       inputValue = ""
  //     }
  //   },
  //   [messages]
  // )

  // --- watcher for user messages
  useEffect(() => {
    if (newUserMessage) {
      fetchMessage()
    }
  }, [newUserMessage, fetchMessage])

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="Chatbot" />
        <div className="flex flex-col gap-6">
          {/* --- messages */}
          {messages &&
            messages.map((message, index) => {
              if (message.role === "assistant") {
                return (
                  <div key={index} className="flex flex-row gap-4 items-end">
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
                        <span className="ec-font-subheading">
                          {message.content}
                        </span>
                      )}
                    </div>
                  </div>
                )
              } else if (message.role === "user") {
                return (
                  <div key={index} className="flex flex-row justify-end gap-4 items-end">
                    <div className="flex flex-row justify-end items-center bg-brand-blue px-6 py-5 min-h-16 rounded-l-2xl rounded-tr-2xl">
                        <span className="ec-font-subheading text-typo-low-lvl">
                          {message.content}
                        </span>
                    </div>
                    <div className="flex-none grid place-content-center size-16 rounded-full border border-brand-blue bg-brand-blue/10">
                      You
                    </div>
                  </div>
                )
              }
            })}
          {/* ERROR */}
          {error && <div>{error}</div>}
          {/* USER MESSAGE */}
          <hr className="my-10" />
          <div className="flex flex-row gap-4 items-end">
            <div className="flex-1 relative">
              <input
                onKeyDown={handleKeyDown}
                type="text"
                className="w-full px-6 py-2 min-h-16 rounded-3xl shadow-sm ec-font-subheading"
                placeholder="Your message"
              />
              <button onClick={sendMessage} className="absolute right-6 top-1/2 transform -translate-y-1/2">send</button>
            </div>
            <div className="flex-none grid place-content-center size-16 rounded-full  border border-brand-blue bg-brand-blue/10">
              You
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="Chatbot" pathname="/chatbot" />
