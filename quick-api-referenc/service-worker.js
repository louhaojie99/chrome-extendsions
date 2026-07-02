import "./sw-omnibox.js";
import "./sw-tips.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === "tip") {
    chrome.storage.local.get("tip").then(sendResponse);
    return true;
  }
});
