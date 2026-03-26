---
title: "OpenClaw 正在把 Gateway 的 session source-of-truth 地位写得更明确"
description: "官方最新 Session 文档更明确地说明 session store、JSONL transcript 和 token 计数都应围绕 Gateway 理解，这会直接影响 WebChat、Dashboard 和远程 operator 的排障方式。"
category: "生态观察"
date: "2026-03-26"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/session"
updatedAt: "2026-03-26"
sourceType: "official"
tags: ["gateway", "session", "webchat", "dashboard", "state"]
---

OpenClaw 最近这轮 Session 文档，一个很值得中文团队注意的变化是：Gateway 的 source-of-truth 地位被写得更明确了。

官方当前明确强调：

- session state is owned by the gateway
- token counts 应来自 gateway store fields
- UI clients 不应自己去修 transcript totals

这会让很多“为什么不同入口看见的状态不一样”的问题，第一次更容易按层排。

## 1. Gateway 正在被更明确地写成事实层

随着 session store 和 transcript 落点被说清，Gateway 不再只是连接中心，而更明确是：

- 会话事实层

这对 remote mode 特别重要，因为它会直接提醒你：

- 真正要看的 store 在远程 gateway 主机，不在本机 operator 设备上

## 2. UI 和 API 都更像围绕事实层工作的投影

这条写法也会反过来改变 WebChat、Dashboard 和 API 的理解方式：

- 它们不是各自维护一套真相
- 它们都在围绕 Gateway 状态工作

## 推荐延伸阅读

- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [UI 和 API 看到的状态对不上时，先查哪一层](/best-practices/ui-vs-api-state-debugging)
- [Remote Operators 与多设备协作](/docs/operations/remote-operators-and-nodes)
