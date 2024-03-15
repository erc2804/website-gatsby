import React, { useEffect, useState, useRef } from "react"
import { SendIcon } from "./icons/sendIcon"
import ChatEntry from "./chat/chatEntry"

const AiChatbot = () => {
  const [answerIsLoading, setAnswerIsLoading] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [showInitialTyping, setShowInitialTyping] = useState(false)
  const [newUserMessage, setNewUserMessage] = useState(null)
  const [error, setError] = useState(null)

  const typingContainerRef = useRef(null)
  const initialRender = useRef(true)

  const showInitialTypingEffect = () => {
    setShowInitialTyping(true)
    setTimeout(() => {
      setShowInitialTyping(false)
    }, 1000)
  }

  const initMessages = () => {
    if (typeof window !== "undefined") {
      const savedMessages = sessionStorage.getItem("messages")
      if (savedMessages) {
        return JSON.parse(savedMessages)
      }
    }
    showInitialTypingEffect()
    return []
  }

  const [messages, setMessages] = useState(initMessages)

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
    if (messages.length) {
      try {
        setAnswerIsLoading(true)
        const aiData = await callOpenAIAPi()
        setAnswerIsLoading(false)
        const assistantMessage = {
          role: "assistant",
          content: aiData.choices[0].message.content,
        }
        setMessages((prevMessages) => [...prevMessages, assistantMessage])
        setNewUserMessage(null)
        setError(null)
      } catch (error) {
        console.error("error: ", error.message)
        let userErrorMessage;
        if (error.message.includes("Rate limit exceeded")) {
          userErrorMessage = "Whoa, it's crowded in here! So many people are chatting that we've hit the traffic limit. I'm doing my best to keep costs down and unfortunately, you've caught the short end of the stick. Hang tight and try again later, okay?";
        } else {
          userErrorMessage = "An unexpected error occurred. Please try again later.";
        }
        setError(userErrorMessage)
        setAnswerIsLoading(false)
      }
    }
  }

  const sendMessage = () => {
    if (!answerIsLoading && inputValue && inputValue.length) {
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
    if (answerIsLoading) {
      return
    }
    setMessages([])
    sessionStorage.removeItem("messages")
    setError(null)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  const handleInputTyping = (event) => {
    if (answerIsLoading) {
      return
    }
    setInputValue(event.target.value)
  }

  useEffect(() => {
    if (newUserMessage && !initialRender.current) {
      fetchMessage()
    }
    if (typingContainerRef.current && !initialRender.current) {
      setTimeout(() => {
        typingContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
      })
    }
    if (initialRender.current) {
      initialRender.current = false
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
          message="I am a GPT trained to answer questions on behalf of Ercan. Feel free to ask me anything. For specific inquiries, please consider direct contact."
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
      <div className="flex flex-col gap-2" ref={typingContainerRef}>
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            onChange={(e) => handleInputTyping(e)}
            value={inputValue}
            type="text"
            className="w-full pl-6 pr-16 py-2 min-h-16 rounded-xl shadow-sm sm:ec-font-subheading outline-none focus:ring-1 focus:ring-brand-blue transition-all"
            placeholder={
              answerIsLoading
                ? "The AI is answering. Please wait..."
                : "Start typing..."
            }
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer disabled:cursor-default group"
            disabled={answerIsLoading || !inputValue.length}
            title="Send message"
          >
            <SendIcon iconClasses="fill-gray-medium-lvl/70 size-10 group-hover:scale-110 transition-all group-disabled:scale-100 group-disabled:fill-gray-medium-lvl/30" />
          </button>
        </form>
        <button
          onClick={resetChat}
          disabled={answerIsLoading}
          className="self-end w-fit px-3 py-1 rounded-2xl text-typo-medium-lvl disabled:text-typo-low-lvl disabled:cursor-wait"
        >
          Reset Chat
        </button>
      </div>
    </div>
  )
}

export default AiChatbot
