---
title: 记忆检索里的 hybrid search、重排和时间衰减到底在做什么
description: 基于最新官方 Memory 文档，解释 OpenClaw 的 memory_search 为什么不只是向量检索，以及 hybrid search、结果合并、MMR 重排和 temporal decay 各自在修正什么问题。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/concepts/memory
sourceName: OpenClaw Docs
sourceType: official
tags: [memory, hybrid-search, ranking, mmr, retrieval, reference]
---

# 记忆检索里的 hybrid search、重排和时间衰减到底在做什么

很多人第一次看到 OpenClaw 的 `memory_search`，会把它理解成：

- 一层向量搜索

但最新官方 `Memory` 文档已经把检索链路写得更细了。  
现在更准确的理解应该是：

- memory_search 是一条检索与后处理流水线

而不是：

- 单次 embedding 相似度查询

## 第一层：为什么官方开始强调 hybrid search

官方现在明确写了：

- Hybrid search (BM25 + vector)

这说明它不再只依赖“语义接近”，还会同时利用：

- 词面命中
- 语义相似

这样做最直接的价值是：

- 对专有名词、命令、文件名、精确关键词更稳
- 对表达方式变化较大的自然语言问题也不至于全丢

## 第二层：结果合并不是简单拼一起

官方文档现在还单独写了：

- How we merge results

这说明 BM25 和 vector 命中的结果，不是随便拼接，而是要做：

- 分数整合
- 顺序重排

它要解决的其实是一个常见矛盾：

- 词面特别准的结果，语义分不一定高
- 语义很近的结果，关键词却不一定显眼

## 第三层：MMR 重排在压什么问题

官方现在明确提到：

- MMR re-ranking (diversity)

MMR 最值的地方不是“更聪明”，而是：

- 防止前几条结果太像

如果没有这一步，长笔记里几个相邻 chunk 很容易一起冲到前面，最后你看到的是：

- 五条差不多的结果

而不是：

- 几个来自不同记忆片段、但都相关的线索

## 第四层：时间衰减为什么要单独存在

官方现在还把：

- Temporal decay (recency boost)

列成独立环节。  
这意味着记忆检索不是只按“相关度”排，还会把：

- 最近写入的内容

适度往前提。

这对长期运行很重要，因为很多工作流里，最近几天的决策和当前状态，往往比半年前更该优先被看到。

## 为什么这套链路比“单纯向量库”更像正式记忆层

如果把官方这几步放在一起看，会发现它在试图同时解决四类问题：

1. 词面命中
2. 语义相似
3. 结果多样性
4. 时间新鲜度

这已经不像“给 Markdown 做个 embedding”那么简单，而更像：

- 正式的检索排序面

## 对中文站读者最有价值的提醒

如果你现在碰到的是：

- 明明写过，但搜不出来
- 搜出来的前几条全都很像
- 新近写的事实总被旧内容压住

那就别只盯着 embedding provider。  
很多时候真正影响体验的，是：

- hybrid 是否启用
- 排序链路是否跑通
- 索引是否新鲜

## 推荐延伸阅读

- [session memory search 什么时候值得开，什么时候先别开](/docs/manual/session-memory-search-and-index-refresh)
- [记忆搜索与索引机制](/docs/manual/memory-search-and-indexing)
- [索引刷新、embedding cache 和 source of truth 更稳的维护方式](/best-practices/memory-index-refresh-and-trust-boundary)
