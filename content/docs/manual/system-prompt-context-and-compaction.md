---
title: 系统提示词、上下文与压缩
description: 基于官方 system prompt、context、compaction 与 session pruning 文档，解释 OpenClaw 一次运行到底会把什么发给模型，以及上下文为什么会变满。
category: 功能
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/concepts/context
sourceName: OpenClaw Docs
sourceType: official
tags: [system-prompt, context, compaction, pruning, sessions]
---

# 系统提示词、上下文与压缩

OpenClaw 和普通聊天工具最大的差别之一，就是它不会把“当前窗口里的几轮消息”当成全部上下文。官方中文文档把 system prompt、context、compaction 和 session pruning 拆成独立页面，说明这是一套完整机制。

如果只记一个结论，更适合记这句：

- 记忆是磁盘上的长期事实
- 上下文是这次真正发给模型的内容
- 压缩和剪枝是为了让上下文长期可持续运行

## 系统提示词不是模型默认提示词

官方文档明确说明，OpenClaw 每次运行都会自己构建 system prompt，而不是直接用底层 agent 默认提示词。

它通常会包含这些固定部分：

- 当前可用工具和简短说明
- 安全提醒
- Skills 元信息
- OpenClaw 自更新说明
- 工作区路径
- 本地文档位置
- 注入的工作区引导文件
- 沙箱信息
- 当前日期和时区

这意味着系统提示词本身就是上下文的一大块开销，不是“看不见就可以忽略”的部分。

## 工作区文件为什么会自动进上下文

官方中文文档提到，OpenClaw 默认会把一组工作区引导文件直接注入到运行上下文里，例如：

- `AGENTS.md`
- `SOUL.md`
- `TOOLS.md`
- `IDENTITY.md`
- `USER.md`
- `HEARTBEAT.md`
- `BOOTSTRAP.md`

它们的作用不是长期存档，而是让模型在真正运行前就看到当前身份、规则和项目上下文。

官方还给了两个重要的大小限制：

- 单文件截断上限由 `agents.defaults.bootstrapMaxChars` 控制，默认 `20000`
- 总注入上限由 `agents.defaults.bootstrapTotalMaxChars` 控制，默认 `150000`

所以“我把很多内容写进 `SOUL.md` 就一定都会被看到”并不成立，太长时会被截断。

## 上下文到底包含哪些东西

按照官方 context 文档，更适合的新手心智模型是：

- system prompt
- 当前会话历史
- 工具调用和工具结果
- 附件、转录和其他运行时内容

这也是为什么上下文常常会比你想象中涨得更快。真正占用窗口的不只是聊天文本，还包括：

- 文件读取结果
- 命令输出
- 图片和音频相关内容
- 工具 schema
- 旧工具结果

## `/context` 和 `/status` 在看什么

官方把这几条命令当成上下文检查入口：

- `/status`
- `/context list`
- `/context detail`
- `/usage tokens`

它们能帮助你回答几类关键问题：

- 当前窗口有多满
- 哪些文件和工具在占用上下文
- system prompt 占了多大比例
- 哪些注入文件被截断了

如果你已经开始做技能、工具和长会话，这些命令的价值会很高。

## 压缩和剪枝不是一回事

这是官方文档里最值得单独讲清楚的一点。

### 压缩 compaction

压缩会总结已有会话内容，并把摘要持久化进 JSONL 记录。它是“把旧内容提炼后保留下来”。

官方还提到：

- 可以手动用 `/compact` 触发
- 自动压缩前可以先做一次静默记忆写回

### 会话剪枝 session pruning

剪枝只是在每次请求前，临时从发送给模型的内存上下文里移除旧工具结果。它不会重写磁盘上的会话历史。

它更像“为了这次请求先减重”，而不是“真的改写了过去”。

## 官方的 session pruning 重点

官方中文文档给了很明确的边界：

- 只修剪 `toolResult`
- 不会修改用户和助手消息
- 主要针对 Anthropic API 调用及相近场景
- 默认模式可设为 `cache-ttl`

默认值也很具体，包括：

- `ttl: "5m"`
- `keepLastAssistants: 3`
- `softTrimRatio: 0.3`
- `hardClearRatio: 0.5`
- `minPrunableToolChars: 50000`

这些默认值说明官方解决的是“长时间运行里旧工具输出堆太多”这个问题，而不是单纯省一点 token。

## 为什么 OpenClaw 会话更适合长期运行

官方 session 管理文档还强调了两层持久化：

1. `sessions.json` 记录会话元信息
2. `<sessionId>.jsonl` 记录真实对话和工具历史

这样做的意义是：

- 会话元信息可以快速查询
- 真实对话和压缩摘要可以持续积累
- 上下文重建有明确的事实来源

这和“只在一个聊天窗口里堆消息”完全不是同一种系统设计。

## 中文用户最容易误解的地方

### 把上下文当成记忆

上下文是一次运行里带进去的内容，不等于长期记忆。

### 以为压缩会清空历史

压缩是持久化总结，不是粗暴删记录。

### 以为剪枝会改写磁盘记录

剪枝只改这次请求发送给模型的内容，不改 JSONL 历史。

## 更稳的使用路径

建议按这个顺序理解：

1. 先理解 [OpenClaw 记忆系统怎么工作](/docs/manual/memory-system)
2. 再理解 system prompt 和上下文的组成
3. 会用 `/status` 和 `/context detail`
4. 最后再看 compaction 和 pruning 的成本/稳定性意义

## 下一步推荐

- [OpenClaw 记忆系统怎么工作](/docs/manual/memory-system)
- [记忆搜索与索引机制](/docs/manual/memory-search-and-indexing)
- [Session 与配对机制](/docs/manual/session-and-pairing)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
