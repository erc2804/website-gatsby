import React, { useState, useEffect } from "react"

export default function AdpillarText({ adpillarTexts, textClasses = "", timePerType = 150}) {
  const [currentAdpillarText, setCurrentAdpillarText] = useState("")
  let initialAdpillarTimeout = null
  let adpillarWordIdx = 0
  let adpillarIntval = null
  let clearAdpillarIntval = null
  let nextAdpillarTimeout = null
  let nextAdpillarWordTimeout = null

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialAdpillarTimeout = setTimeout(
        () => startAdpillarAnim(adpillarWordIdx),
        300
      )
    }

    return () => {
      clearInterval(adpillarIntval)
      clearInterval(clearAdpillarIntval)
      clearTimeout(initialAdpillarTimeout)
      clearTimeout(nextAdpillarTimeout)
      clearTimeout(nextAdpillarWordTimeout)
    }
  }, [])

  const startAdpillarAnim = (idx, finalAdpillarIdx = 0) => {
    if (adpillarTexts[idx][finalAdpillarIdx] === undefined) {
      nextAdpillarWord()
      return
    }

    setCurrentAdpillarText(
      (currentText) => currentText + adpillarTexts[idx][finalAdpillarIdx]
    )

    setTimeout(() => startAdpillarAnim(idx, finalAdpillarIdx + 1), timePerType)
  }

  const nextAdpillarWord = () => {
    adpillarWordIdx++
    if (adpillarTexts[adpillarWordIdx]) {
      nextAdpillarWordTimeout = setTimeout(() => {
        clearAdpillar()
      }, 2000)
    }
  }

  const clearAdpillar = () => {
    setCurrentAdpillarText((currentText) => {
      if (currentText.length === 0) {
        nextAdpillarTimeout = setTimeout(() => {
          startAdpillarAnim(adpillarWordIdx)
        }, 500)
        return currentText
      }

      const newText = currentText.slice(0, -1)
      setTimeout(() => clearAdpillar(), 50)
      return newText
    })
  }

  return (
    <span className={textClasses}>
      {currentAdpillarText}
      <span className={`${textClasses} animate-blink`}>_</span>
    </span>
  )
}