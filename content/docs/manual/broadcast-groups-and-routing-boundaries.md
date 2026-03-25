---
title: Broadcast Groups 和普通 routing 的边界怎么区分
description: 基于最新官方 Broadcast Groups 与 Channel Routing 文档，解释 Broadcast Groups 何时会生效、为什么它不是 bindings 的替代品，以及多代理同群运行时的 session、工具和响应顺序边界。
category: 功能
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/channels/broadcast-groups
sourceName: OpenClaw Docs
sourceType: official
tags: [broadcast, routing, groups, agents, session]
---

# Broadcast Groups 和普通 routing 的边界怎么区分

官方最近把 Broadcast Groups 单独拉成了一页文档，这很值，因为它把一件以前容易被想当然处理的事讲清楚了：

- “多个 agent 在同一群里一起工作”

并不等于：

- “把原来的 bindings 多写几条”

Broadcast Groups 和普通 routing 解决的是两类不同问题。

## 普通 routing 先回答的是什么

Channel Routing 文档当前说得很清楚：

- routing 为每条入站消息挑一个 agent

而且命中顺序是固定的，从精确 peer、父级 peer 继承、guild/team/account/channel 一路往下，最后才到默认 agent。

所以普通 routing 的核心问题一直是：

- 这条消息到底归谁处理

## Broadcast Groups 在额外改变什么

Broadcast Groups 改的不是“哪条 binding 命中”，而是：

- 当这个 peer 已经符合处理条件时，让多个 agent 一起运行

官方现在明确写的是：

- 它在 channel allowlist 和 group activation rules 之后生效
- 在 WhatsApp 群组里，只有当 OpenClaw 本来就会回复时，broadcast 才会发生

换句话说：

- 它不会绕过 mention、激活命令或群组准入规则

## 当前适用范围为什么要先记住

截至当前官方文档，Broadcast Groups 仍然是：

- Experimental
- 2026.1.9 新增
- 当前范围限于 WhatsApp web channel

这意味着更适合把它当成：

- 特定协作入口

而不是：

- 所有渠道的默认多 agent 编排方式

## 什么场景下更适合用 Broadcast Groups

根据官方当前给的 use case，更像下面几类：

- 同一群里让不同 agent 给出不同专业视角
- 多语种支持
- 质检或审阅型双 agent
- 任务协同和记录型 agent 组合

这些场景的共通点是：

- 你就是希望同一条消息被多个 agent 各自处理

## 它为什么不是 bindings 的替代品

bindings 的核心职责仍然是：

- 在普通入站场景里决定哪个 agent 接管

Broadcast Groups 的核心职责则是：

- 对特定 peer 指定一组要一起运行的 agent

所以更准确的理解是：

- bindings 负责单 agent 路由
- broadcast 负责特定 peer 的多 agent 扩展

如果你只是想把某个群固定交给一个 agent，还是更适合用 bindings。

## session 隔离为什么是这个能力成立的前提

官方文档当前把这点写得非常清楚：

- 每个 broadcast agent 都有自己的 session key
- 各自的历史、workspace、工具权限和 memory 都是隔离的

这意味着：

- 多 agent 同群，不等于多 agent 共用一个上下文桶

它更像：

- 多个 agent 看到同一条群消息，各自基于自己的状态独立运行

## 哪些东西是共享的

官方也补了一条很关键的边界：

- recent group context buffer 是按 peer 共享的

所以更准确的画法是：

- 触发上下文来自同一个群聊现场
- 但 agent 的长期历史、工具边界和个体记忆仍然分开

这也解释了为什么 Broadcast Groups 适合做“多视角回答”，而不是做“一个主 agent + 一堆共享脑子”的协同系统。

## `parallel` 和 `sequential` 该怎么选

官方给了两种 strategy：

- `parallel`
- `sequential`

更适合这样理解：

### `parallel`

适合：

- 你要更快得到多个独立回答
- agent 之间没有明显先后依赖

### `sequential`

适合：

- 你希望按固定顺序产出
- 后面的 agent 主要承担追加、审核或整理角色

但即便 sequential，也不代表 agent 之间共享会话历史。

## 中文用户最容易踩的坑

### 1. 把 Broadcast Groups 当成“高级 bindings”

它不是用来替代普通 routing 的。

### 2. 忘了 mention / 激活规则还在前面

如果群里根本没触发 OpenClaw，本来就不会进入 broadcast。

### 3. 一上来就挂很多全能 agent

官方建议更像是小而专的 agent 组合，而不是在一个群里塞一排泛化助手。

## 一条更稳的使用顺序

建议按这个顺序做判断：

1. 先确定这个群在普通模式下何时会触发回复
2. 再确认是不是确实需要多 agent 同时运行
3. 如果需要，优先把 agent 做成职责单一的组合
4. 最后再决定 `parallel` 还是 `sequential`

## 下一步推荐

- [bindings 的优先级怎么影响 agent 选择](/docs/manual/bindings-precedence-and-agent-selection)
- [频道与 Session 路由怎么决定上下文边界](/docs/manual/channel-routing-and-session-keys)
- [团队频道里的 Session 隔离策略](/docs/operations/team-channel-session-strategy)
