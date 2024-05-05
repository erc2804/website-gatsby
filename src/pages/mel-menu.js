import React, { useState, useEffect } from "react"

const InstructionOverlay = () => {
  const [showInstructionOverlay, setShowInstructionOverlay] = useState(false)
  const [instructionRead, setInstructionRead] = useState(false)
  const [helpBlockVisible, setHelpBlockVisible] = useState(false)

  const getTutorialSeenFromLocalStorage = () => {
    return localStorage.getItem("tutorialSeen")
  }

  const setTutorialSeenInLocalStorage = () => {
    if (!getTutorialSeenFromLocalStorage()) {
      localStorage.setItem("tutorialSeen", true)
    }
  }

  const closeInstructionIfRead = (event) => {
    event.stopPropagation()
    if (instructionRead) {
      setShowInstructionOverlay(false)
      setTutorialSeenInLocalStorage()
      if (!helpBlockVisible) {
        setHelpBlockVisible(true)
      }
    }
  }

  const showInstruction = (event) => {
    event.stopPropagation()
    setShowInstructionOverlay(true)
    setInstructionRead(false)
    setTimeout(() => {
      setInstructionRead(true)
    }, 2500)
  }

  useEffect(() => {
    if (getTutorialSeenFromLocalStorage()) {
      setHelpBlockVisible(true)
    } else {
      showInstruction()
    }
  }, [])

  return (
    <>
      <img
        src="/melContent/img/world_pipe.png"
        alt="pipe"
        className="absolute top-[-5%] right-4 h-[10%] transform rotate-180 z-[3]"
      />
      <button
        onClick={showInstruction}
        className={`absolute right-4 h-[10%] cursor-pointer z-[2] transition-all duration-1000 ${
          helpBlockVisible ? "top-[4%]" : "top-[-10%]"
        }`}
      >
        <img
          src="/melContent/img/world_help.png"
          alt="instruction overlay button block"
          className="size-full"
        />
      </button>
      {/* --- instruction overlay --- */}
      <div
        onClick={closeInstructionIfRead}
        className={`absolute inset-0 flex flex-col justify-center items-center size-full bg-black/80 text-typo-min-lvl z-50 ${
          showInstructionOverlay ? "" : "hidden"
        }`}
      >
        <span>TAP ANYWHERE TO JUMP</span>
        <span>JUMP TOWARDS A BLOCK TO GO TO THE PAGE ON THE CLOUD ABOVE</span>
        <span
          className={`absolute right-4 bottom-4 ${
            instructionRead ? "" : "hidden"
          }`}
        >
          CLICK ANYWHERE TO CLOSE THE TUTORIAL
        </span>
      </div>
    </>
  )
}

const Cloud = ({
  cloudImgSrc,
  id,
  altPrefix,
  mainCloudClasses,
  sideCloudClasses,
}) => (
  <>
    <img
      src={cloudImgSrc}
      alt={`${altPrefix} cloud`}
      id={`cloud_${id}`}
      className={`absolute portrait:w-2/5 landscape:w-1/5 z-[4] ${mainCloudClasses}`}
    />
    <img
      src="/melContent/img/world_cloud.png"
      alt=""
      id={`cloud_bottom_${id}`}
      className={`absolute portrait:w-[10%] landscape:w-[5%] z-[3] ${sideCloudClasses}`}
    />
  </>
)

const Clouds = () => (
  <>
    {/* --- portfolio cloud --- */}
    <Cloud
      cloudImgSrc="/melContent/img/world_clouds_portfolio.png"
      id={1}
      altPrefix="portfolio"
      mainCloudClasses="portrait:left-[8%] landscape:left-[17%] bottom-[80%]"
      sideCloudClasses="left-1/4 bottom-[65%]"
    />
    {/* --- socialmedia cloud --- */}
    <Cloud
      cloudImgSrc="/melContent/img/world_clouds_socialmedia.png"
      id={2}
      altPrefix="socialmedia"
      mainCloudClasses="portrait:left-[33%] landscape:left-[42%] portrait:bottom-[55%] landscape:bottom-[63%]"
      sideCloudClasses="left-1/2 portrait:bottom-[45%] landscape:bottom-[48%]"
    />
    {/* --- aboutme cloud --- */}
    <Cloud
      cloudImgSrc="/melContent/img/world_clouds_aboutme.png"
      id={3}
      altPrefix="about me"
      mainCloudClasses="portrait:left-[58%] landscape:left-[66%] bottom-3/4"
      sideCloudClasses="left-3/4 bottom-[60%]"
    />
  </>
)

