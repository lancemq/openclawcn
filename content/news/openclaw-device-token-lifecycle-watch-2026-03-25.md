---
title: "OpenClaw 的 devices CLI 正在把设备授权写成一条完整生命周期"
description: "官方最近围绕 devices CLI 的补强，让 approve、revoke、rotate 和 fresh token 不再像零散命令，而更像完整的设备授权生命周期。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/channels/pairing"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["devices", "pairing", "token", "revoke", "rotate"]
---

OpenClaw 最近这轮 Pairing 文档里，一个很值得注意的趋势是：设备授权正在越来越像一条完整生命周期，而不再只是“第一次设备接入时 approve 一下”。

当前官方已经把这组命令面补完整：

- `devices list`
- `approve`
- `reject`
- `revoke`
- `rotate`

这意味着设备 pairing 的定位正在变化。

## 1. 设备授权越来越不像一次性开关

随着 `revoke` 和 `rotate` 的文档化，官方已经在明确一件事：

- 设备授权不是永久不变的静态状态

它应该经历：

- 接入
- 使用
- 轮换
- 撤销

这几步。

## 2. 浏览器、桌面和节点设备正在被统一纳入同一治理心智

从当前文档写法看，官方正在把浏览器管理面授权、桌面设备身份和 node 接入都往“设备实例级授权”方向收。

这会让很多之前看起来分散的问题更容易统一理解：

- 为什么换 profile 要重配对
- 为什么旧设备应该 revoke
- 为什么长期设备也适合 rotate token

## 3. 设备治理已经开始更像长期运维面

一旦 `devices list`、`revoke`、`rotate` 这些动作都稳定下来，设备 pairing 就不再只是接入时的动作，而是：

- 长期运行中的日常治理面

这对多浏览器、多 operator、多 node 的环境尤其重要。

## 推荐延伸阅读

- [设备 pairing、fresh token 和 revoke 应该怎么做日常运维](/docs/operations/device-pairing-token-lifecycle)
- [设备配对不是一次性批准，应该有定期复核周期](/best-practices/device-pairing-review-cycle)
- [Control UI 设备配对与浏览器授权](/docs/reference/control-ui-device-pairing)
