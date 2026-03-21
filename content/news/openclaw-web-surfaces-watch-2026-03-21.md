---
title: OpenClaw Web 入口观察：Dashboard、WebChat 与 Gateway WebSocket 正在收敛成一套更清晰的使用分工
description: 基于 2026 年 3 月 21 日可见的官方 Dashboard、WebChat 与架构文档，整理最近最值得中文站关注的 Web 入口变化：Dashboard 的快速打开、WebChat 的 Gateway 直连，以及控制面和聊天面的职责分离。
category: 生态动态
date: 2026-03-21
author: OpenClawCN
source: https://docs.openclaw.ai/web/dashboard
sourceName: OpenClaw Docs
updatedAt: 2026-03-21
sourceType: official
tags: [dashboard, webchat, websocket, control-ui, web]
---

# OpenClaw Web 入口观察：Dashboard、WebChat 与 Gateway WebSocket 正在收敛成一套更清晰的使用分工

截至 **2026 年 3 月 21 日**，官方在 Web 入口这条线上最值得注意的，不是又多了一个页面，而是职责边界已经越来越清晰了。

把最近的 Dashboard、WebChat 和架构文档放在一起看，会发现官方正在把 Web 入口收敛成一套更明确的分工：

- Dashboard 是管理面
- WebChat 是聊天面
- 两者都围绕同一个 Gateway WebSocket 工作

## 1. Dashboard 现在更像正式管理入口

从官方最近的 Dashboard 文档能看出几个很明确的方向：

- 默认挂在 `/`
- `openclaw dashboard` 成为推荐快速入口
- token 打开链路和浏览器保存行为被写得更清楚

这说明 Dashboard 已经不再只是“顺手有个网页”，而是在被官方认真当作管理面建设。

## 2. WebChat 的定位也明显收紧了

官方当前 WebChat 文档不再把它描述成某种“额外前端服务”，而是强调：

- 它是 Gateway WebSocket UI
- 历史和状态都来自 Gateway
- 远程使用也不需要单独跑 WebChat server

这意味着 WebChat 的产品定位正在被越讲越清楚：

- 它是聊天入口
- 不是独立部署系统

## 3. 官方正在把“控制面”和“聊天面”刻意拆开

这可能是这一轮文档里最值得中文站跟进的变化。

以前很多人会把：

- dashboard
- webchat
- browser ui

都混成“一堆网页入口”。

但现在官方实际上已经在做更明确的职责拆分：

- Control UI / Dashboard 负责管理
- WebChat 负责聊天
- 更底层共同依赖 Gateway WS

从产品成熟度看，这是一个非常好的信号。

## 4. 架构文档也在帮这条线定性

官方 Gateway 架构文档当前明确指出：

- 控制平面客户端通过 Gateway WS 工作
- 节点也通过 WS 工作
- 单个 Gateway 统一持有所有消息面

这说明 Web 入口的清晰化，不是 UI 文案变化，而是和整体架构是一致的。

## 这批变化对中文站最有价值的地方

这对中文站很重要，因为很多中文用户第一次会天然把“网页”理解成一套独立服务。

而官方最近这批文档已经在告诉我们：

- 不是又多了一套网页系统
- 而是同一个 Gateway 上的不同使用面

这会显著帮助用户理解：

- 为什么 WebChat 会话在 Gateway
- 为什么 Dashboard 是高权限入口
- 为什么远程使用时应该优先先把 Gateway WS 和 auth 搞对

## 中文站建议怎么跟进

如果你想顺着这条线继续理解，建议这样看：

1. 想先搞清管理入口：看 [Dashboard 快速打开与认证行为](/docs/manual/dashboard-fast-path-and-auth)
2. 想先搞清聊天入口：看 [WebChat 的会话与只读边界](/docs/manual/webchat-session-and-readonly-mode)
3. 想在真实使用里做选择：再看 [Web 入口怎么选：Dashboard、WebChat、message CLI](/best-practices/web-entry-selection)

这批官方变化最值得注意的，不是“页面更多了”，而是 Web 入口终于越来越像一套清晰的产品分工，而不是松散拼起来的几个界面。
