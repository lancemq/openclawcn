---
title: "OpenClaw 正在把 transcript hygiene 从隐藏兼容层写成正式参考边界"
description: "官方最近单独写出 Transcript Hygiene 文档后，tool call 修补、图片清理和 provider fixups 不再只是内部细节，而成了更清楚的运行前兼容层。"
category: "生态观察"
date: "2026-04-01"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/zh-CN/reference/transcript-hygiene"
updatedAt: "2026-04-01"
sourceType: "official"
tags: ["transcript", "providers", "hygiene", "tool-calls", "compatibility"]
---

OpenClaw 最近把 Transcript Hygiene 单独拉成参考文档后，一个很关键的边界终于被写清楚了：

- provider-specific fixups 发生在运行前
- 但不会重写磁盘 transcript

这对中文团队很值，因为过去很多人会把 provider 兼容修补和 transcript 持久化维护混成一层。

## 1. transcript hygiene 正在从“看不见的内部细节”变成正式兼容层

随着官方把：

- tool 调用 id 清理
- tool result 配对修复
- thinking signature 清理
- 图片 payload 清理

都单独列出来，这一层已经更像正式运行时兼容面。

## 2. compaction 和 hygiene 的边界也更清楚了

官方当前写法会让一个长期困扰中文用户的问题更容易回答：

- 为什么模型实际看到的历史和磁盘 transcript 不完全一样

答案往往不是文件被改了，而是：

- 运行前还有一层 hygiene 在做 provider 兼容修补

## 推荐延伸阅读

- [对话记录清理（provider fixups）到底改了什么，不改什么](/docs/reference/transcript-hygiene-and-provider-fixups)
- [session JSONL、compaction entry 和 branch summary 应该怎么理解](/docs/reference/session-jsonl-and-compaction-entries)
- [OpenClaw 正在把 session transcript 从 JSONL 文件写成结构化会话事实层](/news/openclaw-session-jsonl-deep-dive-watch-2026-04-01)
