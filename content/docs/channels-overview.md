---
title: OpenClaw 渠道能力概览
description: 了解 OpenClaw 当前支持的主要聊天渠道、接入方式，以及第一次应该如何选择和配置渠道。
category: 功能
---

# OpenClaw 渠道能力概览

OpenClaw 的一个核心卖点，就是把 AI 代理接到你已经在使用的聊天工具里。官方文档把 Channels 单独做成了一个主模块，原因很简单：在 OpenClaw 里，多渠道不是附属功能，而是核心能力。

## Channels 在 OpenClaw 里到底是什么

OpenClaw 不是“每个聊天应用单独跑一套代理”，而是：

- 用一个 Gateway 持有所有聊天面
- 让不同聊天应用共享同一套代理与路由能力
- 把会话、状态和控制面统一收拢

因此，Channels 的正确理解不是“支持了多少平台”，而是“一个 Gateway 能接多少消息入口”。

## 官方当前支持的主要渠道

根据官方 Channels 文档，当前主要支持这些聊天渠道：

- WhatsApp
- Telegram
- Discord
- IRC
- Slack
- Signal
- BlueBubbles / iMessage
- Google Chat
- Feishu / Lark（插件）
- Mattermost（插件）

不同渠道在文本、媒体、反应、群组和机器人能力上的支持并不完全一样，但文本能力是普遍支持的。

## 几个最常见渠道的特点

### WhatsApp

官方文档里把 WhatsApp 放在非常靠前的位置，也是最常见的入门渠道之一。它使用 Baileys，需要二维码配对。

### Telegram

通过 Bot API 接入，支持群组，对许多第一次尝试远程聊天入口的用户来说上手成本比较低。

### Discord

通过 Discord Bot API + Gateway 接入，支持服务器、频道和私信，适合更偏团队或社区协作的场景。

### Slack

适合工作区内部使用，强调 workspace app 形态。

### Signal

更偏重隐私场景，走 `signal-cli`。

### iMessage / BlueBubbles

官方当前推荐使用 BlueBubbles 作为 iMessage 路径，功能比较完整，但本质上仍依赖对应的 macOS 服务端。

## 第一次接入时最推荐怎么选

不要因为 OpenClaw 支持很多渠道，就在第一次使用时同时把它们都接上。更稳的顺序是：

1. 先完成本地 onboarding
2. 先从 dashboard / Control UI 验证系统状态
3. 再只选一个最常用渠道做第一次配对

如果你已经日常高频使用 WhatsApp 或 Telegram，通常可以优先从其中一个开始。

## 官方 quick start 里和渠道相关的最短链路

官方首页当前给出的 quick start 里，渠道部分的最短链路是：

```bash
openclaw channels login
openclaw gateway --port 18789
```

这条路径表达了一个关键信息：渠道登录和 Gateway 启动是联动关系，不是“先配一个聊天前端”那么简单。

## 渠道接入时最该关注什么

### 1. 配对与认证

某些渠道需要二维码配对，某些渠道需要 bot token，还有些渠道需要额外 allowlist 或 mention 规则。第一次接入时，不要只关心“能否发消息”，还要关心“谁可以给这个助手发消息”。

### 2. allowFrom 和群组提及规则

官方首页当前给出的锁定示例里，优先建议从：

- `channels.whatsapp.allowFrom`
- 群组 `requireMention`

这两个方向开始做基础收敛。也就是说，渠道一旦接通，下一步优先应该是“限制谁能用”，而不是“让所有人都能试”。

### 3. 一个 Gateway，多渠道共享

如果某个渠道表现异常，不要先假设“就是这个聊天平台有问题”。先回到 Gateway 状态、dashboard 和 auth 配置，看是不是系统层问题。

## 配对状态存放在哪里

官方 pairing 文档指出，某些渠道的配对和 allowlist 状态会保存在：

```bash
~/.openclaw/credentials/
```

例如：

- `<channel>-pairing.json`
- `<channel>-allowFrom.json`

这些文件本质上是敏感状态数据，应该和配置、token 一样对待。

## 多渠道的正确节奏

更稳的扩展路径通常是：

1. 本地跑通 dashboard
2. 先接一个最常用渠道
3. 确认 allowlist 和提及规则
4. 再扩展第二个渠道

如果你一开始同时接 WhatsApp、Telegram、Discord，问题定位会明显更难。

## 什么时候适合进入更具体的渠道文档

出现下面这些需求时，就应该进入具体渠道页，而不是停留在概览页：

- 需要 bot token / app 配置
- 需要二维码或设备配对
- 需要群组与私聊的差异配置
- 需要特定渠道的媒体能力

## 下一步推荐

- [Gateway 架构概览](/docs/architecture)
- [Control UI 是什么](/docs/control-ui)
- [安全配置基础](/docs/safety-basics)
- [故障排除与诊断思路](/docs/troubleshooting)
