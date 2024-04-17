
let duration = 0;
let stateOfUser = "user";
let currentURL = "";
let groupID = "";
let currTimer = 0;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message && message.isPlaying !== undefined) {
    if (message.groupID) {
      groupID = message.groupID;
    }
    stateOfUser = message.stateOfUser;
      // Do something with the received boolean value
      var youtubePlayer = document.getElementsByClassName('video-stream')[0];
      if (youtubePlayer) {
          message.isPlaying ? youtubePlayer.play() : youtubePlayer.pause();
      }
  }
  console.log("-------->", message);
  
  if (message && message.type === 'getTimer') {
    ApplyTimer(message.data.timer, message.data.url);
  }
});


function SendReceiveTimerData () {
  currTimer ++;
  if (stateOfUser === "user") return;
  let player = document.getElementsByClassName('video-stream');
  if(player && player[0] !== undefined){
    duration = player[0].currentTime;
    chrome.runtime.sendMessage({type: "timer", duration: duration , stateOfUser : stateOfUser, url : window.location.href, groupID: groupID}); 
  }
}

setInterval(SendReceiveTimerData, 1000)



function ApplyTimer(duration, url) {
  if (stateOfUser === "joiner") {
    let player = document.getElementsByClassName('video-stream');
    if ((duration - currTimer) > 10 || (duration - currTimer) < -10) {
        console.log("current Timer update-----");
        currTimer = duration;
        if(player && player[0] !== undefined){
          player[0].currentTime = currTimer;
        }
    }
  }
}

