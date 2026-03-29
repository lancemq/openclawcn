---
title: Broadcast 和普通 bindings 谁先生效，什么时候该用哪一个
description: 基于最新官方 Broadcast Groups、Channel Routing 与 Groups 文档，整理 broadcast、bindings、group policy 和 mention gating 的生效顺序，帮助团队区分“多 agent 协作”和“单 agent 路由”到底该落在哪层。
category: 使用说明
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/channels/broadcast-groups
sourceName: OpenClaw Docs
sourceType: official
tags: [broadcast, bindings, routing, groups, precedence, manual]
---

# Broadcast 和普通 bindings 谁先生效，什么时候该用哪一个

OpenClaw 最近的 `Broadcast Groups` 文档把一个很容易被误会的问题讲清楚了：

- Broadcast 不是“多写几条 bindings”

它和普通 bindings 分别在处理两层不同的事。

## 先记住官方当前顺序

根据最新官方文档，更接近真实情况的顺序是：

1. 先过 channel allowlists 和 group policy
2. 再过 mention / activation 这类群触发条件
3. 这条消息已经“本来会回复”后，才检查 broadcast
4. 不在 broadcast 里时，再按普通 routing / bindings 走

也就是说，broadcast 不是绕过前面的准入逻辑，而是：

- 在消息已经有资格被处理后，决定是不是让多个 agent 一起运行

## bindings 先回答的是什么

普通 bindings 的职责一直很稳定：

- 这条消息最终归哪个 agent

官方 `Channel Routing` 现在给出的命中顺序也是固定的：

- peer
- guild / team
- account
- channel
- default agent

所以 bindings 更像：

- 单 agent 归属规则

## broadcast 在改变什么

Broadcast 改的不是归属，而是：

- 当这个 peer 命中 broadcast 配置时，不再只跑一个 agent

官方现在已经明确写了：

- `broadcast` 优先于 `bindings`

所以一个 peer 如果被放进 broadcast 列表，行为就会变成：

- 这组 agent 一起处理

而不是：

- 命中到第一条 binding 就结束

## 什么情况下更适合 bindings

如果你的目标是：

- 这个团队入口固定给支持 agent
- 这个群固定给某个项目 agent
- 某个 Slack team 或 Discord guild 只想落一个 agent

那更适合继续用 bindings。  
因为你要解决的是：

- 归属唯一性

## 什么情况下更适合 broadcast

如果你的目标是：

- 同一条消息需要多个专业 agent 并行看
- 同群里想同时跑支持、记录、审校三种角色
- 你明确接受多条回复或多路副作用

那才更像 broadcast 的场景。  
因为你要解决的是：

- 多 agent 协作

## 为什么 mention gating 一定要一起看

官方现在特别强调：

- broadcast 不会绕过 group activation rules

这点很重要，因为很多人会误会成：

- “既然是 broadcast，那群里所有消息都能触发”

实际上不是。  
群消息先要符合当前 surface 的触发条件，例如：

- mention
- activation 模式
- allowlist

然后 broadcast 才会接管“由谁来处理”这一层。

## session 为什么不会混在一起

官方这页也把边界写得很清楚：

- 每个 broadcast agent 都有自己的 session key
- 共享的是 recent group context buffer

所以它更像：

- 同一个群现场
- 多个独立 agent

而不是：

- 多个 agent 共用一个脑子

## 中文团队最值得避免的误用

最常见的误用通常有两种：

### 1. 想做单 agent 路由，却上了 broadcast

这样只会让行为变复杂，问题却没更清楚。

### 2. 想做多 agent 协作，却还在堆 bindings

这样通常只能得到：

- 第一条命中的 agent

而不是：

- 多 agent 同时工作

## 推荐延伸阅读

- [Broadcast Groups 和普通 routing 的边界怎么区分](/docs/manual/broadcast-groups-and-routing-boundaries)
- [哪些配置会被官方当成 shared-user ingress 信号](/docs/reference/shared-user-ingress-signals)
- [shared inbox 的运营边界和信任模型](/docs/operations/shared-inbox-trust-boundaries)
