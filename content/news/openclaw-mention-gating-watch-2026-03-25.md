---
title: "OpenClaw 的 mention gating 正在从单一 @ 规则变成跨渠道触发层"
description: "官方最新 Groups 和 Group Messages 文档显示，mention gating 已经不再只服务 WhatsApp 群，而是在 Telegram、Slack、Discord、iMessage 等入口上逐步形成统一触发层。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/channels/group-messages"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["mention", "groups", "telegram", "discord", "slack"]
---

OpenClaw 最近这轮文档里，一个很清楚但容易被忽略的趋势是：mention gating 正在从“WhatsApp 群里的 @ 规则”，逐步长成一套跨渠道统一触发层。

当前官方文档已经明确：

- `agents.list[].groupChat.mentionPatterns`

不再只是 WhatsApp 用法，而是已经用于：

- Telegram
- Discord
- Slack
- iMessage

这意味着 mention gating 的定位正在变化。

## 1. mention 不再只是界面交互，而是入口治理层

随着更多渠道被拉进统一规则，mention gating 已经更像：

- 群聊入口的标准触发层

它负责决定的，不只是“有没有 @”，而是：

- 一条群消息是否应该正式唤起 agent run

## 2. `mentionPatterns` 现在更像兼容层

官方当前写得也很清楚：

- 原生 mention 元数据优先
- `mentionPatterns` 是 fallback

这会让不同渠道在“提到机器人”的交互体验上更接近，也让多渠道部署时的配置心智更统一。

## 3. `always` 模式被描述得更克制了

WhatsApp 群文档现在对 `always` 的描述并不是“每条都回”，而是：

- 每条都会唤起 agent
- 但只有在确实值得响应时才正式回复
- 否则返回 `NO_REPLY`

这说明官方对群机器人“过度刷屏”的问题已经有更明确的产品化克制。

## 对中文用户最有价值的提醒

如果你接了多个群聊渠道，下一步最值得统一的已经不是“每个平台写一套不同规则”，而是：

- 先把 mention gating 当成统一触发层
- 再按渠道补 mention detection 的细节

## 推荐延伸阅读

- [groupPolicy、allowlist 和 mention gating 的顺序应该怎么理解](/docs/reference/group-policy-and-mention-gating-order)
- [群聊入口上线时，先把 mention 触发策略跑稳](/best-practices/group-mention-rollout)
- [Teams 频道里的 Session 隔离策略](/docs/operations/team-channel-session-strategy)
