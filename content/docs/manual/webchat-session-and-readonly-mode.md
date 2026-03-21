---
title: WebChat 的会话与只读边界
description: 基于最新官方 WebChat 文档，整理 WebChat 如何共享 Gateway 会话、chat.inject 和 abort partial 是什么，以及 Gateway 不可达时为什么会进入只读模式。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/web/webchat
sourceName: OpenClaw Docs
sourceType: official
tags: [webchat, sessions, websocket, readonly, chat]
---

# WebChat 的会话与只读边界

站里已经有一页讲 WebChat，但官方最近这页更值得承接的，不只是“它能聊天”，而是它已经把 WebChat 的数据平面和会话边界说得非常清楚了。

最值得记住的几个点是：

- WebChat 直接连 Gateway WebSocket
- 历史记录始终来自 Gateway
- Gateway 不可达时会进入只读

## WebChat 现在到底是什么

根据最新官方文档，WebChat 的定位非常明确：

- 它不是独立本地静态站点
- 也不是一个和 Gateway 脱钩的网页壳
- 它是 Gateway WebSocket 的聊天 UI

所以正确的理解应该是：

- 会话在 Gateway
- 历史在 Gateway
- 路由也在 Gateway

## 它到底用了哪些 WS 能力

官方当前明确列了几类关键方法：

- `chat.history`
- `chat.send`
- `chat.inject`
- `chat.abort`

这说明 WebChat 不只是“发一条消息等回复”，而是一个正式的控制型聊天入口。

## `chat.history` 为什么值得单独理解

官方文档当前特别说明：

- `chat.history` 是有界的
- 过长文本可能被截断
- 过重 metadata 可能被省略
- 超大消息可能被替换成提示占位

这意味着历史记录视图并不是“无条件完整搬运原始数据”，而是为稳定性做了限制。

对中文站用户来说，这点很有价值，因为它能解释很多“为什么我记得之前有，但这里没完整显示”的现象。

## `chat.inject` 到底是什么

这是官方最近比较值得注意的一点。

`chat.inject` 的作用不是跑一轮 agent，而是：

- 直接把 assistant note 插进 transcript
- 同时广播给 UI

也就是说，它更像：

- 管理面或系统级注入消息

而不是普通用户输入。

## abort partial 为什么会留在会话里

官方文档现在明确提到：

- 被中止的运行如果已经有缓冲输出
- 这些 partial assistant text 仍可能写进 transcript
- 并带上 abort metadata

这对排障很关键，因为它意味着：

- “中断了”不等于什么都没留下
- 你在 UI 里看到的半截回复，可能就是系统故意保留的运行痕迹

## 为什么 Gateway 不可达时会变成只读

官方当前写得很直接：

- 如果 Gateway 不可达，WebChat 会进入 read-only

这不是退化 bug，而是一个非常合理的系统选择，因为：

- 历史本来就来自 Gateway
- 发消息也依赖 Gateway

既然数据平面不在本地，它自然不适合伪装成“还能正常写入”。

## Remote use 为什么不需要另起 WebChat server

官方文档这次也把一条很实用的误区直接澄清了：

- remote mode 只需要隧道转发 Gateway WebSocket
- 不需要单独再跑一个 WebChat server

这意味着远程 WebChat 的核心不是再部署一个页面，而是把 Gateway 连通性和 auth 处理正确。

## 中文站建议怎么理解 WebChat

更适合把它看成：

- 一个围绕 Gateway 会话工作的聊天入口
- 不是独立前端系统
- 也不是“简化版 dashboard”

如果你知道它的数据和状态都在 Gateway，那很多行为就会更容易理解。

## 下一步推荐

- [Dashboard 快速打开与认证行为](/docs/manual/dashboard-fast-path-and-auth)
- [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
- [Web 入口怎么选：Dashboard、WebChat、message CLI](/best-practices/web-entry-selection)

这几页连起来看，会更容易分清“聊天入口”和“控制面”。
