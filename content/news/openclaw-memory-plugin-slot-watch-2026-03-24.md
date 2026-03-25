---
title: "OpenClaw 记忆观察：Markdown 仍然是 source of truth，memory plugin slot 正在把索引层做成可切换能力"
description: "基于 2026 年 3 月 24 日可见的官方 Memory、CLI memory 与 Plugins 文档，最近最值得关注的变化之一是记忆体系的文件事实层和插件增强层正在被官方主动拆清。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/concepts/memory"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["memory", "plugins", "lancedb", "markdown", "search"]
---

最近这轮官方 Memory 和 Plugins 文档里，一个很值得中文站单独强调的信号是：

- 记忆文件和记忆插件，正在被官方主动拆成两层

## 1. Markdown 仍然是记忆事实来源

根据当前官方 Memory 文档：

- the files are the source of truth

这意味着 OpenClaw 最近并没有把长期记忆完全收进黑盒插件，而是继续把：

- `MEMORY.md`
- `memory/YYYY-MM-DD.md`

保留成事实来源。

## 2. memory plugin slot 正在把增强层做成可切换能力

与此同时，官方又把：

- `plugins.slots.memory`

继续写得更清楚，说明当前记忆增强层已经开始走向：

- 可切换
- 可禁用
- 可替换

## 3. `memory-core`、`memory-lancedb` 和 `"none"` 现在更像三种治理选择

这让中文团队开始可以更清楚地分：

- 基础记忆搜索
- 更强的 auto recall / auto capture
- 暂时关闭插件增强

而不是把“有没有记忆”混成一件事。

## 这对中文团队意味着什么

如果你现在还把记忆理解成：

- 要么有
- 要么没有

那可能已经跟不上最近官方的表达方式。  
更准确的理解会变成：

- 文件事实层始终存在
- 插件增强层决定搜索和自动召回的强度

## 推荐延伸阅读

- [memory plugin slot 和 Markdown source of truth 怎么配合](/docs/manual/memory-plugin-slots-and-source-of-truth)
- [记忆文件怎么分层加载](/docs/manual/memory-files-and-loading-boundaries)
- [记忆搜索与索引](/docs/manual/memory-search-and-indexing)

