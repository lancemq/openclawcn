---
title: WebChat、API 和控制面入口的边界怎么分
description: 基于最新官方 WebChat、Session 和 API 文档，解释 WebChat 为什么更像会话 UI、HTTP API 为什么更像结构化管理面，以及 Dashboard 为什么仍然属于高权限控制面。
category: 功能
updatedAt: 2026-03-26
source: https://docs.openclaw.ai/web/webchat
sourceName: OpenClaw Docs
sourceType: official
tags: [webchat, api, dashboard, gateway, workflows]
---

# WebChat、API 和控制面入口的边界怎么分

中文团队在做 OpenClaw 集成时，很容易把几类完全不同的入口都叫成“前端”或“API”：

- Dashboard
- WebChat
- HTTP API
- Gateway WebSocket

但最近官方文档把它们的职责写得越来越清楚了。  
如果压成一句更有用的话，就是：

- Dashboard 是控制面
- WebChat 是会话 UI
- API 是结构化集成面

## Dashboard 在回答什么问题

Dashboard 更像在回答：

- 这个系统现在处于什么状态
- operator 该如何进入管理面
- 当前实例和认证链路是否正常

所以它属于：

- admin surface

而不是普通聊天入口。

## WebChat 在回答什么问题

WebChat 更像在回答：

- 我能不能围绕某个选定 agent 直接进行实时对话
- 当前会话怎样稳定回流到这一个聊天面

官方现在写得很明确：

- replies always go back to WebChat

这意味着它更像：

- Gateway WebSocket 会话层的确定性 UI

而不是跨多个消息面的总入口。

## HTTP API 在回答什么问题

HTTP API 更像在回答：

- 某个资源现在是什么状态
- 某次结构化请求应该返回什么结果

它更适合：

- 服务对服务
- 状态读取
- 明确的管理与调用

而不是需要持续流式交互和会话回流的场景。

## 为什么 WebSocket 又不能和 WebChat 混成一层

WebSocket 是：

- 实时数据面

WebChat 是：

- 基于这层数据面的浏览器 UI

两者相关，但不是同一层。  
这也解释了为什么你可以：

- 自己做一个 WS 客户端

但它并不自动等于：

- 你已经拥有了 WebChat 的全部交互语义

## Gateway 为什么在这四层上都还是中心

官方 Session 文档最近把一条边界写得很清楚：

- Gateway is the source of truth

所以更稳的理解始终是：

- Dashboard 围绕 Gateway 管理状态
- WebChat 围绕 Gateway 做会话 UI
- API 围绕 Gateway 暴露结构化接口

这三类入口都不是脱离 Gateway 自己独立持久化真相的系统。

## 一个更容易落地的判断法

### 你要“看系统”和“管系统”

优先看：

- Dashboard / Control UI

### 你要“稳定聊一轮并实时回流”

优先看：

- WebChat / Gateway WebSocket

### 你要“给程序接一层稳定接口”

优先看：

- HTTP API / SDK

## 中文环境里最容易踩的坑

### 1. 用 Dashboard 当普通聊天入口

它的定位还是控制面。

### 2. 拿 WebChat 当结构化集成接口

它更像会话 UI，不是集成 API。

### 3. 以为 API 返回就等于拿到了 UI 的全部语义

管理面、会话面和集成面并不等形。

## 下一步推荐

- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
- [WebChat 更适合当什么，不适合当什么](/best-practices/webchat-operator-usage-policy)
