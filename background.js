let duration = 0;
let urlVideo = "";
let BASE_URL = 'http://localhost:8000';
let groupID = "";
let isPlay = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message.stateOfUser);
  if (message.type === 'timer') {
      console.log(message.duration);
      duration = message.duration;
      urlVideo = message.url;
      isPlay = message.isPlay;

      // in case of host, we are sending data
    if (message.stateOfUser === "host") {
        groupID = message.groupID;
        SendVideoMetaData();
    }

    // in case of joiner, we are fetching data
    if (message.stateOfUser === "joiner") 
        groupID = message.groupID;
        ReceiveVideoMetaData();
  }
 });


 function SendVideoMetaData() {
const data = {
    key: duration,
    url: urlVideo,
    groupID: groupID,
    isPlay: isPlay
};

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};

fetch(BASE_URL, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

 }


 function ReceiveVideoMetaData() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      fetch(BASE_URL + "/?" + "groupID="+ groupID)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json(); // Assuming the response is JSON
          })
          .then(data => {
            console.log(data);
            console.log(tabs[0]);
              chrome.tabs.sendMessage(tabs[0].id, { type: 'getTimer', data: data });
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
  });
}

