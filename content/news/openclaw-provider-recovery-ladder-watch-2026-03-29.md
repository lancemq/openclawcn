---
title: "OpenClaw 的 provider 故障恢复正在变成一条更清楚的梯子"
description: "官方最近围绕 Model Failover、Gateway Troubleshooting、LiteLLM 和 Cloudflare AI Gateway 的文档更新，正在把模型故障从“直接换模型”收敛成更清楚的几层：能力条件、profile 轮转、统一网关和跨模型 fallback。"
category: 生态观察
date: "2026-03-29"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/concepts/model-failover"
updatedAt: "2026-03-29"
sourceType: "official"
tags: ["providers", "failover", "models", "gateway", "operations"]
---

最近把 OpenClaw 的 Model Failover、Gateway Troubleshooting、LiteLLM 和 Cloudflare AI Gateway 这些页面放在一起看，会发现一个很清楚的趋势：

- provider 故障恢复正在从“直接换模型”变成一条更清楚的梯子

这条梯子至少已经能分出四层：

- 能力条件有没有满足
- provider 内 auth profile 能不能轮转
- 统一网关层有没有挡住
- 跨模型 fallback 是否该真正接棒

## 1. 长上下文 429 已经被官方单独定性

Gateway Troubleshooting 现在专门把 Anthropic `Extra usage is required for long context requests` 单独列出来，说明官方已经不把它当成普通零碎报错，而是在明确：

- 有些 provider 问题是能力资格问题
- 不是一刀切的“这家挂了”

## 2. auth profile rotation 正在成为第一恢复层

Model Failover 文档写得越来越细后，一个趋势已经很明显：

- 同 provider 内的 profile 轮转
- 比跨模型切换更靠前

这会让“恢复”更像精细调度，而不是简单粗暴地从 Claude 直接跳到 GPT。

## 3. 统一网关层被正式放进故障链路

LiteLLM 和 Cloudflare AI Gateway 现在都不只是“接入教程”，而是在文档结构里越来越像正式中间层。

这意味着 provider 问题开始经常需要多问一句：

- 是上游模型不行
- 还是网关层本身的鉴权、路由或环境传递有问题

## 4. fallback 还在，但位置更靠后了

官方仍然强调 `agents.defaults.model.fallbacks` 的价值，但从现在这些文档的写法看，它越来越像：

- 前几层都没接住之后的后备层

而不是第一反应。

## 对中文用户最有价值的提醒

如果你现在已经：

- 有多个 provider
- 配了 auth profiles
- 用 LiteLLM 或 Cloudflare 做统一入口
- 对长 session 和稳定性比较敏感

那接下来最值得补的不是再堆更多 fallback，而是先把这条恢复梯子建立起来。

## 推荐延伸阅读

- [Anthropic context1m 的 429 和 fallback 应该怎么处理](/docs/reference/anthropic-context1m-429-and-fallback)
- [Cloudflare AI Gateway 的双层鉴权头应该怎么配](/docs/reference/cloudflare-aig-dual-auth-headers)
- [Provider 故障时先按恢复阶梯排，不要直接乱切模型](/best-practices/provider-recovery-ladder)
