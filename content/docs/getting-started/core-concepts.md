---
title: OpenClaw 核心概念
description: 用一页建立 OpenClaw 的核心心智图，分清 Gateway、Agent、Channels、Tools、Skills、Memory 和 Control UI 各自负责什么。
category: 入门
updatedAt: 2026-03-16
sourceType: internal
tags: [concepts, gateway, agent, channels, tools, memory]
---

# OpenClaw 核心概念

很多中文用户第一次接触 OpenClaw 时，卡住的原因并不是不会执行命令，而是把几个不同层次的概念混在了一起。只要先把这些词分清，后面看安装、接渠道、做技能扩展时就会顺很多。

## 先记住一张最小心智图

可以把 OpenClaw 暂时理解成下面这几层：

1. **Gateway**：系统的运行中枢，负责连接模型、渠道、记忆、工具和节点。
2. **Agent**：真正和你协作的助手实例，决定“谁在工作”和“怎样工作”。
3. **Channels**：你和 Agent 说话的入口，比如 Telegram、WhatsApp、Web Chat、Slack。
4. **Tools / Plugins / Hooks / Skills**：让 Agent 获得执行力和扩展能力的不同机制。
5. **Memory / Sessions / SOUL**：决定它记住什么、如何连续协作、遵守什么长期原则。
6. **Control UI**：观察状态、调试系统、处理审批和配置变更的管理面。

如果你还没有建立这张图，先不要急着去记命令参数。

## Gateway：不是聊天窗口，而是运行中枢

Gateway 更像 OpenClaw 的“大脑和总线”。

它负责：

- 接收来自不同渠道或节点的请求
- 把请求路由给对应的 Agent
- 调用模型、工具、插件和记忆
- 处理认证、审批和运行状态

所以很多“为什么打不开”“为什么某个渠道不工作”“为什么审批没弹出来”的问题，本质上都不是某个聊天页面的问题，而是 Gateway 这一层还没进入健康状态。

下一步建议读：

- [快速入门](/docs/getting-started/getting-started)
- [Gateway 架构概览](/docs/manual/architecture)

## Agent：真正提供服务的助手实例

Agent 不是 UI，也不是单个模型。

更准确地说，Agent 是一组持续生效的工作设定，通常包括：

- 它的身份和职责
- 它默认用什么模型
- 它能调用哪些工具和技能
- 它继承什么 SOUL / Memory / Session 规则

你可以把它理解成“一个长期可运行的助手角色”，而不是一次性聊天会话。

下一步建议读：

- [OpenClaw 是什么](/docs/getting-started/what-is-openclaw)
- [创建第一个 Agent](/docs/getting-started/first-agent)

## Channels：交互入口，不等于能力本身

Channels 只是入口层。它解决的是“你从哪里跟 Agent 说话”，而不是“Agent 会不会做事”。

例如：

- Telegram / WhatsApp / Discord 适合消息入口
- Web Chat / Message CLI 适合本地验证
- 团队频道适合多人协作

先把入口跑通，再去扩更多渠道，通常比同时接三四个入口更稳。

下一步建议读：

- [接入第一个渠道](/docs/getting-started/first-channel)
- [Channels 概览](/docs/manual/channels-overview)

## Tools、Plugins、Hooks、Skills：都在扩能力，但不是一回事

这是最容易混淆的一组概念。

### Tools

Tools 更接近原子执行能力，例如执行命令、读写文件、访问网页、调用 API。

### Plugins

Plugins 更接近把新的系统级能力装进 OpenClaw，通常会影响 Gateway 的真实运行能力。

### Hooks

Hooks 负责把事件和流程挂在系统运行过程中，适合做触发、拦截和自动化衔接。

### Skills

Skills 更像围绕某类任务组织好的能力包或做法，适合在已经理解系统边界后继续扩展。

如果你现在只记一句，就记这个顺序：

**先知道边界，再决定装什么能力，再去写更长的流程。**

下一步建议读：

- [OpenClaw 的 Tools 与扩展能力概览](/docs/manual/tools-overview)
- [Hooks 概览](/docs/manual/hooks-overview)
- [Skills 系统概览](/docs/manual/skills-system)

## Memory、Sessions、SOUL：决定它如何连续协作

OpenClaw 不只是“当前这一轮回复”。

这三个概念分别偏向：

- **SOUL**：它是谁，遵守什么长期原则
- **Session**：当前这条任务链路里的上下文
- **Memory**：跨会话保留的长期信息

如果把三者混在一起，很容易出现：

- 临时流程写进 SOUL，导致人格层越来越臃肿
- 把频道噪音沉淀成长期记忆
- 以为新开一个入口也会自动继承所有上下文

下一步建议读：

- [记忆系统与上下文](/docs/manual/memory-system)
- [Session 与配对](/docs/manual/session-and-pairing)

## Control UI：管理面，不是普通访问页

Control UI 更适合：

- 看系统是否健康
- 看当前 Agent、渠道和会话状态
- 处理审批和调试
- 做受控的配置确认

它不只是“另一个聊天窗口”，而是理解 OpenClaw 当前运行状态的核心入口之一。

第一次部署时，优先从这里确认系统是否真的跑通。

下一步建议读：

- [Onboarding 引导流程说明](/docs/getting-started/onboarding-guide)
- [Control UI 使用说明](/docs/manual/control-ui)

## 推荐你怎么继续看

如果你刚建立完这张概念图，继续阅读的顺序建议是：

1. [如何开始系统理解 OpenClaw](/docs/getting-started/reading-path)
2. [快速入门](/docs/getting-started/getting-started)
3. [安装指南](/docs/setup/installation)
4. [主题中心](/topics)
5. [学习路径](/paths)
