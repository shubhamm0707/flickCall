import { io } from "https://cdn.jsdelivr.net/npm/socket.io-client@4.7.1/+esm";


let duration = 0;
let urlVideo = "";
let BASE_URL = 'http://localhost:8000';
let groupID = "";
let isPlay = false;

let isConnected = false;
let wsSocket;




chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'timer' && isConnected) {
      duration = message.duration;
      urlVideo = message.url;
      isPlay = message.isPlay;

      // in case of host, we are sending data
    if (message.stateOfUser === "host") {
        groupID = message.groupID;
        wsSocket.emit ("message", {key: duration, url: urlVideo, groupID: groupID, isPlay: isPlay});
    }
  } else if (message.type === 'hostConnection') { 
    groupID = message.groupID;
    MakeSocketConnectionAsHost();
  } else if (message.type === 'joinConnection') {
        console.log("from joinConnection");
        groupID = message.groupID;
        ReceiveSocketDataAsJoiner();
  }
 });


 function MakeSocketConnectionAsHost() {

    const ws = io(BASE_URL, {
        transports: ["websocket"],
      });
      
      ws.on("error", console.error);
      ws.on("connect", () => {
         isConnected = true;
         wsSocket = ws;
 });

}


function ReceiveSocketDataAsJoiner() {
 if (!isConnected) { 
    const ws = io(BASE_URL, {
        transports: ["websocket"],
      });
      
      ws.on("error", console.error);
      ws.on("connect", () => {
        console.log("connected");
         isConnected = true;
         wsSocket = ws;
 });
    ws.on("message", (data) => {
        console.log(data);
        })
 }
}

//  function SendVideoMetaData() {
// const data = {
//     key: duration,
//     url: urlVideo,
//     groupID: groupID,
//     isPlay: isPlay
// };

// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// };

// fetch(BASE_URL, options)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });

//  }


//  function ReceiveVideoMetaData() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       fetch(BASE_URL + "/?" + "groupID="+ groupID)
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }
//               return response.json(); // Assuming the response is JSON
//           })
//           .then(data => {
//               chrome.tabs.sendMessage(tabs[0].id, { type: 'getTimer', data: data });
//           })
//           .catch(error => {
//               console.error('There was a problem with the fetch operation:', error);
//           });
//   });
// }

