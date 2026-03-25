---
title: "OpenClaw 语音观察：全局 wake words 与设备本地 toggle 的分层正在变清楚"
description: "基于 2026 年 3 月 25 日可见的官方 Voice Wake 文档，最近语音层最值得关注的变化之一是 Gateway 级词表与设备本地开关的边界正在被官方主动强调。"
category: 生态观察
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/nodes/voice-wake"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["voice", "wake-word", "talk-mode", "nodes", "devices"]
---

最近这轮官方 Voice Wake 文档里，一个很值得中文团队单独关注的点是：

- 语音入口不是单设备小功能

官方最近越来越明确地在强调两层边界：

- Gateway 持有全局 wake words
- 每台设备自己决定是否启用监听

## 1. 词表共享和设备开关不是同一层

这意味着 OpenClaw 的语音体验，正在从“某个 app 记一个热词”走向：

- 系统共享行为
- 设备本地执行边界

## 2. Talk Mode 也更像设备入口，而不是普通聊天替代

官方最近这条线越写越清楚以后，语音不再只是“输入方式换一下”，而是：

- 更自然的设备入口
- 更高敏感度的触发面

## 3. 这会改变启用顺序

如果以前很多人会先想着“全设备一起开”，现在更稳的顺序应该反过来：

1. 先一台设备试
2. 先验证误唤醒和权限
3. 再考虑跨设备共享

## 推荐延伸阅读

- [语音唤醒与 Talk Mode](/docs/manual/voice-wake-and-talk-mode)
- [团队里如何渐进启用 node 能力](/best-practices/node-capability-rollout)
- [Nodes 与设备能力](/docs/manual/nodes-and-device-actions)

