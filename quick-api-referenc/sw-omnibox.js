console.log("sw-omnibox.js");

// throw new Error("sw-omnibox.js is not implemented yet");

// 保存默认的API建议
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({
      apiSuggestions: ["tabs", "storage", "scripting"],
    });
  }
});

const URL_CHROME_EXTENSIONS_DOC =
  "https://developer.chrome.com/docs/extensions/reference/";
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

// 用户开始输入后显示建议
chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  await chrome.omnibox.setDefaultSuggestion({
    description: "Enter a Chrome API or choose from past searches",
  });
  const { apiSuggestions } = await chrome.storage.local.get("apiSuggestions");
  const suggestions = apiSuggestions.map((api) => {
    return { content: api, description: `Open chrome.${api} API` };
  });
  suggest(suggestions);
});


// 用户选择建议后，onInputEntered() 将打开相应的 Chrome API 参考文档页面。
chrome.omnibox.onInputEntered.addListener((input) => {
  chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
  // Save the latest keyword
  updateHistory(input);
});

// updateHistory() 函数会接收多功能框输入并将其保存到 storage.local。这样，最近的搜索字词稍后可用作多功能框建议。
async function updateHistory(input) {
  const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
  apiSuggestions.unshift(input);
  apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
  return chrome.storage.local.set({ apiSuggestions });
}