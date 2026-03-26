---
title: "OpenClaw 正在把 WebChat、Dashboard 和 API 的入口职责写得更清楚"
description: "官方最近围绕 WebChat、Session 和 API 的写法，让 Dashboard 更像控制面、WebChat 更像会话 UI、API 更像结构化集成面，入口分工正在变得更稳定。"
category: "生态观察"
date: "2026-03-26"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/web/webchat"
updatedAt: "2026-03-26"
sourceType: "official"
tags: ["webchat", "dashboard", "api", "gateway", "workflows"]
---

OpenClaw 最近这轮文档补强里，一个很清楚的趋势是：不同入口的职责正在被越写越清楚。

如果压成一句更好记的话，就是：

- Dashboard 更像控制面
- WebChat 更像会话 UI
- API 更像结构化集成面

这件事对中文站很值，因为很多团队过去会把这些入口都混叫成“前端”。

## 1. Dashboard 不再适合被理解成聊天页

随着 auth bootstrap、token drift 和 admin surface 的写法越来越细，Dashboard 的定位已经更明显偏向：

- 管理与进入控制面

## 2. WebChat 正在被写成确定性会话面

官方现在一直在强调：

- replies always go back to WebChat
- history 是 bounded view

这会让 WebChat 更像：

- 围绕某个选定 agent 的实时对话 UI

而不是总消息枢纽。

## 3. API 的角色也更结构化了

随着 API v2 和相关文档逐步稳定，HTTP API、WebSocket 和 SDK 的边界也越来越清楚：

- 管理层
- 实时层
- 语言封装层

不再适合被混叫成同一种“接口”。

## 推荐延伸阅读

- [WebChat、API 和控制面入口的边界怎么分](/docs/manual/webchat-api-and-control-surface-boundaries)
- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
- [先分清入口职责，再选 Dashboard、WebChat 还是 API](/best-practices/gateway-entry-surface-matrix)
