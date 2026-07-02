# Focus Mode

一个 Chrome 扩展，在 Chrome 官方文档页面上启用专注阅读模式，隐藏导航栏等干扰元素，只保留文章主体内容。

## 文件说明

### `background.js` — Service Worker

扩展的后台逻辑，负责：

1. **安装初始化** — 扩展安装时将工具栏图标徽章设为 `OFF`，表示当前处于关闭状态。
2. **点击切换** — 用户点击扩展图标时，检查当前页面是否为 Chrome 官方文档（`developer.chrome.com/docs/extensions` 或 `developer.chrome.com/docs/webstore`）：
   - 读取当前徽章状态（`ON` / `OFF`），取反后更新。
   - 状态变为 `ON` 时，向当前标签页注入 `focus-mode.css`。
   - 状态变为 `OFF` 时，从当前标签页移除 `focus-mode.css`。

**快捷键**：`Ctrl+B`（Windows）/ `Command+B`（Mac）可直接触发扩展。

### `focus-mode.css` — 专注样式

注入到目标页面的 CSS，实现专注阅读效果：

1. 默认隐藏页面**所有元素** (`display: none !important`)。
2. 仅恢复 `<article>` 及其祖先和后代元素的显示 (`display: revert`)。
3. 隐藏 `[role='navigation']` 导航栏。
4. 将文章区域居中，限制最大宽度为 `700px`。

> 结果：页面上只显示文章正文，去除了侧边栏、导航栏、页脚等干扰内容。

## 加载方式

1. 打开 Chrome，访问 `chrome://extensions`。
2. 开启右上角「开发者模式」。
3. 点击「加载已解压的扩展程序」，选择 `focus-mode` 文件夹。
