---
title: 索引刷新、embedding cache 和 source of truth 更稳的维护方式
description: 结合最新官方 Memory、memory CLI 和 Session 文档，总结团队里怎样区分 memory files、session transcripts 和检索索引三层对象，避免把“检索层”误当成事实层。
category: 记忆治理
difficulty: 高级
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/concepts/memory
sourceName: OpenClaw Docs
sourceType: official
tags: [memory, indexing, cache, source-of-truth, best-practices]
---

# 索引刷新、embedding cache 和 source of truth 更稳的维护方式

团队在用 OpenClaw 做长期记忆时，最容易混掉的其实不是某个参数，而是三层对象：

- memory files
- session transcripts
- search index

如果这三层不分开，后面最常见的误会就是：

- “搜到了，所以它就是事实”
- “搜不到，所以它一定没写进去”

## 第一原则：memory files 才是 durable facts 层

官方 Memory 文档现在说得非常直接：

- the files are the source of truth

所以更稳的团队心智应该是：

- `MEMORY.md` 和 `memory/**/*.md` 承载 durable facts
- 检索只是帮你找

这能避免把“搜索命中”误当成“事实已被正式记录”。

## 第二原则：session transcripts 更像证据层，不是事实层

哪怕你启用了 session memory search，官方也明确保持了边界：

- session indexing 是 opt-in
- `memory_get` 仍然只读 memory files

这说明 transcripts 更像：

- 过程证据
- 候选线索

而不是：

- 最终长期记忆

## 第三原则：search index 是加速层，不是判断层

无论是 SQLite index、hybrid search，还是 cache，本质都在回答：

- 如何更快、更准地找到可能相关的内容

它们不在回答：

- 哪些内容被组织确认过

所以团队里最好不要把：

- 索引里有

等同于：

- 可以直接当长期事实使用

## 第四原则：刷新节奏要按工作流定，不按焦虑定

很多团队一看到“稍微延迟可见”，第一反应就是把刷新调得更频繁。  
但更稳的做法通常是：

- 先看你到底需要的是近实时，还是稳定性

如果主要用途是：

- 每日回顾
- 资料检索
- 项目记忆召回

那适度 debounce 和 background sync 往往比“每个改动都立刻重嵌入”更稳。

## 第五原则：embedding cache 是成本缓冲，不是正确性保证

cache 最值的地方在于：

- 避免重复嵌入相同 chunk

但它不能替代：

- 正确的 source-of-truth 纪律
- 清楚的索引刷新策略

如果团队已经把事实层和检索层混了，再大的 cache 也只是：

- 更快地放大混乱

## 第六原则：索引问题先用 CLI 判断，不要先怪 UI

更稳的排查顺序通常是：

1. `openclaw memory status --deep`
2. 必要时 `openclaw memory index --force`
3. 再看具体 query 的召回表现

这样更容易区分：

- provider / embeddings 问题
- index dirty / refresh 问题
- UI 展示或调用路径问题

## 推荐延伸阅读

- [session memory search 什么时候值得开，什么时候先别开](/docs/manual/session-memory-search-and-index-refresh)
- [记忆检索里的 hybrid search、重排和时间衰减到底在做什么](/docs/reference/memory-hybrid-search-and-ranking-pipeline)
- [memory plugin slot 和 Markdown source of truth 怎么配合](/docs/manual/memory-plugin-slots-and-source-of-truth)
