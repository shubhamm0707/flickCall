let duration = 0;
let urlVideo = "";
let BASE_URL = 'http://localhost:8004';
let groupID = "";


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message.stateOfUser);
  if (message.type === 'timer') {
      console.log(message.duration);
      duration = message.duration;
      urlVideo = message.url;

    if (message.stateOfUser === "host") {
        groupID = message.groupID;
        SendVideoMetaData();
    }
    if (message.stateOfUser === "joiner") 
        ReceiveVideoMetaData();
  }
 });


 function SendVideoMetaData() {
const data = {
    key: duration,
    url: urlVideo,
    groupID: groupID
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
      fetch(BASE_URL)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json(); // Assuming the response is JSON
          })
          .then(data => {
            console.log("calling----");
            console.log(tabs[0].id);
              chrome.tabs.sendMessage(tabs[0].id, { type: 'getTimer', data: data });
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
  });
}

