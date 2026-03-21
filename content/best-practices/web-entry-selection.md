---
title: Web 入口怎么选：Dashboard、WebChat、message CLI
description: 结合最新官方 Dashboard、WebChat 和 CLI 文档，总结什么时候该用 Dashboard、什么时候用 WebChat、什么时候更适合用 openclaw message 做验证与自动化。
category: 使用实践
difficulty: 初级
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/web/dashboard
sourceName: OpenClaw Docs
sourceType: official
tags: [dashboard, webchat, cli, web, workflows]
---

# Web 入口怎么选：Dashboard、WebChat、message CLI

OpenClaw 的 Web 和直接交互入口现在已经不只一个了，所以很多中文用户第一次会有一个真实困惑：

- 我到底该先打开 dashboard，还是进 WebChat，还是直接跑命令？

官方最近几页文档拼起来，其实已经能得到一个很清晰的答案：这三个入口都对，但职责不同。

## Dashboard 更适合什么

Dashboard 最适合：

- 第一次确认系统是否健康
- 看 onboarding 是否完成
- 看配置、节点、审批和控制面状态

也就是说，它更像：

- 管理入口

如果你现在的问题是：

- OpenClaw 到底起没起
- auth 是否正确
- 控制面能不能进

那就优先 Dashboard。

## WebChat 更适合什么

WebChat 更适合：

- 直接做聊天链路验证
- 不想依赖外部 IM 平台
- 想在 Gateway 自带聊天面里看会话行为

它更像：

- 系统内建聊天入口

如果你现在的问题是：

- 聊天链路是否成立
- transcript 行为是否正常

那就优先 WebChat。

## `openclaw message` 更适合什么

`openclaw message` 更适合：

- 单次 outbound 测试
- 自动化通知
- CI 或脚本场景

它更像：

- 命令式出站层

如果你现在的问题是：

- 某个渠道能不能成功发出去
- 我想从脚本里统一发消息

那它通常比手工聊天更合适。

## 三者最容易混淆的地方

最常见的误解通常是：

- 把 Dashboard 当聊天入口
- 把 WebChat 当独立网站
- 把 `message` 当完整 agent 会话替代

更准确的理解应该是：

- Dashboard 偏管理
- WebChat 偏交互
- `message` 偏动作

## 更稳的默认使用顺序

如果你是第一次配置或第一次排错，推荐顺序通常是：

1. 先 `openclaw dashboard`
2. 再用 WebChat 验证聊天链路
3. 渠道配好后再用 `openclaw message` 做一次明确出站测试

这样你能把：

- 管理面问题
- 聊天问题
- 渠道出站问题

拆开看。

## 中文站建议怎么记

如果要用一句最短的话概括：

- 看系统，用 Dashboard
- 试对话，用 WebChat
- 做脚本或通知，用 `openclaw message`

只要先把这三句记住，很多“我到底该从哪个入口验证”的困惑都会少很多。

## 下一步推荐

- [Dashboard 快速打开与认证行为](/docs/manual/dashboard-fast-path-and-auth)
- [WebChat 的会话与只读边界](/docs/manual/webchat-session-and-readonly-mode)
- [远程打开 Control UI 的正确方式](/docs/operations/control-ui-remote-access)

把这几页连起来看，Web 入口会更容易形成清晰分工。
