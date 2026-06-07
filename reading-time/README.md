# Reading Time

计算页面中 `<article>` 内容的阅读时间（每分钟 200 词），并在标题下方显示 `⏱️ X min read`。

## 项目结构

```
reading-time/
├── manifest.json          # 扩展配置
├── scripts/content.js     # 内容脚本
├── images/                # 图标（16/32/48/128）
└── test.html              # 本地测试页
```

## 学习要点

### `icons` 配置

不同尺寸对应不同场景：16px 用于工具栏，32px 用于系统通知，48px 用于 `chrome://extensions` 管理页，128px 用于网上应用店。提供多种尺寸可避免图标模糊或拉伸。

### `content_scripts` 配置

> 内容脚本与页面 JS 环境隔离但共享 DOM，适合页面增强、数据提取等场景。

- **`js`**：注入到页面的脚本文件，按数组顺序执行。
- **`matches`**：URL 匹配模式，决定脚本在哪些页面生效，支持通配符如 `https://*.example.com/*`。
- 默认 `run_at` 为 `document_idle`，在 DOM 就绪后执行。


### `content.js` 实现

- 用 `/[^\s]+/g` 统计非空白字符序列作为单词数（`\w` 只匹配拉丁字母，`\S` 覆盖中/日文等）。
- `Math.round(wordCount / 200)` 估算阅读分钟数。
- 通过 `MutationObserver` 监听 DOM 变化，应对 SPA 路由切换时页面不刷新导致脚本不重新注入的问题。

## 运行

1. `chrome://extensions` → 开启「开发者模式」→ 加载 `reading-time/` 目录。
2. 用本地服务器在 `http://127.0.0.1:5500/reading-time/test.html` 打开测试页。
