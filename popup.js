
// Button to start the party.. present on the extension.
let startParty = document.getElementById('startParty');

// this is the state of user, it can be user, host or joiner based on the role.
let stateOfUser = "user";


// we are integrating our extension code to youtube page
startParty.addEventListener('click', function () {

    fetch(chrome.runtime.getURL('youtube.html')).then(response => response.text()).then(template => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'startParty', element: template});
            window.close();
        });
    });
  });

/* 

1) web socket
2) Account id: uuid
*/


