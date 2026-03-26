---
title: UI 和 API 看到的状态对不上时，先查哪一层
description: 结合最新官方 Session、WebChat 和 API 文档，整理一套更稳的排障顺序，帮助团队区分 Gateway 事实层、UI 投影视图和结构化接口之间的差异。
category: 运维实践
difficulty: 中级
updatedAt: 2026-03-26
source: https://docs.openclaw.ai/session
sourceName: OpenClaw Docs
sourceType: official
tags: [gateway, webchat, api, debugging, session]
---

# UI 和 API 看到的状态对不上时，先查哪一层

OpenClaw 一旦开始同时使用 Dashboard、WebChat、API 和 CLI，最容易出现的一类排障问题就是：

- 不同入口看到的状态对不上

这时最危险的做法是直接问：

- 到底哪个是错的

更稳的做法应该是先判断：

- 它们分别在看哪一层

## 1. 先回到 Gateway 事实层

官方现在已经把边界说得很清楚：

- Gateway is the source of truth

所以只要状态打架，第一步就应该是确认：

- 当前 Gateway 主机是谁
- session store 和 transcript 落在哪里

## 2. 再判断 UI 是不是只是在看投影视图

WebChat 这一层尤其要注意：

- history 是 bounded 的
- inject / partial abort 也会影响展示形态

所以 UI 看到的不完整，不等于底层事实真的缺失。

## 3. 再判断 API 看到的是不是结构化状态

HTTP API 更偏资源和结构化返回。  
这意味着它和 UI 的目标本来就不同：

- UI 为交互稳定服务
- API 为结构化集成服务

如果两者不完全等形，不要第一时间把它理解成 bug。

## 一条更稳的排障顺序

建议按这个顺序走：

1. 先确认 Gateway 事实层
2. 再看 UI 是否只是 bounded 视图
3. 再看 API 是否只返回结构化状态
4. 最后才判断是不是真的有状态漂移

## 下一步推荐

- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [WebChat 的 history、inject 和展示边界](/docs/reference/webchat-history-and-inject-boundaries)
- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
