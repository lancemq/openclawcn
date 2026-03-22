---
title: Compaction 前的 memory flush 在保护什么
description: 基于最新官方 Memory、Compaction 和会话管理文档，解释 pre-compaction memory flush 的触发时机、NO_REPLY 机制、软阈值公式，以及为什么它是长期使用体验里的关键缓冲层。
category: 运维
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/concepts/memory
sourceName: OpenClaw Docs
sourceType: official
tags: [memory, compaction, flush, NO_REPLY, operations]
---

# Compaction 前的 memory flush 在保护什么

OpenClaw 最近关于长期会话最值得单独讲的一条能力，不是 compaction 本身，而是它前面多出来的这一步：

- pre-compaction memory flush

官方现在已经把这条线写得很明确了，这说明它不是一个可有可无的小优化，而是在保护长期使用体验。

## 它到底在做什么

官方 Memory 文档当前给出的定义很清楚：

- 当会话接近 auto-compaction 前，Gateway 会触发一次静默的 agentic turn
- 提醒模型先把值得长期保留的内容写进磁盘 memory

也就是说，它的目标不是“先压缩一下”，而是：

- 先把耐久信息落盘
- 再让 compaction 去处理上下文窗口

## 为什么这一步很关键

因为 compaction 本质上仍然是在处理：

- 当前会话上下文

而不是在替你自动决定：

- 哪些事实应该成为长期记忆

memory flush 正是在两者之间补了一层缓冲：

- 上下文即将被压缩
- 但 durable notes 还没写下去

这一步如果没有，长期会话里最容易丢的是：

- 决策
- 明确偏好
- 后续还会用到的稳定事实

## 它什么时候触发

官方文档把触发条件写得很细：

- 当 session token estimate 超过一个软阈值时触发

这个软阈值不是随便定的，而是：

- `contextWindow - reserveTokensFloor - softThresholdTokens`

这意味着它发生在：

- 真正 compaction 之前

所以它不是“compaction 失败后的补救”，而是预防式动作。

## 配置位在哪

当前官方给出的主要配置在：

- `agents.defaults.compaction.memoryFlush.enabled`
- `agents.defaults.compaction.memoryFlush.softThresholdTokens`
- `agents.defaults.compaction.memoryFlush.prompt`
- `agents.defaults.compaction.memoryFlush.systemPrompt`

默认思路也很清楚：

- 启用
- 靠 user prompt + extra system prompt 提醒模型先写 memory

## `NO_REPLY` 为什么这么重要

官方会话深度文档里把 silent housekeeping 单独解释出来了。

memory flush 常见的默认做法是：

- 让模型以 `NO_REPLY` 开头
- 这样这次 turn 不会被用户看到

它的价值不是隐藏行为，而是避免用户在正常对话里看到一段莫名其妙的内部 housekeeping 回复。

更稳的理解方式是：

- 这是一条运行时维护 turn
- 不是给终端用户看的对话 turn

## 它会不会每次都写东西

不会。官方文档里也明确提到：

- 如果没有需要保留的 durable state，可以什么都不写
- 常见做法仍然是 `NO_REPLY`

更关键的是：

- 它通常每个 compaction cycle 只跑一次

所以它不是一个高频“疯狂刷 memory”的机制。

## 哪些情况下会跳过

官方当前明确列了几种跳过条件：

- 会话不是嵌入式 Pi session
- workspace 是只读
- `workspaceAccess` 是 `ro` 或 `none`

这很重要，因为它说明：

- memory flush 不是纯上下文魔法
- 它真正依赖可写的工作区和落盘能力

## 它和 compaction 的分工是什么

更适合这样记：

- memory flush：把值得长期保留的内容写成磁盘事实
- compaction：把旧对话总结成更紧凑的会话表示
- pruning：临时减掉这次请求里过大的旧工具结果

这三者都和“上下文变长”有关，但职责完全不同。

## 哪些场景最需要它

更需要 pre-compaction memory flush 的通常是：

- 长时间陪伴型 agent
- 持续项目协作
- 多轮任务拆解
- 会逐步形成稳定偏好或长期决策的使用方式

因为这些场景里，真正最值钱的不是每一句旧聊天，而是：

- 哪些结论应该留存

## 中文用户最容易踩的坑

### 1. 以为 compaction 自己就会保住长期事实

它会做摘要，但不等于自动替你生成 durable memory。

### 2. 把 memory flush 当成“自动写日记”

它更像临近 compaction 时的一次保全动作，而不是每轮都在大量记笔记。

### 3. 在只读 workspace 里期待它正常工作

官方已经明确写了，这种情况下会直接跳过。

## 一条更稳的使用路径

建议按这个顺序理解：

1. 先区分 memory、compaction、pruning
2. 确认 workspace 对 memory 可写
3. 再决定是否微调 `softThresholdTokens` 和 flush 提示词
4. 长会话里用 `/status` 和 `/context detail` 观察实际触发效果

## 下一步推荐

- [系统提示词、上下文与压缩](/docs/manual/system-prompt-context-and-compaction)
- [OpenClaw 记忆系统怎么工作](/docs/manual/memory-system)
- [OpenClaw 上下文观察：Compaction、Session 连续性与 persona 保真正在成为官方显式关注点](/news/openclaw-context-compaction-watch-2026-03-21)
