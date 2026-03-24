---
title: WebChat 与 message CLI
description: 理解 OpenClaw 除聊天渠道外的两类直接交互入口：Gateway WebSocket 上的 WebChat 和统一的 openclaw message 命令。
category: 功能
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/web/webchat
sourceName: OpenClaw Docs
sourceType: official
tags: [webchat, message, cli, gateway, channels]
---

# WebChat 与 message CLI

现有中文资料里，大家最熟悉的通常是 Telegram、WhatsApp、飞书、钉钉这类渠道入口，但官方文档里其实还有两类非常重要的直接交互方式：`WebChat` 和 `openclaw message`。这两块现在很多中文介绍里讲得不够多，导致用户容易误以为 OpenClaw 只能通过外部聊天应用使用。

## WebChat 是什么

官方当前定义的 WebChat，本质上是 Gateway WebSocket 上的一层聊天 UI，而不是一套独立的本地静态网页服务。

更直白一点说：

- 它不是“另起一个 web 应用”
- 它直接连接 Gateway
- 它和其他入口共享会话与路由逻辑

这意味着 WebChat 更像是系统内建的控制型聊天入口，而不是一个与 Gateway 脱钩的前端壳。

## WebChat 适合什么场景

### 1. 初次验证最小链路

如果你刚装好 OpenClaw，还没接外部渠道，WebChat 往往是最快的验证入口之一。

### 2. 远程操作时的统一入口

当你已经把 Gateway 放到远程主机上，WebChat 可以和远程访问方案一起工作，帮助你直接确认：

- Gateway 是否连通
- 会话是否正常
- 聊天交互链路是否成立

### 3. 不想把每次调试都放到外部渠道

很多排错和配置验证，根本没必要绕一圈 Telegram、WhatsApp 或飞书。WebChat 更适合做“系统内部验证”。

## WebChat 的定位和聊天渠道有什么不同

渠道更偏“面向真实使用者的消息入口”，而 WebChat 更偏：

- operator 入口
- 本地或远程测试入口
- 系统级调试入口

这两者并不互斥，但目标不同。

## `openclaw message` 是什么

官方还提供了统一的 `openclaw message` 命令，用来做单次外发消息和渠道动作。这对很多中文用户来说非常重要，因为它把“聊天系统”转成了“可脚本化的命令入口”。

它的意义在于：

- 统一不同渠道的发送动作
- 更方便做自动化与脚本封装
- 在调试时不必每次依赖人工手动发消息

## `message` 更适合什么时候用

### 1. 单次测试渠道是否可用

比如你刚配好 Telegram、Slack 或 WhatsApp，最直接的验证方式不是等真实对话，而是先做一次明确的 outbound test。

### 2. 做自动化通知

当你把 OpenClaw 当成一个多渠道出站层时，`message` 比“进入完整 agent 流程再发消息”更直接。

### 3. 和脚本、CI、外部系统集成

如果你希望：

- 发布完成后发通知
- 某个自动化事件转发到指定渠道
- 做统一广播或点对点提醒

`openclaw message` 往往比聊天式调用更适合。

## 官方为什么把目标格式写得这么细

不同渠道的目标表示法差异非常大，例如：

- Telegram 可能是 `@username` 或 chat id
- Discord 可能是 `channel:<id>` 或 `user:<id>`
- Slack 可能是 channel id 或 user id
- Signal、iMessage、Teams 又各自不同

这意味着 OpenClaw 虽然提供了统一命令，但并没有抹平渠道语义差异。你在做自动化时，仍然要清楚自己面向的是哪个渠道模型。

## 更适合的理解方式

你可以把这两类入口这样区分：

- WebChat：更适合人来直接测试、对话和调试
- `openclaw message`：更适合脚本、自动化和单次外发动作

两者都绕开了“必须依赖某个聊天平台 UI 才能验证系统”的限制。

## 中文用户常见误区

### 1. 只把 OpenClaw 当作多聊天平台机器人

这会忽略它其实还有 operator 入口和命令式出站层。

### 2. 所有验证都放到外部渠道做

这样排错会被渠道权限、网络和缓存问题放大。

### 3. 以为 WebChat 是一个单独部署的网站

它本质上还是 Gateway 体系的一部分。

## 建议的使用顺序

1. 安装后先用 WebChat 或 Control UI 验证最小聊天链路
2. 渠道配置完成后用 `openclaw message` 做一次明确的 outbound 测试
3. 真正进入生产使用时，再把不同渠道交给真实用户或真实自动化场景

## 2026 年 3 月 24 日的中文入口观察

近期公开可访问的中文教程站在介绍 OpenClaw 时，越来越常把 WebChat 放进“快速开始”和“最小验证路径”里，而不是把它当成长期主入口来强调。

这轮整理时重点参考了：

- [OpenClaw 中文教程首页](https://openclawgithub.cc/en/)
- [OpenClaw 中文教程：快速开始](https://openclawgithub.cc/guide/start/)

结合官方资料和中文外部资料，当前更值得长期保留的判断有三条：

### 1. WebChat 在中文环境里更像“系统验证入口”

很多中文用户第一次接触 OpenClaw 时，还没准备好 Telegram、WhatsApp、飞书或企业内部渠道。  
这时 WebChat 最有价值的地方不是长期承接消息，而是帮你先确认：

- Gateway 是否真的起来了
- 默认模型是否可用
- 最小聊天链路是否成立

### 2. `message` 命令更适合做“外发验证”和脚本集成

中文用户经常把出站通知、自动化提醒和渠道测试混在一起做。  
`openclaw message` 的价值就在于，它能把“我要验证某个渠道能不能发出去”从完整 agent 流程里单独剥出来。

### 3. WebChat 适合过渡，不一定适合长期替代真实渠道

如果你最终是要接团队消息入口、审批流或长期协作环境，那么 WebChat 更适合：

- 过渡验证
- 运维调试
- 内部少量试用

而不是长期替代真实消息入口的主路径。

## 下一步推荐

- 想看渠道全貌：看 [渠道能力概览](/docs/manual/channels-overview)
- 想理解远程访问：看 [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
- 想排查异常：看 [故障排除与诊断思路](/docs/reference/troubleshooting)
- 想判断什么时候该从 WebChat 过渡到真实渠道：看 [Dashboard、WebChat 和聊天渠道分别什么时候用](/docs/getting-started/when-to-use-dashboard-webchat-or-channels)
