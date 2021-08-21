let defaultWord = "word";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({word: defaultWord}, function() {
        console.log('Default word set');
    });
});