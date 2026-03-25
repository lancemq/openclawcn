---
title: "OpenClaw 集成观察：HTTP API、Gateway WebSocket 与 SDK 的三层接口面正在被官方写清"
description: "基于 2026 年 3 月 25 日可见的官方 API、Web 与 Gateway 文档，最近开发者侧最值得关注的变化之一是不同接口面的分工正在被官方主动拆清。"
category: 生态观察
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/api/v2"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["api", "websocket", "sdk", "gateway", "integration"]
---

最近这轮官方 API 和 Web 文档里，一个很值得中文团队单独关注的变化是：

- OpenClaw 的接口面不再只是“有没有 API”

而是越来越明确地被拆成：

- HTTP API
- Gateway WebSocket
- SDK

## 1. 管理面、实时面和工程封装面开始分层

这意味着集成决策不该再停留在：

- “我们会不会调接口”

而应该继续问：

- “我们到底在接哪一层”

## 2. WebChat 这条线也在帮助官方把 WebSocket 边界讲清

因为官方最近已经很明确地写出：

- WebChat 直接连 Gateway WebSocket

这让实时会话层的角色越来越容易理解。

## 3. SDK 也正在更明确地回到“工程收口层”

这对中文团队尤其重要，因为很多工程会一上来就想“有没有 SDK”。  
但最近官方信号更像是在提醒：

- SDK 很重要
- 但它不是所有场景的第一入口

## 推荐延伸阅读

- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
- [API 集成面该怎么选：管理、实时还是嵌入式开发](/best-practices/api-surface-selection)
- [API 与参考资料阅读入口](/docs/reference/api-reference-overview)

