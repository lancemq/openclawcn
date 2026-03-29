---
title: setup code、bootstrapToken 和 /pair pending 应该怎么一起看
description: 基于最新官方 Pairing 文档，解释 Telegram 首次设备接入时 setup code 里到底装了什么、bootstrapToken 只负责哪一步，以及为什么最后仍然要回到 /pair pending 做人工批准。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/channels/pairing
sourceName: OpenClaw Docs
sourceType: official
tags: [pairing, bootstrapToken, telegram, devices, reference]
---

# setup code、bootstrapToken 和 /pair pending 应该怎么一起看

OpenClaw 官方最近把 Telegram 首次设备接入这条路径写得更完整后，有一个很容易被误会的点终于清楚了：

- `setup code` 不是长期凭据
- `bootstrapToken` 不是最终批准
- `/pair pending` 不是可有可无的补步骤

它们其实是一条连续接入链上的三段。

## 先看官方推荐的 iOS 首次接入顺序

官方 Pairing 页现在把 Telegram 设备接入写成了一条完整流程：

1. 在 Telegram 给 bot 发 `/pair`
2. bot 回两条消息
3. 一条是说明文字
4. 另一条是单独的 `setup code`
5. 在手机 App 里粘贴这个 code
6. 再回到 Telegram 执行 `/pair pending`
7. 最后再批准具体 request

这说明 OpenClaw 刻意把“引导接入”和“正式批准”分开了。

## `setup code` 里到底有什么

官方文档写得很明确，`setup code` 本质上是一段 base64 编码的 JSON，里面最关键的两项是：

- `url`
- `bootstrapToken`

也就是说，它只是把“这台设备要去连哪个 Gateway”和“第一次握手时带哪枚短期引导 token”一起打包给你。

## `bootstrapToken` 只负责第一次握手

最容易出现的误解是把 `bootstrapToken` 当成长期授权。

但从官方表述看，它的职责更窄：

- 只用于 single-device bootstrap
- 只服务首次 pairing handshake

换句话说，它更像“让这台设备有资格发起首次接入请求”，而不是“让这台设备永久进入 Gateway”。

## 为什么最后还要 `/pair pending`

官方专门把 `/pair pending` 放回推荐路径里，说明它不是旧习惯，而是正式控制面的一部分。

它解决的是另一件事：

- 让你看到具体 request ID
- 让你确认这次接入申请的 role
- 让你确认 scopes

也就是说，真正该批准的不是那段 setup code，而是“这台设备这次想以什么身份接入”。

## 更适合怎么理解这三段

把它拆成下面这样会更清楚：

### 1. `setup code`

负责把设备带到正确 Gateway，并拿到一次性的引导材料。

### 2. `bootstrapToken`

负责让首次握手能被创建成 pairing request。

### 3. `/pair pending` + approve

负责由 owner 最后确认这台设备的接入身份和权限范围。

这三段如果少看任何一段，都会把设备接入想得过于简单。

## 这和 DM pairing 也不是同一种批准

DM pairing 里你批的是：

- 谁能给 bot 发消息

这里你批的是：

- 哪台设备
- 以什么 role
- 带哪些 scopes

从风险密度看，后者通常更敏感，因为它可能直接进入 Gateway 控制面或 node 网络。

## 哪些误判最常见

### 1. 以为发出 `/pair` 就等于已经批准

不是。那只是开始创建接入材料。

### 2. 以为 `bootstrapToken` 能长期复用

官方明确把它写成 short-lived single-device bootstrap token，更适合把它当成一次性引导件，而不是常驻密钥。

### 3. 以为最终批准只是在“放行一台手机”

你实际批准的是一个带 role 和 scopes 的设备请求。

## 更稳的管理员做法

如果你准备把 Telegram 当作设备接入入口，建议保持这套顺序：

1. 用 `/pair` 只做首次引导
2. 用手机 App 粘贴 setup code 发起请求
3. 回到 `/pair pending` 看清 request 细节
4. 最后再做 approve

这样比“拿到 code 就默认可信”稳得多。

## 下一步推荐

- [配对审批与设备授权管理](/docs/reference/pairing-admin)
- [Control UI 设备配对与浏览器授权](/docs/reference/control-ui-device-pairing)
- [设备 pairing、fresh token 和 revoke 应该怎么做日常运维](/docs/operations/device-pairing-token-lifecycle)
