import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"
import { SendIcon } from "../components/icons/sendIcon"

// --- components
const ChatEntry = ({ role, message, messageLoading }) => {
  const isAssistant = role === "assistant"
  const baseClasses = "flex flex-row items-center px-6 py-4 min-h-16 relative"
  const triangleBaseClasses =
    "after:content-[''] after:block after:absolute after:top-0 after:size-0 after:border after:border-r-[15px] after:border-transparent"
  const messageClasses = `${baseClasses} ${triangleBaseClasses} ${
    isAssistant
      ? "bg-gray-low-lvl after:border-r-gray-low-lvl after:rounded-l-lg justify-start rounded-r-2xl rounded-bl-2xl after:right-full after:border-b-[15px]"
      : "bg-brand-green-high-lvl after:border-t-brand-green-high-lvl after:rounded-r-lg justify-end rounded-l-2xl rounded-br-2xl after:left-full after:transform after:-translate-x-px after:border-t-[15px]"
  }`
  const textClasses = `ec-font-subheading ${
    isAssistant ? "" : "text-typo-min-lvl"
  }`

  return (
    <div
      className={`flex flex-row gap-6 ${isAssistant ? "" : "pr-4 justify-end"}`}
    >
      {isAssistant && <AvatarBubble role={role} />}
      <div className={messageClasses}>
        {messageLoading ? (
          <TypingAnimation />
        ) : (
          <span className={textClasses}>{message}</span>
        )}
      </div>
      {/* {!isAssistant && <AvatarBubble role={role} />} */}
    </div>
  )
}

const AvatarBubble = ({ role }) => {
  const isAssistant = role === "assistant"
  const baseClasses = "flex-none size-16 rounded-full overflow-hidden"
  const avatarClasses = `${baseClasses} ${
    isAssistant
      ? "bg-gray-low-lvl shadow-sm"
      : "grid place-content-center bg-brand-green-high-lvl text-typo-min-lvl font-semibold"
  }`

  return isAssistant ? (
    <div className="size-fit relative">
      <StaticImage
        src="../images/about-me/ercancicek.jpg"
        alt="Ercan Cicek avatar"
        className={avatarClasses}
        objectPosition={"40%"}
      />
      <div className="absolute inset-0 rounded-full bg-brand-green-high-lvl/20 z-20" />
    </div>
  ) : (
    <div className={avatarClasses}>You</div>
  )
}

const TypingAnimation = () => (
  <div className="flex flex-row gap-1 items-center">
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-high-lvl [animation-delay:200ms]" />
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-high-lvl [animation-delay:300ms]" />
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-high-lvl [animation-delay:400ms]" />
  </div>
)

// --- page
export default function AIChatbot() {
  const [response, setResponse] = useState(null)
  const [answerIsLoading, setAnswerIsLoading] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [showInitialTyping, setShowInitialTyping] = useState(false)
  const [newUserMessage, setNewUserMessage] = useState(null)
  const [error, setError] = useState(null)
  const defaultSystemMessage = {
    role: "system",
    content: process.env.GATSBY_OPENAI_API_SYSTEM_MESSAGE,
  }

  const showInitialTypingEffect = () => {
    setShowInitialTyping(true)
    setTimeout(() => {
      setShowInitialTyping(false)
    }, 1000)
  }

  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMessages = sessionStorage.getItem("messages")
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages)
        if (parsedMessages.filter(message => message.role !== "system").length > 0) {
          return parsedMessages
        }
      }
    }
    showInitialTypingEffect()
    return [defaultSystemMessage]
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("messages", JSON.stringify(messages))
    }
  }, [messages])

  const fetchMessage = async () => {
    setAnswerIsLoading(true)
    const OPENAI_API_URL = process.env.GATSBY_OPENAI_API_URL
    const OPENAI_API_KEY = process.env.GATSBY_OPENAI_API_KEY

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    }

    const body = JSON.stringify({
      model: "gpt-4",
      messages: messages,
      temperature: 0.33,
    })

    fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: "POST",
      headers,
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data)
        setAnswerIsLoading(false)
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
        setAnswerIsLoading(false)
      })
  }

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      sendMessage()
    }
  }

  const sendMessage = () => {
    if (inputValue && inputValue.length > 1) {
      const newMessage = {
        role: "user",
        content: inputValue,
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setNewUserMessage(newMessage)
      setInputValue("")
    }
  }

  const resetChat = () => {
    const nonSystemMessages = messages.filter(message => message.role !== "system");
    if (nonSystemMessages.length > 0) {
      showInitialTypingEffect();
      setMessages([defaultSystemMessage]);
      sessionStorage.removeItem("messages");
    }
  }

  useEffect(() => {
    sessionStorage.setItem("messages", JSON.stringify(messages))
    window.scrollTo(0, document.body.scrollHeight)
    if (newUserMessage) {
      fetchMessage()
    }
  }, [messages, newUserMessage])

  return (
    <Layout>
      <main className="ec-layout-visual-content pt-24 pb-40">
        <PageHeadline text="Chatbot" />
        <div className="ec-layout-text-content flex flex-col gap-6">
          {/* --- initial info if no messages sent yet --- */}
          {showInitialTyping ? (
              <ChatEntry role={"assistant"} messageLoading={true} />
            ) : (
              <ChatEntry role={"assistant"} message="I am a GPT trained to answer question on behalf of Ercan Cicek. Ask me anything. If there are specific questions consider the direct contact." />
            )
          }
          {/* --- messages --- */}
          {messages &&
            messages.map((message, index) => {
              if (message.role === "system") {
                return null
              }
              return (
                <ChatEntry key={index} role={message.role} message={message.content} />
              )
            })}
          {/* --- assistant answer loading */}
          {answerIsLoading && (
            <ChatEntry role={"assistant"} messageLoading={true} />
          )}
          {/* --- error --- */}
          {error && <div>{error}</div>}
          {/* --- user message input --- */}
          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                onKeyUp={handleKeyUp}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                className="w-full pl-6 pr-16 py-2 min-h-16 rounded-3xl shadow-sm ec-font-subheading outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                placeholder="Start typing..."
              />
              <button
                onClick={sendMessage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer group"
                disabled={inputValue.length <= 1}
                title="Send message"
              >
                <SendIcon iconClasses="fill-gray-medium-lvl/70 size-10 group-hover:scale-110 transition-all" />
              </button>
            </div>
            <button
              onClick={resetChat}
              className="self-end w-fit px-3 py-1 rounded-2xl text-typo-medium-lvl"
            >
              Reset Chat
            </button>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="AI Chatbot" pathname="/ai-chatbot" />
