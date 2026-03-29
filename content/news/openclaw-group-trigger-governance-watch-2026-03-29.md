---
title: "OpenClaw 正在把群触发从“@一下就行”写成更完整的治理链"
description: "官方最近围绕 Groups、Group Messages 和 Broadcast Groups 的文档更新，正在把 reply-to implicit mention、pending history、forum topic session key 和 shared-group rollout 写成更完整的群入口治理链。"
category: 生态观察
date: "2026-03-29"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/channels/groups"
updatedAt: "2026-03-29"
sourceType: "official"
tags: ["groups", "mentions", "activation", "broadcast", "governance"]
---

最近把 OpenClaw 的 `Groups`、`Group Messages` 和 `Broadcast Groups` 文档放在一起看，会发现一个很清楚的变化：

- 官方已经不再把群触发理解成“@一下就行”

而是在把它写成一条更完整的治理链。

## 1. mention 已经不只等于显式 `@`

最新文档里有一个很值的点：

- reply to bot message 也可以算 implicit mention

这会让群入口更像：

- 基于元数据的触发层

而不只是正文里有没有 `@`。

## 2. “没回” 和 “没进系统” 被分得更清楚了

文档现在已经把两种情况拆开：

- 被 `groupPolicy` / allowlist 挡掉，直接 drop
- 没满足 mention gating，只进 pending history

这让群里很多“为什么这次没回、下次却像知道前文”的现象更容易解释。

## 3. Telegram forum topic 已经是正式会话边界

另一条很重要的信号是：

- `:topic:<threadId>` 直接进了 session key

这说明官方已经把 forum topic 当成：

- 群内子会话边界

而不是纯展示层。

## 4. broadcast 更像治理链末端，而不是起点

Broadcast Groups 文档最近也越来越明确：

- 它不会绕过 allowlist 和 activation rules
- 更适合在单 agent 群入口稳定后再加

这让群能力的顺序更像：

- 先准入
- 再触发
- 最后才扩到多 agent

## 对中文团队最有价值的提醒

如果你现在准备把 OpenClaw 接进更多群、论坛群或社区讨论线，那接下来最值得补的不是更多命令，而是先把：

- allowlist
- mention / reply 触发
- topic 边界
- broadcast 放开时机

这四层拆清楚。

## 推荐延伸阅读

- [回复机器人消息也算 mention 吗，pending history 又什么时候会进上下文](/docs/reference/reply-mention-and-pending-history)
- [Telegram forum topic、群 session 和 thread key 应该怎么一起看](/docs/manual/forum-topics-and-group-session-keys)
- [共享群入口更稳的放开顺序：allowlist、mention、activation 和 broadcast](/best-practices/shared-group-entry-rollout)
