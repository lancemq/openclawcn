---
title: memory plugin slot 和 Markdown source of truth 怎么配合
description: 基于最新官方 Memory、CLI memory 与 Plugins 文档，解释为什么 OpenClaw 记忆的 source of truth 仍然是 Markdown 文件，以及 plugins.slots.memory 该怎么理解和切换。
category: 功能
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/concepts/memory
sourceName: OpenClaw Docs
sourceType: official
tags: [memory, plugins, lancedb, memory-core, markdown]
---

# memory plugin slot 和 Markdown source of truth 怎么配合

最近官方 Memory 和 Plugins 文档里，有一条很值得中文站单独展开的边界：

- 记忆的 source of truth 仍然是 Markdown
- 记忆搜索和自动召回则由 active memory plugin 提供

这条边界如果不分清，后面很容易把：

- 记忆文件
- 语义索引
- auto recall

混成同一件事。

## 先记住两层分工

更稳的理解方式是：

- Markdown 文件负责事实来源
- memory plugin 负责索引、搜索或增强行为

也就是说，OpenClaw 最近并没有把“记忆”变成纯数据库黑盒，而是继续保留了：

- 文件为准

## 官方现在怎么描述这条边界

根据当前官方 Memory 文档：

- OpenClaw memory is plain Markdown in the agent workspace
- the files are the source of truth

同时 CLI memory 文档又明确写到：

- `openclaw memory` 由 active memory plugin 提供

这两句话放在一起看，边界就很清楚了：

- 文件决定记住什么
- 插件决定怎么搜、怎么索引、怎么增强

## `plugins.slots.memory` 到底在做什么

官方配置文档当前明确写到：

- `plugins.slots.memory` 用来选择 active memory plugin id
- 也可以设为 `"none"`

这说明它不是“是否启用记忆”的唯一总开关，而更像：

- 当前把哪种记忆插件挂到记忆槽位

## 当前官方可见的几种典型形态

根据当前 Plugins 文档，至少已经有这几类形态：

- `memory-core`
- `memory-lancedb`
- `"none"`

更容易理解成：

### `memory-core`

更偏：

- 基础 memory search
- 默认、内建、保守路径

### `memory-lancedb`

更偏：

- 更强的长期记忆插件
- auto-recall / auto-capture

### `"none"`

表示：

- 禁用 memory plugins

但不等于磁盘上的 Markdown 记忆文件突然不存在。

## 为什么 `"none"` 不等于“没有记忆”

这点特别值得中文用户注意。

如果你把 `plugins.slots.memory = "none"`，更准确的影响通常是：

- 没有 active memory plugin 提供搜索或增强

而不是：

- 工作区里的 `MEMORY.md` 和 `memory/*.md` 被删除

所以它更像：

- 关闭这层插件能力

而不是：

- 把长期事实来源一并抹掉

## 为什么官方会继续保留 Markdown source of truth

因为这样做有几个非常现实的好处：

- 可读
- 可审计
- 可手工修订
- 不把长期事实完全锁进插件内部

这也是为什么 OpenClaw 的记忆体系更像：

- 文件系统 + 插件增强

而不是：

- 纯内部数据库

## 什么时候更适合继续用 `memory-core`

- 刚开始接触记忆能力
- 先想把 daily log / MEMORY.md 的边界理顺
- 还不想引入太多自动召回复杂度

## 什么时候值得研究 `memory-lancedb`

- 已经进入长期运行
- 需要更强的语义召回
- 准备把记忆从“能搜”继续推进到“更主动地帮助上下文”

## 最容易踩的坑

### 1. 把 memory plugin 当成记忆事实本身

事实来源仍然应该先回到 Markdown 文件。

### 2. 打开更强插件前，没有先理顺 daily log 和 `MEMORY.md`

这样只会放大混乱。

### 3. 看到 `"none"` 就以为所有记忆都没了

它更准确地影响的是 active memory plugin，而不是磁盘事实层。

## 一条更稳的使用顺序

1. 先理顺 `MEMORY.md` 和 daily log
2. 先用默认 memory slot 跑顺
3. 再根据长期需求考虑更强 memory plugin
4. 真要关闭插件时，也先确认你是在关搜索层，不是在删事实层

## 下一步推荐

- [记忆文件怎么分层加载](/docs/manual/memory-files-and-loading-boundaries)
- [记忆搜索与索引](/docs/manual/memory-search-and-indexing)
- [群组、私聊与长期记忆的边界怎么守](/best-practices/group-memory-boundaries)

