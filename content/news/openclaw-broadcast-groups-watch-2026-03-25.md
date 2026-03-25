---
title: "OpenClaw 开始把 Broadcast Groups 从路由技巧推进成多代理协作入口"
description: "官方最新 Broadcast Groups 文档把多 agent 同群运行的触发条件、session 隔离和处理策略写得更完整了，也让它和普通 bindings 的分工更清楚。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/channels/broadcast-groups"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["broadcast", "agents", "groups", "routing", "whatsapp"]
---

OpenClaw 最近把 Broadcast Groups 单独拉成了完整文档，这意味着“多个 agent 在同一聊天入口协同工作”正在从零散能力说明，逐步长成一个更明确的消息入口形态。

当前官方给出的定位很清楚：

- Broadcast Groups 是实验性能力
- 2026.1.9 新增
- 当前范围限于 WhatsApp web channel

但更关键的变化不是“能不能用”，而是边界开始被讲清楚了。

## 1. 它不是普通 bindings 的增强版

Channel Routing 文档仍然坚持一条基础逻辑：

- 普通 routing 为每条消息选择一个 agent

而 Broadcast Groups 改的是另一层：

- 当这个 peer 已经满足回复条件时，让多个 agent 一起运行

这让“单 agent 路由”和“多 agent 协作”第一次被官方拆成了两套清晰概念。

## 2. mention / 激活规则仍然在前面

官方文档明确说明，Broadcast Groups 会在 channel allowlists 和 group activation rules 之后生效。

这很重要，因为它意味着：

- 多 agent 协作不会绕过群入口的基础治理

也就是说，群里是否需要先 mention、是否允许机器人默认插话，这些规则仍然是第一层。

## 3. 多 agent 同群不等于共享一个上下文

Broadcast Groups 文档当前写得最值的一点，是把 session isolation 讲得很细：

- 每个 agent 仍然有独立 session key
- 各自历史、workspace、工具和 memory 都隔离
- 共享的只是同一群聊触发时看到的 recent group context

这让它更像“多视角并行回答”，而不是“多个 agent 共用一个大脑”。

## 4. 多代理协作开始更像产品化入口

官方现在已经给出：

- `parallel`
- `sequential`

两种处理策略，也补了多语种支持、质检工作流和任务协同这类 use case。  
这说明 Broadcast Groups 正在逐步从配置技巧，向更产品化的协作入口演进。

## 对中文用户最有价值的提醒

如果你想把多个 agent 放进同一群里，下一步最值得优先想清楚的不是“还能再加几个”，而是：

- 这个群到底什么时候会触发
- 每个 agent 是否只有一个清晰职责
- 多个 agent 的工具权限是不是已经分层

这些边界比“配置能不能写通”更决定长期可用性。

## 推荐延伸阅读

- [Broadcast Groups 和普通 routing 的边界怎么区分](/docs/manual/broadcast-groups-and-routing-boundaries)
- [Broadcast Groups 上线前，先把多代理协作边界定清楚](/best-practices/broadcast-group-governance)
- [bindings 的优先级怎么影响 agent 选择](/docs/manual/bindings-precedence-and-agent-selection)
