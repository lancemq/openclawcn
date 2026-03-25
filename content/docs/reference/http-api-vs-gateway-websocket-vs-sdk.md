---
title: HTTP API、Gateway WebSocket 和 SDK 应该怎么分工
description: 基于最新官方 API 与 Web 文档，解释 OpenClaw 里 HTTP API、Gateway WebSocket 和 SDK 各自适合什么场景，帮助团队判断当前到底应该走管理接口、实时会话层还是语言 SDK。
category: 参考
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/api/v2
sourceName: OpenClaw Docs
sourceType: official
tags: [api, websocket, sdk, gateway, reference]
---

# HTTP API、Gateway WebSocket 和 SDK 应该怎么分工

现有中文资料里，很多人第一次接 OpenClaw 集成时，会把下面三层都叫“API”：

- HTTP API
- Gateway WebSocket
- SDK

但最近官方文档已经把它们的边界写得越来越清楚了。  
如果这三层不分清，后面集成方式很容易一开始就选重或选错。

## 先记住一句话

- HTTP API 更适合管理和明确请求
- Gateway WebSocket 更适合实时会话与流式交互
- SDK 更适合把上面两层包进语言工作流

## HTTP API 更适合什么

更适合走 HTTP API 的场景通常是：

- 明确资源访问
- 后台管理
- 状态查询
- 批处理调用
- 服务对服务集成

它更像：

- 结构化接口层

而不是实时交互面。

## Gateway WebSocket 更适合什么

当前官方 Web 和 Gateway 相关文档都在强调：

- WebSocket 是实时聊天和事件流的核心数据面

它更适合：

- 实时消息往返
- 流式输出
- 会话级交互
- UI 实时更新

所以像：

- WebChat
- 某些控制型聊天入口

本质上都更接近这一层。

## SDK 更适合什么

SDK 的价值不是再造一套协议，而是把：

- HTTP API
- WebSocket
- 认证
- 常用调用模式

封成语言侧更容易复用的客户端。

它更适合：

- 应用内嵌
- 工程内复用
- 多接口组合调用

## 为什么这三层不该混着选

因为它们优化的目标不同。

例如：

- 如果你只是要查状态，用 WebSocket 往往过重
- 如果你要实时会话流式响应，纯 HTTP 往往不顺手
- 如果你是团队工程接入，直接手写所有 HTTP/WS 客户端又过于分散

## 一个更容易落地的判断法

### 你要“查”和“管”

优先看：

- HTTP API

### 你要“聊”和“流”

优先看：

- Gateway WebSocket

### 你要“嵌进程序里长期复用”

优先看：

- SDK

## 为什么 WebChat 不是“另一套 API”

官方 Web 文档最近已经把这件事写得很清楚：

- WebChat 直接连 Gateway WebSocket

这说明它不是一套独立后端，而是：

- WebSocket 会话层的 UI 表现

## 为什么 SDK 也不该被当成“唯一官方路径”

SDK 很适合工程接入，但它不是唯一入口。  
如果你当前只是：

- 做一次简单探活
- 拉一次状态
- 做轻量自动化

直接 HTTP API 可能更合适。

## 中文团队最容易踩的坑

### 1. 把实时聊天也先做成纯 REST

后面通常会在流式和会话连续性上补很多额外逻辑。

### 2. 小脚本也先上 SDK

有时反而把简单事情做重。

### 3. 把 WebSocket 当成所有接口的统一替代

实时层和管理层不该混用。

## 一条更稳的选择顺序

1. 先判断你要的是管理、实时还是工程集成
2. 管理优先 HTTP API
3. 实时优先 Gateway WebSocket
4. 长期工程复用再上 SDK

## 下一步推荐

- [API 与参考资料阅读入口](/docs/reference/api-reference-overview)
- [Gateway 命令与 RPC 该怎么用](/docs/reference/gateway-cli-and-rpc)
- [API 集成面该怎么选：管理、实时还是嵌入式开发](/best-practices/api-surface-selection)

