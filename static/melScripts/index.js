var jumpLocked = false,
  _wndw = 0,
  _blockSize = 0,
  _melSize = 0,
  collIntval = null,
  collidedArr = [
    {
      id: 1,
      name: "portfolio",
      cloudBtm: 80 + "%",
      url: encodeURI("https://www.ercancicek.com/portfolio"),
    },
    {
      id: 2,
      name: "socialmedia",
      cloudBtm: 60 + "%",
      url: "https://www.linkedin.com/in/ercancicek",
    },
    {
      id: 3,
      name: "aboutme",
      cloudBtm: 75 + "%",
      url: "https://www.ercancicek.com/about-me",
    },
  ],
  tutorialSeen = true,
  inTutorial = false

$(init)
function init() {
  $(window).resize(setElements)
  setElements()
  moveMel()
  // -- check if web storage supported
  // if (typeof(Storage) !== "undefined") {
  //   // --- get tutorialSeen variable from storage
  //   tutorialSeen = !!(localStorage.getItem("tutorialSeen"));
  // }
  if (!tutorialSeen) {
    showInstruction()
  } else {
    animateHelpBlock()
  }

  // --- click anywhere to make mel jump
  $("#bg_container").click(function (evt) {
    if (inTutorial) {
      $("#instr_overlay > span:last-child, #instr_overlay").addClass("deepHide")
      inTutorial = false
      jumpLocked = false
      animateHelpBlock()
      // localStorage.setItem("tutorialSeen", true);
      return
    }
    if ($(evt.target).closest("#instr_overlay_btn").length !== 0) {
      showInstruction()
      return
    }
    if (!jumpLocked) {
      jumpLocked = true
      jumpUp()
    }
  })
}

function animateHelpBlock() {
  setTimeout(function () {
    $("#instr_overlay_btn").animate({ top: 4 + "%" }, 1000)
  }, 1000)
}

function showInstruction() {
  jumpLocked = true
  $("#instr_overlay").removeClass("deepHide")
  setTimeout(function () {
    $("#instr_overlay > span:last-child").removeClass("deepHide")
    inTutorial = true
  }, 2500)
}

function jumpUp() {
  // -- after jumping interval checks if divs are overlapping
  collIntval = setInterval(function () {
    collidedArr.forEach(function (collObj, index) {
      var collided = collisionCheck($("#super-mel"), $("#block_" + collObj.id))
      if (collided) {
        $("#block_" + collObj.id + "_inactive").removeClass("deepHide")
        $("#block_" + collObj.id).addClass("deepHide")
        $("#coin_" + collObj.id)
          .removeClass("deepHide")
          .animate(
            { bottom: collObj.cloudBtm },
            {
              duration: 250,
              queue: false,
              done: function () {
                // --- hide coin, wobble cloud and go to respective page
                $("#cloud_" + collObj.id).addClass("wobbleAnim")
                $("#coin_" + collObj.id).addClass("deepHide")
                window.location.href = collObj.url
              },
            }
          )
        clearInterval(collIntval)
      }
    })
  }, 10)
  // --- mel jumps up
  $("#super-mel").animate(
    { bottom: (isPortrait() ? _wndw.h : _wndw.w * 0.5) * 0.25 + "px" },
    { duration: 300, easing: "swing", queue: false, done: jumpDown }
  )
}

function jumpDown() {
  // --- mel falls back down
  $("#super-mel").animate(
    { bottom: 10 + "%" },
    {
      duration: 300,
      easing: "swing",
      queue: false,
      done: function () {
        jumpLocked = false
        clearInterval(collIntval)
      },
    }
  )
}

function moveMel() {
  // --- mel moves rightwards
  $("#super-mel").animate(
    { left: 102 + "%" },
    { duration: 5000, easing: "linear", queue: false, done: reposMel }
  )
}

function reposMel() {
  $("#super-mel").css("left", -10 + "%")
  moveMel()
}

function setElements() {
  var $wCont = $("#bg_container"),
    wndw = { w: $wCont.width(), h: $wCont.height() },
    relSize = isPortrait() ? wndw.w : wndw.h,
    blockSize = relSize * 0.075,
    melSize = relSize * 0.15
  _wndw = wndw
  _blockSize = blockSize
  _melSize = melSize
  // --- set mel size
  $("#super-mel").css({ height: melSize + "px", width: melSize * 0.6 + "px" })
  // --- set block & coin size
  $(".world_block").css({
    width: blockSize + "px",
    height: blockSize + "px",
    bottom: melSize + (isPortrait() ? wndw.h : wndw.w * 0.5) * 0.24 + "px",
  })
  $(".world_coin").css({
    width: blockSize + "px",
    height: blockSize + "px",
    bottom: melSize + (isPortrait() ? wndw.h : wndw.w * 0.5) * 0.25 + "px",
  })
  // -- set landscape elements size
  $("#bushes, #bush, #hill").css("height", melSize + "px")
}

function isPortrait() {
  return window.matchMedia("(orientation: portrait)").matches
}

function collisionCheck($ele1, $ele2) {
  var x1 = $ele1.offset().left,
    y1 = $ele1.offset().top,
    h1 = $ele1.outerHeight(true),
    w1 = $ele1.outerWidth(true),
    b1 = y1 + h1,
    r1 = x1 + w1,
    x2 = $ele2.offset().left,
    y2 = $ele2.offset().top,
    h2 = $ele2.outerHeight(true),
    w2 = $ele2.outerWidth(true),
    b2 = y2 + h2,
    r2 = x2 + w2
  return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
}
