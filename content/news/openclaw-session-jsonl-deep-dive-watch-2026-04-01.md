---
title: "OpenClaw 正在把 session transcript 从 JSONL 文件写成结构化会话事实层"
description: "官方最近新增的 Session Management Deep Dive 文档，把 session header、message tree、compaction entry 和 branch summary 这几层边界写得更清楚了。"
category: "生态观察"
date: "2026-04-01"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/reference/session-management-compaction"
updatedAt: "2026-04-01"
sourceType: "official"
tags: ["session", "jsonl", "compaction", "transcript", "gateway"]
---

OpenClaw 最近把 Session Management Deep Dive 单独写成了一篇参考文档，这对长期运行用户特别值，因为它第一次把 transcript 讲成了真正的结构化会话事实层，而不是“磁盘上一串 JSONL”。

当前官方写得很清楚：

- 第一行是 session header
- 后续 entry 带 `id` / `parentId`
- `compaction` 和 `branch_summary` 都是持久化 entry

这意味着 transcript 的心智正在变得更成熟。

## 1. JSONL 不再只是消息流水

随着 session header 和 tree entry 的边界被写清，OpenClaw 的 transcript 更像：

- 有壳、有分支、有摘要节点的会话树

而不是单纯线性聊天记录。

## 2. compaction 也被写成了持久化历史事实

官方现在明确：

- compaction summary 会持久化进 JSONL

这让 compaction 不再只是“上下文变短了”的现象，而是：

- 会话历史里真实发生过的一次摘要操作

## 3. branch summary 让树状路径第一次更好解释

branch summary 被写出来之后，很多以前只能靠“好像总结过”的体验，现在更容易有明确结构解释。

这对以后中文站解释：

- 分支会话
- 树状导航
- 历史回看

都会很有帮助。

## 推荐延伸阅读

- [session JSONL、compaction entry 和 branch summary 应该怎么理解](/docs/reference/session-jsonl-and-compaction-entries)
- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [System prompt、context 与 compaction](/docs/manual/system-prompt-context-and-compaction)
