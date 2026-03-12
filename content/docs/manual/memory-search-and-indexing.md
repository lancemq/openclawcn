---
title: 记忆搜索与索引机制
description: 基于官方记忆概念和 memory CLI 文档，解释记忆文件、索引来源、provider 选择以及排障时该看什么。
category: 功能
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/concepts/memory
sourceName: OpenClaw Docs
sourceType: official
tags: [memory, search, indexing, embeddings, lancedb]
---

# 记忆搜索与索引机制

很多人理解了 `MEMORY.md` 和每日日志之后，下一步最容易卡住的问题就是：这些内容到底怎么被 OpenClaw 找回来？

官方文档把答案说得很清楚：记忆的事实来源始终是 Markdown 文件，而搜索能力由活跃的记忆插件提供。也就是说，“记忆写在哪里”和“记忆怎么被找出来”是两层机制。

## 事实来源始终是 Markdown

OpenClaw 不会把某个数据库当成唯一真相。默认情况下，真正的记忆内容仍然是这些文件：

- `MEMORY.md`
- `memory/YYYY-MM-DD.md`
- 以及你通过 `memorySearch.extraPaths` 显式加入的额外目录或文件

这意味着索引只是为了加速搜索，不是为了替代原始内容。

更适合的理解方式是：

- 文件系统负责存事实
- 索引系统负责让事实更容易被找回

## 默认会索引哪些内容

官方文档和 CLI 说明都指出，默认索引会覆盖：

- `MEMORY.md`
- `memory/*.md`
- `memorySearch.extraPaths` 中配置的额外路径

如果你把重要知识写进了别的目录，但没有纳入 `extraPaths`，那它很可能不会进入记忆搜索范围。

## `memory_get` 和 `memory_search` 有什么区别

这两个概念经常被混淆。

更容易理解的区分方式是：

- `memory_get` 更像“直接读某块已知记忆”
- `memory_search` 更像“我知道之前记过，但不确定具体写在哪”

当你在排查“明明写过但找不回来”时，真正该先检查的通常不是模型，而是：

- 内容是否真的落盘
- 是否进入索引范围
- 当前活跃的记忆插件是什么

## 记忆插件决定搜索能力

官方现在把记忆搜索明确挂在插件槽位上：

- 默认槽位通常是 `memory-core`
- 长期向量记忆可切换到 `memory-lancedb`
- 关闭记忆插件可以设 `plugins.slots.memory = "none"`

这意味着如果记忆搜索突然不可用，不能只看 `MEMORY.md` 是否存在，还要看插件槽位是否被改了。

## Provider 是怎么自动选的

官方中文文档给出了一个很明确的自动选择顺序：

1. 如果配置了 `memorySearch.local.modelPath` 且文件存在，用本地模式
2. 如果能解析 OpenAI key，用 `openai`
3. 如果能解析 Gemini key，用 `gemini`
4. 否则记忆搜索保持禁用，直到配置完成

这也是为什么有些用户会遇到“聊天能用，但记忆搜索不工作”的情况。因为聊天的认证和 embeddings 的认证不是一回事。

文档还明确提到：Codex OAuth 之类的聊天授权并不能自动满足记忆搜索的 embeddings 需求。

## 本地索引怎么理解

如果你走本地模式，官方说明里提到会用到 `node-llama-cpp`，某些环境下可能需要额外批准构建。它的优势是更独立、更少依赖远程 API，但代价是：

- 环境要求更高
- 首次配置更复杂
- 模型路径和本地构建链更容易出问题

对大多数先跑通系统的用户来说，先用远程 embeddings 会更稳。

## 搜索并不只是关键词匹配

官方文档明确把这套能力定义成向量记忆搜索，因此它解决的是“措辞不同但语义相关”的召回问题。

这意味着它适合找：

- 之前做过的部署决策
- 某个用户的长期偏好
- 提过但表述方式不同的历史问题

而不是只适合找文件名、命令或固定术语。

## 索引什么时候更新

官方说明提到记忆文件变化会被监视并经过去抖动后重新处理。这意味着：

- 记忆不是每次都要手工全量重建
- 但如果你怀疑索引没跟上，仍然可以手工触发重建

在长时间运行的环境里，理解“自动监视 + 手工重建兜底”这一点很重要。

## 最实用的 CLI 排查命令

官方 `memory` CLI 文档给出的命令足够覆盖大部分排查场景：

```bash
openclaw memory status
openclaw memory status --deep
openclaw memory status --deep --index
openclaw memory index
openclaw memory index --verbose
openclaw memory search "release checklist"
```

这些命令可以回答几类关键问题：

- 当前记忆插件是否可用
- 向量存储和 embeddings provider 是否工作
- 有没有未同步变更
- 某段记忆能不能被真正搜出来

## 更适合的排障顺序

当你遇到“记过，但搜不到”时，建议按这个顺序排：

1. 确认内容真的已经写入 `MEMORY.md` 或 `memory/*.md`
2. 确认路径是否在默认范围或 `memorySearch.extraPaths` 中
3. 跑 `openclaw memory status --deep`
4. 必要时跑 `openclaw memory index --verbose`
5. 再用 `openclaw memory search "<query>"` 验证召回效果

不要一开始就把问题归因到“模型太笨”或“记忆功能失效”。

## 中文站建议的记忆分层

结合现有文档，更稳的做法是把内容拆成三层：

- `SOUL.md`：人格和长期行为原则
- `MEMORY.md`：提炼后的长期事实和偏好
- `memory/YYYY-MM-DD.md`：按天累积的运行日志和上下文

索引和搜索建立在这三层之上，但不替代它们。

## 下一步推荐

- [OpenClaw 记忆系统怎么工作](/docs/manual/memory-system)
- [Agent 工作区结构](/docs/manual/agent-workspace)
- [Skills 系统怎么工作](/docs/manual/skills-system)
- [OpenClaw 插件系统怎么用](/docs/manual/plugins-overview)
