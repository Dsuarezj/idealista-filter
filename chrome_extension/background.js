chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'SAVE_RED_FLAGS') {
      // Forward the message to the content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
              sendResponse(response);
          });
      });
      return true; // Keep the message channel open for sendResponse
  }
});