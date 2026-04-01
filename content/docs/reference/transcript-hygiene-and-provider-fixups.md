---
title: 对话记录清理（provider fixups）到底改了什么，不改什么
description: 基于最新官方 Transcript Hygiene 文档，解释 OpenClaw 在运行前对 transcript 做的 provider-specific fixups、图片清理、tool 调用配对修复和思考签名清理分别解决什么问题，以及为什么它不会重写磁盘 JSONL。
category: 参考
updatedAt: 2026-04-01
source: https://docs.openclaw.ai/zh-CN/reference/transcript-hygiene
sourceName: OpenClaw Docs
sourceType: official
tags: [transcript, hygiene, providers, tool-calls, reference]
---

# 对话记录清理（provider fixups）到底改了什么，不改什么

官方最近把 Transcript Hygiene 单独拉成参考文档后，一个很关键的边界终于被写清楚了：

- 运行前会对 transcript 做 provider-specific fixups
- 但这些修正不会回写磁盘 JSONL

这对中文团队特别重要，因为很多人过去会把：

- “给模型喂之前的历史修补”

误解成：

- “系统把历史文件重写了”

## 先记住这层清理发生在哪里

当前官方文档已经写得很明确：

- transcript hygiene 是运行前、构建模型上下文时发生的内存内调整

这意味着它属于：

- provider 兼容层

而不是：

- 磁盘 transcript 维护层

## 它会处理哪些问题

根据当前官方文档，至少包括这些：

- tool call id 清理
- tool result 配对修复
- turn 验证和排序
- thinking signature 清理
- 图片 payload 清理

这些问题的共同点是：

- 某些 provider 对上下文格式要求更严格

所以系统在真正送模型前，要先做一轮兼容性收口。

## 为什么这层不该和 compaction 混成一件事

compaction 的核心是：

- 为了上下文窗口治理，持久化摘要历史

而 transcript hygiene 的核心是：

- 为了 provider 正常吃下历史，在运行前做内存修补

两者都会影响“模型最终看到什么”，但完全不是同一层。

## 图片清理为什么值得单独记住

官方现在把图片 payload 清理单独列出来，很值。

这意味着某些多模态历史在进入模型前，可能会被：

- 减重
- 清洗
- 规范化

但同样要注意：

- 这不等于磁盘 transcript 被重写成更轻的版本

## tool result 配对修复真正保护什么

工具调用这条线最容易出的问题不是“模型看不懂业务”，而是：

- provider 对 tool-call / tool-result 关系很严格

所以 transcript hygiene 里的 tool 配对修复，本质上在保护：

- 会话历史在不同 provider 下仍能被合法解析

这是一层协议兼容问题，不是产品文案问题。

## 为什么这层很容易在排障时被忽略

因为用户通常看到的是：

- 某个 provider 突然报错
- 某段历史在一个模型下能跑，在另一个模型下不稳

这时第一反应往往是：

- 模型坏了
- transcript 脏了

但当前官方文档其实是在提醒：

- 很多问题发生在“送模型前的兼容清理”这一层

## 中文环境里最容易踩的坑

### 1. 以为 provider fixups 会改磁盘 JSONL

官方当前明确说不会。

### 2. 把 transcript hygiene 和 compaction 混成同一机制

一个是兼容修补，一个是长期上下文压缩。

### 3. 看到 provider 差异就先怀疑 session 文件损坏

很多时候是运行前兼容层在起作用。

## 一条更稳的理解顺序

建议按这个顺序看：

1. 磁盘 transcript 存了什么
2. provider fixups 在送模型前会怎么修
3. compaction / pruning 是否又在另一层改变可见上下文

## 下一步推荐

- [session JSONL、compaction entry 和 branch summary 应该怎么理解](/docs/reference/session-jsonl-and-compaction-entries)
- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [System prompt、context 与 compaction](/docs/manual/system-prompt-context-and-compaction)
