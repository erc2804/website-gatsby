import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"

export default function AdpillarText({
  adpillarTexts: rawAdpillarTexts,
  textClasses = "",
  timePerType = 150,
}) {
  const [currentAdpillarText, setCurrentAdpillarText] = useState("")
  const adpillarWordIdx = useRef(0)
  const adpillarIntval = useRef(null)
  const nextAdpillarTimeout = useRef(null)
  const nextAdpillarWordTimeout = useRef(null)
  const initialAdpillarTimeout = useRef(null)
  const startAdpillarAnimRef = useRef(null)

  const adpillarTexts = useMemo(() => rawAdpillarTexts, [rawAdpillarTexts])

  const clearAdpillar = useCallback(() => {
    setCurrentAdpillarText((currentText) => {
      if (currentText.length === 0) {
        nextAdpillarTimeout.current = setTimeout(() => {
          startAdpillarAnimRef.current(adpillarWordIdx.current)
        }, 500)
        return currentText
      }

      const newText = currentText.slice(0, -1)
      setTimeout(() => clearAdpillar(), 50)
      return newText
    })
  }, [])

  const nextAdpillarWord = useCallback(() => {
    adpillarWordIdx.current++
    if (adpillarTexts[adpillarWordIdx.current]) {
      nextAdpillarWordTimeout.current = setTimeout(clearAdpillar, 2000)
    }
  }, [adpillarTexts, clearAdpillar])

  const startAdpillarAnim = useCallback(
    (idx, finalAdpillarIdx = 0) => {
      if (
        !adpillarTexts[idx] ||
        adpillarTexts[idx][finalAdpillarIdx] === undefined
      ) {
        nextAdpillarWord()
        return
      }

      setCurrentAdpillarText(
        (currentText) => currentText + adpillarTexts[idx][finalAdpillarIdx]
      )

      setTimeout(
        () => startAdpillarAnim(idx, finalAdpillarIdx + 1),
        timePerType
      )
    },
    [adpillarTexts, timePerType, nextAdpillarWord]
  )

  useEffect(() => {
    startAdpillarAnimRef.current = startAdpillarAnim
  }, [startAdpillarAnim])

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialAdpillarTimeout.current = setTimeout(
        () => startAdpillarAnim(adpillarWordIdx.current),
        300
      )
    }

    const adpillarIntvalCurrent = adpillarIntval.current

    return () => {
      clearInterval(adpillarIntvalCurrent)
      clearTimeout(initialAdpillarTimeout.current)
      clearTimeout(nextAdpillarTimeout.current)
      clearTimeout(nextAdpillarWordTimeout.current)
    }
  }, [startAdpillarAnim])

  return (
    <span className={textClasses}>
      {currentAdpillarText}
      <span className={`${textClasses} animate-blink`} aria-hidden="true">_</span>
    </span>
  )
}
