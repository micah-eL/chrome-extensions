//This script starts running once popup.html is rendered 

// Set newColor variable
var newColor = '#FF0000';

// Initialize buttons 
let changeColorRedButton = document.getElementById("changeColorRedButton");
let changeColorGreenButton = document.getElementById("changeColorGreenButton");
let changeColorBlueButton = document.getElementById("changeColorBlueButton");


// When one of the buttons are clicked, "inject" setPageBackgroundColor() into current page
// Red button
changeColorRedButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    newColor = '#FF0000';
    chrome.storage.sync.set({color: newColor}, function() {
        console.log('Background color updated to red');
    });
  
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// Green button
changeColorGreenButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    newColor = '#00FF00';
    chrome.storage.sync.set({color: newColor}, function() {
        console.log('Background color updated to green');
    });
  
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// Blue button
changeColorBlueButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    newColor = '#0000FF';
    chrome.storage.sync.set({color: newColor}, function() {
        console.log('Background color updated to blue');
    });
  
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});
  
// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.background = color;
    });
}
