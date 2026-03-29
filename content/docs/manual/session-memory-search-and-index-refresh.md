---
title: session memory search 什么时候值得开，什么时候先别开
description: 基于最新官方 Memory 与 memory CLI 文档，整理 OpenClaw 的 session memory search、异步索引刷新、delta threshold 和 embedding cache 各自适合什么场景，帮助团队判断什么时候该扩到会话日志检索。
category: 使用说明
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/cli/memory
sourceName: OpenClaw Docs
sourceType: official
tags: [memory, sessions, indexing, cache, manual]
---

# session memory search 什么时候值得开，什么时候先别开

OpenClaw 最近的 `Memory` 和 `memory CLI` 文档，已经把一个很容易被误会的问题讲得更清楚了：

- session memory search 是实验能力

它不是默认全开的长期事实层，而更像：

- 对 session transcripts 的可选检索扩展

## 先记住默认边界

官方当前写得很直接：

- session indexing is opt-in
- results still include snippets only
- `memory_get` remains limited to memory files

这说明即便开了 session memory search，它也不是把 session JSONL 变成新的 source of truth。

真正的 source of truth 仍然更接近：

- `MEMORY.md`
- `memory/**/*.md`

## session memory search 真正适合什么

更适合的通常是：

- 会话很多、跨度长
- 你知道有些重要信息暂时还没沉淀进 memory files
- 想先把历史对话当“可检索线索层”

它最值的地方在于：

- 帮你在过渡期补回一部分会话可见性

## 什么时候先别开

如果你现在还处在下面这些阶段，通常不急着开：

- 连基础 memory file 体系都还没稳定
- 记忆写入纪律很弱
- embeddings 认证本身还不稳定
- agent workspace 和 disk trust boundary 还没梳理

因为这时更容易得到的不是“更完整检索”，而是：

- 更大的索引面
- 更高的噪音
- 更难解释的命中结果

## 异步索引刷新为什么值得单独看

官方现在明确写了：

- session updates are debounced
- indexed asynchronously
- `memory_search` never blocks on indexing

这说明 session memory search 的现实语义不是：

- 一写入就立刻绝对可搜

而是：

- 背景刷新，允许短暂陈旧

所以你如果刚说完一句话立刻搜不到，不一定是坏了，可能只是：

- refresh 还没跑完

## delta thresholds 在控制什么

官方文档给了默认阈值：

- `deltaBytes`
- `deltaMessages`

这两组值不是“越小越好”，而是在平衡：

- 刷新频率
- embedding 成本
- 索引抖动

如果阈值太小，系统会更频繁地感知变化；如果太大，又会让新内容更久才进入检索面。

## embedding cache 为什么是这一层的关键缓冲

官方现在也把 cache 单独配置出来了：

- `memorySearch.cache.enabled`
- `memorySearch.cache.maxEntries`

它最实际的意义是：

- 反复刷新时，不必每次都重做相同 chunk 的 embedding

这对 session memory search 特别重要，因为 transcript 变动频繁，但很多旧片段其实没变。

## 更稳的启用顺序

长期环境里，更推荐按下面顺序推进：

1. 先把 memory files 跑稳
2. 再把 `memory status --deep` 和 `memory index --force` 跑顺
3. 再确认 embedding provider 与 cache 正常
4. 最后才考虑 session memory search

这样更不容易把“基础索引问题”误判成“实验能力问题”。

## 推荐延伸阅读

- [记忆检索里的 hybrid search、重排和时间衰减到底在做什么](/docs/reference/memory-hybrid-search-and-ranking-pipeline)
- [memory plugin slot 和 Markdown source of truth 怎么配合](/docs/manual/memory-plugin-slots-and-source-of-truth)
- [索引刷新、embedding cache 和 source of truth 更稳的维护方式](/best-practices/memory-index-refresh-and-trust-boundary)
