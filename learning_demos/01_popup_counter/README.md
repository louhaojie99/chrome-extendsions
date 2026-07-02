# 01 Popup Counter

## 学习目标

- 认识 `manifest.json`
- 了解 Popup 页面
- 理解 HTML 和 JavaScript 如何关联
- 理解 Popup 的生命周期
- 学习调试 Popup

## 文件关系

```text
manifest.json
    ↓ action.default_popup
popup.html
    ↓ <script src="popup.js">
popup.js
```

- `manifest.json`：告诉 Chrome 插件的名称、版本和 Popup 入口。
- `popup.html`：负责显示计数器界面。
- `popup.js`：负责监听按钮点击和修改计数。

## 代码执行过程

1. 用户点击插件图标。
2. Chrome 根据 `action.default_popup` 打开 `popup.html`。
3. `popup.html` 通过 `<script src="popup.js"></script>` 加载 `popup.js`。
4. `popup.js` 找到计数文字和按钮。
5. 用户点击按钮后，JavaScript 修改计数。
6. JavaScript 把新的计数显示到页面中。

## 实验结果

- 连续点击三次后，计数变成 `3`。
- 点击重置按钮后，计数变成 `0`。
- 关闭 Popup 再打开后，计数恢复为 `0`。

## 我的理解

### 为什么关闭 Popup 后计数会恢复为 0？

因为 Popup 关闭时，Chrome 会销毁 Popup 页面和页面中的 JavaScript 变量。再次打开时会重新加载 `popup.html`，重新执行 `popup.js`，所以 `count` 又变成了 `0`。

### manifest.json、popup.html 和 popup.js 是什么关系？

`manifest.json` 是插件的配置文件。Chrome 通过 `action.default_popup` 找到并打开 `popup.html`。

`popup.html` 是插件的弹窗页面，它通过 `<script src="popup.js"></script>` 加载 `popup.js`。

`popup.js` 负责监听页面操作和修改页面内容。

## 调试 Popup

`popup.js` 运行在 Popup 页面中，因此它的日志需要在 Popup 自己的开发者工具中查看。

打开方式：

1. 点击扩展图标，打开 Popup。
2. 在 Popup 中点击鼠标右键。
3. 选择“检查”。
4. 在 Console 中查看日志和错误。

普通网页和 Popup 是两个不同的运行环境：

```text
普通网页的 JavaScript
    ↓
普通网页的开发者工具

popup.js
    ↓
Popup 的开发者工具
```

## 本课总结

- Chrome 首先读取 `manifest.json`。
- `action.default_popup` 指定要打开的 Popup 页面。
- `popup.html` 通过 `<script>` 加载 `popup.js`。
- JavaScript 通过元素的 `id` 找到并操作 HTML。
- Popup 关闭后，页面和 JavaScript 变量会被销毁。
- `popup.js` 的日志需要在 Popup 的开发者工具中查看。
```
