let duration = 0;
let stateOfUser = "user";
let currentURL = "";
let groupID = "";
let currTimer = 0;


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message && message.isPlaying !== undefined) {
    if (message.groupID) {
      groupID = message.groupID;
    }
    stateOfUser = message.stateOfUser;
    // Do something with the received boolean value
    var youtubePlayer = document.getElementsByClassName("video-stream")[0];
    if (youtubePlayer) {
      message.isPlaying ? youtubePlayer.play() : youtubePlayer.pause();
    }
  } else if (message && message.type === "startParty") {
    var element = document.createElement("div");
    element.innerHTML = message.element;
    element.style.cssText = "width: 260px; position: fixed; right: 0px; bottom: 0px; top: 0px; box-shadow: rgba(0, 0, 0, 0.6) -5px 0px 10px; background: #191919; color: #f8f9fa; z-index: 1000000; text-align: left; font-size: 14px;";
    document.getElementById("content").appendChild(element);
    onYouTubeIframeAPIReady();
  }

  if (message && message.type === "getTimer") {
    ApplyTimer(message.data.timer, message.data.url);
  }
});

function SendReceiveTimerData() {
  currTimer++;
  if (stateOfUser === "user") return;
  let player = document.getElementsByClassName("video-stream");
  if (player && player[0] !== undefined) {
    duration = player[0].currentTime;
    chrome.runtime.sendMessage({
      type: "timer",
      duration: duration,
      stateOfUser: stateOfUser,
      url: window.location.href,
      groupID: groupID,
    });
  }
}

setInterval(SendReceiveTimerData, 1000);

function ApplyTimer(duration, url) {
  if (stateOfUser === "joiner") {
    let player = document.getElementsByClassName("video-stream");
    if (duration - currTimer > 10 || duration - currTimer < -10) {
      console.log("current Timer update-----");
      currTimer = duration;
      if (player && player[0] !== undefined) {
        player[0].currentTime = currTimer;
      }
    }
  }
}


  function onYouTubeIframeAPIReady() {
    document.getElementById("play").addEventListener("click", function () {
      document.getElementsByClassName("video-stream")[0].play();
    });

  }