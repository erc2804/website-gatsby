import React, { useEffect, useState, useCallback } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/seo"
import PageHeadline from "../components/pageHeadline"
import { StaticImage } from "gatsby-plugin-image"

// --- components
const ChatEntry = ({ role, message, messageLoading }) => {
  const isAssistant = role === "assistant"
  const baseClasses = "flex flex-row items-center px-6 py-4 min-h-16"
  const messageClasses = `${baseClasses} ${
    isAssistant
      ? "bg-brand-green-low-lvl/50 justify-start rounded-r-2xl rounded-tl-2xl"
      : "bg-brand-blue justify-end rounded-l-2xl rounded-tr-2xl"
  }`
  const textClasses = `ec-font-subheading ${
    isAssistant ? "" : "text-typo-low-lvl"
  }`

  return (
    <div
      className={`flex flex-row gap-4 items-end ${
        isAssistant ? "" : "justify-end"
      }`}
    >
      {isAssistant && <AvatarBubble role={role} />}
      <div className={messageClasses}>
        {messageLoading ? (
          <TypingAnimation />
        ) : (
          <span className={textClasses}>{message.content}</span>
        )}
      </div>
      {!isAssistant && <AvatarBubble role={role} />}
    </div>
  )
}

const AvatarBubble = ({ role }) => {
  const isAssistant = role === "assistant"
  const baseClasses = "flex-none size-16 rounded-full"
  const avatarClasses = `${baseClasses} ${
    isAssistant
      ? "bg-gray-min-lvl shadow-sm"
      : "grid place-content-center border border-brand-blue bg-brand-blue/10"
  }`

  return isAssistant ? (
    <StaticImage
      src="../images/about-me/ercancicek.jpg"
      alt="Ercan Cicek avatar"
      className={avatarClasses}
      objectPosition={"40%"}
    />
  ) : (
    <div className={avatarClasses}>You</div>
  )
}

const TypingAnimation = () => (
  <div className="flex flex-row gap-1 items-center">
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:200ms]"></div>
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:300ms]"></div>
    <div className="animate-typing size-2 inline-block rounded-full bg-brand-green-medium-lvl [animation-delay:400ms]"></div>
  </div>
)

// --- page
export default function AIChatbot() {
  const [response, setResponse] = useState(null)
  const [answerIsLoading, setAnswerIsLoading] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [newUserMessage, setNewUserMessage] = useState(null)
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = sessionStorage.getItem("messages")
      if (savedMessages) {
        return JSON.parse(savedMessages)
      } 
    }
    return [
      {
        role: "system",
        // content: process.env.GATSBY_OPENAI_API_SYSTEM_MESSAGE,
        content: process.env.OPENAI_API_SYSTEM_MESSAGE,
      },
    ]
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("messages", JSON.stringify(messages))
    }
  }, [messages])

  const fetchMessage = async () => {
    setAnswerIsLoading(true)
    // const OPENAI_API_URL = process.env.GATSBY_OPENAI_API_URL
    // const OPENAI_API_KEY = process.env.GATSBY_OPENAI_API_KEY
    const OPENAI_API_URL = process.env.OPENAI_API_URL
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    }

    const body = JSON.stringify({
      "model": "gpt-4",
      "messages": messages,
      "temperature": 0.33
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
    setMessages([
      {
        role: "system",
        content: "You are Ercan Cicek, a frontend and UI/UX expert passionate about creating implementable designs and leading teams. Your expertise lies in developing junior talent and teaching Figma and web development basics. You have a strong foundation in frontend and UI/UX but admit to having more limited backend development skills. You're fluent in English and German, advanced in Turkish, and conversational in Japanese. Your conversation style is informal yet professional, infused with subtle humor. When someone uses 'boaah' or a similar expression, respond with 'boahhh', maintaining a casual and friendly tone. This response is unique to such expressions. You appreciate Düsseldorf for its manageable size, charm, and the Japanese influence within the city. When conversing in Turkish, mention your Turkish isn't very good and mix in German nouns every few sentences to balance your expression. In Japanese interactions, aim for N4 level proficiency. Your interest in recruiting and HR psychology, especially in estimating the cultural fit of a candidate, influences your perspective on team dynamics and cultural integration in professional settings. You've conducted numerous interviews for UI/UX design and frontend development positions, integrating insights on team dynamics and cultural integration into the selection process."
      }
    ])
    sessionStorage.removeItem("messages")
  }

  useEffect(() => {
    sessionStorage.setItem('messages', JSON.stringify(messages))
    window.scrollTo(0, document.body.scrollHeight)
    if (newUserMessage) {
      fetchMessage()
    }
  }, [messages, newUserMessage])

  return (
    <Layout>
      <main className="ec-layout-visual-content py-24">
        <PageHeadline text="Chatbot" />
        <div className="ec-layout-text-content flex flex-col gap-6">
          <button
            onClick={resetChat}
            className="w-fit border border-brand-blue px-3 py-1 rounded-2xl"
          >
            Reset Chat
          </button>
          {/* --- initial info if no messages sent yet --- */}
          {messages.filter((message) => message.role !== "system").length ===
            0 && (
            <div className="ec-font-subheading">
              <p className="text-typo-medium-lvl">
                I created a GPT, an AI chatbot, that is trained to act like me
                and answer all your questions from my perspective. The answers
                can contain mistakes. If you want to make sure you get the 100%
                real answer{" "}
                <Link
                  to="/about-me"
                  className="text-brand-blue font-semibold hover:underline"
                >
                  contact me
                </Link>
                .
              </p>
              <p className="mt-4">Send your first question here</p>
            </div>
          )}
          {/* --- messages --- */}
          {messages &&
            messages.map((message, index) => {
              if (message.role === "system") {
                return null
              }
              return (
                <ChatEntry key={index} role={message.role} message={message} />
              )
            })}
          {/* --- assistant answer loading */}
          {answerIsLoading && (
            <ChatEntry role={"assistant"} messageLoading={true} />
          )}
          {/* --- error --- */}
          {/* {error && <div>{error}</div>} */}
          {/* --- user message input --- */}
          <div className="flex flex-row gap-4 items-end">
            <div className="flex-1 relative">
              <input
                onKeyUp={handleKeyUp}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                className="w-full px-6 py-2 min-h-16 rounded-3xl shadow-sm ec-font-subheading outline-none focus:ring-1 focus:ring-brand-blue transition-all"
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
            <AvatarBubble role={"user"} />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <Seo title="AI Chatbot" pathname="/ai-chatbot" />
