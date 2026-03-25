---
title: "OpenClaw 开始把群聊入口判断顺序写成可复述规则"
description: "官方最近在 Groups、Group Messages 和 Messages 文档里，把群入口的 groupPolicy、allowlist 和 mention gating 顺序写得更完整了，也让“没回”和“没进系统”首次更容易区分。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/channels/groups"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["groups", "mention", "allowlist", "messages", "routing"]
---

OpenClaw 最近这轮群聊文档，一个很值得注意的变化是：群入口的判断顺序已经越来越像一条可复述规则，而不再只是“群里提到它，它就会回”的模糊印象。

当前官方在 Groups 文档里已经把顺序写得很清楚：

1. `groupPolicy`
2. group allowlists
3. mention gating

这条顺序虽然看起来像配置细节，但它会直接改变很多群聊排障的理解方式。

## 1. “没回”第一次更容易和“没进系统”区分

官方现在明确写了：

- 群消息可能在 `groupPolicy` 或 allowlist 阶段就被丢掉
- 也可能通过前两层，但在 mention gating 阶段只进入 pending history，不触发回复

这让群聊里的三种状态第一次变得更清楚：

- 直接被挡住
- 只进上下文
- 正式触发回复

## 2. mention 规则开始更像触发层，而不是权限层

过去很多中文讨论会把 mention 理解成“群权限本身”，但官方现在的写法更像在强调：

- mention gating 决定的是“要不要正式唤起 agent run”

这也解释了为什么：

- `groupPolicy: "open"` 也不等于一定会回

因为 mention gating 仍然可能在后面继续收口。

## 3. `/activation` 的边界也变得更清楚了

Group Messages 文档当前把：

- `/activation mention`
- `/activation always`

明确成 owner-only 的群激活切换，而且主要是 WhatsApp 群侧能力。  
这让它更像一个群级触发策略调节器，而不是全局开放开关。

## 对中文用户最有价值的提醒

如果你正在排：

- 为什么群里提到它却不回
- 为什么没被 mention 的消息后面却像被“记住了”
- 为什么群入口看起来像开着，但实际又很克制

那下一步最值得先补的，已经不是模型参数，而是：

- 先按 `groupPolicy -> allowlist -> mention gating` 去看入口判断链

## 推荐延伸阅读

- [groupPolicy、allowlist 和 mention gating 的顺序应该怎么理解](/docs/reference/group-policy-and-mention-gating-order)
- [群聊入口上线时，先把 mention 触发策略跑稳](/best-practices/group-mention-rollout)
- [消息入口的去重、合并和排队是怎么工作的](/docs/manual/inbound-dedupe-and-debounce)
