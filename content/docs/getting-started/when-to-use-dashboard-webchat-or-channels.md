---
title: Dashboard、WebChat 和聊天渠道分别什么时候用
description: 把 OpenClaw 最常见的三个使用入口拆开，帮助你判断什么时候该进 Dashboard，什么时候该用 WebChat，什么时候才值得接入 Telegram、飞书或 WhatsApp。
category: 入门
updatedAt: 2026-03-23
sourceType: internal
tags: [dashboard, webchat, channels, decision, getting-started]
---

# Dashboard、WebChat 和聊天渠道分别什么时候用

OpenClaw 跑起来之后，很多人最先混淆的不是模型，而是入口。

最常见的三个入口是：

- Dashboard
- WebChat
- 聊天渠道，例如 Telegram、飞书、WhatsApp

它们都能“进入 OpenClaw”，但适合的任务完全不同。

## 什么时候先用 Dashboard

如果你现在关心的是“系统是否正常、配置是否就绪、管理面能不能打开”，先用 Dashboard。

它更适合这些场景：

- 第一次安装后检查系统是否跑通
- 确认 Gateway、认证和基础状态
- 需要进入管理面查看整体情况
- 需要做浏览器侧的管理动作

一句话：
如果你现在更像在“确认系统状态”，就先去 Dashboard。

## 什么时候更适合用 WebChat

如果你已经不只是想看状态，而是想快速和当前实例对话、验证上下文或测试只读访问，WebChat 往往更顺手。

它更适合这些场景：

- 想直接试一句话能不能正常响应
- 想验证当前会话和历史展示是否合理
- 想从浏览器里快速进入聊天，而不是先配一个外部渠道
- 想给协作者一个受限的 Web 入口

一句话：
如果你的目标是“先聊一聊、先测一测”，通常 WebChat 比直接接渠道更轻。

## 什么时候才值得接聊天渠道

当你已经确认：

- 基础实例稳定运行
- Dashboard 和 WebChat 都正常
- 你明确知道自己需要哪个外部场景

这时再接 Telegram、飞书、WhatsApp 或 Discord 会更稳。

它更适合这些场景：

- 需要把 OpenClaw 带进日常沟通软件
- 需要给团队成员一个固定入口
- 需要在真实消息流里验证路由、上下文和通知节奏
- 需要把自动化或审批接到工作沟通里

一句话：
只有当你确定“入口必须嵌入真实工作流”时，渠道接入才值得开始。

## 最常见的误区

### 一跑起来就去接渠道

这样最容易把“系统没跑稳”和“渠道没配对”混在一起，排错成本会明显变高。

### 把 Dashboard 当成长期聊天入口

Dashboard 更像控制面和状态面，不是最自然的日常聊天入口。

### 把 WebChat 当成渠道替代品

WebChat 很适合测试、受限访问和轻量协作，但它不等于完整渠道接入。

## 一张最短判断表

- 看状态、查管理面：去 Dashboard
- 先测试聊天和上下文：去 WebChat
- 进入真实沟通软件：再接渠道

## 如果你现在还拿不准

建议顺序是：

1. 先确认 Dashboard 正常
2. 再用 WebChat 完成最小对话验证
3. 最后再进入 Telegram、飞书、WhatsApp 等渠道

这样比一开始就直接接渠道更容易把问题拆清楚。

## 下一步推荐

- [我什么时候该开始接入渠道](/docs/getting-started/when-to-connect-channels)
- [Control UI 是什么](/docs/manual/control-ui)
- [WebChat、Message CLI 与浏览器聊天入口](/docs/manual/webchat-and-message-cli)
