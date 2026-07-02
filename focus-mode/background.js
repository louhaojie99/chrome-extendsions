// 此方法允许扩展程序在安装时设置初始状态或完成某些任务。扩展程序可以使用 Storage API 和 IndexedDB 来存储应用状态
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

// 跟踪当前标签页的状态
// 用户点击扩展程序操作后，扩展程序会检查网址是否与文档页面匹配。接下来，它会检查当前标签页的状态并设置下一个状态。将以下代码添加到 background.js：
const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // 获取操作徽章以检查扩展是否处于“开启”或“关闭”状态
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // 下一个状态总是相反的
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // 将操作徽章设置为下一个状态
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // 当用户开启扩展时插入CSS文件
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      // 当用户开启扩展时插入CSS文件
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    }
  }
});
