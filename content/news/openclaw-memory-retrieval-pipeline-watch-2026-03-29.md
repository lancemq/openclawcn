---
title: "OpenClaw 正在把记忆检索从“向量搜索”写成一条完整流水线"
description: "官方最近围绕 Memory 和 memory CLI 的文档更新，正在把 hybrid search、重排、temporal decay、session indexing 和 embedding cache 逐步写成一条更完整的检索链。"
category: 生态观察
date: "2026-03-29"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/concepts/memory"
updatedAt: "2026-03-29"
sourceType: "official"
tags: ["memory", "retrieval", "hybrid-search", "indexing", "cache"]
---

最近把 OpenClaw 的 `Memory` 和 `memory CLI` 文档放在一起看，会看到一个很清楚的变化：

- 官方不再把记忆检索只写成“向量搜索”

而是在把它拆成一条更完整的 retrieval pipeline。

## 1. hybrid search 已经被明确写进官方模型

Memory 文档现在直接写出：

- BM25 + vector

这说明官方已经把记忆检索理解成：

- 词面命中和语义命中一起工作

而不是只靠 embedding。

## 2. 重排和时间衰减也被单独列出来了

官方最近把这两步也显式写进文档：

- MMR re-ranking
- temporal decay

这意味着系统不只是在“找相关内容”，还在明确控制：

- 结果多样性
- 最近内容的优先级

## 3. session memory search 被放回实验层

另一个很值的信号是，官方没有把 session transcripts 直接升级成新的 source of truth，而是继续强调：

- session indexing is opt-in
- Markdown files are still the source of truth

这让长期记忆体系的边界更清楚了。

## 4. embedding cache 和异步刷新说明检索已经变成正式运维面

当文档开始把：

- cache
- debounce
- background sync
- delta thresholds

都写出来时，说明记忆检索已经不只是功能介绍，而是在进入：

- 长期运行治理面

## 对中文团队最有价值的提醒

如果你现在正在做：

- 知识库式 agent
- 长期项目记忆
- 内容检索或会话回顾

那接下来最值得补的认知，不是只选 embedding provider，而是先把这条 retrieval pipeline 看完整。

## 推荐延伸阅读

- [记忆检索里的 hybrid search、重排和时间衰减到底在做什么](/docs/reference/memory-hybrid-search-and-ranking-pipeline)
- [session memory search 什么时候值得开，什么时候先别开](/docs/manual/session-memory-search-and-index-refresh)
- [索引刷新、embedding cache 和 source of truth 更稳的维护方式](/best-practices/memory-index-refresh-and-trust-boundary)
