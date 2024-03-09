import React, { useEffect, useState, useMemo } from "react"
import { SendIcon } from "./icons/sendIcon"
import ChatEntry from "./chat/chatEntry"

const AiChatbot = () => {
  const [answerIsLoading, setAnswerIsLoading] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [showInitialTyping, setShowInitialTyping] = useState(false)
  const [newUserMessage, setNewUserMessage] = useState(null)
  const [error, setError] = useState(null)

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
        return JSON.parse(savedMessages)
      }
    }
    showInitialTypingEffect()
    return []
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("messages", JSON.stringify(messages))
    }
  }, [messages])

  const callOpenAIAPi = async () => {
    const body = JSON.stringify({
      messages: messages,
    })

    const response = await fetch("/.netlify/functions/makeApiCall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data
  }

  const fetchMessage = async () => {
    try {
      setAnswerIsLoading(true)
      const data = await callOpenAIAPi()
      console.log("data: ", data)
      setAnswerIsLoading(false)
      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
      setNewUserMessage(null)
      setError(null)
    } catch (error) {
      console.error("error: ", error.message)
      setError('Oops! Something went wrong. Please try again later. If the error keep occurring, please contact me.')
      setAnswerIsLoading(false)
    }
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
    const nonSystemMessages = messages.filter(
      (message) => message.role !== "system"
    )
    if (nonSystemMessages.length > 0) {
      showInitialTypingEffect()
      setMessages([])
      sessionStorage.removeItem("messages")
    }
  }

  useEffect(() => {
    sessionStorage.setItem("messages", JSON.stringify(messages))
    // window.scrollTo(0, document.body.scrollHeight)
    if (newUserMessage) {
      fetchMessage()
    }
  }, [messages, newUserMessage])

  return (
    <div className="flex flex-col gap-6">
      {/* --- initial info if no messages sent yet --- */}
      {showInitialTyping ? (
        <ChatEntry role={"assistant"} messageLoading={true} />
      ) : (
        <ChatEntry
          role={"assistant"}
          message="I am a GPT trained to answer questions on behalf of Ercan Cicek. Feel free to ask me anything. For specific inquiries, please consider direct contact."
        />
      )}
      {/* --- messages --- */}
      {messages &&
        messages.map((message, index) => {
          if (message.role === "system") {
            return null
          }
          return (
            <ChatEntry
              key={index}
              role={message.role}
              message={message.content}
            />
          )
        })}
      {/* --- assistant answer loading */}
      {answerIsLoading && (
        <ChatEntry role={"assistant"} messageLoading={true} />
      )}
      {/* --- error --- */}
      {error && <div className="text-red-500 font-semibold">{error}</div>}
      {/* --- user message input --- */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            onKeyUp={handleKeyUp}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            className="w-full pl-6 pr-16 py-2 min-h-16 rounded-3xl shadow-sm sm:ec-font-subheading outline-none focus:ring-1 focus:ring-brand-blue transition-all"
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
  )
}

export default AiChatbot