const Block = ({
  id,
  altPrefix,
  questionBlockClasses,
  inactiveBlockClasses,
  coinClasses,
  blockSize,
  blockBottom,
}) => (
  <>
    <img
      src="/melContent/img/world_question_block.png"
      alt={`${altPrefix} question block`}
      id={`block_${id}`}
      style={{
        width: `${blockSize}px`,
        height: `${blockSize}px`,
        bottom: `${blockBottom}px`,
      }}
      className={`absolute bottom-[35%] size-[75px] z-[1] ${questionBlockClasses}`}
    />
    <img
      src="/melContent/img/world_inactive_block.png"
      alt={`${altPrefix} inactive block`}
      id={`block_${id}_inactive`}
      style={{
        width: `${blockSize}px`,
        height: `${blockSize}px`,
        bottom: `${blockBottom}px`,
      }}
      className={`absolute bottom-[35%] size-[75px] z-[1] ${inactiveBlockClasses}`}
    />
    <img
      src="/melContent/img/world_coin.png"
      alt={`${altPrefix} coin`}
      id={`coin_${id}`}
      style={{
        width: `${blockSize}px`,
        height: `${blockSize}px`,
        bottom: `${blockBottom}px`,
      }}
      className={`absolute z-[3] ${coinClasses}`}
    />
  </>
)

const Blocks = ({ blockSize, blockBottom }) => (
  <>
    {/* --- portfolio block --- */}
    <Block
      id={1}
      altPrefix="portfolio"
      questionBlockClasses="left-1/4"
      inactiveBlockClasses={`left-1/4 ${true ? "hidden" : ""}`}
      coinClasses={`left-1/4 ${true ? "hidden" : ""}`}
      blockSize={blockSize}
      blockBottom={blockBottom}
    />
    {/* --- socialmedia block --- */}
    <Block
      id={2}
      altPrefix="socialmedia"
      questionBlockClasses="left-1/2"
      inactiveBlockClasses={`left-1/2 ${true ? "hidden" : ""}`}
      coinClasses={`left-1/2 ${true ? "hidden" : ""}`}
      blockSize={blockSize}
      blockBottom={blockBottom}
    />
    {/* --- aboutme block --- */}
    <Block
      id={3}
      altPrefix="about me"
      questionBlockClasses="left-3/4"
      inactiveBlockClasses={`left-3/4 ${true ? "hidden" : ""}`}
      coinClasses={`left-3/4 ${true ? "hidden" : ""}`}
      blockSize={blockSize}
      blockBottom={blockBottom}
    />
  </>
)

const GroundElement = ({ imgSrc, alt, classes, melSize }) => (
  <img
    src={imgSrc}
    alt={alt}
    style={{ height: `${melSize}px` }}
    className={`absolute bottom-[10%] z-[1] ${classes}`}
  />
)

const MelMenu = () => {
  const [melSize, setMelSize] = useState(0)
  const [blockSize, setBlockSize] = useState(0)
  const [blockBottom, setBlockBottom] = useState(0)

  const resize = () => {
    const relSize = isPortrait() ? window.innerWidth : window.innerHeight
    const melSize = relSize * 0.15
    setBlockSize(relSize * 0.075)
    setBlockBottom(
      melSize +
        (isPortrait() ? window.innerHeight * 0.75 : window.innerWidth * 0.5) * 0.24
    )
    setMelSize(melSize)
  }

  const isPortrait = () => window.matchMedia("(orientation: portrait)").matches

  // function moveMel() {
  //   // --- mel moves rightwards
  //   $("#super-mel").animate(
  //     { left: 102 + "%" },
  //     { duration: 5000, easing: "linear", queue: false, done: reposMel }
  //   )
  // }
  // function reposMel() {
  //   $("#super-mel").css("left", -10 + "%")
  //   moveMel()
  // }

  const jumpMel = () => {
    window.alert("Jumping Mel!")
  }

  useEffect(() => {
    resize()

    window.addEventListener("resize", resize)

    return () => window.removeEventListener("resize", resize)
  })

  return (
    <div
      className="w-dvw h-dvh bg-[#6b88fe] overflow-hidden relative"
      onClick={jumpMel}
    >
      <InstructionOverlay />
      <Clouds />
      <Blocks blockSize={blockSize} blockBottom={blockBottom} />
      <img
        src="/melContent/img/mel_moving.gif"
        alt="moving character mel"
        style={{ height: `${melSize}px`, width: `${melSize * 0.6}px` }}
        className="absolute left-[-10%] bottom-[10%] w-[62.5px] h-[105.5px] z-[2]"
      />

      {/* --------- landscape elements on the ground --------- */}
      {/* --- bushes --- */}
      <GroundElement
        imgSrc="/melContent/img/world_bushes.png"
        alt="bushes"
        classes="left-[5%]"
        melSize={melSize}
      />
      {/* --- hill --- */}
      <GroundElement
        imgSrc="/melContent/img/world_hill.png"
        alt="hill"
        classes="left-[40%]"
        melSize={melSize}
      />
      {/* --- bush --- */}
      <GroundElement
        imgSrc="/melContent/img/world_bush.png"
        alt="bush"
        classes="left-[80%]"
        melSize={melSize}
      />

      {/* --------- ground --------- */}
      <div className="absolute left-0 bottom-0 w-full h-[10%] bg-[url('/melContent/img/world_block.png')] bg-repeat bg-[size:5%]"></div>
    </div>
  )
}

export default MelMenu
