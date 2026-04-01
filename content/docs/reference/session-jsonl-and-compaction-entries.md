---
title: session JSONL、compaction entry 和 branch summary 应该怎么理解
description: 基于最新官方 Session Management Deep Dive 文档，解释 OpenClaw 的 session JSONL 结构、compaction entry、branch summary 和 store counters 分别在回答什么问题，避免把 transcript 文件当成一团无结构日志。
category: 参考
updatedAt: 2026-04-01
source: https://docs.openclaw.ai/reference/session-management-compaction
sourceName: OpenClaw Docs
sourceType: official
tags: [session, transcript, jsonl, compaction, reference]
---

# session JSONL、compaction entry 和 branch summary 应该怎么理解

官方最近把 Session Management Deep Dive 单独写成了一篇参考文档，这很值，因为它把 OpenClaw 的 transcript 从“磁盘上一串 JSONL”讲成了真正有结构的会话事实层。

如果压成一句最有用的话，就是：

- `sessions.json` 管会话索引
- `*.jsonl` 管会话事实

而 JSONL 里又不是只有 message。

## JSONL 第一行在写什么

根据当前官方文档，每个 session transcript 都是 JSONL 文件，但第一行不是普通消息，而是：

- session header

它至少会带：

- `type: "session"`
- `id`
- `cwd`
- `timestamp`
- 可选的 `parentSession`

这意味着 transcript 一开始就不是“消息数组”，而是：

- 先有会话壳
- 再有后续事件树

## 后续 entry 为什么更像树，不像线性聊天

官方现在明确写到，后续 entry 会带：

- `id`
- `parentId`

这意味着 transcript 更适合被理解成：

- 有分支关系的会话树

而不是简单的一条平铺时间线。

这点对理解：

- branch summary
- partial output
- 不同路径上的 compaction

特别关键。

## `message` 和 `custom_message` 的区别是什么

当前官方文档把这两个 entry 类型分得很清楚：

### `message`

普通 user / assistant / toolResult 消息。

### `custom_message`

扩展注入的消息，而且：

- 会进入模型上下文

这意味着它不是“只给 UI 看”的装饰项，而是：

- 真正参与后续会话构建的一类 entry

## `custom` 又为什么要单独存在

官方同时保留了：

- `custom`

但这类 entry 的定位不同：

- 扩展状态
- 不进入模型上下文

这条边界很值，因为它让扩展既能把状态写进 transcript 体系，又不会自动污染模型上下文。

## `compaction` entry 真正代表什么

当前文档把 compaction 写得更细了：

- compaction summary 会持久化进 session JSONL
- entry 里会记录 `firstKeptEntryId` 和 `tokensBefore`

这意味着 compaction 不只是“当场压缩一下上下文”，而是：

- 对这个会话历史做了一次持久化摘要操作

后面系统继续工作时，不是重新去猜“以前压过没有”，而是能直接在 transcript 里看到这条历史事实。

## `branch_summary` 又解决什么问题

`branch_summary` 是另一类容易被忽略的 entry。

它更像：

- 在树状导航或分支切换时写下来的持久化摘要

所以它和 compaction 虽然都像“总结”，但职责不同：

- compaction：为了上下文容量治理
- branch summary：为了分支路径理解与保留

## store counters 为什么不该拿 transcript 补算

官方现在明确提醒：

- `inputTokens`、`outputTokens`、`totalTokens`、`contextTokens` 等计数应来自 store
- UI 不应自己解析 JSONL 去修 totals

这意味着 transcript 是事实层，但：

- 计数展示仍然应以 gateway store 字段为准

不要把“文件里理论能推出来”当成“UI 应该自己算”。

## 中文环境里最容易踩的坑

### 1. 把 JSONL 当成原始日志垃圾堆

它其实已经有明确 entry 类型和结构分工。

### 2. 看到 summary 就以为所有摘要都是同一种东西

`compaction` 和 `branch_summary` 的用途并不一样。

### 3. 用 transcript 手工补 token totals

当前官方更明确推荐直接信任 gateway store counters。

## 一条更稳的理解顺序

建议按这个顺序看：

1. 先看 `sessions.json` 里的索引关系
2. 再看 JSONL header 和 entry 类型
3. 再判断 compaction / branch summary 在这次会话里扮演什么角色

## 下一步推荐

- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [对话记录清理（provider fixups）到底改了什么，不改什么](/docs/reference/transcript-hygiene-and-provider-fixups)
- [Compaction 前的 memory flush 在保护什么](/docs/operations/pre-compaction-memory-flush)
