---
title: Gateway WebSocket 的 role 和 scope 应该怎么理解
description: 基于最新官方 Gateway Protocol 文档，解释 OpenClaw 的 WebSocket 握手里 role、scopes、client mode 和协议版本各自在声明什么，以及为什么这条连接已经是统一控制面而不只是聊天通道。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/gateway/protocol
sourceName: OpenClaw Docs
sourceType: official
tags: [gateway, websocket, protocol, scopes, reference]
---

# Gateway WebSocket 的 role 和 scope 应该怎么理解

OpenClaw 最近的 `Gateway Protocol` 文档把一个很关键的事实写得更清楚了：

- WebSocket 不是单纯聊天连接

它已经是：

- 统一控制面
- node 传输面
- 多客户端共享的协议面

## 先记住官方现在怎么定义它

官方当前直接写的是：

- The Gateway WS protocol is the single control plane + node transport

这句话的意思很重。  
它说明下面这些客户端，本质上都在接同一条协议：

- CLI
- Dashboard / Control UI
- macOS app
- iOS / Android nodes
- headless nodes

## 握手时到底在声明什么

根据最新官方协议文档，连接建立时最重要的一帧是：

- `connect`

这帧里会一起声明：

- `minProtocol` / `maxProtocol`
- `client`
- `role`
- `scopes`

所以 Gateway 不是“看到你连上了再猜你是谁”，而是：

- 一开始就要求你声明自己是什么客户端、想以什么身份连进来

## role 更像“你属于哪类客户端”

官方当前把 role 放在握手顶层，这说明它在表达的不是某个按钮权限，而是：

- 这条连接属于哪种参与者

比如：

- operator
- node

这类区分会直接影响：

- 连接目的
- 可用方法
- 事件流形态

## scopes 更像“这条连接要拿哪些能力面”

role 解决“你是哪类客户端”，scope 则更像：

- 你要读什么
- 你要写什么

官方示例里已经明确出现：

- `operator.read`
- `operator.write`

所以 scope 不是抽象标签，而是：

- 显式能力声明

## `client.mode` 为什么也值得单独看

官方示例还给了一个很值的字段：

- `client.mode`

比如：

- `operator`

它的价值在于，哪怕都属于同一 role，不同客户端仍然可以告诉 Gateway：

- 我现在更像哪种运行模式

这让协议更像：

- 带角色上下文的控制面会话

而不是：

- 一条无差别的消息管道

## 协议版本为什么放在最前面

最新文档里要求第一帧就是 `connect`，并带：

- `minProtocol`
- `maxProtocol`

这说明官方已经把兼容性问题前置成：

- 握手协商

而不是等连接跑起来后再发现：

- UI、CLI、node 说的不是同一种协议

## 这对站点读者最有价值的理解

如果把 Dashboard、WebChat、CLI 和 node 文档一起看，会更容易看清一件事：

- 前台入口不同
- 背后很多能力都在复用同一条 Gateway WebSocket 控制面

所以后面遇到：

- auth
- state
- reply
- tools catalog
- node connectivity

这类问题时，很多时候更该从协议面去理解，而不是只盯着某个 UI。

## 推荐延伸阅读

- [Control UI 的 Tools 面板为什么更像运行时目录，不是静态配置页](/docs/manual/control-ui-tools-catalog-and-policy-precedence)
- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
- [WebChat、API 和控制面入口的边界怎么分](/docs/manual/webchat-api-and-control-surface-boundaries)
