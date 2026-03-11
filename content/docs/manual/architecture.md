---
title: Gateway 架构概览
description: 理解 OpenClaw 的 Gateway、Control-plane 客户端和 Nodes 如何协作，以及为什么它是一个单一长连接网关系统。
category: 架构
tags: [gateway, nodes, architecture, control-plane]
---

# Gateway 架构概览

OpenClaw 的核心不是某个聊天窗口，而是一个 **Gateway**。官方文档把这套结构叫做 Gateway Architecture，而且讲得很明确：OpenClaw 是一套围绕单一长连接网关组织起来的系统，所有聊天面、控制面和节点能力都围绕它工作。

## 先抓住一个核心概念

在 OpenClaw 里，Gateway 是单一事实来源。它负责：

- 持有聊天渠道连接
- 维护会话和路由状态
- 承接控制面客户端
- 接入节点设备
- 对外暴露统一的 WebSocket 协议

从官方文档看，最重要的架构约束之一是：

- **每台主机只运行一个 Gateway**
- **它是唯一持有某些渠道会话的地方**

这也是为什么 OpenClaw 适合被理解成“网关系统”，而不是“网页聊天应用”。

## 架构里的三类核心角色

### 1. Gateway

Gateway 是 daemon，也是整个系统的中心。根据官方文档，它会：

- 持续维护 provider 连接
- 对外提供类型化的 WebSocket API
- 校验进入系统的协议帧
- 发送 `agent`、`chat`、`presence`、`health`、`heartbeat`、`cron` 等事件

默认情况下，它绑定在：

```text
127.0.0.1:18789
```

这也是本地 dashboard 和大多数控制面客户端默认访问的地址。

### 2. Control-plane 客户端

控制面客户端包括：

- CLI
- Web / Dashboard
- macOS app
- 自动化客户端

它们不直接“拥有系统状态”，而是通过 WebSocket 连接到 Gateway，读取状态、发起配置或执行操作。

### 3. Nodes

Nodes 是另一类通过 WebSocket 接入 Gateway 的设备。官方文档当前把它们描述为：

- macOS
- iOS
- Android
- headless nodes

它们连接时会声明 `role: node`，并带上自己的 capabilities / commands。这样 Gateway 就能把 Canvas、相机、语音、浏览器等能力分发到具体节点上。

## 这套架构是怎么流动的

可以把官方结构简化成下面这条链路：

1. 用户通过聊天渠道、dashboard 或客户端接触 OpenClaw
2. 所有请求先进入 Gateway
3. Gateway 负责会话、路由、认证和事件分发
4. 如果需要节点能力，再由 Gateway 转发给 nodes
5. 响应再统一回到当前入口

这意味着：

- 聊天面只是入口
- Gateway 才是真正的运行中心
- 节点能力和控制面都只是围绕 Gateway 展开

## 为什么官方强调“一个 Gateway”

因为某些渠道连接本身就要求集中管理。官方文档明确提到：

- 每台主机只应有一个 Gateway
- 它是唯一打开某些会话的地方

如果你把 OpenClaw 理解成多个独立客户端，就容易在配渠道、做远程访问或排错时犯方向性错误。正确理解是：

- 一个 Gateway
- 多个入口
- 多个控制面客户端
- 可选的多个节点设备

## Remote access 在架构里意味着什么

官方 remote access 文档强调，远程使用 OpenClaw 的核心不是“把服务随便暴露出去”，而是：

- Gateway 继续留在专用主机上
- 客户端通过 SSH tunnel 或 Tailscale 接入
- Gateway 尽量保持 loopback 绑定

这背后的架构原则是：**状态和会话尽量集中在 Gateway 所在主机，客户端只做连接和控制**。

## 官方文档里几个重要的架构不变量

根据官方 Gateway Architecture，目前最值得记住的几个不变量是：

- Gateway 是长生命周期进程
- 握手是强制的，协议帧必须先完成连接流程
- 事件不会自动重放，客户端在丢失时需要主动刷新
- Start / status / dashboard / health 都应围绕同一个 Gateway 看

## 对中文用户最重要的意义

理解这套架构后，你会更容易理解下面这些问题：

- 为什么 `openclaw status` 比“某个页面能不能打开”更重要
- 为什么 dashboard 属于控制面，而不是唯一入口
- 为什么远程访问首选 SSH/Tailscale，而不是直接公网暴露
- 为什么新增渠道时要先确认 Gateway 状态和认证边界

## 一张适合记忆的简化图

可以把 OpenClaw 记成这样：

- **Gateway**：系统中心
- **Channels**：消息入口
- **Dashboard / CLI / App**：控制面
- **Nodes**：设备能力扩展
- **Auth / Tailscale / SSH**：安全接入层

## 下一步推荐

- [OpenClaw 安装与环境](/docs/setup/installation)
- [渠道能力概览](/docs/manual/channels-overview)
- [Control UI 是什么](/docs/manual/control-ui)
- [安全配置基础](/docs/operations/safety-basics)
