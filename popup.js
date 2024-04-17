
timerText = document.getElementById('timer');
playBtn = document.getElementById('play');
stopBtn = document.getElementById('stop');
joinBtn = document.getElementById('join');
hostBtn = document.getElementById('host');
inputIDBox = document.getElementById('groupID');


let stateOfUser = "user";
let isPlaying = true;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   timerText.innerHTML = message.data;
    console.log(message.data);
  });


  playBtn.addEventListener('click', function () {
    isPlaying = true; // Or false, depending on your requirement

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { isPlaying: isPlaying , stateOfUser: stateOfUser});
    });
  });


  stopBtn.addEventListener('click', function () {
    isPlaying = false; // Or false, depending on your requirement

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { isPlaying: isPlaying , stateOfUser: stateOfUser});
    });
  });


joinBtn.addEventListener('click', function () {
    console.log("clicked");
    stateOfUser = "joiner";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { isPlaying: isPlaying , stateOfUser: stateOfUser});
    });
})






// generate a random unique string of length 10 for groupID
function generateGroupID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let groupID = '';
    for (let i = 0; i < 10; i++) {
        groupID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return groupID;
}

hostBtn.addEventListener('click', function () {
    stateOfUser = "host";
    inputIDBox.value = generateGroupID();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { isPlaying: isPlaying , stateOfUser: stateOfUser, groupID: inputIDBox.value});
    });
})