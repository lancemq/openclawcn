---
title: API 集成面该怎么选：管理、实时还是嵌入式开发
description: 结合最新官方 API、Gateway Web 与 SDK 文档，整理一套更稳的接口面选择方法，帮助团队区分什么时候走 HTTP API、什么时候走 Gateway WebSocket、什么时候用 SDK。
category: 开发治理
difficulty: 中高级
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/api/v2
sourceName: OpenClaw Docs
sourceType: official
tags: [api, websocket, sdk, integration, architecture]
---

# API 集成面该怎么选：管理、实时还是嵌入式开发

很多团队在接 OpenClaw 集成时，第一个技术决定往往不是“能不能接”，而是：

- 应该从哪一层接

最近官方文档已经把这三层写得更清楚了：

- HTTP API
- Gateway WebSocket
- SDK

## 第一原则：先按交互形态选，不要先按熟悉度选

更稳的默认判断通常是：

- 管理与资源访问 -> HTTP API
- 实时会话与流式交互 -> Gateway WebSocket
- 程序内长期复用 -> SDK

很多集成一开始走重，问题不在接口不够，而在选择顺序不对。

## 第二原则：管理面和实时面分开

如果你现在主要要做的是：

- 拉状态
- 查会话
- 做后台集成

那就不该先把一整套 WebSocket client 搭起来。

反过来，如果你要的是：

- 类似 WebChat 的实时交互
- 流式展示
- 即时事件回流

那也不该强行全走同步式 HTTP。

## 第三原则：SDK 是工程收口层，不是所有场景的默认入口

SDK 很适合：

- 中大型工程
- 多调用面统一封装
- 应用内嵌入

但如果你只是：

- 验证一个接口
- 写一次性脚本
- 做轻量告警或状态采集

直接走 HTTP 反而更清楚。

## 一个更实用的判断矩阵

### 选 HTTP API

适合：

- 管理动作
- 查询动作
- 批处理
- 服务对服务

### 选 Gateway WebSocket

适合：

- 实时聊天
- 流式输出
- 会话驱动 UI
- 事件驱动前端

### 选 SDK

适合：

- 持续工程集成
- 多接口组合
- 语言内封装和复用

## 最容易踩的坑

### 1. 小集成直接上 SDK

会把简单问题做得过重。

### 2. 实时聊天先做成纯 REST

后面通常要额外补很多流式和状态逻辑。

### 3. 把 WebSocket 当成管理接口总线

这会让职责越来越乱。

## 一条更稳的实施顺序

1. 先做最小 HTTP 探活
2. 确认是否真的需要实时流
3. 真要长期嵌入时再选 SDK

## 下一步推荐

- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
- [API 与参考资料阅读入口](/docs/reference/api-reference-overview)
- [Gateway 命令与 RPC 该怎么用](/docs/reference/gateway-cli-and-rpc)

