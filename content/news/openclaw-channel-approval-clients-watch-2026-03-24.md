---
title: "OpenClaw 渠道观察：Telegram 和 Discord 正在从聊天入口扩展成正式审批面"
description: "基于 2026 年 3 月 24 日可见的官方 Exec Approvals 文档，Telegram 与 Discord 最近最值得关注的变化不是又多了一个命令，而是它们已经开始承担受控审批入口。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/tools/exec-approvals"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["telegram", "discord", "approvals", "channels", "operators"]
---

如果只把 Telegram 和 Discord 看成聊天渠道，可能已经落后于最近官方文档的重点。

根据当前官方 Exec Approvals 文档，这两个渠道最近更值得关注的变化是：

- 它们正在成为正式的审批入口

## 1. 审批面不再只在本地控制台

官方当前已经明确支持：

- Discord 作为 exec approval client
- Telegram 作为 exec approval client

这说明高权限执行的人工门，已经不再只停留在本地 UI，而是在向远程 operator 体系扩展。

## 2. 聊天入口和审批入口正在被主动区分

官方文档有一条很关键的边界：

- 某个渠道没有显式启用 exec approvals，就不会因为当前聊天发生在这个渠道里而自动成为审批面

这意味着 OpenClaw 不是在把聊天面无限泛化，而是在让审批面继续保持显式配置。

## 3. Telegram 更像受控 DM 审批面

当前官方文档对 Telegram 的默认描述更偏：

- approver DMs

这很像一种明确倾向：

- 优先受控、点对点、少数 operator

而不是先把审批请求铺到开放群里。

## 4. Discord 更像团队值守面

相比 Telegram，Discord 更容易自然长成：

- operator 频道
- 团队值守面
- 多成员协作审批面

但这也意味着它更需要提前想清：

- 哪些频道能看
- 哪些成员能批

## 这对中文团队意味着什么

最近这轮官方信号的重点，不是“又多支持一个渠道能力”，而是：

- 渠道正在进入控制面

一旦这条线成立，团队后面要思考的就不只是消息接入，而是：

- 审批权如何收敛
- 通知面和批准面如何分开
- 远程值守如何设计

## 推荐延伸阅读

- [Telegram 和 Discord 作为审批入口时该怎么收边界](/docs/manual/telegram-discord-approval-clients)
- [远程值守时如何设计聊天审批路由](/best-practices/remote-approval-routing)
- [Exec approvals 转发到聊天渠道该怎么设计](/docs/operations/chat-approval-forwarding)

