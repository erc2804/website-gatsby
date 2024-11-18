import React, { useEffect, useState, useCallback, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { injectIntl } from "gatsby-plugin-intl"

const MouseChatBubble = ({ intl }) => {
  const [chatBubbleVisible, setChatBubbleVisible] = useState(false)
  const [currentChatMessage, setCurrentChatMessage] = useState(
    intl.formatMessage({ id: 'chat-bubble.starter' })
  )
  const [fadeOut, setFadeOut] = useState(false)

  const [elementPosStyles, setElementPosStyles] = useState({ top: 0, right: 0 })
  const wrapperRef = useRef(null)
  const forceStarterMessageVisibility = useRef(true)
  const [dataChatElements, setDataChatElements] = useState([])

  // --- looking for elems containing data-chat attribute on component mount
  useEffect(() => {
    setDataChatElements(Array.from(document.querySelectorAll("[data-chat]")))
  }, [])

  const startVisibilityTimer = useCallback(() => {
    setTimeout(() => {
      setChatBubbleVisible(true)
      setTimeout(() => {
        // --- force starter message visibility for 1.5 seconds
        forceStarterMessageVisibility.current = false
      }, 1500)
    }, 2000)
  }, [])

  const updatePositionAndMessage = useCallback((event) => {
    const { clientX, clientY, target } = event
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const avatarSize = 40
    const safeSpace = 12

    const maxTop = viewportHeight - (wrapperRef.current?.offsetHeight + 64 ?? 0)
    const top = Math.min(Math.max(80, clientY - avatarSize / 2), maxTop)

    const maxRight = viewportWidth - (wrapperRef.current?.offsetWidth + 3 ?? 0)
    const right = Math.min(Math.max(0, viewportWidth - clientX - avatarSize - safeSpace * 2), maxRight)

    setElementPosStyles({ top, right })
    if (!chatBubbleVisible) startVisibilityTimer()

    // --- directly update position but debounce message update
    handleMessageChange(target, clientX, clientY)
  }, [chatBubbleVisible, startVisibilityTimer, dataChatElements, currentChatMessage])

  const debounceMessageChange = useRef(null)

  const handleMessageChange = (target, clientX, clientY) => {
    if (debounceMessageChange.current) {
      clearTimeout(debounceMessageChange.current)
    }

    debounceMessageChange.current = setTimeout(() => {
      let newChatMessage = null
      dataChatElements.forEach((el) => {
        if (el.contains(target)) newChatMessage = el.getAttribute("data-chat")
      })

      if (!forceStarterMessageVisibility.current && newChatMessage && currentChatMessage !== newChatMessage) {
        triggerFadeOut(() => {
          setCurrentChatMessage(newChatMessage)
        })
      } 
    //   else {
    //     const distanceToElem = calcDistanceToElemContainingCurrentMessage(clientX, clientY)
    //     if (distanceToElem >= 250) {
    //       triggerFadeOut(() => {
    //         setCurrentChatMessage(intl.formatMessage({ id: 'chat-bubble.fallback' }))
    //       })
    //     }
    //   }
    }, 200)
  }

  // --- fadeout of message on change
  const triggerFadeOut = (callback) => {
    setFadeOut(false) // --- clear ongoing fade-out
    setTimeout(() => {
      setFadeOut(true) 
      setTimeout(() => {
        callback()
        setFadeOut(false)
      }, 300)
    }, 10) // --- delay to ensure fade-out reset
  }

  // --- calc distance to the element containing the current message
  const calcDistanceToElemContainingCurrentMessage = (clientX, clientY) => {
    const currentElem = dataChatElements.find(
      (elem) => elem.getAttribute("data-chat") === currentChatMessage
    )
    if (currentElem) {
      const rect = currentElem.getBoundingClientRect()
      const elemCenterX = rect.left + rect.width / 2
      const elemCenterY = rect.top + rect.height / 2
      return Math.sqrt(Math.pow(clientX - elemCenterX, 2) + Math.pow(clientY - elemCenterY, 2))
    }
    return 0
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", updatePositionAndMessage)
      return () => {
        window.removeEventListener("mousemove", updatePositionAndMessage)
      }
    }
  }, [updatePositionAndMessage])

  return (
    <div
      className="hidden lg:flex flex-col items-end gap-1 absolute z-50 pointer-events-none"
      style={elementPosStyles}
      ref={wrapperRef}
    >
      <div
        className={`flex flex-none transition-transform duration-500 transform ${chatBubbleVisible ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
      >
        <StaticImage
          src="../images/pixelcan.png"
          alt=""
          className="aspect-square rounded-full size-10"
        />
      </div>
      <div
        className={`flex-none px-2 pt-px max-w-[200px] bg-brand-sand rounded-xl duration-500 delay-300 transition-opacity ${chatBubbleVisible ? "opacity-100" : "opacity-0"}`}
      >
        <span className={`duration-150 transition-opacity ${fadeOut ? "opacity-0" : "opacity-100"}`}>
          {currentChatMessage}
        </span>
      </div>
    </div>
  )
}

export default injectIntl(MouseChatBubble)