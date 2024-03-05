import React, { useEffect, useState, useCallback } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"

const ChatEntry = ({ role, message, messageLoading }) => (
  <div className={`flex flex-row gap-4 items-end ${role === "user" ? "justify-end" : ""}`}>
    {role === "assistant" && (
      <StaticImage
        src="../images/about-me/ercancicek.jpg"
        alt="Ercan Cicek avatar"
        className="flex-none size-16 rounded-full bg-gray-min-lvl shadow-sm"
        objectPosition={"40%"}
      />
    )}
    <div className={`flex flex-row ${role === "assistant" ? "bg-brand-green-low-lvl/50 justify-start rounded-r-2xl rounded-tl-2xl" : "bg-brand-blue justify-end rounded-l-2xl rounded-tr-2xl"} items-center px-6 py-5 min-h-16`}>
      {
        messageLoading ? (
          <div className="flex flex-row gap-1 items-center">
            <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:200ms]"></div>
            <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:300ms]"></div>
            <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:400ms]"></div>
          </div>
        ) : (
          <span className={`ec-font-subheading ${role === "user" ? "text-typo-low-lvl" : ""}`}>{message.content}</span>
        )
      }
    </div>
    {role === "user" && (
      <div className="flex-none grid place-content-center size-16 rounded-full border border-brand-blue bg-brand-blue/10">
        You
      </div>
    )}
  </div>
)

export default function Chatbot() {
  const [response, setResponse] = useState(null)
  const [messageIsLoading, setMessageIsLoading] = useState(null)
  const [inputValue, setInputValue] = useState("")
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
        setNewUserMessage(null)
      })
      .catch((error) => {
        console.error("Error:", error)
        setError("Something went wrong!")
        setMessageIsLoading(false)
      })
  }, [messages])

  const handleKeyUp = useCallback(
    (event) => {
      if (event.key === "Enter") {
        sendMessage()
      }
    },
    [messages, inputValue]
  )

  const sendMessage = useCallback(() => {
    if (inputValue && inputValue.length > 1) {
      const newMessage = {
        role: "user",
        content: inputValue,
      }
      setMessages([...messages, newMessage])
      // --- trigger fetchMessage
      setNewUserMessage(newMessage)
      setInputValue("")
    }
  }, [messages, inputValue])

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
              if(message.role === "system") {
                return null;
              }
              return <ChatEntry key={index} role={message.role} message={message} />
            })}
          {/* LOADING */}
          {messageIsLoading && (
            <ChatEntry role={"assistant"} messageLoading={true} />
          )}
          {/* ERROR */}
          {error && <div>{error}</div>}
          {/* USER MESSAGE */}
          <hr className="my-10" />
          <div className="flex flex-row gap-4 items-end">
            <div className="flex-1 relative">
              <input
                onKeyUp={handleKeyUp}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                className="w-full px-6 py-2 min-h-16 rounded-3xl shadow-sm ec-font-subheading"
                placeholder="Your message"
              />
              <button
                onClick={sendMessage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 disabled:line-through"
                disabled={inputValue.length <= 1}
              >
                send
              </button>
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
