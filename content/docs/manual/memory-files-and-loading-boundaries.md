---
title: 记忆文件怎么分层加载
description: 基于最新官方 Memory 文档，整理 OpenClaw 的 daily log、MEMORY.md、memory_search 和 memory_get 各自适合存什么，以及为什么群组上下文不该直接读长期记忆。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/concepts/memory
sourceName: OpenClaw Docs
sourceType: official
tags: [memory, markdown, sessions, memory_search, memory_get]
---

# 记忆文件怎么分层加载

站里已经有一页讲记忆系统，但官方最近的 Memory 文档把一个非常实用的边界讲得更清楚了：

- 记忆不是“模型自动记住”
- 而是写在工作区磁盘上的 Markdown

如果只记一句话，更适合记这个：

- 模型只会“记得”被真正写到磁盘、并且在当前场景被加载或检索到的内容

## 记忆的事实来源到底是什么

根据当前官方文档，OpenClaw 的记忆事实来源不是上下文窗口本身，而是工作区里的 Markdown 文件。

这意味着：

- 模型会话不是长期事实来源
- 真正可持续的记忆要写回磁盘

这也是为什么官方把 memory 设计得更像文件系统，而不是聊天历史外挂。

## 默认有哪两层记忆文件

官方当前给出的默认布局很清楚：

- `memory/YYYY-MM-DD.md`
- `MEMORY.md`

更适合这样理解：

### `memory/YYYY-MM-DD.md`

这是 daily log。

特点是：

- 按天分文件
- append-only
- 更像时间线记录

### `MEMORY.md`

这是 curated long-term memory。

特点是：

- 更少、更精炼
- 只保留会反复用到的稳定事实

这两层职责不一样，混在一起很快就会失控。

## 每次 session 启动时到底会加载什么

根据最新官方 Memory 文档，默认会话启动时更偏向读取：

- 今天的 daily log
- 昨天的 daily log

而 `MEMORY.md` 则只在：

- 主私有 session

里加载。

这点非常关键，因为它直接决定了“群里会不会突然说出你以前私下提过的偏好”。

## 为什么 `MEMORY.md` 不该进群组上下文

官方现在明确写了：

- `MEMORY.md` never in group contexts

这条边界非常值，因为它说明长期私有记忆不是默认公共上下文。

对中文站用户来说，这意味着：

- 公共群聊和私聊不是同一记忆面
- 群组上下文不会天然读取你的长期私人记忆

这会显著降低记忆越用越“冒犯”的风险。

## `memory_search` 和 `memory_get` 应该怎么分工

官方当前列出的两条 agent-facing tool 很明确：

- `memory_search`
- `memory_get`

更容易理解的区别是：

### `memory_search`

更适合：

- 语义召回
- 我之前有没有记过类似的事
- 找“意思相近”的历史信息

### `memory_get`

更适合：

- 读某个明确文件
- 读某段明确内容
- 做更确定的 targeted read

所以它们不是重复能力，而是一条“先找、再读”的组合。

## 什么时候该写 daily log，什么时候该写 `MEMORY.md`

更稳的判断通常是：

### 写 daily log

适合：

- 今天刚发生的事
- 当前任务进展
- 临时上下文延续

### 写 `MEMORY.md`

适合：

- 已确认的长期偏好
- 未来反复要用的事实
- 不希望只留在某一天日志里的规则

这条分层如果做对，后面记忆检索会轻松很多。

## 中文站建议怎么用这套边界

更稳的做法通常是：

1. 每天的事先进 daily log
2. 只有确认过的稳定事实再进 `MEMORY.md`
3. 公共群聊尽量不要直接依赖长期私有记忆
4. 先 `memory_search`，再必要时 `memory_get`

这样你会得到一套更像长期工作系统的记忆层，而不是越堆越乱的历史文件夹。

## 下一步推荐

- [OpenClaw 记忆系统怎么工作](/docs/manual/memory-system)
- [记忆搜索与索引机制](/docs/manual/memory-search-and-indexing)
- [频道与 Session 路由怎么决定上下文边界](/docs/manual/channel-routing-and-session-keys)

把这几页串起来看，记忆、检索和会话边界会更容易真正对上。
