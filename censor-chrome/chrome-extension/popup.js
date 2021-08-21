//This script starts running once popup.html is rendered 

document.getElementById("censorWordButton").addEventListener("click", validateForm);

async function validateForm() {
    /* Why async function? 
    Recall that with a synchronous event listener in JS, while each operation is being processed, nothing else can happen — rendering is paused. 
    This is because JavaScript is single threaded so only one thing can happen at a time and everything else is blocked until an operation completes.
    I.e. A regular click event wouldn't be registered if some other code was being executed

    Because we set this event listener function as an async function, the next line can use await.
    This next line will "await" for the [tab] variable to be set to the current and active tab.

    Once [tab] is set, we use chrome's scripting API to "inject" censorWord() into the current tab.
    We get the current tab by setting [tab]'s id to the global tabId variable. */
    
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let wordToCensor = document.getElementById("wordToCensor").value;
    
    if (wordToCensor == "") {
        alert("Enter a word!")
        return false;
    } else {
        chrome.storage.sync.set({key: wordToCensor}, function() {
            console.log("The word " + "\"" + wordToCensor + "\"" + " will be censored.");
        });
    }

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: censorWord,
    });
}


// The body of this function will be executed as a content script inside the current page.
function censorWord() {
    chrome.storage.sync.get(['key'], function(result) {
        let tmp = result.key;

        /* Gather every element on the page that could contain text into a NodeList. 
        This NodeList is similar to an array in that you can index it (starting index = 0) and you can call methods like length() on it.
        I use the spread operator to convert this NodeList into an Array so that I can use forEach().
        Why getElementsByTagName() over querySelectorAll()? 
        getElementByTagName returns a live NodeList which means that a change in the DOM automatically updates the collection. */
        var elements = [...document.body.getElementsByTagName('*')];
        
        /* Why 2 forEach loops?
        It's important to note that the NodeList doesn't contain the inner HTML of the specified tags.
        For example, suppose we choose tag="li" - this returns a NodeList with all li elements, almost like pointers to those li elements, but not the actual text/whitespace of each list element.
        As such, the first loop goes through each element "type" while the second loop loops through all the text/whitespace nodes of each element type. */
        elements.forEach(element =>{
            element.childNodes.forEach(child =>{
                if(child.nodeType === 3){ // 3 is returned for text nodes
                    // I chose to use nodeValue since innerHTML parses content as HTML which takes longer compared to nodeValue's use of straight text (does not parse HTML)
                    child.nodeValue = child.nodeValue.replace(tmp, "CENSORED");
                }
            });
        });

        alert("The word " + "\"" + tmp + "\"" + " will be censored.");
    
    });
}