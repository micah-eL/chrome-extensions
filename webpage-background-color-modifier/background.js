let defaultColor = '#FF0000';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color: defaultColor}, function() {
        console.log('Default background color set');
    });
});
