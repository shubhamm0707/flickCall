// sending to backend (host data)
let duration = 0;

let stateOfUser = "user";
let groupID = ".,.";

// using this to play at joiner side and updating every second and changing if diff of host and currTimer is more or less than 10 seconds
let currTimer = 0;

// to check if host id is available or not
let isHostIDAvailable = false;


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   if (message && message.type === "startParty") {
    var element = document.createElement("div");
    element.innerHTML = message.element;
    element.style.cssText = "width: 260px; position: fixed; right: 0px; bottom: 0px; top: 0px; box-shadow: rgba(0, 0, 0, 0.6) -5px 0px 10px; background: #191919; color: #f8f9fa; z-index: 1000000; text-align: left; font-size: 14px;";
    document.getElementById("content").appendChild(element);
    document.getElementById("ytVideo").style.display = "none";

    // In it, we are implementing all the features after the integration of extension on youtube page.
    onYouTubeIframeAPIReady();
  }

  if (message && message.type === "getTimer") {
    console.log(message.data);
    ApplyTimer(message.data.timer, message.data.url, message.data.isPlay);
  }
});




function SendReceiveTimerData() {
  currTimer++;
  if (stateOfUser === "user") return;
  let player = document.getElementsByClassName("video-stream");
  console.log(player.pause)
  if (player && player[0] !== undefined) {
    duration = player[0].currentTime;
    chrome.runtime.sendMessage({
      type: "timer",
      duration: duration,
      stateOfUser: stateOfUser,
      url: window.location.href,
      groupID: groupID,
      isPlay: !player[0].paused
    });
  }
}

// Sending information to backend every second
setInterval(SendReceiveTimerData, 1000);






function ApplyTimer(duration, url, isPlay) {

  if (!url.includes(window.location.href)) {
    document.getElementById("groupHostId").innerText = "Please open the same video of youtube as host or link given below";
    document.getElementById("ytVideo").href = url;
    document.getElementById("ytVideo").style.display = "block";
    return;
  }

  if (stateOfUser === "joiner") {
    let player = document.getElementsByClassName("video-stream");
    console.log('isPlay', isPlay);
    if (!isPlay) {
      player[0].pause();
    } else {
      player[0].play();
        }
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
    document.getElementById("playBtn").addEventListener("click", function () {
      document.getElementsByClassName("video-stream")[0].play();
    });

    document.getElementById("pauseBtn").addEventListener("click", function () {
      document.getElementsByClassName("video-stream")[0].pause();
    });

    document.getElementById("hostBtn").addEventListener("click", function () {
      groupID = generateRandomString(10);
      document.getElementById("groupHostId").innerHTML = 'Group ID: ' + groupID;
      console.log(generateRandomString(10));
      document.getElementById("hostBtn").disabled = true;
      document.getElementById("joinPartyBtn").disabled = true;
      document.getElementById("hostBtn").style.backgroundColor = "gray";
      document.getElementById("joinPartyBtn").style.display = "none";
      stateOfUser = "host";

    });

    document.getElementById("joinPartyBtn").addEventListener("click", function () {
      groupID = document.getElementById("groupID").value;
      stateOfUser = "joiner";
      document.getElementById("hostBtn").style.display = "none";
    });

  }






  // generating a groupID

  function generateRandomString(length) {
    isHostIDAvailable = true;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }